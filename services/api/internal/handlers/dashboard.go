// Package handlers provides HTTP request handlers for the API service.
package handlers

import (
	"net/http"
	"time"

	"github.com/MARUCIE/data-wings/services/api/internal/response"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// Dashboard represents a user dashboard.
type Dashboard struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Widgets     []Widget  `json:"widgets"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// Widget represents a dashboard widget.
type Widget struct {
	ID       string                 `json:"id"`
	Type     string                 `json:"type"` // chart, metric, table
	Title    string                 `json:"title"`
	Query    string                 `json:"query"`
	Config   map[string]interface{} `json:"config"`
	Position WidgetPosition         `json:"position"`
}

// WidgetPosition defines widget placement on dashboard.
type WidgetPosition struct {
	X      int `json:"x"`
	Y      int `json:"y"`
	Width  int `json:"width"`
	Height int `json:"height"`
}

// DashboardHandler handles dashboard-related HTTP requests.
type DashboardHandler struct {
	// In production, this would use a database
	dashboards map[string]*Dashboard
}

// NewDashboardHandler creates a new DashboardHandler.
func NewDashboardHandler() *DashboardHandler {
	h := &DashboardHandler{
		dashboards: make(map[string]*Dashboard),
	}

	// Add a default dashboard
	defaultID := "default"
	h.dashboards[defaultID] = &Dashboard{
		ID:          defaultID,
		Name:        "Overview",
		Description: "Default analytics dashboard",
		Widgets: []Widget{
			{
				ID:    "dau-chart",
				Type:  "chart",
				Title: "Daily Active Users",
				Query: "SELECT toDate(event_time) AS date, uniq(user_id) AS dau FROM events WHERE event_date >= today() - 7 GROUP BY date ORDER BY date",
				Config: map[string]interface{}{
					"chartType": "line",
					"xAxis":     "date",
					"yAxis":     "dau",
				},
				Position: WidgetPosition{X: 0, Y: 0, Width: 6, Height: 4},
			},
			{
				ID:    "events-chart",
				Type:  "chart",
				Title: "Events by Type",
				Query: "SELECT event_name, count() AS count FROM events WHERE event_date >= today() - 7 GROUP BY event_name ORDER BY count DESC LIMIT 10",
				Config: map[string]interface{}{
					"chartType": "bar",
					"xAxis":     "event_name",
					"yAxis":     "count",
				},
				Position: WidgetPosition{X: 6, Y: 0, Width: 6, Height: 4},
			},
			{
				ID:    "total-events",
				Type:  "metric",
				Title: "Total Events (7d)",
				Query: "SELECT count() AS total FROM events WHERE event_date >= today() - 7",
				Config: map[string]interface{}{
					"format": "number",
				},
				Position: WidgetPosition{X: 0, Y: 4, Width: 3, Height: 2},
			},
			{
				ID:    "unique-users",
				Type:  "metric",
				Title: "Unique Users (7d)",
				Query: "SELECT uniq(user_id) AS users FROM events WHERE event_date >= today() - 7",
				Config: map[string]interface{}{
					"format": "number",
				},
				Position: WidgetPosition{X: 3, Y: 4, Width: 3, Height: 2},
			},
		},
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	return h
}

// List returns all dashboards.
// GET /api/v1/dashboards
func (h *DashboardHandler) List(c *gin.Context) {
	dashboards := make([]*Dashboard, 0, len(h.dashboards))
	for _, d := range h.dashboards {
		dashboards = append(dashboards, d)
	}

	response.OK(c, http.StatusOK, gin.H{
		"dashboards": dashboards,
	})
}

// Get returns a single dashboard by ID.
// GET /api/v1/dashboards/:id
func (h *DashboardHandler) Get(c *gin.Context) {
	id := c.Param("id")

	dashboard, ok := h.dashboards[id]
	if !ok {
		response.ErrorWithCode(c, http.StatusNotFound, "DASHBOARD_NOT_FOUND", "Dashboard not found", nil)
		return
	}

	response.OK(c, http.StatusOK, gin.H{
		"dashboard": dashboard,
	})
}

// CreateRequest is the request body for creating a dashboard.
type CreateRequest struct {
	Name        string   `json:"name" binding:"required"`
	Description string   `json:"description"`
	Widgets     []Widget `json:"widgets"`
}

// Create creates a new dashboard.
// POST /api/v1/dashboards
func (h *DashboardHandler) Create(c *gin.Context) {
	var req CreateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.ErrorWithCode(c, http.StatusBadRequest, "DASHBOARD_INVALID_REQUEST_BODY", "Invalid request body", gin.H{
			"error": err.Error(),
		})
		return
	}

	id := uuid.New().String()
	now := time.Now()

	dashboard := &Dashboard{
		ID:          id,
		Name:        req.Name,
		Description: req.Description,
		Widgets:     req.Widgets,
		CreatedAt:   now,
		UpdatedAt:   now,
	}

	h.dashboards[id] = dashboard

	response.OK(c, http.StatusCreated, gin.H{
		"dashboard": dashboard,
	})
}

// Update updates an existing dashboard.
// PUT /api/v1/dashboards/:id
func (h *DashboardHandler) Update(c *gin.Context) {
	id := c.Param("id")

	dashboard, ok := h.dashboards[id]
	if !ok {
		response.ErrorWithCode(c, http.StatusNotFound, "DASHBOARD_NOT_FOUND", "Dashboard not found", nil)
		return
	}

	var req CreateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.ErrorWithCode(c, http.StatusBadRequest, "DASHBOARD_INVALID_REQUEST_BODY", "Invalid request body", gin.H{
			"error": err.Error(),
		})
		return
	}

	dashboard.Name = req.Name
	dashboard.Description = req.Description
	dashboard.Widgets = req.Widgets
	dashboard.UpdatedAt = time.Now()

	response.OK(c, http.StatusOK, gin.H{
		"dashboard": dashboard,
	})
}

// Delete deletes a dashboard.
// DELETE /api/v1/dashboards/:id
func (h *DashboardHandler) Delete(c *gin.Context) {
	id := c.Param("id")

	if _, ok := h.dashboards[id]; !ok {
		response.ErrorWithCode(c, http.StatusNotFound, "DASHBOARD_NOT_FOUND", "Dashboard not found", nil)
		return
	}

	delete(h.dashboards, id)

	response.OK(c, http.StatusOK, gin.H{
		"message": "Dashboard deleted",
	})
}
