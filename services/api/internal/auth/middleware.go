package auth

import (
	"net/http"
	"strings"

	"github.com/MARUCIE/data-wings/services/api/internal/response"
	"github.com/gin-gonic/gin"
)

type ContextUser struct {
	ID    string
	Email string
	Role  Role
}

const contextUserKey = "auth_user"

func AuthMiddleware(jwtManager *JWTManager) gin.HandlerFunc {
	return func(c *gin.Context) {
		header := c.GetHeader("Authorization")
		if header == "" {
			response.AbortErrorWithCode(c, http.StatusUnauthorized, "AUTH_HEADER_MISSING", "Missing authorization header", nil)
			return
		}

		parts := strings.SplitN(header, " ", 2)
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			response.AbortErrorWithCode(c, http.StatusUnauthorized, "AUTH_HEADER_INVALID", "Invalid authorization header", nil)
			return
		}

		claims, err := jwtManager.Verify(parts[1])
		if err != nil {
			response.AbortErrorWithCode(c, http.StatusUnauthorized, "AUTH_TOKEN_INVALID", "Invalid token", nil)
			return
		}

		c.Set(contextUserKey, ContextUser{
			ID:    claims.UserID,
			Email: claims.Email,
			Role:  claims.Role,
		})
		c.Next()
	}
}

func RequireRoles(roles ...Role) gin.HandlerFunc {
	roleSet := make(map[Role]struct{}, len(roles))
	for _, role := range roles {
		roleSet[role] = struct{}{}
	}

	return func(c *gin.Context) {
		ctxUser, ok := GetContextUser(c)
		if !ok {
			response.AbortErrorWithCode(c, http.StatusUnauthorized, "AUTH_UNAUTHORIZED", "Unauthorized", nil)
			return
		}

		if _, allowed := roleSet[ctxUser.Role]; !allowed {
			response.AbortErrorWithCode(c, http.StatusForbidden, "AUTH_FORBIDDEN", "Insufficient permissions", nil)
			return
		}

		c.Next()
	}
}

func GetContextUser(c *gin.Context) (ContextUser, bool) {
	value, ok := c.Get(contextUserKey)
	if !ok {
		return ContextUser{}, false
	}

	user, ok := value.(ContextUser)
	return user, ok
}
