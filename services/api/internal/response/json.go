package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// StatusCodeToErrorCode maps HTTP status codes to stable API error codes.
func StatusCodeToErrorCode(status int) string {
	switch status {
	case http.StatusBadRequest:
		return "BAD_REQUEST"
	case http.StatusUnauthorized:
		return "UNAUTHORIZED"
	case http.StatusForbidden:
		return "FORBIDDEN"
	case http.StatusNotFound:
		return "NOT_FOUND"
	case http.StatusConflict:
		return "CONFLICT"
	case http.StatusServiceUnavailable:
		return "SERVICE_UNAVAILABLE"
	case http.StatusInternalServerError:
		return "INTERNAL_ERROR"
	default:
		return "REQUEST_FAILED"
	}
}

// OK writes a successful response with a canonical "status" field.
func OK(c *gin.Context, status int, payload gin.H) {
	body := gin.H{
		"status": "ok",
	}
	for k, v := range payload {
		body[k] = v
	}
	c.JSON(status, body)
}

// Error writes an error response using the default code inferred from status.
func Error(c *gin.Context, status int, message string, details gin.H) {
	ErrorWithCode(c, status, StatusCodeToErrorCode(status), message, details)
}

// ErrorWithCode writes an error response with an explicit error_code.
func ErrorWithCode(c *gin.Context, status int, errorCode, message string, details gin.H) {
	body := gin.H{
		"status":     "error",
		"message":    message,
		"error_code": errorCode,
	}
	for k, v := range details {
		body[k] = v
	}
	c.JSON(status, body)
}

// AbortError aborts the request with canonical error response.
func AbortError(c *gin.Context, status int, message string, details gin.H) {
	AbortErrorWithCode(c, status, StatusCodeToErrorCode(status), message, details)
}

// AbortErrorWithCode aborts the request with explicit error_code.
func AbortErrorWithCode(c *gin.Context, status int, errorCode, message string, details gin.H) {
	body := gin.H{
		"status":     "error",
		"message":    message,
		"error_code": errorCode,
	}
	for k, v := range details {
		body[k] = v
	}
	c.AbortWithStatusJSON(status, body)
}
