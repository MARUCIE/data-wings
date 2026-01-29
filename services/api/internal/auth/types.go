package auth

import "time"

type Role string

const (
  RoleAdmin    Role = "admin"
  RoleAnalyst  Role = "analyst"
  RolePM       Role = "pm"
  RoleEngineer Role = "engineer"
)

func ParseRole(value string) (Role, bool) {
  switch Role(value) {
  case RoleAdmin, RoleAnalyst, RolePM, RoleEngineer:
    return Role(value), true
  default:
    return "", false
  }
}

type User struct {
  ID           string
  Email        string
  PasswordHash string
  Role         Role
  CreatedAt    time.Time
}

type PublicUser struct {
  ID        string    `json:"id"`
  Email     string    `json:"email"`
  Role      Role      `json:"role"`
  CreatedAt time.Time `json:"created_at"`
}

func (u *User) Public() PublicUser {
  return PublicUser{
    ID:        u.ID,
    Email:     u.Email,
    Role:      u.Role,
    CreatedAt: u.CreatedAt,
  }
}
