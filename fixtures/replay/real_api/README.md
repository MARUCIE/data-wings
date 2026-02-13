# Real API Fixtures

此目录用于存放“基于真实 API 执行结果”的回放与回归基线：

- `core_path.fixture.json`: 可复现回放模板（用于日常回归）
- `core_path.capture.baseline.json`: 最近一次真实 API 采集基线（用于比对）

## 回放命令

```bash
python3 scripts/replay_real_api_fixture.py \
  --fixture fixtures/replay/real_api/core_path.fixture.json \
  --base-url http://localhost:4009 \
  --capture-output outputs/replay/latest.json \
  --report-output outputs/replay/latest.md
```

## 验收原则

- 最终验收必须基于真实 API。
- 禁止使用 mock 响应替代核心路径验收。
