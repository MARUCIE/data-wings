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
	ClickHouseHost     string
	ClickHousePort     int
	ClickHouseUser     string
	ClickHousePassword string
	ClickHouseDatabase string

	// Redis configuration
	RedisURL string

	// AI Service configuration
	AIServiceURL string

	// CORS configuration
	CORSOrigins []string

	// Debug mode
	Debug bool
}

// Load loads configuration from environment variables.
func Load() *Config {
	return &Config{
		Port: getEnv("PORT", "8080"),

		ClickHouseHost:     getEnv("CLICKHOUSE_HOST", "localhost"),
		ClickHousePort:     getEnvInt("CLICKHOUSE_PORT", 9000),
		ClickHouseUser:     getEnv("CLICKHOUSE_USER", "default"),
		ClickHousePassword: getEnv("CLICKHOUSE_PASSWORD", ""),
		ClickHouseDatabase: getEnv("CLICKHOUSE_DATABASE", "data_wings"),

		RedisURL: getEnv("REDIS_URL", "redis://localhost:6379/0"),

		AIServiceURL: getEnv("AI_SERVICE_URL", "http://localhost:8001"),

		CORSOrigins: getEnvSlice("CORS_ORIGINS", []string{"http://localhost:3000"}),

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
		return strings.Split(value, ",")
	}
	return defaultValue
}
