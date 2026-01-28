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

	"github.com/MARUCIE/data-wings/services/api/internal/config"
	"github.com/MARUCIE/data-wings/services/api/internal/handlers"
	"github.com/MARUCIE/data-wings/services/api/internal/repository"
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

	repo, err := repository.NewClickHouseRepository(cfg)
	if err != nil {
		log.Printf("WARNING: Failed to connect to ClickHouse: %v", err)
		log.Printf("Running in degraded mode - database operations will fail")
	} else {
		defer repo.Close()
		eventHandler = handlers.NewEventHandler(repo)
		analyticsHandler = handlers.NewAnalyticsHandler(repo, cfg.AIServiceURL)
	}

	// Dashboard handler (in-memory, always available)
	dashboardHandler := handlers.NewDashboardHandler()

	// API v1 routes
	v1 := r.Group("/api/v1")
	{
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

		// Analytics endpoints
		if analyticsHandler != nil {
			v1.POST("/query", analyticsHandler.Query)
			v1.POST("/ask", analyticsHandler.Ask)
			v1.GET("/overview", analyticsHandler.GetOverview)
		} else {
			v1.POST("/query", degradedHandler("query"))
			v1.POST("/ask", degradedHandler("ask"))
			v1.GET("/overview", degradedHandler("overview"))
		}

		// Dashboard endpoints (always available)
		v1.GET("/dashboards", dashboardHandler.List)
		v1.GET("/dashboards/:id", dashboardHandler.Get)
		v1.POST("/dashboards", dashboardHandler.Create)
		v1.PUT("/dashboards/:id", dashboardHandler.Update)
		v1.DELETE("/dashboards/:id", dashboardHandler.Delete)
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

// degradedHandler returns a handler for when the database is unavailable.
func degradedHandler(endpoint string) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"status":   "error",
			"message":  "Database unavailable",
			"endpoint": endpoint,
		})
	}
}
