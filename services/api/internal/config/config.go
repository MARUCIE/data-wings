// Package config provides configuration management for the API service.
package config

import (
	"os"
	"strconv"
	"strings"
)

// Config holds all configuration for the API service.
type Config struct {
	// Server configuration
	Port string

	// ClickHouse configuration
	ClickHouseHost                    string
	ClickHousePort                    int
	ClickHouseUser                    string
	ClickHousePassword                string
	ClickHouseDatabase                string
	ClickHouseConnectMaxAttempts      int
	ClickHouseConnectRetryDelaySecond int

	// Redis configuration
	RedisURL string

	// AI Service configuration
	AIServiceURL string

	// CORS configuration
	CORSOrigins []string

	// Auth configuration
	JWTSecret     string
	JWTIssuer     string
	JWTTTLMinutes int

	// Debug mode
	Debug bool
}

// Load loads configuration from environment variables.
func Load() *Config {
	return &Config{
		Port: getEnv("PORT", "8080"),

		ClickHouseHost:                    getEnv("CLICKHOUSE_HOST", "localhost"),
		ClickHousePort:                    getEnvInt("CLICKHOUSE_PORT", 9000),
		ClickHouseUser:                    getEnv("CLICKHOUSE_USER", "default"),
		ClickHousePassword:                getEnv("CLICKHOUSE_PASSWORD", ""),
		ClickHouseDatabase:                getEnv("CLICKHOUSE_DATABASE", "data_wings"),
		ClickHouseConnectMaxAttempts:      getEnvInt("CLICKHOUSE_CONNECT_MAX_ATTEMPTS", 15),
		ClickHouseConnectRetryDelaySecond: getEnvInt("CLICKHOUSE_CONNECT_RETRY_DELAY_SECOND", 2),

		RedisURL: getEnv("REDIS_URL", "redis://localhost:6309/0"),

		AIServiceURL: getEnv("AI_SERVICE_URL", "http://localhost:8001"),

		CORSOrigins: getEnvSlice("CORS_ORIGINS", []string{
			"http://localhost:3000",
			"http://localhost:3009",
			"http://localhost:3100",
		}),

		JWTSecret:     getEnv("JWT_SECRET", "data-wings-dev-secret"),
		JWTIssuer:     getEnv("JWT_ISSUER", "data-wings"),
		JWTTTLMinutes: getEnvInt("JWT_TTL_MINUTES", 60),

		Debug: getEnvBool("DEBUG", false),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return defaultValue
}

func getEnvBool(key string, defaultValue bool) bool {
	if value := os.Getenv(key); value != "" {
		return strings.ToLower(value) == "true" || value == "1"
	}
	return defaultValue
}

func getEnvSlice(key string, defaultValue []string) []string {
	if value := os.Getenv(key); value != "" {
		parts := strings.Split(value, ",")
		result := make([]string, 0, len(parts))
		for _, part := range parts {
			trimmed := strings.TrimSpace(part)
			if trimmed != "" {
				result = append(result, trimmed)
			}
		}
		if len(result) > 0 {
			return result
		}
	}
	return defaultValue
}
