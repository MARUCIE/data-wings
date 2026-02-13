# Data Wings - 滚动需求台账 & 规划提示词库

> 单一事实源 | 滚动更新 | 结构化表达

---

## 一、需求台账（Requirements Ledger）

### REQ-001: 竞品调研与 PRD
| 字段 | 值 |
|------|-----|
| 需求描述 | 完成国内外数据分析平台竞品调研，产出 PRD |
| 提出日期 | 2026-01-28 |
| 状态 | [x] 完成 |
| 交付物 | notes.md, PRD.md |
| 验收标准 | 覆盖 11 个竞品，产出完整 PRD |

### REQ-002: UX Map 与系统架构
| 字段 | 值 |
|------|-----|
| 需求描述 | 设计用户体验地图、信息架构、系统架构 |
| 提出日期 | 2026-01-28 |
| 状态 | [x] 完成 |
| 交付物 | USER_EXPERIENCE_MAP.md, SYSTEM_ARCHITECTURE.md |
| 验收标准 | 4 个 Persona，40+ 页面，Mermaid 架构图 |

### REQ-003: NL2SQL 技术验证
| 字段 | 值 |
|------|-----|
| 需求描述 | 验证自然语言转 SQL 的技术可行性 |
| 提出日期 | 2026-01-28 |
| 状态 | [x] 完成 |
| 交付物 | spikes/nl2sql/ |
| 验收标准 | 多 LLM Provider 支持，Mock 模式通过 |

### REQ-004: MVP 开发
| 字段 | 值 |
|------|-----|
| 需求描述 | 完成最小可行产品开发 |
| 提出日期 | 2026-01-28 |
| 状态 | [x] 完成 |
| 交付物 | apps/web/, services/api/, services/ai/, packages/sdk/ |
| 验收标准 | E2E 验证通过，真实 LLM API 调用成功 |

### REQ-005: 真实 LLM API 集成
| 字段 | 值 |
|------|-----|
| 需求描述 | 打通真实模型 API 调用（Gemini/Poe） |
| 提出日期 | 2026-01-28 |
| 状态 | [x] 完成 |
| 交付物 | docker-compose.yml, .env.example |
| 验收标准 | NL2SQL 返回正确 SQL，置信度 > 0.9 |

### REQ-006: 多类型客户真实流程测试（Real-Flow SOP）
| 字段 | 值 |
|------|-----|
| 需求描述 | 定义 3+ Persona，覆盖真实流程与异常路径，并留存证据 |
| 提出日期 | 2026-01-28 |
| 状态 | [x] 完成（局部覆盖） |
| 交付物 | REAL_FLOW_TEST_SOP.md, REAL_FLOW_TEST_EVIDENCE.md |
| 验收标准 | 关键路径成功率 ≥ 95%，异常路径提示准确，证据可审计 |

### REQ-007: 前端 UI/UX 优化（SOP）
| 字段 | 值 |
|------|-----|
| 需求描述 | 依据 ui-skills 与 web-interface-guidelines 优化 UI/UX |
| 提出日期 | 2026-01-28 |
| 状态 | [x] 完成 |
| 交付物 | PRD.md, USER_EXPERIENCE_MAP.md, 证据截图 |
| 验收标准 | 单一主按钮、层级清晰、验证证据齐全 |

### REQ-008: 全量交付续航（Audit/Auth/Persona/Perf）
| 字段 | 值 |
|------|-----|
| 需求描述 | 修复 audit FAIL/SKIP，补齐登录/权限/RBAC，并扩展 Persona 真实流程复测与前端性能/视觉证据 |
| 提出日期 | 2026-01-28 |
| 状态 | [x] 完成 |
| 交付物 | PRD.md, SYSTEM_ARCHITECTURE.md, USER_EXPERIENCE_MAP.md, PLATFORM_OPTIMIZATION_PLAN.md, REAL_FLOW_TEST_EVIDENCE.md |
| 验收标准 | audit 通过，/login+/signup+/app/* 路由可用，Persona 复测完成并留证据，network/console/performance/visual 证据齐全 |

### REQ-009: 功能闭环完整实现检查（SOP 3.7）
| 字段 | 值 |
|------|-----|
| 需求描述 | 执行入口闭环/系统闭环/契约闭环/验证闭环，修复前后端链路阻断并形成可审计证据 |
| 提出日期 | 2026-02-11 |
| 状态 | [x] 完成 |
| 交付物 | `outputs/sop-full-loop-check/3-7-f1b07249/`、`SYSTEM_ARCHITECTURE.md`、`task_plan.md`、`notes.md`、`deliverable.md` |
| 验收标准 | `track/overview` 核心路径 200；ClickHouse 落库可验证；契约测试通过；`ai check` 通过 |

### REQ-010: 世界 SOTA 产品 SOP 调研与迁移落地（SOP 1.10）
| 字段 | 值 |
|------|-----|
| 需求描述 | 调研近 12 个月全球代表性产品/平台 SOP，提炼流程/角色/门禁/度量并迁移到项目文档与优化计划 |
| 提出日期 | 2026-02-11 |
| 状态 | [x] 完成 |
| 交付物 | `outputs/sop-world-sota-research/1-10-a0ed78c6/reports/sota_sop_benchmark_report.md`、`PRD.md`、`USER_EXPERIENCE_MAP.md`、`PLATFORM_OPTIMIZATION_PLAN.md` |
| 验收标准 | 5-10 个样本、矩阵对比、差异分析、迁移清单、风险清单全部落盘 |

### REQ-011: 一键全量交付闭环验收（SOP 1.1）
| 字段 | 值 |
|------|-----|
| 需求描述 | 按 plan-first 执行长任务闭环，完成 Round 1/Round 2 双轮验收与 Task Closeout 沉淀 |
| 提出日期 | 2026-02-12 |
| 状态 | [x] 完成 |
| 交付物 | `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/`、`task_plan.md`、`notes.md`、`deliverable.md`、PDCA 四文档 |
| 验收标准 | Step 1-8 全部落盘；`ai check` 通过；UX Map 人工模拟通过；前后端契约与入口一致性通过 |

### REQ-012: 前端验证与性能检查闭环（SOP 3.1）
| 字段 | 值 |
|------|-----|
| 需求描述 | 执行 frontend network/console/performance/visual regression 与响应式全量测试，失败项修复并复测 |
| 提出日期 | 2026-02-12 |
| 状态 | [x] 完成 |
| 交付物 | `outputs/sop-frontend-validation/3-1-535549a1/`、`task_plan.md`、`notes.md`、`deliverable.md` |
| 验收标准 | 核心路由可达；错误计数为 0；性能预算通过；`ai check` 通过；修复项复测通过 |

### REQ-013: Watchdog 功能闭环复核（SOP 3.7）
| 字段 | 值 |
|------|-----|
| 需求描述 | 以 Watchdog 模式复核入口/系统/契约/验证闭环，确认 3.1 结果在全链路下持续成立 |
| 提出日期 | 2026-02-12 |
| 状态 | [x] 完成 |
| 交付物 | `outputs/sop-full-loop-check/3-7-703f3d77/`、`task_plan.md`、`notes.md`、`deliverable.md` |
| 验收标准 | 入口闭环通过；真实 API 回放 7/7；契约探针通过；`ai check` 通过 |

### REQ-014: 项目级全链路回归验收（SOP 4.1）
| 字段 | 值 |
|------|-----|
| 需求描述 | 从首页按 UX Map 执行项目级全链路回归，修复卡点并完成 Round 1/2 双轮验收 |
| 提出日期 | 2026-02-12 |
| 状态 | [x] 完成 |
| 交付物 | `outputs/sop-project-regression/4-1-6117de0a/`、`task_plan.md`、`notes.md`、`deliverable.md`、PDCA 四文档 |
| 验收标准 | UX Map 核心路径全通过；前后端契约/真实 API 验证通过；`ai check` 通过；SOP 状态闭环为 completed |

### REQ-015: 联合验收与发布守门（SOP 5.1）
| 字段 | 值 |
|------|-----|
| 需求描述 | 以 Pipeline 门禁执行产品/技术/质量三方联合验收，完成发布前双轮守门并形成可审计证据 |
| 提出日期 | 2026-02-12 |
| 状态 | [x] 完成 |
| 交付物 | `outputs/sop-joint-acceptance/5-1-3095c8c4/`、`task_plan.md`、`notes.md`、`deliverable.md` |
| 验收标准 | `ai check` 通过；UX Map 回归通过；真实 API 与契约探针通过；`ai sop status` 为 completed |

### REQ-016: 一键全量交付重跑验收（SOP 1.1 rerun）
| 字段 | 值 |
|------|-----|
| 需求描述 | 对既有基线执行一轮完整 SOP 1.1 重跑，验证连续交付下的稳定性并刷新证据包 |
| 提出日期 | 2026-02-12 |
| 状态 | [x] 完成 |
| 交付物 | `outputs/sop-one-click-full-delivery/1-1-719289f3/`、`task_plan.md`、`notes.md`、`deliverable.md`、PDCA 四文档 |
| 验收标准 | Step 1-8 全部闭环；`ai check` 通过；UX Map/FE/BE 专项通过；三端一致性快照更新 |

### REQ-017: 多角色头脑风暴收敛（SOP 1.3）
| 字段 | 值 |
|------|-----|
| 需求描述 | 通过 Council 多角色头脑风暴形成 PM/UX/SEO 统一决策，并更新 PRD/UX Map/SEO 与相关治理文档 |
| 提出日期 | 2026-02-12 |
| 状态 | [x] 完成 |
| 交付物 | `outputs/sop-multi-role-brainstorm/1-3-670e1dcd/`、`ADR-2026-02-12-multi-role-brainstorm.md`、PRD/UX/SEO 等文档更新 |
| 验收标准 | 角色产出齐全；冲突收敛有 ADR；关键文档口径一致并可审计 |

### REQ-018: 架构圆桌增量决策与风险清单更新（SOP 1.4）
| 字段 | 值 |
|------|-----|
| 需求描述 | 以 Council 架构圆桌确认系统边界与分层不变，收敛安全/可靠性增量事项，并形成 ADR 与风险清单用于后续实施 |
| 提出日期 | 2026-02-12 |
| 状态 | [x] 完成 |
| 交付物 | `outputs/sop-architecture-council/1-4-cdf0f11e/`、`ADR-2026-02-12-architecture-council-refresh.md`、`ARCHITECTURE_RISK_REGISTER.md`、`SYSTEM_ARCHITECTURE.md` |
| 验收标准 | 角色输出齐全；ADR 与风险清单落盘；相关架构文档同步；`ai check` 通过；`ai sop status=completed` |

---

## 二、规划提示词库（Prompt Library）

### PROMPT-001: 多角色头脑风暴 SOP
```markdown
## 目标
对标 [竞品列表]，产出 PRD + UX Map + 系统架构

## 角色分工
1. 产品经理：竞品分析 + PRD
2. 设计师：UX Map + 信息架构
3. SEO 专家：Sitemap + 关键词策略
4. 架构师：技术选型 + 系统架构

## 执行步骤
Phase 1: 各角色独立产出
Phase 2: 汇总对齐，解决冲突
Phase 3: 形成决策记录

## 产出物
- PRD.md
- USER_EXPERIENCE_MAP.md
- SYSTEM_ARCHITECTURE.md
- SEO_SITEMAP_STRATEGY.md
```

### PROMPT-002: NL2SQL 系统提示词
```markdown
You are an expert SQL analyst for a data analytics platform.
Your task is to convert natural language questions into ClickHouse SQL queries.

## Rules
1. Use ClickHouse SQL syntax
2. Always use appropriate date functions: toDate(), toStartOfDay()
3. For time ranges, use relative expressions: now() - INTERVAL 7 DAY
4. Always include appropriate WHERE clauses for performance
5. Return JSON with keys: sql, explanation, confidence (0-1)
```

### PROMPT-003: Docker E2E 验证 SOP
```markdown
## 验证步骤
1. 构建所有容器：docker compose build
2. 启动服务：docker compose up -d
3. 验证健康：curl health endpoints
4. 测试 API：Track → Identify → Overview → Ask
5. 检查数据持久化：ClickHouse 查询

## 成功标准
- 所有容器 healthy
- API 端点返回 200
- NL2SQL 返回正确 SQL
```

### PROMPT-004: Real-Flow Test Matrix
```markdown
## Objective
Define a real-flow test matrix across personas and paths.

## Template
Persona | Entry | Device | Permission | Critical Path | Expected Result | Evidence

## Rules
1. Use real APIs and non-production environment
2. Include at least one exception path per persona
3. Record evidence for each critical step
```

### PROMPT-005: UI/UX Optimization Checklist
```markdown
## Objective
Optimize UI/UX based on ui-skills and web-interface-guidelines.

## Checklist
1. Single primary CTA per page
2. Clear spacing and typographic hierarchy
3. Focus-visible and keyboard access
4. Evidence for network/console/performance/visual
```

### PROMPT-006: Full Delivery Loop (Audit/Auth/Persona/Perf)
```markdown
## Objective
Run supply audit, implement auth + RBAC with /app routes, extend persona real-flow tests, and capture network/console/performance/visual evidence.
```

### PROMPT-007: SOTA SOP Benchmarking (12-month window)
```markdown
## Objective
Benchmark 5-10 world-class product/platform SOPs from the last 12 months.

## Workflow
1. Use WebSearch/WebFetch on official sources.
2. Extract process steps, role split, quality gates, and KPIs.
3. Build comparison matrix + gap analysis.
4. Output migration checklist + risk list.
5. Update PRD / USER_EXPERIENCE_MAP / PLATFORM_OPTIMIZATION_PLAN.
```

### PROMPT-008: One-Click Full Delivery Gate Pack
```markdown
## Objective
Execute SOP 1.1 end-to-end with plan-first discipline and dual-round acceptance.

## Required gates
1. Round 1: ai check
2. Round 2 FE: UX route probe with network/console/performance/visual evidence
3. Round 2 BE: real API replay + error_code contract probe
4. Closeout: deliverable + rolling ledger + three-end consistency declaration
```

### PROMPT-009: Frontend Validation and Perf Regression Pack
```markdown
## Objective
Run frontend full probe for network/console/performance/visual/responsive and close failures in the same run.

## Required checks
1. Signup entry succeeds (`/signup -> /app`) without `Failed to fetch`
2. Core routes reachable on desktop/tablet/mobile
3. console/page/network/api error counts are zero
4. DOMContentLoaded timing under budget
5. Save JSON + screenshots + markdown report
```

### PROMPT-010: Project Regression Acceptance Gate Pack
```markdown
## Objective
Execute project-level UX Map regression from homepage and close acceptance gates with auditable artifacts.

## Required checks
1. Route closure: `/ -> /signup -> /app -> /app/ask -> /app/dashboards -> /app/settings/team`
2. Fix blocker immediately if any entrypoint is missing (UI CTA/API/config mismatch)
3. Round 1: `ai check`
4. Round 2: UX Map E2E probe + real API replay + backend contract probe
5. SOP runtime status must be closed (`ai sop status ... = completed`)
```

### PROMPT-011: One-Click Rerun Stability Pack
```markdown
## Objective
Rerun SOP 1.1 on an existing baseline and verify no regression drift across FE/BE gates.

## Required checks
1. Round 1: `ai check`
2. Round 2 UX path: `/ -> /signup -> /app -> /app/ask -> /app/dashboards -> /app/settings/team`
3. FE full probe: network/console/performance/visual/responsive all pass
4. BE probe: real API replay + backend contract probe both pass
5. Closeout: deliverable + rolling ledger + three-end consistency snapshot
```

### PROMPT-012: Multi-Role Council Brainstorm Pack
```markdown
## Objective
Run a Council-style brainstorm with PM / Designer / SEO and produce converged decisions.

## Required outputs
1. PM: competitor gap summary + PRD priorities
2. Designer: UX Map path and onboarding improvements
3. SEO: sitemap priorities + keyword clusters
4. Conflict matrix + decision record (ADR)
5. Sync PRD / UX Map / SEO / Architecture / Optimization docs
```

### PROMPT-013: Architecture Council Refresh Pack
```markdown
## Objective
Run an architecture council refresh and produce ADR + risk register deltas without expanding system boundaries.

## Required outputs
1. Architect: boundary/layering decision (`Web -> API -> AI/Data`) and non-goals
2. Security: threat/risk additions with machine-detectable triggers
3. SRE: reliability/capacity/retention actions and observability requirements
4. ADR update + risk register update + SYSTEM_ARCHITECTURE sync
5. Round 1 `ai check` + SOP status closure
```

---

## 三、问题库（Anti-Regression Q&A）

### Q1: clickhouse-go 连接失败 "unexpected packet [72]"
**症状**: API 启动时报错 `unexpected packet [72] from server`
**根因**: clickhouse-go/v2 使用原生 TCP 协议（端口 9000），但配置了 HTTP 端口（8123）
**修复**: 将 `CLICKHOUSE_PORT` 从 8123 改为 9000
**防复发**: 文档明确标注端口用途

### Q2: Docker 构建 "Cannot find module next"
**症状**: Web 容器构建时找不到 next 模块
**根因**: `COPY . .` 覆盖了 pnpm install 创建的 node_modules
**修复**: 添加 .dockerignore 排除 node_modules
**防复发**: 所有 Node.js 项目必须有 .dockerignore

### Q3: API 启动时 ClickHouse 未就绪
**症状**: API 进入 "degraded mode"
**根因**: Docker depends_on 只保证启动顺序，不保证就绪
**修复**: 重启 API 容器或添加健康检查等待
**防复发**: 使用 healthcheck + restart 策略

### Q4: AI Ask 返回空结果 / 403 Forbidden
**症状**: `/api/v1/ask` 返回空字段或 AI 端 403
**根因**: Docker Compose 中硬编码的 Gemini API Key 失效
**修复**: 使用环境变量注入真实 API Key，并重启 AI/API 服务
**防复发**: 禁止在 compose 中写死密钥；统一从 `.env` 注入

### Q5: Ask/Query 返回扫描错误（String → interface）
**症状**: Ask/Query 返回 `failed to scan row: ... converting String to *interface {} is unsupported`
**根因**: ClickHouse 驱动不支持扫描到 `*interface{}`，需要类型化扫描
**修复**: 基于列类型创建目标变量，扫描后再组装 map
**防复发**: Query 层统一类型化扫描

### Q6: 前端端口变更导致 CORS 失败
**症状**: Dashboard 页面提示 Retry/加载失败（CORS）
**根因**: API 仅允许 `http://localhost:3000`，但实际前端运行在 3100
**修复**: 在 `CORS_ORIGINS` 增加 `http://localhost:3100`
**防复发**: 开发环境固定端口或统一配置 CORS_ORIGINS

### Q7: 单页存在多个主按钮导致视觉层级混乱
**症状**: 首页同时出现多个主色 CTA，层级不清晰
**根因**: 导航与 Hero 同时使用主按钮样式
**修复**: 保留一个主按钮，其余降级为次级样式
**防复发**: UI Review 阶段校验单一主按钮规则

### Q8: /app 路由访问未登录或权限不足
**症状**: 未登录访问 /app 或权限不足访问 /app/settings/team
**根因**: 缺少 auth middleware 或前端路由守卫
**修复**: API JWT 校验 + RBAC 权限拦截 + 前端 AuthGate
**验证**: 手工访问受限页面，期望 401/403 + 明确提示
**防复发**: 新增 auth middleware 测试，更新 UX Map 复测脚本

### Q9: API 冷启动后长期 503（ClickHouse 永久降级）
**症状**: `/api/v1/track`、`/api/v1/overview` 在容器启动后持续返回 503  
**根因**: API 启动阶段只尝试一次 ClickHouse 连接，首次失败后永久走 degraded handler  
**修复**: 增加启动重试（`CLICKHOUSE_CONNECT_MAX_ATTEMPTS` + `CLICKHOUSE_CONNECT_RETRY_DELAY_SECOND`）  
**验证**: 真实 API 回放 7/7 通过；ClickHouse 持久化计数 > 0  
**防复发**: fixture 收紧 `track/overview=200`，新增契约测试 + full-loop 回放证据

### Q10: SOP 调研容易“只列功能不列门禁与指标”
**症状**: 竞品调研文档只有 feature 列表，难以迁移为执行 SOP  
**根因**: 缺少统一提炼模板（流程/角色/质量门禁/度量）  
**修复**: 固化 SOTA Benchmark Matrix 模板（强制四维输出）  
**验证**: 8 个样本完成结构化矩阵，含迁移清单与风险表  
**防复发**: 所有后续调研任务必须复用 PROMPT-007 与矩阵模板

### Q11: signup 出现 `Failed to fetch`（3000 端口 CORS 回归）
**症状**: `/signup` 点击创建后，页面展示 `Failed to fetch`  
**根因**: API `CORS_ORIGINS` 仅允许 `3009/3100`，遗漏 `3000`  
**修复**: 将 CORS 基线统一为 `3000/3009/3100`（API 与 AI 同步）  
**验证**: `Origin=http://localhost:3000` 预检从 `403` 变为 `204`，`POST /api/v1/auth/signup` 返回 `201`  
**防复发**: SYSTEM_ARCHITECTURE 固化 CORS 基线，配置解析增加 trim + empty-filter，并补充配置单测

### Q12: Web 容器健康检查长期 unhealthy（localhost IPv6）
**症状**: `09-data-wings-web` 长期 `unhealthy`，但 host 侧页面可访问  
**根因**: HEALTHCHECK 使用 `localhost`，容器内解析为 `::1`，Next 仅监听 IPv4 导致连接拒绝  
**修复**: HEALTHCHECK 改为 `http://127.0.0.1:3000/api/health`  
**验证**: `docker inspect` 显示 `Status=healthy` 且 `FailingStreak=0`  
**防复发**: 架构文档固化“容器内健康检查禁用 localhost，统一 IPv4 loopback”

### Q13: Compose 启动日志持续出现 `version` 废弃告警
**症状**: 每次执行 `docker compose` 都提示 `attribute 'version' is obsolete`  
**根因**: `docker-compose.yml` 仍保留顶层 `version: \"3.8\"`（Compose v2 已不需要）  
**修复**: 移除 `docker-compose.yml` 顶层 `version` 字段  
**验证**: `docker compose ps/config/up` 输出不再出现该告警  
**防复发**: 固化 Compose v2 基线（无顶层 version），并在发布前例行执行 `docker compose config`

### Q14: 交付宣称完成但缺少 FE/BE 双证据链
**症状**: 仅有 `ai check` 结果，缺少 UX 浏览器证据或后端契约探针，难以审计  
**根因**: 未将 Round 2 FE/BE 证据列为强制门禁  
**修复**: 固化 SOP 1.1 证据包：`round2_uxmap_probe.json` + `backend_contract_probe.json` + `real_api_capture.md`  
**验证**: `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/reports/sop_1_1_full_delivery_report.md`  
**防复发**: 所有长任务交付前必须复用 PROMPT-008 并完成双轮验收打勾

### Q15: 前端探针误报 `ERR_ABORTED` 导致回归失败
**症状**: 前端全量探针报告 `failed_request_count>0`，但业务路径实际全部成功  
**根因**: Next 路由快速切换中，`/_next/static/chunks/*` 资源请求被中断，属于浏览器噪声事件  
**修复**: 探针忽略 `/_next/static/chunks/*` 的 `ERR_ABORTED` 失败项  
**验证**: `outputs/sop-frontend-validation/3-1-535549a1/reports/frontend_full_probe.json`（`overall_ok=true`）  
**防复发**: 后续前端探针默认应用该噪声过滤规则，并保留原始日志用于审计

### Q16: Go 契约测试在容器中偶发依赖下载失败（IPv6 不可达）
**症状**: `go test` 在容器内下载依赖时报 `dial tcp ... connect: network is unreachable`  
**根因**: 默认依赖下载路径命中 IPv6 出口，当前环境 IPv6 网络不可达  
**修复**: 复测时显式设置 `GOPROXY=https://goproxy.cn,direct`  
**验证**: `outputs/sop-full-loop-check/3-7-703f3d77/logs/go-test-config-handlers-rerun.log` 通过  
**防复发**: 后续容器化 Go 测试默认注入可达 GOPROXY，并保留首轮失败日志用于审计

### Q17: UX Map 回归发现首页无 `/signup` 直达入口
**症状**: 项目级回归首轮 `cta_to_signup=false`，首页无法直接进入注册链路  
**根因**: 首页导航与 Hero 次按钮均未指向 `/signup`，与 UX Map 入口定义不一致  
**修复**: 更新 `apps/web/src/app/page.tsx`，新增导航 `Create account`，并将 Hero 次按钮改为 `/signup`  
**验证**: `outputs/sop-project-regression/4-1-6117de0a/reports/uxmap_e2e_probe.json`（`cta_to_signup=true`, `overall_ok=true`）  
**防复发**: 后续发布前必须执行 PROMPT-010，强制校验首页入口闭环

### Q18: 长任务重跑时 planning-with-files 误生成 initiative 目录
**症状**: 执行 `planning-with-files` 时自动创建 `doc/00_project/initiative_09_data_wings/`（下划线命名）  
**根因**: skill 路径推断未复用项目既有 initiative slug（`initiative_data-wings`）  
**修复**: 每次执行后立即归档误生成目录到 run artifacts 并删除工作树副本  
**验证**: `outputs/sop-one-click-full-delivery/1-1-719289f3/artifacts/planning-with-files-misgenerated-doc/`  
**防复发**: 后续长任务固定执行“skill 后目录校验 + 归档清理”步骤

### Q19: Council 多角色结论易在 PRD/UX/SEO 间出现口径漂移
**症状**: 角色报告已产出，但 PRD/UX/SEO 文档更新不一致，执行优先级易失真  
**根因**: 缺少统一冲突收敛记录与“单一决策源”  
**修复**: 生成 ADR 并要求 PRD/UX/SEO/架构/优化计划同步回写  
**验证**: `doc/00_project/initiative_data-wings/ADR-2026-02-12-multi-role-brainstorm.md` + SOP 1.3 证据目录  
**防复发**: 后续多角色任务必须复用 PROMPT-012 并把 ADR 作为实施前置输入

### Q20: 架构圆桌结论未同步风险台账导致执行优先级失真
**症状**: ADR 已更新，但风险清单未同步，实施排序缺乏统一依据  
**根因**: 角色结论与风险治理文档分离维护，缺少强制同步步骤  
**修复**: 在 SOP 1.4 中将 ADR 与 `ARCHITECTURE_RISK_REGISTER.md` 绑定更新，并回写系统架构文档  
**验证**: `doc/00_project/initiative_data-wings/ADR-2026-02-12-architecture-council-refresh.md`、`ARCHITECTURE_RISK_REGISTER.md`、`SYSTEM_ARCHITECTURE.md`（Section 22）  
**防复发**: 后续架构圆桌任务必须复用 PROMPT-013，并在收口前校验 ADR+风险台账双落盘


### Q21: 供应链审计发现 pnpm 高危 advisories（Next/glob）与 detect-secrets 噪声
**症状**: `pnpm audit` 输出 high advisories（`glob`/`next`），CI 若直接 fail 会导致无法合并变更；`detect-secrets` 对 pnpm lockfile integrity 产生大量误报。
**根因**: 供应链漏洞多为 transitive/upstream；pnpm lockfile 不被 detect-secrets 视为 lockfile，触发高熵字符串误报。
**处置**: 先形成 machine-checkable allowlist + CI gate；并设置到期日强制升级。
- Gate: `scripts/supply_chain_gate.py`
- Allowlist: `security/supply_chain_allowlist.json`
- 证据: `outputs/sop-supply-chain/3-9-ee500287/reports/summary.md`
**防复发**: CI 增加 `Supply Chain Audit` job（`.github/workflows/ci.yml`）；高危 advisories 必须在 allowlist 中有明确 reason+expires_on，否则 CI 失败。



### Q22: Postmortem scan 未接入发布门禁导致回归风险不可控
**症状**: 仅靠 `ai check`/E2E 无法覆盖“触发历史回归区域”的变更；改动一旦命中高风险路径容易复发。
**根因**: 缺少基于历史 Postmortem triggers 的机器扫描门禁。
**修复**: 引入 `postmortem/PM-*.md` + `scripts/postmortem_scan.py`，并在 CI 中新增 `Postmortem Scan` job（`.github/workflows/ci.yml`）。
**触发器**: PM 文件中的 triggers（path/keyword/regex）。
**防复发**: pre-merge 必须通过 postmortem scan；open 状态 PM 命中直接阻塞。


---

## 四、参考文档（References）

| 文档 | 路径 | 用途 |
|------|------|------|
| PRD | doc/00_project/initiative_data-wings/PRD.md | 产品需求 |
| UX Map | doc/00_project/initiative_data-wings/USER_EXPERIENCE_MAP.md | 用户体验 |
| 系统架构 | doc/00_project/initiative_data-wings/SYSTEM_ARCHITECTURE.md | 技术架构 |
| Full-Loop 证据 | doc/00_project/initiative_data-wings/full_loop_verification_evidence.md | 验证记录 |
| API 文档 | services/api/README.md | API 参考 |
| AI 服务文档 | services/ai/README.md | NL2SQL 参考 |

---

## 变更日志

| 日期 | 变更内容 | 变更人 |
|------|----------|--------|
| 2026-01-28 | 初始化需求台账 | AI |
| 2026-01-28 | 添加 REQ-001 至 REQ-005 | AI |
| 2026-01-28 | 添加问题库 Q1-Q3 | AI |
| 2026-01-28 | 添加提示词库 PROMPT-001 至 PROMPT-003 | AI |
| 2026-01-28 | 添加 REQ-006 与 PROMPT-004 | AI |
| 2026-01-28 | 添加问题库 Q4-Q5（Real-Flow 测试发现） | AI |
| 2026-01-28 | 添加问题库 Q6（CORS 端口问题） | AI |
| 2026-01-28 | 添加 REQ-007 与 PROMPT-005 | AI |
| 2026-01-28 | 添加问题库 Q7（主按钮层级） | AI |
| 2026-01-28 | 添加 REQ-008 / PROMPT-006 / Q8 | AI |
| 2026-02-11 | 添加 REQ-009 / Q9（SOP 3.7 闭环修复） | AI |
| 2026-02-11 | 添加 REQ-010 / PROMPT-007 / Q10（SOTA SOP 调研） | AI |
| 2026-02-12 | 添加问题库 Q11（signup CORS 回归） | AI |
| 2026-02-12 | 添加问题库 Q12（web healthcheck IPv6 localhost 问题） | AI |
| 2026-02-12 | 添加问题库 Q13（compose version 废弃告警） | AI |
| 2026-02-12 | 添加 REQ-011 / PROMPT-008 / Q14（SOP 1.1 一键全量交付闭环） | AI |
| 2026-02-12 | 添加 REQ-012 / PROMPT-009 / Q15（SOP 3.1 前端验证与性能检查闭环） | AI |
| 2026-02-12 | 添加 REQ-013 / Q16（SOP 3.7 Watchdog 复核 + Go 容器网络回归） | AI |
| 2026-02-12 | 添加 REQ-014 / PROMPT-010 / Q17（SOP 4.1 项目级全链路回归闭环） | AI |
| 2026-02-12 | 添加 REQ-015（SOP 5.1 联合验收与发布守门） | AI |
| 2026-02-12 | 添加 REQ-016 / PROMPT-011 / Q18（SOP 1.1 重跑稳定性与目录校验） | AI |
| 2026-02-12 | 添加 REQ-017 / PROMPT-012 / Q19（SOP 1.3 多角色收敛与 ADR） | AI |
| 2026-02-12 | 添加 REQ-018 / PROMPT-013 / Q20（SOP 1.4 架构圆桌增量决策与风险清单） | AI |

---

猪哥云（四川）网络科技有限公司 | 合规网 www.hegui.com
猪哥云-数据产品部-Maurice | maurice_wen@proton.me
2025 猪哥云-灵阙企业级智能体平台
