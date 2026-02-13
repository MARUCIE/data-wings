package handlers

import (
	"net/http"
	"strings"

	"github.com/MARUCIE/data-wings/services/api/internal/auth"
	"github.com/MARUCIE/data-wings/services/api/internal/response"
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
	response.OK(c, http.StatusOK, gin.H{
		"members": members,
	})
}

func (h *TeamHandler) Create(c *gin.Context) {
	var req teamCreateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.ErrorWithCode(c, http.StatusBadRequest, "TEAM_INVALID_REQUEST_BODY", "Invalid request body", nil)
		return
	}

	parsed, ok := auth.ParseRole(strings.ToLower(req.Role))
	if !ok {
		response.ErrorWithCode(c, http.StatusBadRequest, "TEAM_INVALID_ROLE", "Invalid role", nil)
		return
	}

	user, err := h.store.CreateUser(req.Email, req.Password, parsed)
	if err != nil {
		response.ErrorWithCode(c, http.StatusBadRequest, "TEAM_CREATE_MEMBER_FAILED", err.Error(), nil)
		return
	}

	response.OK(c, http.StatusCreated, gin.H{
		"member": user.Public(),
	})
}

func (h *TeamHandler) Delete(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		response.ErrorWithCode(c, http.StatusBadRequest, "TEAM_INVALID_MEMBER_ID", "Invalid member id", nil)
		return
	}

	if err := h.store.DeleteUser(id); err != nil {
		response.ErrorWithCode(c, http.StatusNotFound, "TEAM_MEMBER_NOT_FOUND", err.Error(), nil)
		return
	}

	response.OK(c, http.StatusOK, nil)
}
