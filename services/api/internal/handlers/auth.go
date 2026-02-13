package handlers

import (
	"net/http"
	"strings"

	"github.com/MARUCIE/data-wings/services/api/internal/auth"
	"github.com/MARUCIE/data-wings/services/api/internal/response"
	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	store      *auth.Store
	jwtManager *auth.JWTManager
}

func NewAuthHandler(store *auth.Store, jwtManager *auth.JWTManager) *AuthHandler {
	return &AuthHandler{store: store, jwtManager: jwtManager}
}

type signupRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (h *AuthHandler) Signup(c *gin.Context) {
	var req signupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.ErrorWithCode(c, http.StatusBadRequest, "AUTH_INVALID_REQUEST_BODY", "Invalid request body", nil)
		return
	}

	role := auth.RoleAnalyst
	if strings.TrimSpace(req.Role) != "" {
		parsed, ok := auth.ParseRole(strings.ToLower(req.Role))
		if !ok {
			response.ErrorWithCode(c, http.StatusBadRequest, "AUTH_INVALID_ROLE", "Invalid role", nil)
			return
		}
		role = parsed
	}

	user, err := h.store.CreateUser(req.Email, req.Password, role)
	if err != nil {
		response.ErrorWithCode(c, http.StatusBadRequest, "AUTH_SIGNUP_FAILED", err.Error(), nil)
		return
	}

	token, err := h.jwtManager.Generate(user)
	if err != nil {
		response.ErrorWithCode(c, http.StatusInternalServerError, "AUTH_TOKEN_GENERATION_FAILED", "Failed to generate token", nil)
		return
	}

	response.OK(c, http.StatusCreated, gin.H{
		"token": token,
		"user":  user.Public(),
	})
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req loginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.ErrorWithCode(c, http.StatusBadRequest, "AUTH_INVALID_REQUEST_BODY", "Invalid request body", nil)
		return
	}

	user, err := h.store.Authenticate(req.Email, req.Password)
	if err != nil {
		response.ErrorWithCode(c, http.StatusUnauthorized, "AUTH_INVALID_CREDENTIALS", "Invalid credentials", nil)
		return
	}

	token, err := h.jwtManager.Generate(user)
	if err != nil {
		response.ErrorWithCode(c, http.StatusInternalServerError, "AUTH_TOKEN_GENERATION_FAILED", "Failed to generate token", nil)
		return
	}

	response.OK(c, http.StatusOK, gin.H{
		"token": token,
		"user":  user.Public(),
	})
}

func (h *AuthHandler) Me(c *gin.Context) {
	ctxUser, ok := auth.GetContextUser(c)
	if !ok {
		response.ErrorWithCode(c, http.StatusUnauthorized, "AUTH_UNAUTHORIZED", "Unauthorized", nil)
		return
	}

	user, err := h.store.GetUser(ctxUser.ID)
	if err != nil {
		response.ErrorWithCode(c, http.StatusNotFound, "AUTH_USER_NOT_FOUND", "User not found", nil)
		return
	}

	response.OK(c, http.StatusOK, gin.H{
		"user": user.Public(),
	})
}
