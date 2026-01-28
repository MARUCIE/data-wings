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

---

猪哥云（四川）网络科技有限公司 | 合规网 www.hegui.com
猪哥云-数据产品部-Maurice | maurice_wen@proton.me
2025 猪哥云-灵阙企业级智能体平台
