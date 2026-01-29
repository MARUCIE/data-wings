package auth

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
)

func TestAuthMiddleware(t *testing.T) {
	gin.SetMode(gin.TestMode)
	manager := NewJWTManager("secret", "data-wings", time.Minute)
	store := NewStore()
	user, err := store.CreateUser("middleware@datawings.local", "pass1234", RoleAnalyst)
	if err != nil {
		t.Fatalf("create user: %v", err)
	}
	token, err := manager.Generate(user)
	if err != nil {
		t.Fatalf("generate token: %v", err)
	}

	router := gin.New()
	router.Use(AuthMiddleware(manager))
	router.GET("/protected", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)
	if resp.Code != http.StatusUnauthorized {
		t.Fatalf("expected 401, got %d", resp.Code)
	}

	reqAuth := httptest.NewRequest(http.MethodGet, "/protected", nil)
	reqAuth.Header.Set("Authorization", "Bearer "+token)
	respAuth := httptest.NewRecorder()
	router.ServeHTTP(respAuth, reqAuth)
	if respAuth.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", respAuth.Code)
	}
}
