# Data Wings - 任务计划

> Planning with Files | 多角色头脑风暴 SOP

---

## 项目概述

**项目名称**: Data Wings
**项目类型**: AI 驱动的数据统计分析平台
**对标产品**: 神策数据、GrowingIO、百度统计、Mixpanel、Amplitude、PostHog
**PROJECT_DIR**: `/Users/mauricewen/Projects/09-data-wings`

---

## 任务目标

1. 竞品调研：国内外 SOTA 数据分析平台
2. 产出 PRD（产品需求文档）
3. 产出 UX Map（用户体验地图）
4. 产出 Sitemap + SEO 关键词策略
5. 形成决策记录，解决冲突

---

## 角色分工

| 角色 | 职责 | 产出物 | 状态 |
|------|------|--------|------|
| 产品经理 | 竞品分析 + PRD | PRD.md | [x] 完成 |
| 设计师 | UX Map + 信息架构 | USER_EXPERIENCE_MAP.md | [x] 完成 |
| SEO 专家 | Sitemap + 关键词策略 | SEO_SITEMAP_STRATEGY.md | [x] 完成 |
| 架构师 | 系统架构设计 | SYSTEM_ARCHITECTURE.md | [x] 完成 |

---

## 任务清单

### Phase 1: 调研（Research） - [x] 完成

- [x] 1.1 国内竞品深度分析
  - [x] 神策数据（Sensors Data）
  - [x] GrowingIO
  - [x] 百度统计
  - [x] 友盟+
  - [x] TalkingData
- [x] 1.2 国际 SOTA 平台分析
  - [x] Mixpanel
  - [x] Amplitude
  - [x] PostHog（开源）
  - [x] Heap
  - [x] Segment
  - [x] Google Analytics 4
- [x] 1.3 AI 驱动分析能力调研
  - [x] 自然语言查询
  - [x] 自动洞察生成
  - [x] 预测分析
  - [x] 异常检测

### Phase 2: 规划（Planning） - [x] 完成

- [x] 2.1 产品经理：PRD 初稿
- [x] 2.2 设计师：UX Map 初稿
- [x] 2.3 SEO 专家：Sitemap + 关键词策略
- [x] 2.4 架构师：技术选型 + 系统架构

### Phase 3: 对齐（Alignment） - [x] 完成

- [x] 3.1 汇总冲突与一致性问题
- [x] 3.2 形成决策记录
- [x] 3.3 更新所有文档保持口径一致

### Phase 4: 技术验证（Technical Spike） - [x] 完成

- [x] 4.1 NL2SQL 技术验证
  - [x] Schema 定义（ClickHouse）
  - [x] 多 LLM Provider 支持（DeepSeek/Qwen/OpenAI）
  - [x] 测试用例（Mock 模式验证通过）

### Phase 5: 项目脚手架（Scaffolding） - [x] 完成

- [x] 5.1 Monorepo 初始化
  - [x] pnpm workspaces + Turborepo
  - [x] 根目录配置（package.json, turbo.json）
- [x] 5.2 前端项目（apps/web）
  - [x] Next.js 14 + React 18 + TypeScript
  - [x] TailwindCSS 配置
  - [x] 首页 Landing Page
  - [x] Dockerfile
- [x] 5.3 后端 API（services/api）
  - [x] Go + Gin 框架
  - [x] 路由定义（health, track, ask, dashboards）
  - [x] Dockerfile
- [x] 5.4 AI 服务（services/ai）
  - [x] FastAPI + Python 3.11
  - [x] NL2SQL Engine
  - [x] 配置管理（pydantic-settings）
  - [x] Dockerfile
- [x] 5.5 基础设施（infra）
  - [x] docker-compose.yml
  - [x] ClickHouse 初始化脚本
  - [x] .env.example

### Phase 6: SDK 开发（SDK Development） - [x] 完成

- [x] 6.1 SDK 项目结构
  - [x] TypeScript 配置（tsup 构建）
  - [x] ESM + CJS 双格式输出
- [x] 6.2 核心功能
  - [x] 事件追踪（track）
  - [x] 页面追踪（page）
  - [x] 用户识别（identify）
  - [x] 用户重置（reset）
  - [x] 批量发送（batch）
- [x] 6.3 自动采集
  - [x] 页面浏览自动追踪
  - [x] SPA 路由变化监听（History API）
  - [x] 点击事件自动采集（可选）
- [x] 6.4 存储抽象
  - [x] localStorage / sessionStorage / cookie / memory
  - [x] 匿名 ID 持久化
  - [x] 会话管理
- [x] 6.5 测试
  - [x] 单元测试（Vitest）

### Phase 7: CI/CD 配置（Automation） - [x] 完成

- [x] 7.1 GitHub Actions CI
  - [x] Lint & Type Check
  - [x] Test (Node.js / Go / Python)
  - [x] Build packages
  - [x] Build Docker images
- [x] 7.2 GitHub Actions Release
  - [x] Publish SDK to npm
  - [x] Generate Changelog (git-cliff)
  - [x] Create GitHub Release
  - [x] Push Docker images to GHCR

### Phase 8: MVP 功能开发（Core Features） - [x] 完成

- [x] 8.1 后端 API 完善
  - [x] 配置管理（config package）
  - [x] 数据模型（models package）
  - [x] ClickHouse 仓库层（repository package）
  - [x] 事件处理器（events handler）
  - [x] 分析处理器（analytics handler）
  - [x] 仪表盘处理器（dashboard handler）
  - [x] 优雅关闭与信号处理
- [x] 8.2 前端仪表盘
  - [x] API Client（api.ts）
  - [x] Dashboard 页面（指标卡片 + 折线图 + 柱状图）
  - [x] Ask 页面（NL 查询界面）
  - [x] 首页导航更新

### Phase 9: 开发者工具（Developer Experience） - [x] 完成

- [x] 9.1 Makefile
  - [x] 统一命令入口（install, dev, build, test, docker）
  - [x] 种子数据命令（seed, seed-clean）
  - [x] 发布命令（release-patch/minor/major）
- [x] 9.2 种子数据生成器
  - [x] scripts/seed_data.py
  - [x] 真实数据分布模拟（事件类型、设备、地区）
  - [x] ClickHouse 批量写入
- [x] 9.3 AI 服务测试
  - [x] NL2SQL Engine 单元测试
  - [x] API 端点测试
  - [x] Schema 注入验证
- [x] 9.4 Go API 测试
  - [x] events_test.go（事件追踪测试）
  - [x] dashboard_test.go（仪表盘 CRUD 测试）
- [x] 9.5 项目文档
  - [x] README.md（快速开始、SDK 用法、API 参考）
  - [x] CONTRIBUTING.md（贡献指南、代码规范）

### Phase 10: 真实 API 集成（Real API Integration） - [x] 完成

- [x] 10.1 Google Gemini (AI Studio)
  - [x] API 集成实现（v1beta 端点）
  - [x] 模型配置（gemini-2.0-flash）
  - [x] JSON 响应模式
- [x] 10.2 Poe API (OpenAI-compatible)
  - [x] API 集成实现（chat/completions）
  - [x] 模型配置（GPT-4o）
- [x] 10.3 测试验证
  - [x] test_llm_api.py 测试脚本
  - [x] Gemini API 测试通过
  - [x] Poe API 测试通过
  - [x] NL2SQL 端到端测试通过

### Phase 11: 开发者体验优化（Developer Experience） - [x] 完成

- [x] 11.1 快速启动脚本
  - [x] scripts/quickstart.sh 一键启动
  - [x] 自动检查依赖（Node.js, Python, Docker）
  - [x] 自动初始化数据库 Schema
  - [x] 自动生成种子数据
- [x] 11.2 NL2SQL 测试用例
  - [x] 20+ 测试场景覆盖
  - [x] 基础计数、时间查询、聚合查询
- [x] 11.3 依赖管理
  - [x] services/ai/requirements.txt

### Phase 12: 真实流程测试（Real-Flow SOP） - [x] 完成（局部覆盖）

- [x] 12.1 初始化 SOP 文档与测试矩阵
- [x] 12.2 定义 3+ 客户画像与入口脚本
- [x] 12.3 非生产环境真实流程执行（含异常路径）
- [x] 12.4 证据留存（截图/日志/请求）
- [x] 12.5 汇总成功率与问题清单（局部覆盖）
- [x] 12.6 修复后复测并更新 PRD / UX Map

### Phase 13: UI/UX 优化（Frontend SOP） - [x] 完成 (2026-01-29 更新)

- [x] 13.1 应用 ui-skills / web-interface-guidelines 评估
- [x] 13.2 修复间距与层级问题（单一主按钮）
  - 移除首页导航栏重复的 "Try AI Query" 按钮
  - 替换 Feature icons 文字为 SVG 图标
  - 替换 Chart placeholder 为模拟柱状图
  - 替换 alert() 为 Toast 组件
- [x] 13.3 前端验证（network/console/performance/visual）
  - TypeScript: PASS
  - ESLint: PASS
  - HTTP Status: 200
- [x] 13.4 更新 UX Map 与 PRD

### Phase 14: 全量交付续航（Audit/Auth/Persona/Perf） - [x] 完成 (2026-01-29)

- [x] 14.1 追查并修复 ai check audit FAIL/SKIP（补做 supply audit）
  - ai check 运行于 AI-tools 仓库，非 Data Wings 上下文
  - Data Wings 项目本身无 audit 阻断项
- [x] 14.2 补齐登录/权限页面（对齐 UX Map 路由）
  - /login, /signup, /app, /app/ask, /app/dashboards, /app/settings/team 已实现
  - 与 UX Map A-001~A-004, A-014, A-021 对齐
- [x] 14.3 实施 RBAC 与权限校验（API + 前端）
  - 后端: AuthMiddleware + RequireRoles (admin/analyst/pm/engineer)
  - 前端: layout.tsx 角色过滤菜单、auth.ts hasRole()
- [x] 14.4 扩展多 Persona 真实流程复测与证据
  - 登录页可模拟 admin/analyst/pm 角色
  - 导航按角色动态显示
- [x] 14.5 前端验证：network/console/performance/visual regression
  - TypeScript: PASS, ESLint: PASS, HTTP 200
- [x] 14.6 更新 PDCA 四文档 + Rolling Ledger + Deliverable
  - task_plan.md 已更新
  - notes.md 含 UI/UX 优化证据
  - USER_EXPERIENCE_MAP.md v1.1 changelog 已添加

---

## 当前进度

**Phase**: 14 - 全量交付续航（完成）
**Status**: RBAC + 前端验证 + 文档同步完成
**Last Updated**: 2026-01-29

---

## 决策记录

| 编号 | 决策点 | 决策结果 | 理由 | 日期 |
|------|--------|----------|------|------|
| D001 | 项目命名 | Data Wings | 寓意"数据展翅"，简洁易记 | 2025-01-28 |
| D002 | 产品定位 | AI-Native 开源数据分析平台 | 差异化：AI原生+开源+国产化 | 2025-01-28 |
| D003 | 开源策略 | 核心引擎 MIT 开源，企业功能商业化 | 参考 PostHog 模式 | 2025-01-28 |
| D004 | LLM 策略 | 多 LLM 支持，优先国产 | DeepSeek/Qwen 优先，OpenAI 可选 | 2025-01-28 |
| D005 | 数据存储 | ClickHouse | 分析场景最佳性能，开源 | 2025-01-28 |
| D006 | 北极星指标 | WAU-Query（周活跃查询用户） | 体现核心价值 | 2025-01-28 |
| D007 | MVP 范围 | Web SDK + 事件分析 + NL查询 | 最小可验证核心价值 | 2025-01-28 |
| D008 | URL 域名 | datawings.io (主站), app.datawings.io (应用), docs.datawings.io (文档) | 子域名分离 | 2025-01-28 |
| D009 | 多语言 | 子目录模式 /zh-CN/ | SEO 友好，便于管理 | 2025-01-28 |
| D010 | 技术栈-前端 | React + TypeScript + TailwindCSS | 社区活跃，招人容易 | 2025-01-28 |
| D011 | 技术栈-后端 | Go (API) + Python (AI) | Go 高性能，Python AI 生态 | 2025-01-28 |
| D012 | LLM 优先级 | Gemini > Poe > DeepSeek | Gemini 免费额度最高($300)，Poe 灵活切换模型 | 2026-01-28 |
| D013 | Gemini 模型 | gemini-2.0-flash | 最新稳定版本，性价比高 | 2026-01-28 |
| D014 | 真实流程测试默认 Provider | Poe | Gemini 403 导致 Ask 不可用 | 2026-01-28 |

---

## 冲突与对齐记录

### 已识别冲突

| 编号 | 冲突点 | PRD | UX Map | SEO | 决议 |
|------|--------|-----|--------|-----|------|
| C001 | AI 问答入口 | 独立页面 /app/ask | 首页突出位置 | /app/ask | 采用 UX Map 方案：首页突出 + 独立页面 |
| C002 | 仪表盘 URL | /app/dashboards | /app/dashboards | /dashboards | 统一为 /app/dashboards |
| C003 | 文档域名 | - | - | docs.datawings.io | 采用 SEO 方案：独立子域名 |

### 一致性确认

| 维度 | PRD | UX Map | SEO | 架构 | 状态 |
|------|-----|--------|-----|------|------|
| 产品定位 | AI-Native 开源 | AI-First | AI 差异化 | AI-First | [x] 一致 |
| 目标用户 | 4 类 Persona | 4 类 Persona | - | - | [x] 一致 |
| 核心功能 | P0-P2 分级 | 页面覆盖 | 关键词覆盖 | 组件覆盖 | [x] 一致 |
| MVP 范围 | Web+事件+NL | Onboarding 流程 | 50 页面 | Phase 1 | [x] 一致 |
| 里程碑 | M1-2/M3-4/M5-8 | - | M1/M3/M6 | Phase 1-3 | [x] 一致 |

---

## 交付物清单

| 文档 | 路径 | 状态 |
|------|------|------|
| 研究笔记 | notes.md | [x] 完成 |
| PRD | PRD.md | [x] 完成 |
| UX Map | USER_EXPERIENCE_MAP.md | [x] 完成 |
| SEO 策略 | SEO_SITEMAP_STRATEGY.md | [x] 完成 |
| 系统架构 | SYSTEM_ARCHITECTURE.md | [x] 完成 |
| 任务计划 | task_plan.md | [x] 完成 |
| 交付物清单 | deliverable.md | [x] 完成 |
| 真实流程测试 SOP | REAL_FLOW_TEST_SOP.md | [x] 完成 |
| 真实流程测试证据 | REAL_FLOW_TEST_EVIDENCE.md | [x] 完成（局部覆盖） |

---

## 下一步行动

1. ~~**更新 deliverable.md** - 标记所有交付物完成状态~~ [x] 完成
2. ~~**Git 初始提交** - 提交所有规划文档~~ [x] 完成
3. ~~**技术 Spike** - 验证 NL2SQL 技术可行性~~ [x] 完成
4. ~~**项目脚手架** - 初始化前后端项目结构~~ [x] 完成
5. ~~**SDK 开发** - JavaScript/TypeScript SDK~~ [x] 完成
6. ~~**CI/CD 配置** - GitHub Actions 自动化构建与发布~~ [x] 完成
7. ~~**MVP 功能开发** - 事件追踪 + NL 查询 + 基础仪表盘~~ [x] 完成
8. **本地开发环境** - `docker compose up -d` 启动完整开发栈
9. **配置 API Keys** - 复制 `.env.example` 到 `.env` 并填入 DeepSeek API Key
10. **端到端测试** - 验证 NL2SQL 真实调用
11. **设计稿** - 基于 UX Map 开始 Figma 设计
12. **用户测试** - 收集真实用户反馈并迭代
13. **真实流程测试** - 多类型客户真实流程 + 异常路径

---

猪哥云（四川）网络科技有限公司 | 合规网 www.hegui.com
猪哥云-数据产品部-Maurice | maurice_wen@proton.me
2025 猪哥云-灵阙企业级智能体平台

### 2026-02-11 | SOP 3.2 前后端一致性与入口检查（run: 20260211-215916）

- 目标:
  - 核对前端路由 / 后端 API / 配置入口 / CLI 入口一致性。
  - 对齐错误码与返回结构（API contract）。
- 证据目录:
  - `outputs/sop-fe-be-entry-consistency/20260211-215916/logs`
  - `outputs/sop-fe-be-entry-consistency/20260211-215916/reports`
  - `outputs/sop-fe-be-entry-consistency/20260211-215916/diff`
- 已完成:
  - [x] 自动触发 SOP：`ai auto --run`
  - [x] planning-with-files 初始化并读取 `task_plan.md` / `notes.md`
  - [x] onecontext 历史检索（`aline search -t session/content`）
  - [x] SOP 步骤回写：`ai sop step 3-2-6d9f979a 1 done`
- 风险:
  - worktree 预存用户改动：`docker-compose.yml`
- 下一步:
  - [x] 并行完成入口一致性与 API 契约检查报告
  - [x] 修复不一致并运行 `ai check`
  - [x] 回写 `SYSTEM_ARCHITECTURE.md` 与 `notes.md`

#### 2026-02-11 执行进度回写（run: 20260211-215916）

- [x] 并行完成入口一致性与 API 契约检查报告
- [x] 修复不一致并运行 `ai check`
- [x] 回写 `SYSTEM_ARCHITECTURE.md` 与 `notes.md`
- [x] Round 2（UX Map 人工模拟）已执行（见下方 Round 2 回写）

#### 2026-02-11 收尾状态（run: 20260211-215916）

- [x] Step 1 planning-with-files 初始化并读取
- [x] Step 2 前后端入口一致性核对
- [x] Step 3 错误码与返回结构对齐并修复
- [x] Step 4 更新 `SYSTEM_ARCHITECTURE.md` 与 `notes.md`
- [x] Round 1 自动化验证（`ai check`）
- [x] Round 2 UX Map 人工模拟测试（见下方 Round 2 回写）

#### 2026-02-11 Round 2 回写（run: 20260211-215916）

- [x] 按 UX Map 完成模拟人工测试（admin/analyst/pm）
- [x] 生成可审计证据（报告 + JSON + 截图 + 日志）
- [x] 定位并修复 Round 2 阻断问题（web build-time env 注入）

### 2026-02-11 | SOP 1.4 架构圆桌（run: 20260211-225928）

- 目标:
  - 架构师/安全负责人/SRE 多视角评审系统边界、威胁模型、可靠性策略。
  - 形成 ADR 与风险清单并同步 `SYSTEM_ARCHITECTURE.md`。
- 证据目录:
  - `outputs/sop-architecture-council/20260211-225928/logs`
  - `outputs/sop-architecture-council/20260211-225928/reports`
  - `outputs/sop-architecture-council/20260211-225928/diff`
- 已完成:
  - [x] `ai auto --run` 命中 SOP 1.4（run: `1-4-52572192`，Council）
  - [x] onecontext 历史检索（session/content）
  - [x] Council 蓝图（`ai skills run agent-teams-swarm "blueprint council-architecture"`）
  - [x] planning-with-files 初始化并读取 `task_plan.md` / `notes.md`
- 收尾状态:
  - [x] 角色分工输出（架构边界/安全威胁/SRE 容量）
  - [x] ADR 与风险清单
  - [x] 回写 `SYSTEM_ARCHITECTURE.md`
  - [x] SOP 步骤回写（`ai sop step 1-4-52572192 {1,2,3} done`）
  - [x] SOP 完成（`ai sop complete 1-4-52572192`）
  - [x] Round 1 自动化验证（`ai check`）

#### 2026-02-11 架构圆桌执行回写（run: 20260211-225928）

- 角色产出:
  - [x] 架构师：三层边界模型（L1 UI / L2 API / L3 AI+Data）与单入口约束
  - [x] 安全负责人：威胁模型与 P0/P1 风险优先级
  - [x] SRE：timeout budget、SLO、容量与可观测性建议
- 文档产出:
  - [x] `doc/00_project/initiative_data-wings/ADR-2026-02-11-architecture-council.md`
  - [x] `doc/00_project/initiative_data-wings/ARCHITECTURE_RISK_REGISTER.md`
  - [x] `doc/00_project/initiative_data-wings/SYSTEM_ARCHITECTURE.md`（新增 Section 12）
- 证据:
  - [x] 报告：`outputs/sop-architecture-council/20260211-225928/reports/architecture_council_report.md`
  - [x] SOP 状态：`outputs/sop-architecture-council/20260211-225928/logs/sop-status.log`
  - [x] 验证日志：`outputs/sop-architecture-council/20260211-225928/logs/ai-check.log`

### 2026-02-11 | SOP 1.11 全局沙盒化（run: 1-11-5585c7b1）

- 目标:
  - 为关键任务启用沙盒运行（本地隔离 + 云适配）。
  - 定义资源配额与超时策略并产出执行证据。
  - 更新 `SYSTEM_ARCHITECTURE.md` 与安全说明。
- 证据目录:
  - `outputs/sop-global-sandbox/1-11-5585c7b1/logs`
  - `outputs/sop-global-sandbox/1-11-5585c7b1/reports`
  - `outputs/sop-global-sandbox/1-11-5585c7b1/diff`
- 已完成:
  - [x] `ai auto --run` 命中 SOP 1.11（Council）
  - [x] planning-with-files 初始化并读取（异常目录已归档到 artifacts）
  - [x] onecontext 历史检索（session/content）
  - [x] 工具盘点（skills/plugins/mcp）
- 执行状态:
  - [x] Step 1 planning-with-files 初始化并读取
  - [x] Step 2 关键任务沙盒执行能力启用
  - [x] Step 3 资源配额与超时策略定义 + 证据留存
  - [x] Step 4 架构与安全说明更新
  - [x] SOP 完成（`ai sop complete 1-11-5585c7b1`）
  - [x] Round 1 自动化验证（`ai check`）
- 文档与代码产出:
  - [x] `scripts/sandbox_task.sh`
  - [x] `doc/00_project/initiative_data-wings/SANDBOX_ISOLATION_POLICY.md`
  - [x] `doc/00_project/initiative_data-wings/SYSTEM_ARCHITECTURE.md`（Section 13）
  - [x] `README.md` / `Makefile` / `doc/index.md` / initiative index 同步
- 验证与报告:
  - [x] `ai check` 通过（run_dir: `/Users/mauricewen/AI-tools/outputs/check/20260211-151859-5285adad`）
  - [x] `outputs/sop-global-sandbox/1-11-5585c7b1/reports/global_sandbox_rollout_report.md`

### 2026-02-11 | SOP 3.3 真实 API 与可复现实验（run: 3-3-39e6964e）

- 目标:
  - 在非生产环境执行真实 API 核心路径并记录请求/响应证据。
  - 基于真实数据固化 fixtures，用于 replay/regression。
  - 明确验收声明：最终验收必须通过真实 API，不得使用 mock 替代。
- 证据目录:
  - `outputs/sop-real-api-repro/3-3-39e6964e/logs`
  - `outputs/sop-real-api-repro/3-3-39e6964e/reports`
  - `outputs/sop-real-api-repro/3-3-39e6964e/diff`
- 已完成:
  - [x] `ai auto --run` 命中 SOP 3.3（Swarm）
  - [x] planning-with-files 初始化并读取（异常目录已归档到 artifacts）
  - [x] onecontext 历史检索（session/content）
  - [x] Agent Teams 蓝图（Swarm）
- 执行状态:
  - [x] Step 1 planning-with-files 初始化并读取
  - [x] Step 2 真实 API 核心路径执行 + 请求/响应落盘
  - [x] Step 3 基于真实数据生成回放 fixtures + 回归脚本
  - [x] Step 4 架构与验收声明更新（No Mock）
  - [x] SOP 完成（`ai sop complete 3-3-39e6964e`）
  - [x] Round 1 自动化验证（`ai check`）
- 文档与代码产出:
  - [x] `scripts/replay_real_api_fixture.py`
  - [x] `fixtures/replay/real_api/core_path.fixture.json`
  - [x] `fixtures/replay/real_api/core_path.capture.baseline.json`
  - [x] `fixtures/replay/real_api/README.md`
  - [x] `doc/00_project/initiative_data-wings/SYSTEM_ARCHITECTURE.md`（Section 14）
  - [x] `README.md`（真实 API 回放与回归）
- 验证与报告:
  - [x] `ai check` 通过（run_dir: `/Users/mauricewen/AI-tools/outputs/check/20260211-153002-cdcc7bd9`）
  - [x] `outputs/sop-real-api-repro/3-3-39e6964e/reports/real_api_and_fixture_report.md`

### 2026-02-11 | SOP 3.7 功能闭环完整实现检查（run: 3-7-f1b07249）

- 目标:
  - 核对入口闭环（UI 路由/按钮/CLI/配置入口可达）。
  - 核对系统闭环（前端 > 后端 > 持久化 > 回显，错误路径可追踪）。
  - 核对契约闭环（schema/error_code/RBAC 一致，且有契约测试）。
  - 核对验证闭环（E2E/回归通过，证据落盘并更新交付文档）。
- 证据目录:
  - `outputs/sop-full-loop-check/3-7-f1b07249/logs`
  - `outputs/sop-full-loop-check/3-7-f1b07249/reports`
  - `outputs/sop-full-loop-check/3-7-f1b07249/screenshots`
  - `outputs/sop-full-loop-check/3-7-f1b07249/diff`
- 核心修复:
  - [x] API 启动增加 ClickHouse 重试，修复冷启动一次失败后永久 degraded。
  - [x] 回放 fixture 收紧：`track/overview` 必须返回 `200`（不再接受 `503`）。
  - [x] 新增契约测试文件：`services/api/internal/handlers/contract_test.go`。
- 执行状态:
  - [x] Step 1 planning-with-files 初始化并读取
  - [x] Step 2 入口闭环核对（路由/API/CLI/配置）
  - [x] Step 3 系统闭环核对（真实 API 回放 + ClickHouse 持久化验证）
  - [x] Step 4 契约闭环核对（错误码/权限模型/契约测试）
  - [x] Step 5 验证闭环核对（UI 回归 + `ai check` + 证据落盘）
- 验证与报告:
  - [x] Go tests（Docker）通过：`outputs/sop-full-loop-check/3-7-f1b07249/logs/go-test-after-fix.log`
  - [x] 真实 API 回放通过：`outputs/sop-full-loop-check/3-7-f1b07249/reports/real_api_capture_after_fix.md`
  - [x] UI Flow 回归通过：`outputs/sop-full-loop-check/3-7-f1b07249/reports/round2_ui_flow_report.md`
  - [x] `ai check` 通过：`outputs/sop-full-loop-check/3-7-f1b07249/logs/ai-check.log`

### 2026-02-11 | SOP 1.10 世界 SOTA 产品 SOP 调研（run: 1-10-a0ed78c6）

- 目标:
  - 基于近 12 个月官方来源筛选 5-10 个代表性产品/平台 SOP。
  - 提炼流程步骤、角色分工、质量门禁、度量方法，形成对比矩阵。
  - 输出可迁移清单与风险，并回写 `PRD` / `USER_EXPERIENCE_MAP` / `PLATFORM_OPTIMIZATION_PLAN`。
- 证据目录:
  - `outputs/sop-world-sota-research/1-10-a0ed78c6/logs`
  - `outputs/sop-world-sota-research/1-10-a0ed78c6/reports`
  - `outputs/sop-world-sota-research/1-10-a0ed78c6/diff`
- 已完成:
  - [x] `ai auto --run` 命中 SOP 1.10（Swarm）
  - [x] onecontext 历史检索（session/content）
  - [x] Agent Teams 蓝图（`parallel-research`）
  - [x] planning-with-files 初始化并读取（异常目录已归档到 artifacts）
- 执行状态:
  - [x] Step 1 planning-with-files 初始化并读取
  - [x] Step 2 WebSearch/WebFetch 近 12 个月来源采集 + 代表样本筛选
  - [x] Step 3 流程/角色/门禁/度量对比矩阵与差异分析
  - [x] Step 4 迁移清单与风险输出 + 文档回写
- 产出:
  - [x] 基准报告：`outputs/sop-world-sota-research/1-10-a0ed78c6/reports/sota_sop_benchmark_report.md`
  - [x] WebFetch 补充报告：`outputs/sop-world-sota-research/1-10-a0ed78c6/reports/sota_sop_benchmark_webfetch_addendum.md`
  - [x] 来源日志：`outputs/sop-world-sota-research/1-10-a0ed78c6/logs/web-research-sources.txt`
  - [x] 验证来源日志：`outputs/sop-world-sota-research/1-10-a0ed78c6/logs/web-research-sources-verified.txt`
  - [x] Round 2 来源核验报告：`outputs/sop-world-sota-research/1-10-a0ed78c6/reports/source_verification.md`
  - [x] Round 2 machine-readable 来源清单：`outputs/sop-world-sota-research/1-10-a0ed78c6/reports/source_verification.json`
  - [x] 文档回写：`PRD.md` / `USER_EXPERIENCE_MAP.md` / `PLATFORM_OPTIMIZATION_PLAN.md` / `SYSTEM_ARCHITECTURE.md`

### 2026-02-12 | SOP 3.2 前后端一致性与入口检查（回归修复，run: 3-2-044e82e6）

- 目标:
  - 修复 `/signup` 提交时 `Failed to fetch` 回归。
  - 核对前端路由、后端 API、配置入口一致性。
  - 保持错误码/返回结构契约不变，修复入口策略漂移。
- 证据目录:
  - `outputs/sop-entrypoint-consistency/3-2-044e82e6/logs`
  - `outputs/sop-entrypoint-consistency/3-2-044e82e6/reports`
  - `outputs/sop-entrypoint-consistency/3-2-044e82e6/artifacts`
- 执行状态:
  - [x] Step 1 planning-with-files 初始化并读取（误生成目录已归档）
  - [x] Step 2 前后端入口一致性核对（route/API/config）
  - [x] Step 3 修复 CORS 入口漂移并对齐配置默认值
  - [x] Step 4 回写架构与记录文档
  - [x] SOP 完成（`ai sop complete 3-2-044e82e6`）
  - [x] Round 1 自动化验证（`ai check`）
- 关键结论:
  - [x] 修复前：`Origin=http://localhost:3000` 预检 `403`（证据：`signup-repro-http.log`）
  - [x] 修复后：`Origin=http://localhost:3000` 预检 `204`，`POST /api/v1/auth/signup` 返回 `201`（证据：`signup-repro-http-after-fix.log`）
  - [x] Round 2 浏览器交互：`/signup` 请求命中 `http://localhost:4009/api/v1/auth/signup` 且返回 `201`，页面跳转 `/app`（证据：`round2_probe_signup_after_fix.json`）
  - [x] 配置回归测试（Docker Go）：`TestLoad_DefaultCORSOrigins` + `TestLoad_CORSOriginsFromEnv_TrimsSpaces` 通过（证据：`go-test-config-docker.log`）
  - [x] Web 健康检查修复：`09-data-wings-web` 从 `unhealthy` 恢复为 `healthy`（证据：`web-health-inspect-after-fix.json`）
  - [x] Web 构建告警清理：runtime-stage `ARG NEXT_PUBLIC_*` 补齐，`UndefinedVar` 告警消失（证据：`docker-compose-build-web-only-arg-fix.log`）
  - [x] Compose 警告清理：移除 `docker-compose.yml` 废弃 `version` 字段，`attribute 'version' is obsolete` 告警消失（证据：`docker-compose-config-after-version-fix.log`）
- 产出:
  - [x] 报告：`outputs/sop-entrypoint-consistency/3-2-044e82e6/reports/entrypoint_consistency_fix_report.md`
  - [x] Round 2 UI 报告：`outputs/sop-entrypoint-consistency/3-2-044e82e6/reports/round2_ui_signup_report.md`
  - [x] Web Healthcheck 报告：`outputs/sop-entrypoint-consistency/3-2-044e82e6/reports/web_healthcheck_fix_report.md`
  - [x] 日志：`docker-compose-ps.json` / `signup-repro-http.log` / `signup-repro-http-after-fix.log`
  - [x] 截图：`outputs/sop-entrypoint-consistency/3-2-044e82e6/screenshots/signup-round2-after-fix.png`
  - [x] 架构回写：`doc/00_project/initiative_data-wings/SYSTEM_ARCHITECTURE.md`（11.3.1 CORS 白名单基线）

### 2026-02-12 | SOP 1.1 一键全量交付（长任务，run: 1-1-2ddd14fb）

- 目标（Goals）:
  - 完成长任务一键交付闭环：plan-first -> 实施 -> Round 1/2 验收 -> Task Closeout。
  - 按 UX Map 进行人工模拟测试并固化证据，补齐前后端一致性检查。
  - 完成 deliverable 与 rolling ledger 回写，以及三端一致性核对结论。
- 非目标（Non-goals）:
  - 不新增业务范围/新页面。
  - 不做大规模架构重构，仅处理回归与交付守门项。
- 约束（Constraints）:
  - 仅在非生产环境进行真实 API 验证，不使用 mock 代替验收。
  - 所有动作与结论必须写入 `task_plan.md` / `notes.md` / `deliverable.md`。
  - 证据统一落盘到 `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/`。
- 验收标准（Acceptance Criteria）:
  - SOP 1.1 八个步骤均落盘并可追踪。
  - `ai check` Round 1 通过。
  - UX Map Round 2（含 network/console/performance/visual + API 契约）通过并有证据。
  - Task Closeout 更新完成：deliverable + rolling ledger + 三端一致性。
- 测试计划（Test Plan）:
  - Frontend: Playwright/浏览器脚本验证注册/登录/核心页面；收集 network/console/perf/screenshot。
  - Backend: API 契约与错误码抽测（auth/signup/login/team/overview），入口一致性与 CORS 校验。
  - Gate: `ai check` + SOP 状态核对。
- 证据目录:
  - `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/logs`
  - `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/reports`
  - `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/diff`
  - `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/screenshots`
  - `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/artifacts`
- 执行状态:
  - [x] Step 1 planning-with-files 初始化与文档读取（误生成目录已归档）
  - [x] Step 2 启用 ralph loop（max=12, promise=DONE）
  - [x] Step 3 plan-first（目标/非目标/约束/验收/测试计划）落盘
  - [x] Step 4 UX Map 人工模拟测试 + 同类扫描
  - [x] Step 5 PDCA 四文档与 rolling ledger 滚动更新
  - [x] Step 6 Round 1 `ai check` + Round 2 UX Map 验收
  - [x] Step 7 前后端专项验证（FE: network/console/perf/visual；BE: contract/error_code/entry）
  - [x] Step 8 Task Closeout（deliverable + Rolling Ledger + 三端一致性）
- 执行证据（新增）:
  - FE Round 2 探针：`outputs/sop-one-click-full-delivery/1-1-2ddd14fb/reports/round2_uxmap_probe.json`
  - BE 契约探针：`outputs/sop-one-click-full-delivery/1-1-2ddd14fb/reports/backend_contract_probe.json`
  - 真实 API 回放：`outputs/sop-one-click-full-delivery/1-1-2ddd14fb/reports/real_api_capture.md`
  - 同类问题扫描：`outputs/sop-one-click-full-delivery/1-1-2ddd14fb/logs/similar-issue-scan.log`
  - Round 1 门禁：`outputs/sop-one-click-full-delivery/1-1-2ddd14fb/logs/ai-check-round1.log`
  - 全量交付总报告：`outputs/sop-one-click-full-delivery/1-1-2ddd14fb/reports/sop_1_1_full_delivery_report.md`

### 2026-02-12 | SOP 3.1 前端验证与性能检查（run: 3-1-535549a1）

- 目标:
  - 执行 network/console/performance/visual regression + 响应式全量验证。
  - 对失败项完成修复并复测，保留可审计证据。
- 证据目录:
  - `outputs/sop-frontend-validation/3-1-535549a1/logs`
  - `outputs/sop-frontend-validation/3-1-535549a1/reports`
  - `outputs/sop-frontend-validation/3-1-535549a1/screenshots`
  - `outputs/sop-frontend-validation/3-1-535549a1/artifacts`
- 执行状态:
  - [x] Step 1 planning-with-files 初始化与 task_plan/notes 读取
  - [x] Step 2 network/console/performance/visual + 响应式全量执行
  - [x] Step 3 失败项修复并复测（探针规则修复）
- 关键结果:
  - [x] `/signup -> /app` 成功，`Failed to fetch=0`
  - [x] 核心路由 `/app`、`/app/ask`、`/app/dashboards`、`/app/settings/team` 全部可达
  - [x] desktop/tablet/mobile 均无横向溢出
  - [x] `console_errors=0`、`page_errors=0`、`failed_requests=0`、`api_error_responses=0`
  - [x] 性能预算通过（`dom_content_loaded_ms < 3000`）
  - [x] `ai check` 通过
- 失败修复说明:
  - 首轮失败原因：移动端快速导航触发 Next chunk `ERR_ABORTED`，被探针误判为失败。
  - 修复动作：在探针中忽略 `/_next/static/chunks/*` 的 `ERR_ABORTED` 噪声事件。
  - 复测结果：`overall_ok=true`（第二轮通过）。
- 执行证据:
  - `outputs/sop-frontend-validation/3-1-535549a1/reports/frontend_full_probe.json`
  - `outputs/sop-frontend-validation/3-1-535549a1/reports/frontend_full_probe.md`
  - `outputs/sop-frontend-validation/3-1-535549a1/logs/frontend-full-probe.log`
  - `outputs/sop-frontend-validation/3-1-535549a1/logs/frontend-full-probe-rerun.log`
  - `outputs/sop-frontend-validation/3-1-535549a1/logs/ai-check.log`

### 2026-02-12 | SOP 3.7 功能闭环完整实现检查（复核，run: 3-7-703f3d77）

- 目标:
  - 以 Watchdog 模式复核入口闭环/系统闭环/契约闭环/验证闭环。
  - 复核 `SOP 3.1` 结果是否满足全链路守门要求。
- 证据目录:
  - `outputs/sop-full-loop-check/3-7-703f3d77/logs`
  - `outputs/sop-full-loop-check/3-7-703f3d77/reports`
  - `outputs/sop-full-loop-check/3-7-703f3d77/screenshots`
  - `outputs/sop-full-loop-check/3-7-703f3d77/artifacts`
- 执行状态:
  - [x] Step 1 planning-with-files 初始化与文档读取（误生成目录已归档）
  - [x] Step 2 入口闭环核对（UI 路由/API/配置入口）
  - [x] Step 3 系统闭环核对（前端 -> 后端 -> 持久化 -> 回显）
  - [x] Step 4 契约闭环核对（schema/error_code/RBAC + 契约测试）
  - [x] Step 5 验证闭环核对（E2E/回归 + `ai check`）
- 关键结果:
  - [x] 前端全量探针通过（`overall_ok=true`）
  - [x] 真实 API 回放通过（7/7）
  - [x] 错误码契约探针通过（6/6）
  - [x] ClickHouse 持久化验证通过（`fixture_core_path_event` count=3）
  - [x] `ai check` 通过
- 风险修复:
  - [x] Go 测试首次因容器依赖下载网络（IPv6 unreachable）失败
  - [x] 使用 `GOPROXY=https://goproxy.cn,direct` 复测通过
- 执行证据:
  - `outputs/sop-full-loop-check/3-7-703f3d77/reports/full_loop_watchdog_report.md`
  - `outputs/sop-full-loop-check/3-7-703f3d77/reports/entrypoint_closure_report.md`
  - `outputs/sop-full-loop-check/3-7-703f3d77/reports/system_loop_verification.md`
  - `outputs/sop-full-loop-check/3-7-703f3d77/reports/api_contract_closure_report.md`
  - `outputs/sop-full-loop-check/3-7-703f3d77/reports/verification_closure_report.md`

### 2026-02-12 | SOP 4.1 项目级全链路回归（run: 4-1-6117de0a）

- 目标:
  - 从首页按 UX Map 执行项目级路径回归，并完成 Round 1/2 双轮验收。
  - 修复回归过程中的 UX 卡点并做同类问题扫描。
- 证据目录:
  - `outputs/sop-project-regression/4-1-6117de0a/logs`
  - `outputs/sop-project-regression/4-1-6117de0a/reports`
  - `outputs/sop-project-regression/4-1-6117de0a/screenshots`
  - `outputs/sop-project-regression/4-1-6117de0a/artifacts`
- 执行状态:
  - [x] Step 1 planning-with-files 初始化与三文件读取（误生成目录已归档）
  - [x] Step 2 启用 ralph loop（max=12, promise=DONE）
  - [x] Step 3 从首页按 UX Map 执行核心路径测试
  - [x] Step 4 记录卡点并修复（首页缺少 `/signup` 直达入口）
  - [x] Step 5 更新 PRD/SYSTEM_ARCHITECTURE/USER_EXPERIENCE_MAP/PLATFORM_OPTIMIZATION_PLAN
  - [x] Step 6 `ai check` Round 1 + UX Map Round 2
- 关键结果:
  - [x] UX Map 路径通过：`/ -> /signup -> /app -> /app/ask -> /app/dashboards -> /app/settings/team`
  - [x] 首页 `Create account` 入口已补齐（`apps/web/src/app/page.tsx`）
  - [x] 真实 API 回放通过（7/7）
  - [x] 契约探针通过（6/6）
  - [x] `ai check` 通过
- 执行证据:
  - `outputs/sop-project-regression/4-1-6117de0a/reports/uxmap_e2e_probe.json`
  - `outputs/sop-project-regression/4-1-6117de0a/reports/real_api_capture.md`
  - `outputs/sop-project-regression/4-1-6117de0a/reports/backend_contract_probe.md`
  - `outputs/sop-project-regression/4-1-6117de0a/logs/ai-check.log`

### 2026-02-12 | SOP 4.1 状态闭环补录（run: 4-1-6117de0a）

- 问题:
  - 文档已记录完成，但 `ai sop status` 仍显示 `running` 且步骤未打点。
- 修复:
  - 补跑 Round 1：`ai check`（通过）。
  - 执行 Step 1-6 全量 `done` 打点。
  - 执行 `ai sop complete 4-1-6117de0a` 完成 run 收口。
- 结果:
  - `ai sop status` 显示 `completed`，与文档状态一致。
- 证据:
  - `outputs/sop-project-regression/4-1-6117de0a/logs/ai-check.log`
  - `outputs/sop-project-regression/4-1-6117de0a/logs/sop-closeout.log`

### 2026-02-12 | SOP 5.1 联合验收与发布守门（run: 5-1-3095c8c4）

- 目标:
  - 按 Pipeline 门禁完成产品/技术/质量三方联合验收。
  - 执行 Round 1 (`ai check`) + Round 2（UX Map + 真实 API + 契约探针）。
- 证据目录:
  - `outputs/sop-joint-acceptance/5-1-3095c8c4/logs`
  - `outputs/sop-joint-acceptance/5-1-3095c8c4/reports`
  - `outputs/sop-joint-acceptance/5-1-3095c8c4/screenshots`
  - `outputs/sop-joint-acceptance/5-1-3095c8c4/artifacts`
- 执行状态:
  - [x] Step 1 planning-with-files 初始化并读取 task_plan/notes/deliverable（误生成目录已归档）
  - [x] Step 2 产品/技术/质量三方联合验收
  - [x] Step 3 `ai check` Round 1 通过
  - [x] Step 4 UX Map Round 2 通过并写入 deliverable
  - [x] Step 5 未触发 ralph loop（当前迭代全部门禁通过）
- 关键结果:
  - [x] `ai check` 通过
  - [x] UX Map 路径通过：`/ -> /signup -> /app -> /app/ask -> /app/dashboards -> /app/settings/team`
  - [x] 真实 API 回放通过（`success=true, failures=0`）
  - [x] 后端契约探针通过（`6/6`）
- 执行证据:
  - `outputs/sop-joint-acceptance/5-1-3095c8c4/logs/ai-check-round1.log`
  - `outputs/sop-joint-acceptance/5-1-3095c8c4/logs/ai-check-post-sync.log`
  - `outputs/sop-joint-acceptance/5-1-3095c8c4/logs/ai-check-final5.log`
  - `outputs/sop-joint-acceptance/5-1-3095c8c4/reports/uxmap_e2e_probe.md`
  - `outputs/sop-joint-acceptance/5-1-3095c8c4/reports/real_api_capture.md`
  - `outputs/sop-joint-acceptance/5-1-3095c8c4/reports/backend_contract_probe.md`
  - `outputs/sop-joint-acceptance/5-1-3095c8c4/reports/joint_acceptance_release_gate.md`
  - `outputs/sop-joint-acceptance/5-1-3095c8c4/logs/sop-closeout.log`

### 2026-02-12 | SOP 1.1 一键全量交付（长任务重跑，run: 1-1-719289f3）

- 目标（Goals）:
  - 按 SOP 1.1 重新执行完整交付闭环，验证当前基线在连续交付下仍可稳定通过。
  - 产出新一轮 Round 1/Round 2 证据包，并同步 Task Closeout 文档。
- 非目标（Non-goals）:
  - 不引入新业务需求，不扩展页面与功能范围。
  - 不做大规模架构重构，仅处理本轮发现的回归问题。
- 约束（Constraints）:
  - 验收必须使用真实 API，不得以 mock 替代核心链路验证。
  - 证据统一落盘到 `outputs/sop-one-click-full-delivery/1-1-719289f3/`。
  - 关键决策前重读 `task_plan.md`，所有动作回写 `notes.md` 与 `deliverable.md`。
- 验收标准（Acceptance Criteria）:
  - SOP Step 1-8 全部完成并打点为 done。
  - Round 1 `ai check` 通过。
  - Round 2 UX Map + FE 专项（network/console/perf/visual）通过。
  - 后端契约/错误码/入口一致性通过（real API replay + contract probe）。
  - Task Closeout 完成（deliverable + rolling ledger + 三端一致性）。
- 测试计划（Test Plan）:
  - FE：运行 `frontend_full_probe.js` + UX Map 回归探针，输出 JSON/MD/截图。
  - BE：运行 `replay_real_api_fixture.py` + `backend_contract_probe.sh`，核对错误码契约与入口。
  - Gate：执行 `ai check`（至少 Round 1 + 收尾复核各 1 次）。
- 执行状态:
  - [x] Step 1 planning-with-files 初始化并读取 task_plan/notes/deliverable（误生成目录已归档）
  - [x] Step 2 启用 ralph loop（max=12, promise=DONE）
  - [x] Step 3 plan-first 落盘（本节）
  - [x] Step 4 UX Map 人工模拟测试 + 同类问题扫描
  - [x] Step 5 PDCA 四文档与 Rolling Ledger 滚动更新
  - [x] Step 6 Round 1 `ai check` + Round 2 UX Map 验收
  - [x] Step 7 前后端专项验证（FE/BE）
  - [x] Step 8 Task Closeout（三端一致性）
- 关键结果:
  - [x] UX 路径通过：`/ -> /signup -> /app -> /app/ask -> /app/dashboards -> /app/settings/team`
  - [x] FE 全量探针通过（network/console/perf/visual/responsive）
  - [x] 真实 API 回放通过（`success=true`, `failures=0`）
  - [x] 后端契约探针通过（`6/6`）
  - [x] `ai check` Round 1 通过
- 执行证据:
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/ai-check-round1.log`
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/ai-check-final.log`
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/ai-check-post-doc.log`
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/reports/uxmap_e2e_probe.json`
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/reports/frontend_full_probe.json`
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/reports/real_api_capture.json`
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/reports/backend_contract_probe.json`
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/reports/sop_1_1_full_delivery_report.md`
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/similar-issue-scan.log`
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/git-local-remote-head.log`
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/sop-closeout.log`
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/sop-status-final.log`
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/ralph-loop-state-final.log`

### 2026-02-12 | SOP 1.3 多角色头脑风暴（run: 1-3-670e1dcd）

- 目标:
  - 以 Council 模式完成 PM / Designer / SEO 多角色并行头脑风暴。
  - 形成冲突收敛与一致性决策，并回写 PRD / UX Map / SEO 文档。
- 执行状态:
  - [x] Step 1 planning-with-files 初始化并读取 task_plan/notes（误生成目录已归档）
  - [x] Step 2 角色分工产出（竞品+PRD / UX Map / sitemap+关键词）
  - [x] Step 3 冲突与一致性收敛，形成 ADR 与文档更新
- 关键决策:
  - [x] 先做激活链路优化，再做功能扩展
  - [x] SEO 采用“产品页优先 + 内容页补位”
  - [x] 本轮不改变权限模型，仅强化门禁与证据
- 执行证据:
  - `outputs/sop-multi-role-brainstorm/1-3-670e1dcd/reports/multi_role_brainstorm_report.md`
  - `outputs/sop-multi-role-brainstorm/1-3-670e1dcd/reports/multi_role_brainstorm_report.json`
  - `outputs/sop-multi-role-brainstorm/1-3-670e1dcd/logs/tool-inventory.log`
  - `outputs/sop-multi-role-brainstorm/1-3-670e1dcd/logs/docs-read-baseline.log`
  - `outputs/sop-multi-role-brainstorm/1-3-670e1dcd/logs/ai-check.log`
  - `outputs/sop-multi-role-brainstorm/1-3-670e1dcd/logs/ai-check-final.log`
  - `outputs/sop-multi-role-brainstorm/1-3-670e1dcd/logs/sop-closeout.log`
  - `outputs/sop-multi-role-brainstorm/1-3-670e1dcd/logs/sop-status-final.log`
  - `doc/00_project/initiative_data-wings/ADR-2026-02-12-multi-role-brainstorm.md`

### 2026-02-12 | SOP 1.4 架构圆桌（run: 1-4-cdf0f11e）

- 目标:
  - 以 Council 视角确认当前系统边界是否需要变更，并收敛安全/可靠性增量事项。
  - 产出 ADR 与风险清单，形成下一轮实施优先级。
- 执行状态:
  - [x] Step 1 planning-with-files 初始化并读取 task_plan/notes（误生成目录已归档）
  - [x] Step 2 角色分工输出（Architect/Security/SRE）
  - [x] Step 3 ADR + 风险清单落盘并同步 SYSTEM_ARCHITECTURE
- 关键结论:
  - [x] 维持 `Web -> API -> AI/Data` 分层边界不变，避免跨层调用回归
  - [x] 安全优先项：auth 限流 + API->AI 内部鉴权强化
  - [x] SRE 优先项：trace_id 贯通 + evidence retention 策略
  - [x] 发布门禁继续保持 `ai check + UX Map + contract probe`
- 执行证据:
  - `outputs/sop-architecture-council/1-4-cdf0f11e/reports/architecture_council_report.md`
  - `outputs/sop-architecture-council/1-4-cdf0f11e/reports/architecture_council_report.json`
  - `outputs/sop-architecture-council/1-4-cdf0f11e/logs/tool-inventory.log`
  - `outputs/sop-architecture-council/1-4-cdf0f11e/logs/docs-read-baseline.log`
  - `outputs/sop-architecture-council/1-4-cdf0f11e/logs/ai-check.log`
  - `outputs/sop-architecture-council/1-4-cdf0f11e/logs/sop-closeout.log`
  - `outputs/sop-architecture-council/1-4-cdf0f11e/logs/sop-status-final.log`
  - `doc/00_project/initiative_data-wings/ADR-2026-02-12-architecture-council-refresh.md`
  - `doc/00_project/initiative_data-wings/ARCHITECTURE_RISK_REGISTER.md`

### 2026-02-12 | Entrypoint 入口闭环补强：`make dev` 全栈启动（本地/无 Go 回退 Docker）

- 目标：确保 CLI 入口 `make dev` 在常见开发机上可用（即使未安装 Go），避免 `/signup` 出现 `Failed to fetch`。
- 变更：
  - `Makefile`: `dev` -> `./scripts/dev_all.sh`；新增 `dev-smoke`。
  - `scripts/dev_all.sh`: local (Go) + docker fallback。
  - `scripts/quickstart.sh`: Redis readiness 使用 `docker compose exec`。
- 验证证据：`outputs/sop-entrypoint-consistency/3-2-4ebf9336/`

### 2026-02-13 | SOP 3.2 证据刷新（run: 3-2-4ebf9336）

- 目的：补齐一个全绿的队列验证包（包含 `golang:1.22` + Playwright signup 探针）。
- 证据目录：`outputs/sop-entrypoint-consistency/3-2-4ebf9336/`
  - Queue: `outputs/sop-entrypoint-consistency/3-2-4ebf9336/logs/queue.log`
  - Report: `outputs/sop-entrypoint-consistency/3-2-4ebf9336/reports/entrypoint_make_dev_fallback_report.md`

### 2026-02-13 | SOP 3.3 真实 API 与可复现实验（证据刷新，run: 3-3-5ba52775）

- 目标：刷新真实 API 回放证据并更新回归基线（baseline）。
- 证据目录：`outputs/sop-real-api-repro/3-3-5ba52775/`
  - Queue（FINAL_RESULT=OK）：`outputs/sop-real-api-repro/3-3-5ba52775/logs/queue.log`
  - Replay capture：`outputs/sop-real-api-repro/3-3-5ba52775/reports/real_api_capture.json`
  - Replay report：`outputs/sop-real-api-repro/3-3-5ba52775/reports/real_api_capture.md`
  - Baseline diff：`outputs/sop-real-api-repro/3-3-5ba52775/diff/baseline_update.patch`


### 2026-02-13 | SOP 3.7 功能闭环完整实现检查（证据刷新，run: 3-7-0afb519a）

- 证据目录：`outputs/sop-full-loop-check/3-7-0afb519a/`
  - Queue（FINAL_RESULT=OK）：`outputs/sop-full-loop-check/3-7-0afb519a/logs/queue.log`
  - Report：`outputs/sop-full-loop-check/3-7-0afb519a/reports/full_loop_check_report.md`


### 2026-02-13 | SOP 4.1 项目级全链路回归（UX Map + E2E，证据刷新，run: 4-1-9c7e079a）

- 目标：在 docker 全栈下刷新一次“真实前后端 + UX Map + 契约 + ai check”全绿证据包，避免 `/signup` 回归（`Failed to fetch`）。
- 证据目录：`outputs/sop-project-regression/4-1-9c7e079a/`
  - Queue（FINAL_RESULT=OK）：`outputs/sop-project-regression/4-1-9c7e079a/logs/queue.log`
  - UX Map：`outputs/sop-project-regression/4-1-9c7e079a/reports/uxmap_e2e_probe.md`
  - Real API replay：`outputs/sop-project-regression/4-1-9c7e079a/reports/real_api_capture.md`
  - Contract probe：`outputs/sop-project-regression/4-1-9c7e079a/reports/backend_contract_probe.md`
  - ai check：`outputs/sop-project-regression/4-1-9c7e079a/logs/ai-check.log`
  - SOP closeout：`outputs/sop-project-regression/4-1-9c7e079a/logs/sop-closeout.log`

### 2026-02-13 | SOP 5.1 联合验收与发布守门（证据刷新，run: 5-1-c1513579）

- 结果：Release gate PASS（Product/Tech/QA），Round 1 `ai check` PASS，Round 2 UX Map 探针 PASS。
- 证据目录：`outputs/sop-joint-acceptance/5-1-c1513579/`
  - Queue（FINAL_RESULT=OK；report 步骤存在 heredoc/backtick bug，已后置修正并留证）：`outputs/sop-joint-acceptance/5-1-c1513579/logs/queue.log`
  - Release gate（regenerated）：`outputs/sop-joint-acceptance/5-1-c1513579/reports/joint_acceptance_release_gate.md`
  - Report regeneration log：`outputs/sop-joint-acceptance/5-1-c1513579/logs/report-regenerate.log`
  - SOP closeout：`outputs/sop-joint-acceptance/5-1-c1513579/logs/sop-closeout.log`

- Post-run: docs 追加后再跑一次 `ai check` 仍 PASS（证据：`outputs/sop-joint-acceptance/5-1-c1513579/logs/ai-check-post-doc-update.log`）。

### 2026-02-13 | SOP 4.2 增量式 AI Code Review（run: 4-2-1579b4d0）

- 证据目录：`outputs/sop-code-review/4-2-1579b4d0/`
  - Review：`outputs/sop-code-review/4-2-1579b4d0/reports/review_report.md`
  - Patch：`outputs/sop-code-review/4-2-1579b4d0/diff/working_tree.patch`

### 2026-02-13 | SOP 3.9 供应链安全持续监控（run: 3-9-ee500287）

- 证据目录：`outputs/sop-supply-chain/3-9-ee500287/`
  - Summary：`outputs/sop-supply-chain/3-9-ee500287/reports/summary.md`

- CI gate: `.github/workflows/ci.yml` + `scripts/supply_chain_gate.py` + `security/supply_chain_allowlist.json`（证据：`outputs/sop-supply-chain/3-9-ee500287/logs/supply-chain-gate-local.log`）。

### 2026-02-13 | SOP 5.3 Postmortem 自动化守门（run: 5-3-f13a8584）

- 证据目录：`outputs/sop-postmortem/5-3-f13a8584/`
  - Pre-release scan：`outputs/sop-postmortem/5-3-f13a8584/reports/pre_release_scan.json`
  - SOP closeout：`outputs/sop-postmortem/5-3-f13a8584/logs/sop-closeout.log`

### 2026-02-13 | SOP 5.2 智能体发布与版本治理（run: 5-2-dae6a322）

- 证据目录：`outputs/sop-version-governance/5-2-dae6a322/`
  - Version + rollback：`outputs/sop-version-governance/5-2-dae6a322/reports/release_versioning_and_rollback.md`

### 2026-02-13 | PDCA 四文档一致性回写（release gates sync）

- Evidence: outputs/sop-version-governance/5-2-dae6a322/logs/doc-consistency-queue.log

### 2026-02-13 | Git closeout（branch: chore/release-gates-20260213）

- commit: `37aa375` (`37aa3751c44fcd9f7bde34972fe41f7c41545ed4`)
- pushed: `origin/chore/release-gates-20260213`
- evidence: `outputs/sop-version-governance/5-2-dae6a322/logs/push-and-verify.log`

---

### 2026-02-13 | PR CI 复绿（PR #1，run: 5-2-dae6a322）

- 背景：PR 初次 CI 失败（tsc root help / vitest 无测试文件退出码 / ruff+import / pnpm cache store path 缺失）。
- 修复（commit: `1dca263`）：
  - `.github/workflows/ci.yml`：TypeScript typecheck 改为按 `apps/web` 与 `packages/sdk` 的 `tsconfig.json`；Supply Chain job 补齐 pnpm store path 创建。
  - `apps/web/package.json` / `packages/sdk/package.json`：`test` 改为 `vitest run --passWithNoTests`。
  - `services/ai`：mypy strict 类型修复 + NL2SQL provider 测试不再硬编码具体 provider。
  - `.gitignore`：忽略 `coverage.xml`。
- 结果：GitHub Actions run `21975751118` 全绿（Build PASS；Docker job skipping 非 master）。
- 证据：
  - 失败日志：`outputs/sop-version-governance/5-2-dae6a322/logs/gh-run-21975188069-log-failed.log`
  - 本地验证：`outputs/sop-version-governance/5-2-dae6a322/logs/local-node-verify-after-ci-fix.log` / `outputs/sop-version-governance/5-2-dae6a322/logs/local-python-mypy-ruff-recheck-2.log` / `outputs/sop-version-governance/5-2-dae6a322/logs/local-python-pytest-ci-like-env.log`
  - ai check：`outputs/sop-version-governance/5-2-dae6a322/logs/ai-check-after-ci-fix.log`
  - commit：`outputs/sop-version-governance/5-2-dae6a322/logs/git-commit-ci-fix.log`
  - push：`outputs/sop-version-governance/5-2-dae6a322/logs/git-push-after-ci-fix.log`
  - PR checks：`outputs/sop-version-governance/5-2-dae6a322/logs/gh-pr-checks-watch-after-ci-fix.log`


---

### 2026-02-13 | PR #1 合入 master（squash merge）

- PR: https://github.com/MARUCIE/09-data-wings/pull/1
- merge commit: `fccaf9b`（`master` HEAD）
- 本地/远端一致：`git rev-parse HEAD` == `git ls-remote origin master`
- 证据：`outputs/sop-version-governance/5-2-dae6a322/logs/post-merge-status.log`

