package auth

import (
	"testing"
	"time"
)

func TestStoreAuthenticate(t *testing.T) {
	store := NewStore()
	user, err := store.CreateUser("tester@datawings.local", "pass1234", RoleAnalyst)
	if err != nil {
		t.Fatalf("create user: %v", err)
	}

	if _, err := store.Authenticate(user.Email, "pass1234"); err != nil {
		t.Fatalf("authenticate: %v", err)
	}

	if _, err := store.Authenticate(user.Email, "wrong"); err == nil {
		t.Fatalf("expected invalid password")
	}
}

func TestJWTManager(t *testing.T) {
	store := NewStore()
	user, err := store.CreateUser("jwt@datawings.local", "pass1234", RolePM)
	if err != nil {
		t.Fatalf("create user: %v", err)
	}

	manager := NewJWTManager("secret", "data-wings", time.Minute)
	token, err := manager.Generate(user)
	if err != nil {
		t.Fatalf("generate token: %v", err)
	}

	claims, err := manager.Verify(token)
	if err != nil {
		t.Fatalf("verify token: %v", err)
	}

	if claims.Role != RolePM {
		t.Fatalf("expected role %s, got %s", RolePM, claims.Role)
	}
}
