package config

import (
	"reflect"
	"testing"
)

func TestLoad_DefaultCORSOrigins(t *testing.T) {
	t.Setenv("CORS_ORIGINS", "")

	cfg := Load()
	want := []string{
		"http://localhost:3000",
		"http://localhost:3009",
		"http://localhost:3100",
	}

	if !reflect.DeepEqual(cfg.CORSOrigins, want) {
		t.Fatalf("unexpected default CORS origins: got %v want %v", cfg.CORSOrigins, want)
	}
}

func TestLoad_CORSOriginsFromEnv_TrimsSpaces(t *testing.T) {
	t.Setenv("CORS_ORIGINS", " http://localhost:3000, http://localhost:3009 ,http://localhost:3100 ")

	cfg := Load()
	want := []string{
		"http://localhost:3000",
		"http://localhost:3009",
		"http://localhost:3100",
	}

	if !reflect.DeepEqual(cfg.CORSOrigins, want) {
		t.Fatalf("unexpected CORS origins from env: got %v want %v", cfg.CORSOrigins, want)
	}
}
