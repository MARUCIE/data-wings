// Data Wings API Server
// AI-Native open-source data analytics platform

package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/MARUCIE/data-wings/services/api/internal/auth"
	"github.com/MARUCIE/data-wings/services/api/internal/config"
	"github.com/MARUCIE/data-wings/services/api/internal/handlers"
	"github.com/MARUCIE/data-wings/services/api/internal/repository"
	"github.com/MARUCIE/data-wings/services/api/internal/response"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Load configuration
	cfg := config.Load()

	// Set Gin mode based on debug flag
	if !cfg.Debug {
		gin.SetMode(gin.ReleaseMode)
	}

	// Initialize Gin router
	r := gin.Default()

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     cfg.CORSOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Health check endpoint (always available)
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"service": "data-wings-api",
			"version": "0.1.0",
		})
	})

	// Try to connect to ClickHouse
	var repo *repository.ClickHouseRepository
	var eventHandler *handlers.EventHandler
	var analyticsHandler *handlers.AnalyticsHandler

	repo, err := initClickHouseRepository(cfg)
	if err != nil {
		log.Printf("WARNING: %v", err)
		log.Printf("Running in degraded mode - database operations will fail")
	} else {
		defer repo.Close()
		eventHandler = handlers.NewEventHandler(repo)
		analyticsHandler = handlers.NewAnalyticsHandler(repo, cfg.AIServiceURL)
	}

	// Dashboard handler (in-memory, always available)
	dashboardHandler := handlers.NewDashboardHandler()

	// Auth handlers
	authStore := auth.NewStore()
	jwtManager := auth.NewJWTManager(cfg.JWTSecret, cfg.JWTIssuer, time.Duration(cfg.JWTTTLMinutes)*time.Minute)
	authHandler := handlers.NewAuthHandler(authStore, jwtManager)
	teamHandler := handlers.NewTeamHandler(authStore)
	authMiddleware := auth.AuthMiddleware(jwtManager)

	// API v1 routes
	v1 := r.Group("/api/v1")
	{
		// Auth endpoints
		v1.POST("/auth/signup", authHandler.Signup)
		v1.POST("/auth/login", authHandler.Login)
		v1.GET("/auth/me", authMiddleware, authHandler.Me)

		// Event tracking endpoints
		if eventHandler != nil {
			v1.POST("/track", eventHandler.Track)
			v1.POST("/identify", eventHandler.Identify)
			v1.POST("/batch", eventHandler.Batch)
		} else {
			// Fallback handlers when database is unavailable
			v1.POST("/track", degradedHandler("track"))
			v1.POST("/identify", degradedHandler("identify"))
			v1.POST("/batch", degradedHandler("batch"))
		}

		// Analytics endpoints (auth required)
		analyticsGroup := v1.Group("/")
		analyticsGroup.Use(authMiddleware)
		if analyticsHandler != nil {
			analyticsGroup.POST("/query", auth.RequireRoles(auth.RoleAdmin, auth.RoleAnalyst, auth.RolePM), analyticsHandler.Query)
			analyticsGroup.POST("/ask", auth.RequireRoles(auth.RoleAdmin, auth.RoleAnalyst, auth.RolePM), analyticsHandler.Ask)
			analyticsGroup.GET("/overview", analyticsHandler.GetOverview)
		} else {
			analyticsGroup.POST("/query", auth.RequireRoles(auth.RoleAdmin, auth.RoleAnalyst, auth.RolePM), degradedHandler("query"))
			analyticsGroup.POST("/ask", auth.RequireRoles(auth.RoleAdmin, auth.RoleAnalyst, auth.RolePM), degradedHandler("ask"))
			analyticsGroup.GET("/overview", degradedHandler("overview"))
		}

		// Dashboard endpoints (auth required)
		dashboardGroup := v1.Group("/dashboards")
		dashboardGroup.Use(authMiddleware)
		dashboardGroup.GET("", dashboardHandler.List)
		dashboardGroup.GET("/:id", dashboardHandler.Get)
		dashboardGroup.POST("", auth.RequireRoles(auth.RoleAdmin, auth.RolePM), dashboardHandler.Create)
		dashboardGroup.PUT("/:id", auth.RequireRoles(auth.RoleAdmin, auth.RolePM), dashboardHandler.Update)
		dashboardGroup.DELETE("/:id", auth.RequireRoles(auth.RoleAdmin, auth.RolePM), dashboardHandler.Delete)

		// Team endpoints (admin only)
		teamGroup := v1.Group("/team")
		teamGroup.Use(authMiddleware, auth.RequireRoles(auth.RoleAdmin))
		teamGroup.GET("", teamHandler.List)
		teamGroup.POST("", teamHandler.Create)
		teamGroup.DELETE("/:id", teamHandler.Delete)
	}

	// Create HTTP server
	addr := fmt.Sprintf(":%s", cfg.Port)
	srv := &http.Server{
		Addr:         addr,
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start server in a goroutine
	go func() {
		log.Printf("Data Wings API server starting on %s", addr)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	// Wait for interrupt signal to gracefully shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")

	// Give outstanding requests 5 seconds to complete
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	log.Println("Server exiting")
}

func initClickHouseRepository(cfg *config.Config) (*repository.ClickHouseRepository, error) {
	maxAttempts := cfg.ClickHouseConnectMaxAttempts
	if maxAttempts < 1 {
		maxAttempts = 1
	}

	retryDelay := time.Duration(cfg.ClickHouseConnectRetryDelaySecond) * time.Second
	if retryDelay <= 0 {
		retryDelay = 2 * time.Second
	}

	var lastErr error
	for attempt := 1; attempt <= maxAttempts; attempt++ {
		repo, err := repository.NewClickHouseRepository(cfg)
		if err == nil {
			if attempt > 1 {
				log.Printf("Connected to ClickHouse on retry %d/%d", attempt, maxAttempts)
			}
			return repo, nil
		}

		lastErr = err
		log.Printf("WARNING: ClickHouse connect attempt %d/%d failed: %v", attempt, maxAttempts, err)
		if attempt < maxAttempts {
			time.Sleep(retryDelay)
		}
	}

	return nil, fmt.Errorf("failed to connect to ClickHouse after %d attempts: %w", maxAttempts, lastErr)
}

// degradedHandler returns a handler for when the database is unavailable.
func degradedHandler(endpoint string) gin.HandlerFunc {
	return func(c *gin.Context) {
		response.ErrorWithCode(c, http.StatusServiceUnavailable, "DATABASE_UNAVAILABLE", "Database unavailable", gin.H{
			"endpoint": endpoint,
		})
	}
}
