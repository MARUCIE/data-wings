# Data Wings Development Makefile
# Usage: make <target>

.PHONY: help install dev build test lint clean docker-up docker-down seed

# Default target
help:
	@echo "Data Wings Development Commands"
	@echo ""
	@echo "Setup:"
	@echo "  make install     Install all dependencies"
	@echo "  make setup       Full setup (install + docker + seed)"
	@echo ""
	@echo "Development:"
	@echo "  make dev         Start all services in dev mode"
	@echo "  make dev-web     Start frontend only"
	@echo "  make dev-api     Start Go API only"
	@echo "  make dev-ai      Start Python AI service only"
	@echo ""
	@echo "Build:"
	@echo "  make build       Build all packages"
	@echo "  make build-sdk   Build SDK package"
	@echo "  make build-api   Build Go API binary"
	@echo ""
	@echo "Testing:"
	@echo "  make test        Run all tests"
	@echo "  make test-sdk    Run SDK tests"
	@echo "  make test-api    Run Go API tests"
	@echo "  make test-ai     Run Python AI tests"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-up   Start Docker services (ClickHouse, Redis)"
	@echo "  make docker-down Stop Docker services"
	@echo "  make docker-logs View Docker logs"
	@echo ""
	@echo "Data:"
	@echo "  make seed        Generate seed data for testing"
	@echo "  make seed-clean  Clear all test data"
	@echo ""
	@echo "Utilities:"
	@echo "  make lint        Run linters"
	@echo "  make format      Format code"
	@echo "  make clean       Clean build artifacts"

# =============================================================================
# Setup
# =============================================================================

install:
	@echo "Installing Node.js dependencies..."
	pnpm install
	@echo "Installing Python dependencies..."
	cd services/ai && pip install -e ".[dev]" || true
	@echo "Installing Go dependencies..."
	cd services/api && go mod download
	@echo "Done!"

setup: install docker-up
	@echo "Waiting for services to be ready..."
	sleep 5
	$(MAKE) seed
	@echo ""
	@echo "Setup complete! Run 'make dev' to start development."

# =============================================================================
# Development
# =============================================================================

dev:
	@echo "Starting all services..."
	pnpm dev

dev-web:
	@echo "Starting frontend..."
	pnpm dev --filter @data-wings/web

dev-api:
	@echo "Starting Go API..."
	cd services/api && go run ./cmd/server

dev-ai:
	@echo "Starting Python AI service..."
	cd services/ai && uvicorn src.main:app --reload --port 8001

# =============================================================================
# Build
# =============================================================================

build:
	@echo "Building all packages..."
	pnpm build

build-sdk:
	@echo "Building SDK..."
	pnpm build --filter @data-wings/sdk

build-api:
	@echo "Building Go API..."
	cd services/api && CGO_ENABLED=0 go build -o bin/server ./cmd/server

build-docker:
	@echo "Building Docker images..."
	docker compose build

# =============================================================================
# Testing
# =============================================================================

test:
	@echo "Running all tests..."
	pnpm test
	cd services/api && go test -v ./...
	cd services/ai && pytest -v

test-sdk:
	@echo "Running SDK tests..."
	pnpm test --filter @data-wings/sdk

test-api:
	@echo "Running Go API tests..."
	cd services/api && go test -v ./...

test-ai:
	@echo "Running Python AI tests..."
	cd services/ai && pytest -v

# =============================================================================
# Docker
# =============================================================================

docker-up:
	@echo "Starting Docker services..."
	docker compose up -d clickhouse redis
	@echo "Services started. Use 'make docker-logs' to view logs."

docker-down:
	@echo "Stopping Docker services..."
	docker compose down

docker-logs:
	docker compose logs -f

docker-clean:
	@echo "Removing Docker volumes..."
	docker compose down -v

# =============================================================================
# Data
# =============================================================================

seed:
	@echo "Generating seed data..."
	@if command -v python3 >/dev/null 2>&1; then \
		python3 scripts/seed_data.py; \
	else \
		echo "Python3 not found. Please install Python 3.11+"; \
	fi

seed-clean:
	@echo "Clearing test data..."
	@echo "TRUNCATE TABLE events; TRUNCATE TABLE users;" | \
		docker compose exec -T clickhouse clickhouse-client --database=data_wings || true

# =============================================================================
# Utilities
# =============================================================================

lint:
	@echo "Linting code..."
	pnpm lint
	cd services/api && golangci-lint run || true
	cd services/ai && ruff check src/ || true

format:
	@echo "Formatting code..."
	pnpm format
	cd services/api && gofmt -w . || true
	cd services/ai && ruff format src/ || true

clean:
	@echo "Cleaning build artifacts..."
	pnpm clean
	rm -rf services/api/bin
	rm -rf services/ai/.pytest_cache
	rm -rf services/ai/__pycache__
	find . -name "*.pyc" -delete
	find . -name "__pycache__" -type d -delete

# =============================================================================
# Release
# =============================================================================

release-patch:
	@echo "Creating patch release..."
	npm version patch
	git push && git push --tags

release-minor:
	@echo "Creating minor release..."
	npm version minor
	git push && git push --tags

release-major:
	@echo "Creating major release..."
	npm version major
	git push && git push --tags
