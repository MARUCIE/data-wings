#!/usr/bin/env bash
#
# Start the full dev stack with a best-effort fallback:
# - If Go is available: run API locally (Go) + AI locally (Python) + Web locally (Next.js)
# - If Go is NOT available: fall back to Docker Compose (web+api+ai+infra)
#
# Usage:
#   scripts/dev_all.sh
#   scripts/dev_all.sh --smoke --no-web
#   scripts/dev_all.sh --docker
#   scripts/dev_all.sh --local
#

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

SMOKE=false
NO_WEB=false
SKIP_DOCKER=false
FORCE_DOCKER=false
FORCE_LOCAL=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --smoke)
      SMOKE=true
      shift
      ;;
    --no-web)
      NO_WEB=true
      shift
      ;;
    --skip-docker)
      SKIP_DOCKER=true
      shift
      ;;
    --docker)
      FORCE_DOCKER=true
      shift
      ;;
    --local)
      FORCE_LOCAL=true
      shift
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
  esac
done

have_cmd() {
  command -v "$1" >/dev/null 2>&1
}

die() {
  echo "ERROR: $1" >&2
  exit 1
}

wait_http() {
  local url="$1"
  local name="$2"

  echo "Waiting for $name ($url) ..."
  for _ in {1..30}; do
    if curl -fsS "$url" >/dev/null 2>&1; then
      return 0
    fi
    sleep 1
  done

  echo "ERROR: timed out waiting for $name ($url)" >&2
  return 1
}

HAS_GO=false
if have_cmd go; then
  HAS_GO=true
fi

HAS_DOCKER=false
if have_cmd docker && docker info >/dev/null 2>&1; then
  HAS_DOCKER=true
fi

# Resolve pnpm runner (global pnpm preferred, fallback to npx pnpm)
PNPM_RUNNER=(pnpm)
if ! have_cmd pnpm; then
  if have_cmd npx; then
    PNPM_RUNNER=(npx pnpm)
  else
    PNPM_RUNNER=()
  fi
fi

MODE="local"
if [[ "$FORCE_DOCKER" == "true" ]]; then
  MODE="docker"
elif [[ "$FORCE_LOCAL" == "true" ]]; then
  MODE="local"
elif [[ "$HAS_GO" != "true" ]]; then
  MODE="docker"
fi

# -----------------------------------------------------------------------------
# Docker mode (fallback)
# -----------------------------------------------------------------------------

if [[ "$MODE" == "docker" ]]; then
  if [[ "$HAS_DOCKER" != "true" ]]; then
    die "Go is not available and Docker daemon is not running; cannot start dev stack. Install Go or start Docker."
  fi

  services=(clickhouse redis api ai)
  if [[ "$NO_WEB" == "false" ]]; then
    services+=(web)
  fi

  if [[ "$SMOKE" == "true" ]]; then
    docker compose up -d "${services[@]}" >/dev/null

    wait_http "http://localhost:4009/health" "API /health" || exit 1
    wait_http "http://localhost:8009/health" "AI /health" || exit 1

    echo "Smoke OK"
    exit 0
  fi

  echo "Starting Docker dev stack: ${services[*]}"
  echo "URLs:"
  if [[ "$NO_WEB" == "false" ]]; then
    echo "  Web: http://localhost:3009"
  fi
  echo "  API: http://localhost:4009"
  echo "  AI:  http://localhost:8009"
  exec docker compose up "${services[@]}"
fi

# -----------------------------------------------------------------------------
# Local mode
# -----------------------------------------------------------------------------

if [[ "$HAS_GO" != "true" ]]; then
  die "Go is required for local mode (go not found)."
fi

if [[ "${#PNPM_RUNNER[@]}" -eq 0 ]]; then
  die "pnpm is required for local web dev (pnpm not found, and npx is unavailable)."
fi

pids=()

cleanup() {
  for pid in "${pids[@]}"; do
    kill "$pid" 2>/dev/null || true
  done
}

trap cleanup EXIT INT TERM

if [[ "$SKIP_DOCKER" == "false" ]]; then
  if [[ "$HAS_DOCKER" == "true" ]]; then
    docker compose up -d clickhouse redis >/dev/null
  else
    echo "WARN: docker not available; continuing without ClickHouse/Redis." >&2
  fi
fi

echo "Starting API (Go) on :8080 ..."
(cd services/api && go run ./cmd/server) &
pids+=("$!")

echo "Starting AI (Python) on :8001 ..."
if [[ -x "services/ai/.venv/bin/uvicorn" ]]; then
  (cd services/ai && ./.venv/bin/uvicorn src.main:app --reload --port 8001) &
else
  (cd services/ai && python3 -m uvicorn src.main:app --reload --port 8001) &
fi
pids+=("$!")

echo "URLs:"
echo "  API: http://localhost:8080"
echo "  AI:  http://localhost:8001"

if [[ "$NO_WEB" == "false" ]]; then
  echo "Starting Web (Next.js) on :3000 ..."
  (cd apps/web && "${PNPM_RUNNER[@]}" dev --port 3000) &
  pids+=("$!")
fi

if [[ "$SMOKE" == "true" ]]; then
  wait_http "http://localhost:8080/health" "API /health" || exit 1
  wait_http "http://localhost:8001/health" "AI /health" || exit 1

  echo "Smoke OK"
  exit 0
fi

echo "Dev stack running. Press Ctrl+C to stop."

while true; do
  for pid in "${pids[@]}"; do
    if ! kill -0 "$pid" 2>/dev/null; then
      echo "A dev process exited (pid=$pid). Shutting down." >&2
      exit 1
    fi
  done
  sleep 2
done
