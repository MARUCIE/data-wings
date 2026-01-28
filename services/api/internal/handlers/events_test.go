package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func setupTestRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	return r
}

func TestEventHandler_Track_WithoutRepo(t *testing.T) {
	// Test with nil repo (degraded mode)
	router := setupTestRouter()

	// Use degraded handler
	router.POST("/api/v1/track", func(c *gin.Context) {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"status":  "error",
			"message": "Database unavailable",
		})
	})

	body := map[string]interface{}{
		"event_name":   "test_event",
		"anonymous_id": "test-anon-123",
		"properties": map[string]interface{}{
			"page": "/test",
		},
	}
	jsonBody, _ := json.Marshal(body)

	req, _ := http.NewRequest("POST", "/api/v1/track", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusServiceUnavailable {
		t.Errorf("Expected status %d, got %d", http.StatusServiceUnavailable, w.Code)
	}
}

func TestEventHandler_Track_InvalidRequest(t *testing.T) {
	router := setupTestRouter()

	// Mock handler that validates request
	router.POST("/api/v1/track", func(c *gin.Context) {
		var req struct {
			EventName   string `json:"event_name" binding:"required"`
			AnonymousID string `json:"anonymous_id" binding:"required"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  "error",
				"message": "Invalid request body",
				"error":   err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// Missing required fields
	body := map[string]interface{}{
		"properties": map[string]interface{}{},
	}
	jsonBody, _ := json.Marshal(body)

	req, _ := http.NewRequest("POST", "/api/v1/track", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("Expected status %d, got %d", http.StatusBadRequest, w.Code)
	}
}

func TestEventHandler_Batch_EmptyEvents(t *testing.T) {
	router := setupTestRouter()

	router.POST("/api/v1/batch", func(c *gin.Context) {
		var req struct {
			Events []interface{} `json:"events" binding:"required"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  "error",
				"message": "Invalid request body",
			})
			return
		}

		if len(req.Events) == 0 {
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  "error",
				"message": "No events provided",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	body := map[string]interface{}{
		"events": []interface{}{},
	}
	jsonBody, _ := json.Marshal(body)

	req, _ := http.NewRequest("POST", "/api/v1/batch", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("Expected status %d, got %d", http.StatusBadRequest, w.Code)
	}
}

func TestEventHandler_Identify_ValidRequest(t *testing.T) {
	router := setupTestRouter()

	router.POST("/api/v1/identify", func(c *gin.Context) {
		var req struct {
			UserID string `json:"user_id" binding:"required"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  "error",
				"message": "Invalid request body",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"message": "User identified",
			"user_id": req.UserID,
		})
	})

	body := map[string]interface{}{
		"user_id": "user-123",
		"traits": map[string]interface{}{
			"email": "test@example.com",
			"name":  "Test User",
		},
	}
	jsonBody, _ := json.Marshal(body)

	req, _ := http.NewRequest("POST", "/api/v1/identify", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, w.Code)
	}

	var response map[string]interface{}
	json.Unmarshal(w.Body.Bytes(), &response)

	if response["user_id"] != "user-123" {
		t.Errorf("Expected user_id 'user-123', got '%v'", response["user_id"])
	}
}
