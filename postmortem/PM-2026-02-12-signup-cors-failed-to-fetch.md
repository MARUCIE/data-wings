# PM-2026-02-12: signup `Failed to fetch` (CORS entrypoint drift)

Status: fixed

## Symptom

- `/signup` submit shows `Failed to fetch` in browser.

## Impact

- Signup flow blocked; users cannot enter `/app`.

## Root Cause

- API `CORS_ORIGINS` missed `http://localhost:3000` while dev entrypoint still used `3000`.

## Fix

- Align CORS baseline across entrypoints (`3000/3009/3100`).
- Add config parsing trim/empty-filter + tests.

## Prevention

- Keep an entrypoint/CORS matrix in docs and enforce via regression probes.

## Triggers (Machine-Readable)

```json
{
  "status": "fixed",
  "triggers": [
    {"type": "keyword", "pattern": "Failed to fetch"},
    {"type": "regex", "pattern": "CORS_ORIGINS"},
    {"type": "path", "pattern": "docker-compose.yml"},
    {"type": "path", "pattern": "services/api/internal/config/config.go"},
    {"type": "path", "pattern": "apps/web/src/lib/api.ts"}
  ]
}
```
