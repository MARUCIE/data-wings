# PM-2026-02-12: web container unhealthy (localhost resolves to IPv6)

Status: fixed

## Symptom

- `docker compose ps` shows web container `unhealthy` while page still loads on host.

## Impact

- Orchestrator health status becomes unreliable; automation may restart/roll back unnecessarily.

## Root Cause

- `HEALTHCHECK` used `http://localhost:3000/...`; inside container `localhost` resolved to `::1` but Next listened on IPv4.

## Fix

- Use `http://127.0.0.1:3000/api/health` in `apps/web/Dockerfile`.

## Prevention

- Never use `localhost` in container healthcheck; prefer explicit IPv4 loopback.

## Triggers (Machine-Readable)

```json
{
  "status": "fixed",
  "triggers": [
    {"type": "keyword", "pattern": "unhealthy"},
    {"type": "keyword", "pattern": "HEALTHCHECK"},
    {"type": "keyword", "pattern": "127.0.0.1:3000"},
    {"type": "path", "pattern": "apps/web/Dockerfile"}
  ]
}
```
