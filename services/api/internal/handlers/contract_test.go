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

func decodeJSONBody(t *testing.T, body *bytes.Buffer) map[string]interface{} {
	t.Helper()

	var payload map[string]interface{}
	if err := json.Unmarshal(body.Bytes(), &payload); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	return payload
}

func requireFieldString(t *testing.T, body map[string]interface{}, field, expected string) {
	t.Helper()

	actual, ok := body[field].(string)
	if !ok {
		t.Fatalf("field %q is missing or not a string (value=%v)", field, body[field])
	}
	if actual != expected {
		t.Fatalf("field %q mismatch: expected %q, got %q", field, expected, actual)
	}
}

func TestContract_AuthSignup_InvalidRoleErrorShape(t *testing.T) {
	router := setupTestRouter()
	store := auth.NewStore()
	jwtManager := auth.NewJWTManager("secret", "data-wings", time.Minute)
	handler := NewAuthHandler(store, jwtManager)
	router.POST("/api/v1/auth/signup", handler.Signup)

	reqBody := map[string]string{
		"email":    "contract-invalid-role@datawings.local",
		"password": "datawings123",
		"role":     "ops",
	}
	payload, _ := json.Marshal(reqBody)

	req := httptest.NewRequest(http.MethodPost, "/api/v1/auth/signup", bytes.NewBuffer(payload))
	req.Header.Set("Content-Type", "application/json")
	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	if resp.Code != http.StatusBadRequest {
		t.Fatalf("expected status %d, got %d", http.StatusBadRequest, resp.Code)
	}

	body := decodeJSONBody(t, resp.Body)
	requireFieldString(t, body, "status", "error")
	requireFieldString(t, body, "error_code", "AUTH_INVALID_ROLE")
	requireFieldString(t, body, "message", "Invalid role")
}

func TestContract_AuthSignup_SuccessShape(t *testing.T) {
	router := setupTestRouter()
	store := auth.NewStore()
	jwtManager := auth.NewJWTManager("secret", "data-wings", time.Minute)
	handler := NewAuthHandler(store, jwtManager)
	router.POST("/api/v1/auth/signup", handler.Signup)

	reqBody := map[string]string{
		"email":    "contract-admin@datawings.local",
		"password": "datawings123",
		"role":     "admin",
	}
	payload, _ := json.Marshal(reqBody)

	req := httptest.NewRequest(http.MethodPost, "/api/v1/auth/signup", bytes.NewBuffer(payload))
	req.Header.Set("Content-Type", "application/json")
	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	if resp.Code != http.StatusCreated {
		t.Fatalf("expected status %d, got %d", http.StatusCreated, resp.Code)
	}

	body := decodeJSONBody(t, resp.Body)
	requireFieldString(t, body, "status", "ok")

	token, ok := body["token"].(string)
	if !ok || token == "" {
		t.Fatalf("expected non-empty token in response, got %v", body["token"])
	}

	user, ok := body["user"].(map[string]interface{})
	if !ok {
		t.Fatalf("expected user object in response, got %T", body["user"])
	}
	requireFieldString(t, user, "email", "contract-admin@datawings.local")
	requireFieldString(t, user, "role", "admin")
}

func TestContract_RBAC_MissingAuthHeader(t *testing.T) {
	router := setupTestRouter()
	manager := auth.NewJWTManager("secret", "data-wings", time.Minute)
	dashboardHandler := NewDashboardHandler()

	router.Use(auth.AuthMiddleware(manager))
	router.GET("/api/v1/dashboards", dashboardHandler.List)

	req := httptest.NewRequest(http.MethodGet, "/api/v1/dashboards", nil)
	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	if resp.Code != http.StatusUnauthorized {
		t.Fatalf("expected status %d, got %d", http.StatusUnauthorized, resp.Code)
	}

	body := decodeJSONBody(t, resp.Body)
	requireFieldString(t, body, "status", "error")
	requireFieldString(t, body, "error_code", "AUTH_HEADER_MISSING")
}

func TestContract_RBAC_ForbiddenRole(t *testing.T) {
	router := setupTestRouter()
	store := auth.NewStore()
	manager := auth.NewJWTManager("secret", "data-wings", time.Minute)
	teamHandler := NewTeamHandler(store)

	analyst, err := store.CreateUser("contract-analyst@datawings.local", "datawings123", auth.RoleAnalyst)
	if err != nil {
		t.Fatalf("create analyst: %v", err)
	}
	analystToken, err := manager.Generate(analyst)
	if err != nil {
		t.Fatalf("generate analyst token: %v", err)
	}

	router.Use(auth.AuthMiddleware(manager))
	router.GET("/api/v1/team", auth.RequireRoles(auth.RoleAdmin), teamHandler.List)

	req := httptest.NewRequest(http.MethodGet, "/api/v1/team", nil)
	req.Header.Set("Authorization", "Bearer "+analystToken)
	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	if resp.Code != http.StatusForbidden {
		t.Fatalf("expected status %d, got %d", http.StatusForbidden, resp.Code)
	}

	body := decodeJSONBody(t, resp.Body)
	requireFieldString(t, body, "status", "error")
	requireFieldString(t, body, "error_code", "AUTH_FORBIDDEN")
	requireFieldString(t, body, "message", "Insufficient permissions")
}
