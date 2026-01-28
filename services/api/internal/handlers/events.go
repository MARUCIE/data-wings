// Package handlers provides HTTP request handlers for the API service.
package handlers

import (
	"net/http"

	"github.com/MARUCIE/data-wings/services/api/internal/models"
	"github.com/MARUCIE/data-wings/services/api/internal/repository"
	"github.com/gin-gonic/gin"
)

// EventHandler handles event-related HTTP requests.
type EventHandler struct {
	repo *repository.ClickHouseRepository
}

// NewEventHandler creates a new EventHandler.
func NewEventHandler(repo *repository.ClickHouseRepository) *EventHandler {
	return &EventHandler{repo: repo}
}

// Track handles single event tracking.
// POST /api/v1/track
func (h *EventHandler) Track(c *gin.Context) {
	var req models.TrackRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	event, err := repository.ConvertTrackRequestToEvent(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Failed to process event",
			"error":   err.Error(),
		})
		return
	}

	if err := h.repo.InsertEvent(c.Request.Context(), event); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Failed to store event",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   "ok",
		"message":  "Event tracked",
		"event_id": event.EventID.String(),
	})
}

// Batch handles batch event tracking.
// POST /api/v1/batch
func (h *EventHandler) Batch(c *gin.Context) {
	var req models.BatchRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Invalid request body",
			"error":   err.Error(),
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

	// Convert all events
	events := make([]*models.Event, 0, len(req.Events))
	for _, trackReq := range req.Events {
		event, err := repository.ConvertTrackRequestToEvent(&trackReq)
		if err != nil {
			continue // Skip invalid events
		}
		events = append(events, event)
	}

	if len(events) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "No valid events to process",
		})
		return
	}

	if err := h.repo.InsertEventsBatch(c.Request.Context(), events); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Failed to store events",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   "ok",
		"message":  "Batch processed",
		"received": len(req.Events),
		"stored":   len(events),
	})
}

// Identify handles user identification.
// POST /api/v1/identify
func (h *EventHandler) Identify(c *gin.Context) {
	var req models.IdentifyRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	// Also track an identify event
	trackReq := &models.TrackRequest{
		EventName:   "$identify",
		UserID:      req.UserID,
		AnonymousID: req.AnonymousID,
		Properties:  req.Traits,
	}

	event, _ := repository.ConvertTrackRequestToEvent(trackReq)
	if event != nil {
		_ = h.repo.InsertEvent(c.Request.Context(), event)
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"message": "User identified",
		"user_id": req.UserID,
	})
}
