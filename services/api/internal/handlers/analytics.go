// Package handlers provides HTTP request handlers for the API service.
package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/MARUCIE/data-wings/services/api/internal/repository"
	"github.com/gin-gonic/gin"
)

// AnalyticsHandler handles analytics-related HTTP requests.
type AnalyticsHandler struct {
	repo         *repository.ClickHouseRepository
	aiServiceURL string
}

// NewAnalyticsHandler creates a new AnalyticsHandler.
func NewAnalyticsHandler(repo *repository.ClickHouseRepository, aiServiceURL string) *AnalyticsHandler {
	return &AnalyticsHandler{
		repo:         repo,
		aiServiceURL: aiServiceURL,
	}
}

// QueryRequest is the request body for custom SQL queries.
type QueryRequest struct {
	SQL  string        `json:"sql" binding:"required"`
	Args []interface{} `json:"args"`
}

// AskRequest is the request body for natural language queries.
type AskRequest struct {
	Question string                 `json:"question" binding:"required"`
	Context  map[string]interface{} `json:"context"`
}

// AskResponse is the response from the AI service.
type AskResponse struct {
	Question    string                   `json:"question"`
	SQL         string                   `json:"sql"`
	Explanation string                   `json:"explanation"`
	Confidence  float64                  `json:"confidence"`
	Data        []map[string]interface{} `json:"data,omitempty"`
	Error       string                   `json:"error,omitempty"`
}

// Query executes a custom SQL query.
// POST /api/v1/query
func (h *AnalyticsHandler) Query(c *gin.Context) {
	var req QueryRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	results, err := h.repo.QueryEvents(c.Request.Context(), req.SQL, req.Args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Query failed",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
		"data":   results,
		"count":  len(results),
	})
}

// Ask handles natural language queries via the AI service.
// POST /api/v1/ask
func (h *AnalyticsHandler) Ask(c *gin.Context) {
	var req AskRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	// Call AI service to translate question to SQL
	aiReq := map[string]interface{}{
		"question": req.Question,
		"context":  req.Context,
	}
	aiBody, _ := json.Marshal(aiReq)

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Post(
		fmt.Sprintf("%s/api/v1/ask", h.aiServiceURL),
		"application/json",
		bytes.NewReader(aiBody),
	)
	if err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"status":  "error",
			"message": "AI service unavailable",
			"error":   err.Error(),
		})
		return
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	var aiResp AskResponse
	if err := json.Unmarshal(body, &aiResp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Failed to parse AI response",
			"error":   err.Error(),
		})
		return
	}

	// Execute the generated SQL if we got one
	if aiResp.SQL != "" && aiResp.Confidence >= 0.7 {
		results, err := h.repo.QueryEvents(c.Request.Context(), aiResp.SQL)
		if err != nil {
			aiResp.Error = err.Error()
		} else {
			aiResp.Data = results
		}
	}

	c.JSON(http.StatusOK, aiResp)
}

// GetOverview returns dashboard overview metrics.
// GET /api/v1/overview
func (h *AnalyticsHandler) GetOverview(c *gin.Context) {
	// Get time range from query params
	endDate := time.Now().Format("2006-01-02")
	startDate := time.Now().AddDate(0, 0, -7).Format("2006-01-02")

	if start := c.Query("start_date"); start != "" {
		startDate = start
	}
	if end := c.Query("end_date"); end != "" {
		endDate = end
	}

	// Get DAU
	dau, err := h.repo.GetDAU(c.Request.Context(), startDate, endDate)
	if err != nil {
		dau = []map[string]interface{}{}
	}

	// Get event counts
	eventCounts, err := h.repo.GetEventCounts(c.Request.Context(), startDate, endDate)
	if err != nil {
		eventCounts = []map[string]interface{}{}
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
		"data": gin.H{
			"dau":          dau,
			"event_counts": eventCounts,
			"time_range": gin.H{
				"start_date": startDate,
				"end_date":   endDate,
			},
		},
	})
}
