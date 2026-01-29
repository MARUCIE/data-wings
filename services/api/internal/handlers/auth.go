package handlers

import (
  "net/http"
  "strings"

  "github.com/MARUCIE/data-wings/services/api/internal/auth"
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
    c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid request body"})
    return
  }

  role := auth.RoleAnalyst
  if strings.TrimSpace(req.Role) != "" {
    parsed, ok := auth.ParseRole(strings.ToLower(req.Role))
    if !ok {
      c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid role"})
      return
    }
    role = parsed
  }

  user, err := h.store.CreateUser(req.Email, req.Password, role)
  if err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": err.Error()})
    return
  }

  token, err := h.jwtManager.Generate(user)
  if err != nil {
    c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to generate token"})
    return
  }

  c.JSON(http.StatusCreated, gin.H{
    "status": "ok",
    "token":  token,
    "user":   user.Public(),
  })
}

func (h *AuthHandler) Login(c *gin.Context) {
  var req loginRequest
  if err := c.ShouldBindJSON(&req); err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid request body"})
    return
  }

  user, err := h.store.Authenticate(req.Email, req.Password)
  if err != nil {
    c.JSON(http.StatusUnauthorized, gin.H{"status": "error", "message": "Invalid credentials"})
    return
  }

  token, err := h.jwtManager.Generate(user)
  if err != nil {
    c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to generate token"})
    return
  }

  c.JSON(http.StatusOK, gin.H{
    "status": "ok",
    "token":  token,
    "user":   user.Public(),
  })
}

func (h *AuthHandler) Me(c *gin.Context) {
  ctxUser, ok := auth.GetContextUser(c)
  if !ok {
    c.JSON(http.StatusUnauthorized, gin.H{"status": "error", "message": "Unauthorized"})
    return
  }

  user, err := h.store.GetUser(ctxUser.ID)
  if err != nil {
    c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "User not found"})
    return
  }

  c.JSON(http.StatusOK, gin.H{
    "status": "ok",
    "user":   user.Public(),
  })
}
