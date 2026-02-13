# PM-2026-02-11: ClickHouse cold start -> API permanent degraded (503)

Status: fixed

## Symptom

- After stack boot, `/api/v1/track` and `/api/v1/overview` keep returning `503`.

## Impact

- Analytics ingestion and overview metrics unavailable.

## Root Cause

- API attempted ClickHouse connect once at startup and entered degraded mode permanently.

## Fix

- Add bounded retry on startup (`CLICKHOUSE_CONNECT_MAX_ATTEMPTS`, `CLICKHOUSE_CONNECT_RETRY_DELAY_SECOND`).

## Prevention

- Contract tests require `track/overview=200` under docker stack.

## Triggers (Machine-Readable)

```json
{
  "status": "fixed",
  "triggers": [
    {"type": "keyword", "pattern": "DATABASE_UNAVAILABLE"},
    {"type": "keyword", "pattern": "CLICKHOUSE_CONNECT_MAX_ATTEMPTS"},
    {"type": "path", "pattern": "services/api/cmd/server/main.go"},
    {"type": "path", "pattern": "services/api/internal/config/config.go"}
  ]
}
```
