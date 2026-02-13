#!/usr/bin/env bash
#
# Run a task in an isolated sandbox with strict resource and access limits.
#
# Usage:
#   scripts/sandbox_task.sh [--backend local|cloud] [--dry-run] <task> -- "<command>"
#
# Examples:
#   scripts/sandbox_task.sh docs-audit -- "ls -la /workspace/doc"
#   scripts/sandbox_task.sh --dry-run go-unit -- "cd /workspace/services/api && go test ./..."

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND="${DW_SANDBOX_BACKEND:-local}"
DRY_RUN=false

usage() {
  cat <<'EOF'
Usage:
  scripts/sandbox_task.sh [--backend local|cloud] [--dry-run] <task> -- "<command>"

Tasks:
  docs-audit         Documentation and policy checks (offline)
  web-lint           Frontend lint/build checks (offline)
  go-unit            API unit tests (offline)
  ai-unit            AI service unit tests (offline)
  integration-smoke  Integration smoke checks (network allowed)

Env:
  DW_SANDBOX_BACKEND=local|cloud
  DW_CLOUD_SANDBOX_CMD=<cloud sandbox CLI command>   (required when backend=cloud)
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --backend)
      BACKEND="${2:-}"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      break
      ;;
  esac
done

if [[ $# -lt 3 ]]; then
  usage
  exit 1
fi

TASK="$1"
shift

if [[ "${1:-}" != "--" ]]; then
  echo "error: missing '--' before command"
  usage
  exit 1
fi
shift

if [[ $# -eq 0 ]]; then
  echo "error: missing command"
  usage
  exit 1
fi

CMD="$*"

IMAGE="ubuntu:24.04"
NETWORK_MODE="none"
CPU_LIMIT="1.0"
MEM_LIMIT="1g"
PIDS_LIMIT="256"
TIMEOUT_SECONDS="300"
RW_PATHS=(".sandbox-tmp" "outputs")

case "$TASK" in
  docs-audit)
    IMAGE="node:20-bookworm"
    NETWORK_MODE="none"
    CPU_LIMIT="1.0"
    MEM_LIMIT="1g"
    PIDS_LIMIT="128"
    TIMEOUT_SECONDS="300"
    RW_PATHS=(".sandbox-tmp" "outputs" "doc")
    ;;
  web-lint)
    IMAGE="node:20-bookworm"
    NETWORK_MODE="none"
    CPU_LIMIT="2.0"
    MEM_LIMIT="2g"
    PIDS_LIMIT="256"
    TIMEOUT_SECONDS="900"
    RW_PATHS=(".sandbox-tmp" "outputs" "apps/web")
    ;;
  go-unit)
    IMAGE="golang:1.22-bookworm"
    NETWORK_MODE="none"
    CPU_LIMIT="2.0"
    MEM_LIMIT="2g"
    PIDS_LIMIT="256"
    TIMEOUT_SECONDS="900"
    RW_PATHS=(".sandbox-tmp" "outputs" "services/api")
    ;;
  ai-unit)
    IMAGE="python:3.11-bookworm"
    NETWORK_MODE="none"
    CPU_LIMIT="2.0"
    MEM_LIMIT="2g"
    PIDS_LIMIT="256"
    TIMEOUT_SECONDS="900"
    RW_PATHS=(".sandbox-tmp" "outputs" "services/ai")
    ;;
  integration-smoke)
    IMAGE="node:20-bookworm"
    NETWORK_MODE="bridge"
    CPU_LIMIT="4.0"
    MEM_LIMIT="4g"
    PIDS_LIMIT="512"
    TIMEOUT_SECONDS="1200"
    RW_PATHS=(".sandbox-tmp" "outputs" "doc" "apps/web" "services/api" "services/ai")
    ;;
  *)
    echo "error: unknown task '$TASK'"
    usage
    exit 1
    ;;
esac

mkdir -p "${PROJECT_ROOT}/.sandbox-tmp" "${PROJECT_ROOT}/outputs"
for rel in "${RW_PATHS[@]}"; do
  mkdir -p "${PROJECT_ROOT}/${rel}"
done

echo "sandbox_task=$TASK"
echo "sandbox_backend=$BACKEND"
echo "sandbox_image=$IMAGE"
echo "sandbox_network=$NETWORK_MODE"
echo "sandbox_cpu=$CPU_LIMIT"
echo "sandbox_memory=$MEM_LIMIT"
echo "sandbox_pids=$PIDS_LIMIT"
echo "sandbox_timeout_seconds=$TIMEOUT_SECONDS"
echo "sandbox_rw_paths=${RW_PATHS[*]}"

if [[ "$BACKEND" == "cloud" ]]; then
  if [[ -z "${DW_CLOUD_SANDBOX_CMD:-}" ]]; then
    echo "error: backend=cloud requires DW_CLOUD_SANDBOX_CMD"
    exit 2
  fi
  CLOUD_CMD="${DW_CLOUD_SANDBOX_CMD} --task ${TASK} --network ${NETWORK_MODE} --cpu ${CPU_LIMIT} --memory ${MEM_LIMIT} --timeout ${TIMEOUT_SECONDS} -- ${CMD}"
  echo "cloud_command=${CLOUD_CMD}"
  if [[ "$DRY_RUN" == "true" ]]; then
    exit 0
  fi
  eval "${CLOUD_CMD}"
  exit $?
fi

DOCKER_ARGS=(
  run --rm --init
  --cpus "$CPU_LIMIT"
  --memory "$MEM_LIMIT"
  --pids-limit "$PIDS_LIMIT"
  --security-opt "no-new-privileges:true"
  --cap-drop ALL
  --user "$(id -u):$(id -g)"
  --workdir /workspace
  --read-only
  --tmpfs /tmp:rw,noexec,nosuid,size=256m
  --tmpfs /run:rw,noexec,nosuid,size=16m
)

if [[ "$NETWORK_MODE" == "none" ]]; then
  DOCKER_ARGS+=(--network none)
fi

DOCKER_ARGS+=(-v "${PROJECT_ROOT}:/workspace:ro")

for rel in "${RW_PATHS[@]}"; do
  DOCKER_ARGS+=(-v "${PROJECT_ROOT}/${rel}:/workspace/${rel}:rw")
done

echo "docker_command=docker ${DOCKER_ARGS[*]} ${IMAGE} sh -lc \"${CMD}\""

if [[ "$DRY_RUN" == "true" ]]; then
  exit 0
fi

TIMEOUT_BIN=""
if command -v timeout >/dev/null 2>&1; then
  TIMEOUT_BIN="timeout"
elif command -v gtimeout >/dev/null 2>&1; then
  TIMEOUT_BIN="gtimeout"
fi

if [[ -n "$TIMEOUT_BIN" ]]; then
  "$TIMEOUT_BIN" --signal=TERM "${TIMEOUT_SECONDS}" docker "${DOCKER_ARGS[@]}" "${IMAGE}" sh -lc "${CMD}"
else
  echo "warning: timeout utility not found, running without hard timeout"
  docker "${DOCKER_ARGS[@]}" "${IMAGE}" sh -lc "${CMD}"
fi
