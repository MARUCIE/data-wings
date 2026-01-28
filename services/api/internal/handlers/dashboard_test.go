package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestDashboardHandler_List(t *testing.T) {
	router := setupTestRouter()
	handler := NewDashboardHandler()

	router.GET("/api/v1/dashboards", handler.List)

	req, _ := http.NewRequest("GET", "/api/v1/dashboards", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, w.Code)
	}

	var response map[string]interface{}
	json.Unmarshal(w.Body.Bytes(), &response)

	if response["status"] != "ok" {
		t.Errorf("Expected status 'ok', got '%v'", response["status"])
	}

	dashboards, ok := response["dashboards"].([]interface{})
	if !ok {
		t.Error("Expected dashboards to be an array")
	}

	// Should have default dashboard
	if len(dashboards) < 1 {
		t.Error("Expected at least one dashboard (default)")
	}
}

func TestDashboardHandler_Get_Default(t *testing.T) {
	router := setupTestRouter()
	handler := NewDashboardHandler()

	router.GET("/api/v1/dashboards/:id", handler.Get)

	req, _ := http.NewRequest("GET", "/api/v1/dashboards/default", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, w.Code)
	}

	var response map[string]interface{}
	json.Unmarshal(w.Body.Bytes(), &response)

	dashboard, ok := response["dashboard"].(map[string]interface{})
	if !ok {
		t.Error("Expected dashboard object in response")
		return
	}

	if dashboard["id"] != "default" {
		t.Errorf("Expected dashboard id 'default', got '%v'", dashboard["id"])
	}

	if dashboard["name"] != "Overview" {
		t.Errorf("Expected dashboard name 'Overview', got '%v'", dashboard["name"])
	}

	widgets, ok := dashboard["widgets"].([]interface{})
	if !ok {
		t.Error("Expected widgets array")
		return
	}

	if len(widgets) < 1 {
		t.Error("Expected at least one widget in default dashboard")
	}
}

func TestDashboardHandler_Get_NotFound(t *testing.T) {
	router := setupTestRouter()
	handler := NewDashboardHandler()

	router.GET("/api/v1/dashboards/:id", handler.Get)

	req, _ := http.NewRequest("GET", "/api/v1/dashboards/nonexistent", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusNotFound {
		t.Errorf("Expected status %d, got %d", http.StatusNotFound, w.Code)
	}
}

func TestDashboardHandler_Create(t *testing.T) {
	router := setupTestRouter()
	handler := NewDashboardHandler()

	router.POST("/api/v1/dashboards", handler.Create)

	body := map[string]interface{}{
		"name":        "Test Dashboard",
		"description": "A test dashboard",
		"widgets":     []interface{}{},
	}
	jsonBody, _ := json.Marshal(body)

	req, _ := http.NewRequest("POST", "/api/v1/dashboards", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusCreated {
		t.Errorf("Expected status %d, got %d", http.StatusCreated, w.Code)
	}

	var response map[string]interface{}
	json.Unmarshal(w.Body.Bytes(), &response)

	dashboard, ok := response["dashboard"].(map[string]interface{})
	if !ok {
		t.Error("Expected dashboard object in response")
		return
	}

	if dashboard["name"] != "Test Dashboard" {
		t.Errorf("Expected name 'Test Dashboard', got '%v'", dashboard["name"])
	}

	if dashboard["id"] == "" {
		t.Error("Expected dashboard to have an ID")
	}
}

func TestDashboardHandler_Create_MissingName(t *testing.T) {
	router := setupTestRouter()
	handler := NewDashboardHandler()

	router.POST("/api/v1/dashboards", handler.Create)

	body := map[string]interface{}{
		"description": "A test dashboard without name",
	}
	jsonBody, _ := json.Marshal(body)

	req, _ := http.NewRequest("POST", "/api/v1/dashboards", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("Expected status %d, got %d", http.StatusBadRequest, w.Code)
	}
}

func TestDashboardHandler_Update(t *testing.T) {
	router := setupTestRouter()
	handler := NewDashboardHandler()

	router.PUT("/api/v1/dashboards/:id", handler.Update)

	body := map[string]interface{}{
		"name":        "Updated Overview",
		"description": "Updated description",
		"widgets":     []interface{}{},
	}
	jsonBody, _ := json.Marshal(body)

	req, _ := http.NewRequest("PUT", "/api/v1/dashboards/default", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, w.Code)
	}

	var response map[string]interface{}
	json.Unmarshal(w.Body.Bytes(), &response)

	dashboard, ok := response["dashboard"].(map[string]interface{})
	if !ok {
		t.Error("Expected dashboard object in response")
		return
	}

	if dashboard["name"] != "Updated Overview" {
		t.Errorf("Expected name 'Updated Overview', got '%v'", dashboard["name"])
	}
}

func TestDashboardHandler_Delete(t *testing.T) {
	router := setupTestRouter()
	handler := NewDashboardHandler()

	// First create a dashboard
	router.POST("/api/v1/dashboards", handler.Create)
	router.DELETE("/api/v1/dashboards/:id", handler.Delete)
	router.GET("/api/v1/dashboards/:id", handler.Get)

	// Create
	createBody := map[string]interface{}{
		"name": "To Delete",
	}
	jsonBody, _ := json.Marshal(createBody)
	createReq, _ := http.NewRequest("POST", "/api/v1/dashboards", bytes.NewBuffer(jsonBody))
	createReq.Header.Set("Content-Type", "application/json")
	createW := httptest.NewRecorder()
	router.ServeHTTP(createW, createReq)

	var createResponse map[string]interface{}
	json.Unmarshal(createW.Body.Bytes(), &createResponse)
	dashboard := createResponse["dashboard"].(map[string]interface{})
	dashboardID := dashboard["id"].(string)

	// Delete
	deleteReq, _ := http.NewRequest("DELETE", "/api/v1/dashboards/"+dashboardID, nil)
	deleteW := httptest.NewRecorder()
	router.ServeHTTP(deleteW, deleteReq)

	if deleteW.Code != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, deleteW.Code)
	}

	// Verify deleted
	getReq, _ := http.NewRequest("GET", "/api/v1/dashboards/"+dashboardID, nil)
	getW := httptest.NewRecorder()
	router.ServeHTTP(getW, getReq)

	if getW.Code != http.StatusNotFound {
		t.Errorf("Expected status %d after delete, got %d", http.StatusNotFound, getW.Code)
	}
}
