package auth

import (
  "net/http"
  "strings"

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
      c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
        "status":  "error",
        "message": "Missing authorization header",
      })
      return
    }

    parts := strings.SplitN(header, " ", 2)
    if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
      c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
        "status":  "error",
        "message": "Invalid authorization header",
      })
      return
    }

    claims, err := jwtManager.Verify(parts[1])
    if err != nil {
      c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
        "status":  "error",
        "message": "Invalid token",
      })
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
      c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
        "status":  "error",
        "message": "Unauthorized",
      })
      return
    }

    if _, allowed := roleSet[ctxUser.Role]; !allowed {
      c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
        "status":  "error",
        "message": "Insufficient permissions",
      })
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
