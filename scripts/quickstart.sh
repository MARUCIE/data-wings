#!/bin/bash
#
# Data Wings Quick Start Script
#
# Usage: ./scripts/quickstart.sh [--skip-docker] [--skip-seed]
#
# This script sets up the complete development environment:
# 1. Checks prerequisites
# 2. Installs dependencies
# 3. Starts Docker containers (ClickHouse, Redis)
# 4. Initializes database schema
# 5. Generates seed data
# 6. Starts all services
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKIP_DOCKER=false
SKIP_SEED=false

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --skip-docker)
            SKIP_DOCKER=true
            shift
            ;;
        --skip-seed)
            SKIP_SEED=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Data Wings Quick Start${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

cd "$PROJECT_ROOT"

# Check prerequisites
echo -e "${YELLOW}[1/7] Checking prerequisites...${NC}"

check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}Error: $1 is not installed${NC}"
        exit 1
    fi
    echo "  $1: OK"
}

check_command node
check_command python3
check_command docker
check_command curl

if ! docker info &> /dev/null; then
    echo -e "${RED}Error: Docker daemon is not running${NC}"
    echo "Please start Docker Desktop and try again"
    exit 1
fi
echo "  docker daemon: OK"

echo ""

# Install dependencies
echo -e "${YELLOW}[2/7] Installing dependencies...${NC}"

# Node.js dependencies
if command -v pnpm &> /dev/null; then
    pnpm install --silent 2>/dev/null || npx pnpm install --silent
else
    npx pnpm install --silent
fi
echo "  Node.js: OK"

# Python dependencies for AI service
if [ ! -d "services/ai/.venv" ]; then
    python3 -m venv services/ai/.venv
fi
source services/ai/.venv/bin/activate
pip install -q -r services/ai/requirements.txt 2>/dev/null || pip install -q httpx structlog pydantic-settings fastapi uvicorn clickhouse-connect python-dotenv
echo "  Python: OK"

# Go dependencies
if [ -f "services/api/go.mod" ]; then
    if command -v go &> /dev/null; then
        (cd services/api && go mod download)
        echo "  Go: OK"
    else
        # Best-effort fallback: use Docker Go toolchain when Go isn't installed.
        docker run --rm -v "$PROJECT_ROOT/services/api:/app" -w /app golang:1.22 go mod download
        echo "  Go: OK (via docker)"
    fi
fi

echo ""

# Start Docker containers
if [ "$SKIP_DOCKER" = false ]; then
    echo -e "${YELLOW}[3/7] Starting Docker containers...${NC}"
    docker compose up -d clickhouse redis
    echo "  Waiting for services to be ready..."
    sleep 5

    # Check ClickHouse is ready
    until curl -s http://localhost:8123/ping | grep -q "Ok"; do
        echo "  Waiting for ClickHouse..."
        sleep 2
    done
    echo "  ClickHouse: OK"

    # Check Redis is ready
    until docker compose exec -T redis redis-cli ping 2>/dev/null | grep -q "PONG"; do
        echo "  Waiting for Redis..."
        sleep 2
    done
    echo "  Redis: OK"
else
    echo -e "${YELLOW}[3/7] Skipping Docker (--skip-docker)${NC}"
fi

echo ""

# Initialize database
echo -e "${YELLOW}[4/7] Initializing database schema...${NC}"

# Create database
curl -s "http://localhost:8123/" --data "CREATE DATABASE IF NOT EXISTS data_wings" > /dev/null

# Create tables
curl -s "http://localhost:8123/?database=data_wings" --data "
CREATE TABLE IF NOT EXISTS events (
    event_id UUID DEFAULT generateUUIDv4(),
    event_name String,
    event_time DateTime64(3),
    event_date Date DEFAULT toDate(event_time),
    user_id String,
    anonymous_id String,
    properties String,
    page_url String,
    page_title String,
    referrer String,
    device_type String,
    browser String,
    os String,
    screen_width UInt16,
    screen_height UInt16,
    country String,
    city String,
    utm_source String,
    utm_medium String,
    utm_campaign String,
    received_at DateTime64(3),
    processed_at DateTime DEFAULT now()
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(event_date)
ORDER BY (event_date, user_id, event_time)
TTL event_date + INTERVAL 2 YEAR
" > /dev/null

curl -s "http://localhost:8123/?database=data_wings" --data "
CREATE TABLE IF NOT EXISTS users (
    user_id String,
    email String,
    name String,
    traits String,
    created_at DateTime,
    first_seen_at DateTime,
    last_seen_at DateTime,
    total_events UInt64,
    total_sessions UInt32,
    lifetime_value Decimal64(2),
    segment String,
    updated_at DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(updated_at)
ORDER BY user_id
" > /dev/null

echo "  Schema: OK"
echo ""

# Generate seed data
if [ "$SKIP_SEED" = false ]; then
    echo -e "${YELLOW}[5/7] Generating seed data...${NC}"
    source services/ai/.venv/bin/activate
    pip install -q clickhouse-connect 2>/dev/null
    python scripts/seed_data.py --days 7 --users 50 --events-per-day 200 2>/dev/null
    echo "  Seed data: OK"
else
    echo -e "${YELLOW}[5/7] Skipping seed data (--skip-seed)${NC}"
fi

echo ""

# Copy .env if not exists
echo -e "${YELLOW}[6/7] Setting up environment...${NC}"
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "  Created .env from .env.example"
        echo -e "${YELLOW}  NOTE: Edit .env to add your API keys${NC}"
    fi
fi

# Copy .env to AI service
if [ -f ".env" ]; then
    cp .env services/ai/.env
fi
echo "  Environment: OK"
echo ""

# Print summary
echo -e "${YELLOW}[7/7] Setup complete!${NC}"
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Data Wings is ready!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Services:"
echo "  ClickHouse: http://localhost:8123"
echo "  Redis:      redis://localhost:6309"
echo ""
echo "To start development servers:"
echo "  make dev"
echo ""
echo "Or start individually:"
echo "  # AI Service (NL2SQL)"
echo "  cd services/ai && source .venv/bin/activate && uvicorn src.main:app --port 8001"
echo ""
echo "  # Go API"
echo "  cd services/api && go run ./cmd/server"
echo ""
echo "  # Web App"
echo "  cd apps/web && pnpm dev"
echo ""
echo "Quick test NL2SQL:"
echo "  curl -X POST http://localhost:8001/api/v1/ask \\"
echo "    -H 'Content-Type: application/json' \\"
echo "    -d '{\"question\": \"How many events yesterday?\"}'"
echo ""
