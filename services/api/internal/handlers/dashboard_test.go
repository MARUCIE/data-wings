package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/MARUCIE/data-wings/services/api/internal/auth"
)

func setupAuth(t *testing.T, role auth.Role) (*auth.JWTManager, string) {
	manager := auth.NewJWTManager("secret", "data-wings", time.Minute)
	user := &auth.User{
		ID:        "test-user",
		Email:     "test@datawings.local",
		Role:      role,
		CreatedAt: time.Now(),
	}
	token, err := manager.Generate(user)
	if err != nil {
		t.Fatalf("generate token: %v", err)
	}
	return manager, token
}

func newAuthRequest(method, url string, body *bytes.Buffer, token string) *http.Request {
	req, _ := http.NewRequest(method, url, body)
	req.Header.Set("Authorization", "Bearer "+token)
	return req
}

func TestDashboardHandler_List(t *testing.T) {
	router := setupTestRouter()
	handler := NewDashboardHandler()

	manager, token := setupAuth(t, auth.RoleAdmin)
	router.Use(auth.AuthMiddleware(manager))
	router.GET("/api/v1/dashboards", handler.List)

	req := newAuthRequest("GET", "/api/v1/dashboards", nil, token)
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

	manager, token := setupAuth(t, auth.RoleAdmin)
	router.Use(auth.AuthMiddleware(manager))
	router.GET("/api/v1/dashboards/:id", handler.Get)

	req := newAuthRequest("GET", "/api/v1/dashboards/default", nil, token)
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

	manager, token := setupAuth(t, auth.RoleAdmin)
	router.Use(auth.AuthMiddleware(manager))
	router.GET("/api/v1/dashboards/:id", handler.Get)

	req := newAuthRequest("GET", "/api/v1/dashboards/nonexistent", nil, token)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusNotFound {
		t.Errorf("Expected status %d, got %d", http.StatusNotFound, w.Code)
	}
}

func TestDashboardHandler_Create(t *testing.T) {
	router := setupTestRouter()
	handler := NewDashboardHandler()

	manager, token := setupAuth(t, auth.RoleAdmin)
	router.Use(auth.AuthMiddleware(manager))
	router.POST("/api/v1/dashboards", auth.RequireRoles(auth.RoleAdmin, auth.RolePM), handler.Create)

	body := map[string]interface{}{
		"name":        "Test Dashboard",
		"description": "A test dashboard",
		"widgets":     []interface{}{},
	}
	jsonBody, _ := json.Marshal(body)

	req := newAuthRequest("POST", "/api/v1/dashboards", bytes.NewBuffer(jsonBody), token)
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

	manager, token := setupAuth(t, auth.RoleAdmin)
	router.Use(auth.AuthMiddleware(manager))
	router.POST("/api/v1/dashboards", auth.RequireRoles(auth.RoleAdmin, auth.RolePM), handler.Create)

	body := map[string]interface{}{
		"description": "A test dashboard without name",
	}
	jsonBody, _ := json.Marshal(body)

	req := newAuthRequest("POST", "/api/v1/dashboards", bytes.NewBuffer(jsonBody), token)
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

	manager, token := setupAuth(t, auth.RoleAdmin)
	router.Use(auth.AuthMiddleware(manager))
	router.PUT("/api/v1/dashboards/:id", auth.RequireRoles(auth.RoleAdmin, auth.RolePM), handler.Update)

	body := map[string]interface{}{
		"name":        "Updated Overview",
		"description": "Updated description",
		"widgets":     []interface{}{},
	}
	jsonBody, _ := json.Marshal(body)

	req := newAuthRequest("PUT", "/api/v1/dashboards/default", bytes.NewBuffer(jsonBody), token)
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

	manager, token := setupAuth(t, auth.RoleAdmin)
	router.Use(auth.AuthMiddleware(manager))

	// First create a dashboard
	router.POST("/api/v1/dashboards", auth.RequireRoles(auth.RoleAdmin, auth.RolePM), handler.Create)
	router.DELETE("/api/v1/dashboards/:id", auth.RequireRoles(auth.RoleAdmin, auth.RolePM), handler.Delete)
	router.GET("/api/v1/dashboards/:id", handler.Get)

	// Create
	createBody := map[string]interface{}{
		"name": "To Delete",
	}
	jsonBody, _ := json.Marshal(createBody)
	createReq := newAuthRequest("POST", "/api/v1/dashboards", bytes.NewBuffer(jsonBody), token)
	createReq.Header.Set("Content-Type", "application/json")
	createW := httptest.NewRecorder()
	router.ServeHTTP(createW, createReq)

	var createResponse map[string]interface{}
	json.Unmarshal(createW.Body.Bytes(), &createResponse)
	dashboard := createResponse["dashboard"].(map[string]interface{})
	dashboardID := dashboard["id"].(string)

	// Delete
	deleteReq := newAuthRequest("DELETE", "/api/v1/dashboards/"+dashboardID, nil, token)
	deleteW := httptest.NewRecorder()
	router.ServeHTTP(deleteW, deleteReq)

	if deleteW.Code != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, deleteW.Code)
	}

	// Verify deleted
	getReq := newAuthRequest("GET", "/api/v1/dashboards/"+dashboardID, nil, token)
	getW := httptest.NewRecorder()
	router.ServeHTTP(getW, getReq)

	if getW.Code != http.StatusNotFound {
		t.Errorf("Expected status %d after delete, got %d", http.StatusNotFound, getW.Code)
	}
}
