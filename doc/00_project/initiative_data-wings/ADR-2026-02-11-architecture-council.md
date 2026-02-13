# ADR-2026-02-11: API 统一入口与三层边界固化

- Status: Accepted
- Date: 2026-02-11
- Related SOP: `SOP 1.4 架构圆桌` (`run_id: 1-4-52572192`, evidence run: `20260211-225928`)
- Context Source:
  - `docker-compose.yml`
  - `services/api/cmd/server/main.go`
  - `services/api/internal/handlers/analytics.go`
  - `services/api/internal/auth/middleware.go`
  - `services/ai/src/main.py`
  - `apps/web/src/lib/api.ts`

## Context

本次圆桌聚焦于「边界稳定性 + 安全暴露面 + 可运维性」三条主线。现状为 Web -> Go API -> AI Service -> ClickHouse/Redis 的链路，
其中 Web 在 Docker 场景下出现过 build-time 环境变量注入导致入口漂移（`Failed to fetch`），说明入口治理需要被提升为架构决策。

## Decision

1. 统一入口边界（Ingress Boundary）
   - 产品域对外唯一业务入口为 Go API (`/api/v1/*`)。
   - AI Service 保持内部依赖角色，不作为前端直连入口。

2. 统一契约边界（Contract Boundary）
   - Go API 必须维持 canonical envelope：
     - success: `{"status":"ok", ...}`
     - error: `{"status":"error","message":"...","error_code":"..."}`
   - `error_code` 作为稳定机器码，不允许省略。

3. 统一信任分层（Trust Layers）
   - L1: Edge/UI 层（Next.js）
   - L2: Control/API 层（Gin + Auth + RBAC）
   - L3: Execution/Data 层（AI + ClickHouse + Redis）
   - 跨层调用仅允许 L1 -> L2 -> L3 单向依赖。

4. 故障降级策略（Failure Isolation）
   - 数据库不可用时，Go API 使用 degraded handler 返回 503 + 结构化 `error_code`，避免 silent failure。
   - AI 侧错误统一由 Go API 转译为 `ANALYTICS_AI_SERVICE_*` 族错误码。

5. 可观测基线（Observability Baseline）
   - 以 API 为观测汇聚层，后续补齐 request_id/trace_id 贯穿 Web -> API -> AI。
   - 将 timeout/capacity 预算作为发布门禁的一部分（见风险清单 RISK-002、RISK-006）。

## Council Positions

| 角色 | 主结论 | 是否采纳 |
|------|--------|----------|
| 架构师 | 采用 API 统一入口 + 分层边界固化，禁止前端绕过 API 直连 AI | Accepted |
| 安全负责人 | 以 JWT 密钥治理、SQL 执行约束、服务间鉴权为优先安全控制项 | Accepted |
| SRE | 以 SLO、健康检查、超时预算一致性、链路追踪作为可靠性底线 | Accepted |

## Consequences

### Positive

- 入口一致性具备单一事实源，前后端接口变更可统一治理。
- 故障被 API 层显式化，前端错误可直接映射到稳定 `error_code`。
- 安全策略可在 API 层集中实施（Auth/RBAC/rate limit/audit）。

### Trade-offs

- API 作为单入口会引入一个额外 hop，需通过缓存和 timeout 预算控制尾延迟。
- AI Service 的能力演进必须同步 API 适配层，避免“内部协议泄漏到前端”。

## Follow-up Actions

| Action | Owner | Priority | Due |
|--------|-------|----------|-----|
| 禁止默认 `JWT_SECRET` 在非开发环境启动 | API | P0 | 2026-02-18 |
| 为 NL2SQL 执行增加 SQL 白名单/只读约束 | API + AI | P0 | 2026-02-25 |
| 增加 API->AI 服务间鉴权（internal token/mTLS） | API + AI | P1 | 2026-02-25 |
| 定义并落地 API/AI timeout budget（避免 15s/30s 失配） | SRE + API | P1 | 2026-02-18 |
| 补齐 request_id/trace_id 与核心 SLO 监控 | SRE | P1 | 2026-02-25 |
