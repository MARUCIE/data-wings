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
| 状态 | [ ] 进行中 |
| 交付物 | PRD.md, SYSTEM_ARCHITECTURE.md, USER_EXPERIENCE_MAP.md, PLATFORM_OPTIMIZATION_PLAN.md, REAL_FLOW_TEST_EVIDENCE.md |
| 验收标准 | audit 通过，/login+/app 路由可用，Persona 复测 ≥ 3 类，证据可审计 |

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

---

猪哥云（四川）网络科技有限公司 | 合规网 www.hegui.com
猪哥云-数据产品部-Maurice | maurice_wen@proton.me
2025 猪哥云-灵阙企业级智能体平台
