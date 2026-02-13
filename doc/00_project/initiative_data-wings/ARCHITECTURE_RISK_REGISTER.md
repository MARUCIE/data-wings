# Architecture Risk Register (2026-02-12)

- Scope: `SOP 1.4 架构圆桌`
- Evidence Run: `outputs/sop-architecture-council/1-4-cdf0f11e/`
- Last Updated: 2026-02-12

## 风险清单

| ID | 领域 | 风险描述 | 触发器（可检测） | 影响 | 可能性 | 等级 | 缓解策略 | 证据/监控 | Owner | 状态 |
|----|------|----------|------------------|------|--------|------|----------|-----------|-------|------|
| RISK-001 | Auth | `JWT_SECRET` 使用默认值导致 token 可被伪造 | 日志包含 `JWT_SECRET=data-wings-dev-secret` 或配置缺省 | 高 | 中 | High | 非开发环境强制拒绝默认 secret；启动自检 | 启动日志 + 配置检查脚本 | API | Open |
| RISK-002 | Reliability | API 写超时 15s 与 AI 请求超时 30s 失配，导致长请求被提前断开 | 网关/应用日志出现 `context deadline exceeded` + AI 请求仍在执行 | 高 | 中 | High | 统一 timeout budget，API->AI timeout 小于 server write timeout | API latency/error dashboard | SRE+API | Open |
| RISK-003 | Data Security | NL2SQL 生成 SQL 缺乏白名单约束，存在越权/重查询风险 | SQL 包含非只读语句或超大扫描（`SELECT *` 无限定） | 高 | 中 | High | 只读用户 + SQL AST 校验 + query cost 限流 | Query 审计日志 | API+AI | Open |
| RISK-004 | Network | CORS/入口域名漂移导致跨域失败或误暴露 | Web 控制台 `Failed to fetch`、响应头 origin 不匹配 | 中 | 高 | High | 维护环境级入口矩阵，CI 校验 `NEXT_PUBLIC_*` 与 compose 一致性 | E2E 冒烟 + 配置 diff | Web+SRE | Mitigating |
| RISK-005 | Service Mesh | API->AI 当前无服务间鉴权，内部网络被侧向访问时可滥用 | AI 服务收到未知来源请求 | 高 | 低 | Medium | internal token 或 mTLS；网络策略限制仅 API 可访问 AI | AI access log + network policy | API+SRE | Open |
| RISK-006 | Observability | 缺少统一 request_id/trace_id，跨服务故障定位慢 | 无法在 Web/API/AI 日志中关联同一请求 | 中 | 中 | Medium | 注入 request_id，接入 OpenTelemetry trace | Tracing 覆盖率指标 | SRE | Open |
| RISK-007 | Capacity | ClickHouse 与 API 缺少容量预算与压测基线，高峰退化不可预测 | P95/P99 突增且无已定义扩容阈值 | 中 | 中 | Medium | 建立容量模型（QPS、并发、CPU/内存阈值）并做基线压测 | 容量报告 + 告警策略 | SRE | Open |
| RISK-008 | Sandbox Drift | 关键任务未走沙盒执行，策略名存实亡 | CI/本地日志未出现 `scripts/sandbox_task.sh` 调用记录 | 中 | 中 | Medium | 将关键任务入口收敛到 sandbox wrapper；发布前检查执行证据 | SOP evidence + CI logs | SRE | Open |
| RISK-009 | Sandbox Escape | 沙盒写路径过宽或网络放行过度导致越权 | 配置出现 `network=bridge` 用于非集成任务，或 RW 白名单包含项目根路径 | 高 | 低 | Medium | 策略矩阵白名单化，变更需评审；定期扫描策略漂移 | Policy diff + review checklist | Security | Open |
| RISK-010 | Validation | 仅使用 mock 完成验收导致上线后真实 API 回归 | 发布证据缺少真实请求/响应记录 | 高 | 中 | High | 强制真实 API 回放门禁；fixture 回归必须落盘请求/响应 | Replay report + capture json | QA+SRE | Open |
| RISK-011 | Auth Security | `signup/login` 缺少速率限制，存在暴力尝试与资源滥用风险 | 日志出现同 IP 高频 `401/400`，单位时间请求数突增 | 高 | 中 | High | 增加 auth rate-limit（IP/账号双维），并接入告警阈值 | Auth error dashboard + WAF logs | Security+API | Open |
| RISK-012 | Service Auth | API->AI 服务间鉴权强度不足，存在内部滥用面 | AI access log 出现非 API 来源调用 | 高 | 低 | Medium | 补 internal token 或 mTLS，限制来源网络策略 | AI access log + policy audit | Security+SRE | Open |
| RISK-013 | Evidence Retention | 证据目录长期累积导致存储膨胀与敏感日志暴露面增加 | `outputs/` 大小持续超阈值，旧 run 无生命周期清理 | 中 | 中 | Medium | 建立 retention 策略（分级保留+脱敏+归档） | Storage report + retention job log | SRE+QA | Open |

## 本轮优先级

- P0: RISK-001, RISK-003, RISK-011
- P1: RISK-002, RISK-005, RISK-006, RISK-010, RISK-012
- P2: RISK-004, RISK-007, RISK-008, RISK-009, RISK-013

## 关联文档

- `doc/00_project/initiative_data-wings/ADR-2026-02-11-architecture-council.md`
- `doc/00_project/initiative_data-wings/ADR-2026-02-12-architecture-council-refresh.md`
- `doc/00_project/initiative_data-wings/SYSTEM_ARCHITECTURE.md` (Section 22)
