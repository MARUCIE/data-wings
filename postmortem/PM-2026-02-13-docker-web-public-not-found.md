# PM-2026-02-13: master CI docker web build fails (/app/public not found)

Status: fixed

## Symptom

- GitHub Actions CI on `master` fails in `Build Docker Images (web)` with:
  - `"/app/public": not found`

## Impact

- `master` CI red; blocks release/rollback gates that rely on Docker image builds.

## Root Cause

- `apps/web/public/` was empty and therefore not tracked by git.
- `apps/web/Dockerfile` runtime stage always copies `COPY --from=builder /app/public ./public`.
- In CI checkout, `public/` directory did not exist in the builder stage, so the runtime copy step failed.

## Fix

- Add `apps/web/public/.gitkeep` so `public/` exists in CI and Docker build contexts.

## Prevention

- Keep `apps/web/public/.gitkeep` (or a real public asset) to ensure the directory is always present.
- If Dockerfile is refactored, ensure runtime-stage `COPY` does not assume an optional directory exists.

## Triggers (Machine-Readable)

```json
{
  "status": "fixed",
  "triggers": [
    {"type": "keyword", "pattern": "\\\"/app/public\\\": not found"},
    {"type": "keyword", "pattern": "failed to calculate checksum"},
    {"type": "path", "pattern": "apps/web/Dockerfile"},
    {"type": "path", "pattern": "apps/web/public/.gitkeep"}
  ]
}
```
