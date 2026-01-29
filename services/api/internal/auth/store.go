package auth

import (
  "errors"
  "strings"
  "sync"
  "time"

  "github.com/google/uuid"
  "golang.org/x/crypto/bcrypt"
)

var (
  ErrUserExists      = errors.New("user already exists")
  ErrUserNotFound    = errors.New("user not found")
  ErrInvalidPassword = errors.New("invalid password")
)

type Store struct {
  mu         sync.RWMutex
  users      map[string]*User
  emailIndex map[string]string
}

func NewStore() *Store {
  store := &Store{
    users:      make(map[string]*User),
    emailIndex: make(map[string]string),
  }

	_, _ = store.CreateUser("admin@datawings.local", "datawings123", RoleAdmin)
	_, _ = store.CreateUser("analyst@datawings.local", "datawings123", RoleAnalyst)
	_, _ = store.CreateUser("pm@datawings.local", "datawings123", RolePM)
	_, _ = store.CreateUser("engineer@datawings.local", "datawings123", RoleEngineer)

  return store
}

func (s *Store) CreateUser(email, password string, role Role) (*User, error) {
  s.mu.Lock()
  defer s.mu.Unlock()

  normalized := strings.ToLower(strings.TrimSpace(email))
  if normalized == "" || password == "" {
    return nil, errors.New("email and password are required")
  }

  if _, ok := s.emailIndex[normalized]; ok {
    return nil, ErrUserExists
  }

  hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
  if err != nil {
    return nil, err
  }

  user := &User{
    ID:           uuid.NewString(),
    Email:        normalized,
    PasswordHash: string(hash),
    Role:         role,
    CreatedAt:    time.Now(),
  }

  s.users[user.ID] = user
  s.emailIndex[normalized] = user.ID

  return user, nil
}

func (s *Store) Authenticate(email, password string) (*User, error) {
  s.mu.RLock()
  defer s.mu.RUnlock()

  normalized := strings.ToLower(strings.TrimSpace(email))
  id, ok := s.emailIndex[normalized]
  if !ok {
    return nil, ErrUserNotFound
  }

  user := s.users[id]
  if user == nil {
    return nil, ErrUserNotFound
  }

  if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password)); err != nil {
    return nil, ErrInvalidPassword
  }

  return user, nil
}

func (s *Store) GetUser(id string) (*User, error) {
  s.mu.RLock()
  defer s.mu.RUnlock()

  user, ok := s.users[id]
  if !ok {
    return nil, ErrUserNotFound
  }
  return user, nil
}

func (s *Store) ListUsers() []PublicUser {
  s.mu.RLock()
  defer s.mu.RUnlock()

  result := make([]PublicUser, 0, len(s.users))
  for _, user := range s.users {
    result = append(result, user.Public())
  }
  return result
}

func (s *Store) DeleteUser(id string) error {
  s.mu.Lock()
  defer s.mu.Unlock()

  user, ok := s.users[id]
  if !ok {
    return ErrUserNotFound
  }

  delete(s.users, id)
  delete(s.emailIndex, user.Email)
  return nil
}
