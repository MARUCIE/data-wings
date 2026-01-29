package handlers

import (
  "net/http"
  "strings"

  "github.com/MARUCIE/data-wings/services/api/internal/auth"
  "github.com/gin-gonic/gin"
)

type TeamHandler struct {
  store *auth.Store
}

func NewTeamHandler(store *auth.Store) *TeamHandler {
  return &TeamHandler{store: store}
}

type teamCreateRequest struct {
  Email    string `json:"email"`
  Password string `json:"password"`
  Role     string `json:"role"`
}

func (h *TeamHandler) List(c *gin.Context) {
  members := h.store.ListUsers()
  c.JSON(http.StatusOK, gin.H{
    "status":  "ok",
    "members": members,
  })
}

func (h *TeamHandler) Create(c *gin.Context) {
  var req teamCreateRequest
  if err := c.ShouldBindJSON(&req); err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid request body"})
    return
  }

  parsed, ok := auth.ParseRole(strings.ToLower(req.Role))
  if !ok {
    c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid role"})
    return
  }

  user, err := h.store.CreateUser(req.Email, req.Password, parsed)
  if err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": err.Error()})
    return
  }

  c.JSON(http.StatusCreated, gin.H{
    "status": "ok",
    "member": user.Public(),
  })
}

func (h *TeamHandler) Delete(c *gin.Context) {
  id := c.Param("id")
  if id == "" {
    c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid member id"})
    return
  }

  if err := h.store.DeleteUser(id); err != nil {
    c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": err.Error()})
    return
  }

  c.JSON(http.StatusOK, gin.H{
    "status": "ok",
  })
}
