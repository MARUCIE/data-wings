package auth

import (
  "errors"
  "time"

  "github.com/golang-jwt/jwt/v5"
)

type Claims struct {
  UserID string `json:"uid"`
  Email  string `json:"email"`
  Role   Role   `json:"role"`
  jwt.RegisteredClaims
}

type JWTManager struct {
  secret []byte
  issuer string
  ttl    time.Duration
}

func NewJWTManager(secret, issuer string, ttl time.Duration) *JWTManager {
  return &JWTManager{
    secret: []byte(secret),
    issuer: issuer,
    ttl:    ttl,
  }
}

func (j *JWTManager) Generate(user *User) (string, error) {
  now := time.Now()
  claims := Claims{
    UserID: user.ID,
    Email:  user.Email,
    Role:   user.Role,
    RegisteredClaims: jwt.RegisteredClaims{
      Issuer:    j.issuer,
      Subject:   user.ID,
      IssuedAt:  jwt.NewNumericDate(now),
      ExpiresAt: jwt.NewNumericDate(now.Add(j.ttl)),
    },
  }

  token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
  return token.SignedString(j.secret)
}

func (j *JWTManager) Verify(tokenString string) (*Claims, error) {
  token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
    if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
      return nil, errors.New("unexpected signing method")
    }
    return j.secret, nil
  })
  if err != nil {
    return nil, err
  }

  claims, ok := token.Claims.(*Claims)
  if !ok || !token.Valid {
    return nil, errors.New("invalid token")
  }

  return claims, nil
}
