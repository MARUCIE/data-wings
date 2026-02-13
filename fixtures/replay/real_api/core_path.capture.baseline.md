# Real API Replay Report

- fixture: `fixtures/replay/real_api/core_path.fixture.json`
- base_url: `http://localhost:4009`
- generated_at: `2026-02-13T01:24:24.768516+00:00`
- success: `True`
- failures: `0`

| # | step | status | expected | ok |
|---|------|--------|----------|----|
| 1 | signup | 201 | [201] | yes |
| 2 | login | 200 | [200] | yes |
| 3 | me | 200 | [200] | yes |
| 4 | track_event | 200 | [200] | yes |
| 5 | overview | 200 | [200] | yes |
| 6 | ask | 200 | [200, 503] | yes |
| 7 | dashboards | 200 | [200] | yes |
