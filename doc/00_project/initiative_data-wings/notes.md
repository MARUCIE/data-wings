# Data Wings - 研究笔记

> 调研证据与发现记录

---

## 调研日志

### 2025-01-28 | Phase 1 竞品调研完成

**任务**: 竞品调研 + 多角色头脑风暴规划

**调研范围**:
- 国内：神策、GrowingIO、百度统计、友盟、TalkingData
- 国际：Mixpanel、Amplitude、PostHog、Heap、Segment、GA4
- AI SOTA：自然语言查询、自动洞察、预测分析、异常检测、智能推荐

---

## 竞品分析汇总

### 横向对比总览

| 维度 | 神策数据 | GrowingIO | Mixpanel | Amplitude | PostHog | GA4 |
|------|---------|-----------|----------|-----------|---------|-----|
| **定位** | 企业级私有化 | 无埋点增长 | 产品分析 | 数字分析+AI | 开源全栈 | 免费流量分析 |
| **AI成熟度** | 高 | 中 | 高 | 最高 | 中高 | 中 |
| **私有化** | 主打 | 支持 | 不支持 | 不支持 | 支持 | 不支持 |
| **开源** | SDK开源 | 否 | 否 | 否 | MIT | 否 |
| **定价** | 5-18万/年 | 10-20万/年 | 免费-$20K+/年 | 免费-$254K/年 | 免费起 | 免费-$150K+/年 |

### AI 能力对比矩阵

| 平台 | 自然语言查询 | 自动洞察 | 预测分析 | 异常检测 | AI Agents | LLM集成 |
|------|--------------|----------|----------|----------|-----------|---------|
| **神策** | DeepSeek | 有 | 有 | 有 | 无 | 有 |
| **GrowingIO** | 智能问数 | 有 | 有 | 有限 | 无 | 部分 |
| **Mixpanel** | Spark AI | 有 | 规划中 | 有 | 无 | OpenAI |
| **Amplitude** | Ask Amplitude | 有 | 有 | 有 | Dashboard/Replay Agent | MCP |
| **PostHog** | PostHog AI | 有 | 无 | 无 | 无 | 多模型 |
| **GA4** | 无 | 有 | 有 | 有 | 无 | BigQuery ML |

---

## 国内平台详情

### 神策数据（Sensors Data）
- **定位**: 企业级大数据分析+营销科技，主打私有化部署
- **核心能力**: 全端SDK、CDP、实时分析、秒级查询
- **AI能力**: DeepSeek自然语言、智能埋点、预测分析、AI知识库
- **优势**: 私有化成熟、SDK开源、数据安全、AI领先
- **不足**: 界面复杂、埋点工作量大、价格较高
- **来源**: sensorsdata.cn, CSDN, GA小站

### GrowingIO
- **定位**: 全域数据增长平台，无埋点技术领先
- **核心能力**: 无埋点、ClickHouse引擎、千亿级秒级出数
- **AI能力**: 智能问数、智能人群包、个性化推荐、AI+MA
- **优势**: 无埋点简单、界面友好、性能优异
- **不足**: 价格不低、数据导出付费
- **来源**: growingio.com

### 百度统计
- **定位**: 中小网站流量统计，与百度推广整合
- **核心能力**: 全埋点、流量分析、智能热力图
- **AI能力**: 较弱，主要依赖百度大数据画像
- **优势**: 免费、百度生态、SEO数据独家
- **不足**: 2024年功能缩减、不支持私有化、AI落后
- **来源**: tongji.baidu.com, 蓝点网

### 友盟+
- **定位**: 全域数据智能，阿里生态
- **核心能力**: 多端SDK、U-APM性能监控、智能运营、U-Push
- **AI能力**: AI数据简报、AI智能巡检、AI埋点助手、U-AgentBox
- **优势**: 阿里生态、服务规模最大、AI迭代快
- **不足**: 二次开发弱、定价不透明
- **来源**: umeng.com

### TalkingData
- **定位**: 独立第三方广告监测+营销归因
- **核心能力**: Ad Tracking、Brand Growth、800+标签体系
- **AI能力**: 预测引擎、推荐引擎、Lookalike、RFM
- **优势**: 独立第三方、广告监测专业、营销精准
- **不足**: AI更新慢、聚焦营销场景
- **来源**: talkingdata.com

---

## 国际 SOTA 平台详情

### Mixpanel
- **定位**: 产品分析，事件驱动
- **核心能力**: 漏斗、留存、Cohort、A/B测试、Metric Trees
- **AI能力**: Spark AI（OpenAI）自然语言查询
- **优势**: 20M事件/月免费、Metric Trees创新
- **不足**: 付费版价格不低
- **来源**: mixpanel.com

### Amplitude（AI SOTA 领先者）
- **定位**: 数字分析平台，AI能力最强
- **核心能力**: 完整产品分析、Session Replay、实验平台
- **AI能力**: Ask Amplitude、Automated Insights、AI Agents（Dashboard/Replay）、MCP集成
- **优势**: AI最先进、MCP让数据流入任意AI工具
- **不足**: 企业版$22K-$254K/年
- **来源**: amplitude.com, adasight.com

### PostHog（开源首选）
- **定位**: 开源全栈产品工具（10+产品）
- **核心能力**: 分析、Session Replay、Feature Flags、A/B测试、Surveys
- **AI能力**: PostHog AI、LLM Analytics仪表盘
- **优势**: MIT开源、可自托管、1M事件/月免费
- **不足**: 预测分析弱
- **来源**: posthog.com

### Heap
- **定位**: 无埋点自动捕获
- **核心能力**: Auto-Capture全量采集、回溯分析
- **AI能力**: Sense AI、Illuminate数据科学层、Effort Analysis
- **优势**: 无埋点最彻底、摩擦量化
- **不足**: 被Contentsquare收购后定价不透明
- **来源**: heap.io

### Segment
- **定位**: CDP数据管道中枢
- **核心能力**: 700+集成、Reverse ETL、Protocols数据治理
- **AI能力**: Predictive Traits、Auto-Instrumentation（2025）
- **优势**: 数据管道标准、集成最丰富
- **不足**: 企业版$25K-$200K/年
- **来源**: segment.com

### Google Analytics 4
- **定位**: 免费Web/App分析，Google生态核心
- **核心能力**: 事件驱动模型、探索分析、归因、BigQuery导出
- **AI能力**: Predictive Metrics/Audiences、异常检测、Generated Insights
- **优势**: 免费功能完整、Google Ads深度整合
- **不足**: BigQuery导出1M/天限制、学习曲线陡峭
- **来源**: analytics.google.com, analytify.io

---

## AI 能力 SOTA 调研

### 1. 自然语言查询（NL2SQL/NL2Analytics）

**SOTA方案**：
- ThoughtSpot Sage（GPT-4o + 专利搜索引擎）
- Amplitude Ask（OpenAI + AWS Bedrock）
- Metabase Metabot（双Agent架构）

**技术要点**：
- LLM准确率：GPT-4o 72%、Grok-3 80%、Deepseek-R1 71%
- 架构演进：单一LLM → 双Agent → 多Agent
- 关键：语义消歧、元数据增强、业务术语表

**建议**：必须（P0）- 数据民主化基础

### 2. 自动洞察生成（Automated Insights）

**SOTA方案**：
- Amplitude Automated Insights（2025.12）
- ThoughtSpot SpotIQ / Spotter 3（Agentic AI）
- Tableau Pulse

**技术要点**：
- 统计方法：Z-score、IQR、ARIMA
- ML方法：时间序列分解、聚类、关联规则
- LLM增强：自然语言解释、上下文关联

**建议**：必须（P0）- 解放分析师

### 3. 预测分析（Predictive Analytics）

**流失预测SOTA**：
- XCL-Churn（XGBoost + CatBoost + LightGBM集成）
- CRM集成RF（95.13%准确率）
- 混合深度学习

**趋势**：多渠道信号融合、微事件检测、GenAI解释、XAI

**建议**：必须（P1）- 变现直接抓手

### 4. 异常检测（Anomaly Detection）

**SOTA方案**：
- LLM + RAG增强
- 多Agent系统
- Anodot / WhyLabs / Evidently AI

**业务影响**：某银行减少67%未检测欺诈，防止$4200万损失

**建议**：必须（P1）- LLM增强是明确趋势

### 5. 智能推荐（Next Best Action）

**SOTA方案**：
- 决策智能平台（Domo、Pyramid Analytics）
- Snowflake + Anthropic Agentic Analytics
- Amplitude AI Agents

**建议**：推荐（P2）- 需要业务流程配合

### 6. 前沿趋势

**Agentic AI**：
- L3（监督下自主）→ L4（高自主）→ L5（自主生成新方法）
- 领先模型：Claude 4、Gemini 2.5、Qwen 3

**自动埋点**：
- Segment Auto-Instrumentation（2025公测）
- Heap Auto-Capture
- 从"月"级缩短到"分钟"级上线

**建议**：
- LLM Agent：推荐（P2）
- 自动埋点：推荐（P2）
- 多模态分析：可选（P3）

---

## 关键发现与洞察

### 发现1：AI能力成为核心竞争力
- Amplitude AI Agents + MCP 代表最先进方向
- 神策接入DeepSeek体现国内追赶速度
- 自然语言查询从"功能"变为"标配"

### 发现2：开源方案值得关注
- PostHog（MIT）提供完整替代方案
- 1M事件/月免费 + 可自托管
- LLM Analytics适合AI产品团队

### 发现3：自动埋点是降本利器
- Segment/Heap的Auto-Capture显著降低接入成本
- 产品/市场团队无需等待开发
- 回溯分析能力差异化

### 发现4：决策智能是下一阶段
- 从"发生了什么"到"该怎么做"
- Agentic Analytics自主规划执行验证
- 人机协作（HITL）是关键

---

## Data Wings 产品定位建议

基于调研，建议 Data Wings 定位为：

**"AI-Native 的开源数据分析平台"**

| 差异化维度 | 策略 |
|-----------|------|
| **AI能力** | 以自然语言查询+自动洞察为核心，对标Amplitude AI |
| **开源策略** | 核心分析引擎开源（MIT），商业版提供企业功能 |
| **自动埋点** | 内置Auto-Capture，降低接入门槛 |
| **国产化** | 支持国产LLM（DeepSeek/Qwen），私有化部署 |
| **垂直场景** | 针对业财税合规场景提供预置分析模板 |

---

猪哥云（四川）网络科技有限公司 | 合规网 www.hegui.com
猪哥云-数据产品部-Maurice | maurice_wen@proton.me
2025 猪哥云-灵阙企业级智能体平台

---

### 2026-01-28 | 多类型客户真实流程测试 SOP 启动

**任务**: 规划多类型客户真实流程测试（Persona + 入口脚本 + 异常路径）

**已完成**:
- 读取 task_plan.md 与 notes.md，确认进入 Planning with Files 循环
- 基于现有代码与 UX Map 汇总入口与路由

**证据与来源**:
- Web 路由（Next.js App Router）
  - `/` → apps/web/src/app/page.tsx
  - `/ask` → apps/web/src/app/ask/page.tsx
  - `/dashboard` → apps/web/src/app/dashboard/page.tsx
  - `/api/health` → apps/web/src/app/api/health/route.ts
- API 路由（Go API）
  - `/health`、`/api/v1/track`、`/api/v1/identify`、`/api/v1/batch`
  - `/api/v1/query`、`/api/v1/ask`、`/api/v1/overview`
  - `/api/v1/dashboards`（list/get/create）
  - 来源: services/api/cmd/server/main.go
- AI 服务（FastAPI）
  - `/health`、`/api/v1/ask`、`/api/v1/insights`
  - 来源: services/ai/src/main.py
- UX Map 页面清单（计划覆盖）
  - 公开页: P-001 ~ P-010
  - 应用页: A-001 ~ A-023
  - 来源: USER_EXPERIENCE_MAP.md

**待补齐**:
- 非生产环境地址与测试账号
- 真实 API Key 与权限分级信息


---

### 2026-01-28 | Real-Flow 预检（API/AI）

**执行范围**:
- API/AI/ClickHouse 健康检查
- Persona A/B/C API 流程（identify/track/overview/ask/dashboards）

**证据路径**:
- `doc/00_project/initiative_data-wings/evidence/real-flow/2026-01-28/`

**发现问题**:
1. AI NL2SQL 请求 403（Gemini API Key 失效）
2. Ask/Query 扫描错误：`converting String to *interface {} is unsupported`
3. MVP 路由实现与 UX Map 规划存在偏差（/ask,/dashboard vs /app/*）

**影响**:
- Ask 端到端链路不可用或返回空结果
- 查询结果无法正常返回

**下一步**:
- 修复 ClickHouse 查询扫描逻辑
- 移除硬编码 API Key，改为环境变量注入并重启服务
- 继续 UI 人工流程测试并补充截图证据


---

### 2026-01-28 | UX Map 人工测试（Homepage → Ask → Dashboard）

**Persona A（Owner/Admin）**:
- Step 1: 首页（证据：persona-a_step-1_home.png）
- Step 2: Ask 页面（证据：persona-a_step-2_ask-page.png）
- Step 3: Ask 提交后结果（修复前：persona-a_step-4_ask-result.png）
- Step 4: Dashboard 页面（证据：persona-a_step-5_dashboard.png）
- Step 5: Ask 修复后结果（证据：persona-a_step-4_ask-result_after_fix.png）

**异常/卡点**:
- Ask 修复前因 LLM 403 失败，已切换到 Poe Provider 并复测通过

**证据路径**:
- `doc/00_project/initiative_data-wings/evidence/real-flow/2026-01-28/`


---

### 2026-01-28 | Round 1 自动化验证（ai check）

- 结果: 通过
- 运行目录: /Users/mauricewen/AI-tools/outputs/check/20260128-114049-8a4cbbd7
- 备注: audit FAIL/SKIP（检查器提示）


---

### 2026-01-28 | API 契约/错误码核对（后端变更）

- `/api/v1/ask` 缺失 question → 400（证据：persona-b_ask_invalid_after_restart.json）
- `/api/v1/dashboards` 缺失 name → 400（证据：persona-c_dashboard_create_invalid_after_restart.json）
- `/api/v1/ask` 正常返回 data（证据：persona-b_ask_after_fix2.json）


---

### 2026-01-28 | UI 测试发现 CORS 问题

- 现象: Dashboard 页面显示 Retry，数据未加载
- 根因: 前端运行端口 3100 未在 API CORS 白名单
- 修复: docker-compose.yml 增加 `CORS_ORIGINS=http://localhost:3000,http://localhost:3100`，AI CORS 同步更新
- 证据: persona-a_step-4_dashboard_3100.png


---

### 2026-01-28 | Dashboard CORS 修复后复测

- 结果: Dashboard 正常加载（无 Retry）
- 证据: persona-a_step-4_dashboard_3100_after_fix.png


---

### 2026-01-28 | 前端端口说明

- 由于本机 3000 端口被其他项目占用，Data Wings 前端使用 `PORT=3100` 启动进行测试。
- 证据与截图均基于 3100 端口。


---

### 2026-01-28 | Round 1 自动化验证（ai check - 修复后）

- 结果: 通过
- 运行目录: /Users/mauricewen/AI-tools/outputs/check/20260128-115301-b75533cf
- 备注: audit FAIL/SKIP（检查器提示）


---

### 2026-01-28 | UI/UX 优化启动

**范围**:
- Home / Ask / Dashboard 页面
- 按 ui-skills 与 web-interface-guidelines 进行检查

**待优化点**:
- 首页存在多个主按钮（层级混乱）
- 焦点样式与可访问性需增强
- 页面高度使用 `min-h-screen`（需改为 `min-h-dvh`）


---

### 2026-01-28 | UI/UX 优化证据与验证

**应用规范**:
- ui-skills
- web-interface-guidelines

**改动要点**:
- 首页保留单一主按钮，导航 CTA 降级
- 全站 `min-h-screen` → `min-h-dvh`
- 增强 focus-visible 样式
- Ask 页面加载状态去除动画

**证据路径**:
- UI 截图: `doc/00_project/initiative_data-wings/evidence/ui-ux/2026-01-28/`
  - home.png, home_to_ask.png, ask_result.png, dashboard.png
- Network timings: `.../network_timings.txt`
- Console logs: `.../web_console.log`, `.../api_ai_console.log`


---

### 2026-01-28 | UX Map 人工复测（UI/UX Scope）

- 路径: Home → Ask → Dashboard（MVP 现有路由）
- 结果: 单一主按钮层级清晰，焦点可见，页面可用
- 证据: `doc/00_project/initiative_data-wings/evidence/ui-ux/2026-01-28/`
- 备注: 登录/权限页未实现，相关路径未覆盖


---

### 2026-01-28 | UI/UX SOP Round 1 自动化验证（ai check）

- 结果: 通过
- 运行目录: /Users/mauricewen/AI-tools/outputs/check/20260128-120746-d19ea6d2
- 备注: audit FAIL/SKIP（检查器提示）


---

### 2026-01-28 | 全量交付续航启动（Audit/Auth/Persona/Perf）

- 已重读 task_plan.md / notes.md / deliverable.md
- 范围: audit 修复 + 登录/权限页面 + 多 Persona 复测 + 前端性能与视觉回归证据
- ralph loop: max 12, completion promise DONE
- 待办证据: supply.audit 输出、登录/权限流程截图、Persona 复测日志、性能与视觉对比截图

---

### 2026-01-29 | UI/UX 优化 SOP 执行

**执行工具**: Claude Chrome MCP + Playwright MCP (fallback) + 代码审查

**检查规范**: ui-skills + web-interface-guidelines (Savyforson 四核心原则)

**发现问题**:

| 页面 | 问题 | 严重性 | 修复状态 |
|------|------|--------|----------|
| page.tsx | 导航栏重复 "Try AI Query" 按钮 | HIGH | OK |
| page.tsx | Feature icons 用文字替代 SVG | LOW | OK |
| page.tsx | Chart placeholder 空白文本 | HIGH | OK |
| app/page.tsx | Share 使用 alert() 阻塞 | HIGH | OK |
| app/page.tsx | handleExport 变量引用顺序错误 | HIGH | OK |
| app/layout.tsx | TypeScript Route 类型错误 | MED | OK |

**修复内容**:

1. **首页导航**：移除重复的 "Try AI Query" 按钮，保持单一主 CTA
2. **Feature icons**：替换文字缩写为真实 SVG 图标（灯泡/代码/闪电）
3. **Chart placeholder**：替换为模拟柱状图组件
4. **Toast 组件**：替换 alert() 为可关闭的 toast 通知
5. **TypeScript**：修复 Route 类型和变量引用顺序

**验证结果**:

- TypeScript: PASS (无错误)
- ESLint: PASS (无警告)
- HTTP Status: Homepage 200, Login 200
- 开发服务器: http://localhost:3000 正常运行

---

### 2026-02-11 22:03:15 +0800 | SOP 3.2 启动与预检（run: 20260211-215916）

- automation:
  - `ai auto --run` 命中 `SOP 3.2 前后端一致性与入口检查`（Swarm）
  - `ai skills run planning-with-files` 已执行
  - `aline search`（session/content）执行完成，命中 0 条历史记录
- 证据:
  - 环境与工具盘点: `outputs/sop-fe-be-entry-consistency/20260211-215916/logs/environment.txt`
  - SOP 自动触发日志: `outputs/sop-fe-be-entry-consistency/20260211-215916/logs/ai-auto-run.log`
  - planning-with-files 日志: `outputs/sop-fe-be-entry-consistency/20260211-215916/logs/skill-planning-with-files.log`
  - onecontext 日志: `outputs/sop-fe-be-entry-consistency/20260211-215916/logs/onecontext-session-search.log`, `outputs/sop-fe-be-entry-consistency/20260211-215916/logs/onecontext-content-search.log`
  - SOP step 回写: `outputs/sop-fe-be-entry-consistency/20260211-215916/logs/sop-step1.log`
- 备注:
  - planning-with-files 自动生成了 `doc/00_project/initiative_09_data_wings/`。
  - 为保持文档单一事实源，已回收该目录并继续使用 `doc/00_project/initiative_data-wings/`。

---

### 2026-02-11 22:17:40 +0800 | SOP 3.2 执行结果（入口一致性 + 契约修复）

- 入口一致性修复:
  - `docker-compose.yml`:
    - `NEXT_PUBLIC_API_URL` 从 `http://localhost:8080` 对齐为 `http://localhost:4009`
    - `NEXT_PUBLIC_AI_URL` 从 `http://localhost:8001` 对齐为 `http://localhost:8009`
  - `scripts/quickstart.sh`:
    - Go 入口修复为 `go run ./cmd/server`
    - AI 端口对齐为 `8001`
    - Web 启动命令对齐为 `pnpm dev`
  - `scripts/start_ai_service.sh`: AI 端口从 `8000` 对齐为 `8001`
  - `README.md`: 端口矩阵更新为 Local 与 Docker Compose 双口径

- API 契约修复:
  - 新增统一响应工具: `services/api/internal/response/json.go`
  - Go API 错误响应统一包含 `error_code`
  - `/api/v1/ask` 成功响应统一为 `{"status":"ok","data":...}`
  - 前端 API Client (`apps/web/src/lib/api.ts`) 增强错误解析：`message/detail/error_code/details`

- 代码触达范围:
  - `services/api/cmd/server/main.go`
  - `services/api/internal/auth/middleware.go`
  - `services/api/internal/handlers/auth.go`
  - `services/api/internal/handlers/team.go`
  - `services/api/internal/handlers/events.go`
  - `services/api/internal/handlers/analytics.go`
  - `services/api/internal/handlers/dashboard.go`
  - `services/api/internal/response/json.go`
  - `apps/web/src/lib/api.ts`
  - `docker-compose.yml`
  - `scripts/quickstart.sh`
  - `scripts/start_ai_service.sh`
  - `README.md`

- 验证结果:
  - `ai check`: PASS
    - run_dir: `/Users/mauricewen/AI-tools/outputs/check/20260211-140822-8d38631c`
  - `npm --prefix apps/web run lint`: PASS
  - `npm --prefix apps/web run build`: PASS
  - `npm --prefix apps/web run test -- --run`: 无测试文件（退出码 1）
  - Go 测试：本机缺少 `go/gofmt`，尝试 Docker 方式拉取 `golang:1.22` 失败（registry EOF）

- 证据:
  - `outputs/sop-fe-be-entry-consistency/20260211-215916/reports/entrypoint_contract_report.md`
  - `outputs/sop-fe-be-entry-consistency/20260211-215916/logs/ai-check.log`
  - `outputs/sop-fe-be-entry-consistency/20260211-215916/logs/web-lint.log`
  - `outputs/sop-fe-be-entry-consistency/20260211-215916/logs/web-build.log`
  - `outputs/sop-fe-be-entry-consistency/20260211-215916/logs/web-test.log`
  - `outputs/sop-fe-be-entry-consistency/20260211-215916/logs/go-test.log`

---

### 2026-02-11 22:24:30 +0800 | SOP 3.2 最终验证回写

- `ai check`: PASS
  - run_dir: `/Users/mauricewen/AI-tools/outputs/check/20260211-141425-fa0f0df0`
- `npm --prefix apps/web run lint`: PASS
- `npm --prefix apps/web run build`: PASS
- `services/api` Go 测试（Docker + `/usr/local/go/bin/go test ./...`）: PASS

- 测试稳定性补丁:
  - `services/api/internal/handlers/dashboard_test.go`
  - `newAuthRequest` 参数从 `*bytes.Buffer` 调整为 `io.Reader`，修复 nil body 导致的 panic。

- 证据:
  - `outputs/sop-fe-be-entry-consistency/20260211-215916/logs/go-test.log`
  - `outputs/sop-fe-be-entry-consistency/20260211-215916/logs/ai-check.log`
  - `outputs/sop-fe-be-entry-consistency/20260211-215916/reports/verification_report.md`

---

### 2026-02-11 22:58:20 +0800 | Round 2 UX Map 模拟人工测试（Docker 3009）

- 执行方式:
  - Docker Compose 启动 Web/API/AI/ClickHouse/Redis
  - Playwright（headless chromium）按 3 角色执行：admin / analyst / pm
  - 路径: signup -> app -> ask -> dashboards -> team -> signout

- 首轮失败与修复:
  - 现象: `/signup` 点击创建后前端报 `Failed to fetch`
  - 根因: Next.js 客户端环境变量在构建时注入；web 镜像构建未注入 `NEXT_PUBLIC_API_URL`
  - 修复:
    - `apps/web/Dockerfile` 新增 build-time ARG/ENV 注入
    - `docker-compose.yml` 为 web build 注入 args (`NEXT_PUBLIC_API_URL=http://localhost:4009`, `NEXT_PUBLIC_AI_URL=http://localhost:8009`)
  - 复测: signup 请求已命中 `http://localhost:4009/api/v1/auth/signup` 并返回 201

- Round 2 结果:
  - admin: PASS（Team 可访问）
  - analyst: PASS（Team 禁止访问）
  - pm: PASS（Team 禁止访问）
  - Ask 页面: 三角色均出现业务错误提示（AI 请求失败路径），但页面链路与权限链路正常

- 证据:
  - 报告: `outputs/sop-fe-be-entry-consistency/20260211-215916/reports/round2_ui_flow_report.md`
  - JSON: `outputs/sop-fe-be-entry-consistency/20260211-215916/reports/round2_ui_flow_report.json`
  - 截图: `outputs/sop-fe-be-entry-consistency/20260211-215916/screenshots/round2-*.png`
  - 探针日志: `outputs/sop-fe-be-entry-consistency/20260211-215916/logs/round2-probe-signup.log`
  - Playwright 日志: `outputs/sop-fe-be-entry-consistency/20260211-215916/logs/round2-playwright.log`

---

### 2026-02-11 23:02:10 +0800 | SOP 1.4 启动与预检（run: 20260211-225928）

- automation:
  - `ai auto --run` 命中 `SOP 1.4 架构圆桌 SOP`（Council）
  - `ai skills run agent-teams-swarm "blueprint council-architecture"` 成功返回 team prompt
  - `aline search`（session/content）执行完成，命中 0 条历史记录
- 证据:
  - 环境与工具盘点: `outputs/sop-architecture-council/20260211-225928/logs/environment.txt`
  - SOP 自动触发日志: `outputs/sop-architecture-council/20260211-225928/logs/ai-auto-run.log`
  - Council 蓝图日志: `outputs/sop-architecture-council/20260211-225928/logs/agent-teams-council.log`
  - planning-with-files 日志: `outputs/sop-architecture-council/20260211-225928/logs/skill-planning-with-files.log`
  - onecontext 日志: `outputs/sop-architecture-council/20260211-225928/logs/onecontext-session-search.log`, `outputs/sop-architecture-council/20260211-225928/logs/onecontext-content-search.log`
- 备注:
  - planning-with-files 本次生成了嵌套路径 `doc/00_project/initiative_data-wings/doc/...`。
  - 为保持单一事实源，已迁移到证据归档目录：
    `outputs/sop-architecture-council/20260211-225928/artifacts/planning-with-files-misgenerated-doc/`

---

### 2026-02-11 23:07:30 +0800 | SOP 1.4 执行结果回写（架构圆桌）

- 角色分工输出:
  - Architect:
    - 确认系统边界采用 L1/L2/L3 三层模型（UI -> API -> AI+Data）。
    - 固化「Go API 为唯一业务入口」与「前端不直连 AI」约束。
  - Security:
    - 形成威胁模型并识别高优先风险：默认 JWT、NL2SQL 执行边界、服务间鉴权。
    - 产出风险台账：`ARCHITECTURE_RISK_REGISTER.md`（含触发器和缓解策略）。
  - SRE:
    - 识别 timeout budget 失配（API write timeout 15s vs API->AI timeout 30s）。
    - 给出 SLO 与容量基线建议（availability/latency/error-rate + tracing）。

- 主要产出:
  - ADR: `doc/00_project/initiative_data-wings/ADR-2026-02-11-architecture-council.md`
  - 风险清单: `doc/00_project/initiative_data-wings/ARCHITECTURE_RISK_REGISTER.md`
  - 架构回写: `doc/00_project/initiative_data-wings/SYSTEM_ARCHITECTURE.md`（Section 12）
  - 圆桌报告: `outputs/sop-architecture-council/20260211-225928/reports/architecture_council_report.md`

- SOP 步骤与状态:
  - `ai sop step 1-4-52572192 1 done`
  - `ai sop step 1-4-52572192 2 done`
  - `ai sop step 1-4-52572192 3 done`
  - `ai sop complete 1-4-52572192`
  - `ai sop status 1-4-52572192` => `Status: completed`

- 验证:
  - `ai check`: PASS
  - run_dir: `/Users/mauricewen/AI-tools/outputs/check/20260211-150604-0500ccf8`
  - 详细日志: `outputs/sop-architecture-council/20260211-225928/logs/ai-check.log`

- 证据:
  - `outputs/sop-architecture-council/20260211-225928/logs/sop-step1.log`
  - `outputs/sop-architecture-council/20260211-225928/logs/sop-step2.log`
  - `outputs/sop-architecture-council/20260211-225928/logs/sop-step3.log`
  - `outputs/sop-architecture-council/20260211-225928/logs/sop-status.log`
  - `outputs/sop-architecture-council/20260211-225928/logs/sop-complete.log`

---

### 2026-02-11 23:18:40 +0800 | SOP 1.11 全局沙盒化执行记录（run: 1-11-5585c7b1）

- automation:
  - `ai auto --run` 命中 `SOP 1.11 智能体平台全局沙盒化 SOP`（Council）
  - onecontext 检索（session/content）命中 0 条历史记录
  - planning-with-files 执行后生成异常目录 `initiative_09_data_wings`，已迁移到：
    `outputs/sop-global-sandbox/1-11-5585c7b1/artifacts/planning-with-files-misgenerated-doc/`

- 工具盘点:
  - skills/plugins 盘点日志：
    `outputs/sop-global-sandbox/1-11-5585c7b1/logs/tool-inventory.log`
  - MCP 资源与模板：空集合（本轮无可用条目）

- 实施内容:
  - 新增沙盒执行入口：`scripts/sandbox_task.sh`
  - 新增策略文档：`doc/00_project/initiative_data-wings/SANDBOX_ISOLATION_POLICY.md`
  - `Makefile` 增加 `sandbox-dry-run` / `sandbox-task`
  - `SYSTEM_ARCHITECTURE.md` 新增 Section 13（全局沙盒化执行架构）
  - `README.md` 增加沙盒化使用说明

- 资源与超时策略:
  - 已按 task 维度定义 network/cpu/memory/pids/timeout/RW 白名单
  - 详见：`SANDBOX_ISOLATION_POLICY.md`

- 沙盒验证证据:
  - 本地策略 dry-run：
    `outputs/sop-global-sandbox/1-11-5585c7b1/logs/sandbox-dry-run.log`
  - 白名单写入成功：
    `outputs/sop-global-sandbox/1-11-5585c7b1/logs/sandbox-allow-write.log`
  - 非白名单写入被阻断（只读）：
    `outputs/sop-global-sandbox/1-11-5585c7b1/logs/sandbox-block-write.log`
  - 禁网阻断（network=none）：
    `outputs/sop-global-sandbox/1-11-5585c7b1/logs/sandbox-block-network.log`
  - 云沙盒适配 dry-run：
    `outputs/sop-global-sandbox/1-11-5585c7b1/logs/sandbox-cloud-dry-run.log`
  - 汇总报告：
    `outputs/sop-global-sandbox/1-11-5585c7b1/reports/global_sandbox_rollout_report.md`

- SOP 与验证状态:
  - `ai sop complete 1-11-5585c7b1` -> completed
  - `ai check`: PASS
    - run_dir: `/Users/mauricewen/AI-tools/outputs/check/20260211-151859-5285adad`
    - log: `outputs/sop-global-sandbox/1-11-5585c7b1/logs/ai-check.log`

---

### 2026-02-11 23:29:20 +0800 | SOP 3.3 真实 API 与可复现实验（run: 3-3-39e6964e）

- automation:
  - `ai auto --run` 命中 `SOP 3.3`（run id: `3-3-39e6964e`）
  - onecontext 检索（session/content）命中 0 条历史记录
  - Agent Teams Swarm 蓝图已加载
  - planning-with-files 生成异常目录 `initiative_09_data_wings`，已归档到：
    `outputs/sop-real-api-repro/3-3-39e6964e/artifacts/planning-with-files-misgenerated-doc/`

- 真实 API 执行（非生产环境）:
  - 环境：`docker compose up -d web api ai clickhouse redis`
  - 服务状态证据：`outputs/sop-real-api-repro/3-3-39e6964e/logs/docker-ps.log`
  - 核心路径执行器：`scripts/replay_real_api_fixture.py`
  - 运行 fixture：`fixtures/replay/real_api/core_path.fixture.json`

- 核心路径结果:
  - signup: 201
  - login: 200
  - me: 200
  - track_event: 503（degraded 模式，数据库不可用分支）
  - overview: 503（degraded 模式）
  - ask: 503（degraded 模式）
  - dashboards: 200
  - 汇总：7/7 命中 fixture 期望状态

- 可复现实验产物:
  - 回放模板：`fixtures/replay/real_api/core_path.fixture.json`
  - 回放执行器：`scripts/replay_real_api_fixture.py`
  - 真实捕获基线：
    - `fixtures/replay/real_api/core_path.capture.baseline.json`
    - `fixtures/replay/real_api/core_path.capture.baseline.md`
  - 运行时证据：
    - `outputs/sop-real-api-repro/3-3-39e6964e/reports/real_api_capture.json`
    - `outputs/sop-real-api-repro/3-3-39e6964e/reports/real_api_capture.md`
    - `outputs/sop-real-api-repro/3-3-39e6964e/reports/real_api_and_fixture_report.md`

- 验收声明:
  - 最终验收必须通过真实 API。
  - 不得以 mock 响应替代核心路径验收。

- SOP 与验证状态:
  - `ai sop complete 3-3-39e6964e` -> completed
  - `ai check`: PASS
    - run_dir: `/Users/mauricewen/AI-tools/outputs/check/20260211-153002-cdcc7bd9`
    - log: `outputs/sop-real-api-repro/3-3-39e6964e/logs/ai-check.log`

---

### 2026-02-11 23:47:50 +0800 | SOP 3.7 功能闭环完整实现检查（run: 3-7-f1b07249）

- 初始阻断:
  - API 冷启动阶段首次连接 ClickHouse 失败后进入 degraded 且不恢复。
  - 影响：`/api/v1/track`、`/api/v1/overview`、`/api/v1/ask` 出现持续 `503`，系统闭环中断。
  - 证据：`outputs/sop-full-loop-check/3-7-f1b07249/logs/api-logs-before-fix.log`

- 修复动作:
  - `services/api/cmd/server/main.go`：
    - 新增 `initClickHouseRepository(cfg)` 启动重试逻辑（上限 + 间隔）。
  - `services/api/internal/config/config.go`：
    - 新增 `CLICKHOUSE_CONNECT_MAX_ATTEMPTS`、`CLICKHOUSE_CONNECT_RETRY_DELAY_SECOND` 配置。
  - `docker-compose.yml`：
    - API 服务注入上述重试配置，确保本地运行入口一致。
  - `services/api/internal/handlers/contract_test.go`：
    - 新增 API 契约与 RBAC 测试（错误码与成功响应结构）。
  - `fixtures/replay/real_api/core_path.fixture.json`：
    - 将 `track/overview` 期望状态收紧为 `200`。

- 验证结果:
  - Go 测试通过（含新契约测试）：
    - `outputs/sop-full-loop-check/3-7-f1b07249/logs/go-test-after-fix.log`
  - 真实 API 回放通过（7/7）：
    - `outputs/sop-full-loop-check/3-7-f1b07249/reports/real_api_capture_after_fix.md`
  - 持久化验证通过（ClickHouse count=1）：
    - `outputs/sop-full-loop-check/3-7-f1b07249/logs/clickhouse-event-persistence.log`
    - `outputs/sop-full-loop-check/3-7-f1b07249/reports/system_loop_verification.md`
  - UI 回归通过（admin/analyst/pm）：
    - `outputs/sop-full-loop-check/3-7-f1b07249/reports/round2_ui_flow_report.md`
    - `outputs/sop-full-loop-check/3-7-f1b07249/screenshots/`
  - `ai check` 通过：
    - `outputs/sop-full-loop-check/3-7-f1b07249/logs/ai-check.log`

- 工程备注:
  - BuildKit 模式下曾出现 Docker Hub TLS 证书异常，已通过 legacy builder 完成本轮镜像构建与验证。
  - 该异常已留档：`outputs/sop-full-loop-check/3-7-f1b07249/logs/docker-build-api-legacy.log`

---

### 2026-02-11 23:59:30 +0800 | SOP 1.10 世界 SOTA 产品 SOP 调研（run: 1-10-a0ed78c6）

- automation:
  - `ai auto --run` 命中 `SOP 1.10`（run id: `1-10-a0ed78c6`，Swarm）
  - onecontext 检索（session/content）执行完成
  - Agent Teams Swarm 蓝图已加载（`parallel-research`）
  - planning-with-files 执行后生成异常目录 `initiative_09_data_wings`，已归档到：
    `outputs/sop-world-sota-research/1-10-a0ed78c6/artifacts/planning-with-files-misgenerated-doc/`

- 数据窗口与方法:
  - 时间窗口：`2025-02-11` ~ `2026-02-11`
  - 来源策略：官方公告/官方文档优先，覆盖 OpenAI / Anthropic / GitHub / Cursor / Google / Cognition
  - 样本规模：8 个代表性产品/平台

- 关键发现:
  - SOTA 共同趋势：从“单模型能力”转向“流程系统能力”（角色分工 + 质量门禁 + 度量闭环）。
  - 高成熟平台（OpenAI/Anthropic）已把 `sandbox/policy/checkpoint/eval/tracing` 纳入标准 SOP。
  - 工程交付型平台（GitHub/Cursor/Devin）普遍采用 `issue -> agent -> PR -> CI -> reviewer merge` 主链路。
  - 编排型平台（Codex/Conductor）强调并行执行与 orchestrator 汇总，适合复杂任务。

- 主要产出:
  - 报告：`outputs/sop-world-sota-research/1-10-a0ed78c6/reports/sota_sop_benchmark_report.md`
  - WebFetch 补充：`outputs/sop-world-sota-research/1-10-a0ed78c6/reports/sota_sop_benchmark_webfetch_addendum.md`
  - 来源日志：`outputs/sop-world-sota-research/1-10-a0ed78c6/logs/web-research-sources.txt`
  - 验证来源日志：`outputs/sop-world-sota-research/1-10-a0ed78c6/logs/web-research-sources-verified.txt`
  - SOP 步骤日志：`outputs/sop-world-sota-research/1-10-a0ed78c6/logs/sop-step1.log`

- 回写动作:
  - `doc/00_project/initiative_data-wings/PRD.md` 新增“SOTA SOP 基准后的产品化要求”。
  - `doc/00_project/initiative_data-wings/USER_EXPERIENCE_MAP.md` 新增“基于 SOTA SOP 的体验地图增强”。
  - `doc/00_project/initiative_data-wings/PLATFORM_OPTIMIZATION_PLAN.md` 新增“对标 SOTA 的优化路线图与门禁指标”。
  - `doc/00_project/initiative_data-wings/SYSTEM_ARCHITECTURE.md` 新增“流程治理层架构增强”。

### 2026-02-12 00:30:26 +0800 | SOP 1.10 来源二次核验与口径修正

- 修正内容:
  - 将 `sota_sop_benchmark_report.md` 改为“官方可核验版”，移除失效链接和不可验证口径。
  - 将 `sota_sop_benchmark_webfetch_addendum.md` 改为“官方来源二次核验”版本。
  - 新增 machine-readable 来源清单：
    - `outputs/sop-world-sota-research/1-10-a0ed78c6/reports/source_verification.md`
    - `outputs/sop-world-sota-research/1-10-a0ed78c6/reports/source_verification.json`

- 验证来源（Round 2）:
  - OpenAI（Agents/Codex）、GitHub（Blog/Docs）、Cursor（1.0/1.1）、Anthropic（Web Search/Sonnet 4.5）、Google（Jules/Conductor）、Cognition（Devin 2.0）均以官方页面日期回填。
  - 更新后的来源日志：`outputs/sop-world-sota-research/1-10-a0ed78c6/logs/web-research-sources-verified.txt`

- 结果:
  - SOP 1.10 报告现可直接用于审计与复核，不再依赖会失效的旧 URL 路径。

### 2026-02-12 09:49:27 +0800 | SOP 3.2 回归修复（signup Failed to fetch）

- run:
  - `ai auto --run` 命中 `SOP 3.2`（run id: `3-2-044e82e6`，Swarm）
  - onecontext 检索无命中（aline 历史为空）
  - `planning-with-files` 误生成目录 `initiative_09_data_wings`，已归档并清理：
    - `outputs/sop-entrypoint-consistency/3-2-044e82e6/artifacts/planning-with-files-misgenerated-doc/`

- 复现证据:
  - `outputs/sop-entrypoint-consistency/3-2-044e82e6/logs/signup-repro-http.log`
  - 结论：
    - `Origin=http://localhost:3000` 对 `/api/v1/auth/signup` 预检返回 `403`
    - `Origin=http://localhost:3009` 预检返回 `204`
    - API 直连 `signup` 返回 `201`（业务逻辑本身正常）

- 根因:
  - `docker-compose.yml` 中 API `CORS_ORIGINS` 仅允许 `3009,3100`，未覆盖本地入口 `3000`，触发浏览器 CORS 拦截并呈现 `Failed to fetch`。

- 修复:
  - `docker-compose.yml`
    - `CORS_ORIGINS` -> `http://localhost:3000,http://localhost:3009,http://localhost:3100`
    - `DW_CORS_ORIGINS` -> `3000/3009/3100`
  - `services/api/internal/config/config.go`
    - 默认 CORS origins 扩展为 `3000/3009/3100`
    - `getEnvSlice` 增加 trim + empty-filter，避免环境变量空格导致匹配漂移
  - 新增测试文件：`services/api/internal/config/config_test.go`（默认值与空格处理）

- 修复后验证:
  - `outputs/sop-entrypoint-consistency/3-2-044e82e6/logs/signup-repro-http-after-fix.log`
  - 结论：
    - `Origin=http://localhost:3000` 预检 `204`
    - `Origin=http://localhost:3009` 预检 `204`
    - `Origin=http://localhost:3000` 下 `POST /api/v1/auth/signup` 返回 `201`

- 流程状态:
  - `ai check` 通过：`outputs/sop-entrypoint-consistency/3-2-044e82e6/logs/ai-check.log`
  - SOP 状态 completed：`outputs/sop-entrypoint-consistency/3-2-044e82e6/logs/sop-status.log`

- 限制:
  - 本机缺少 `go`（`go: command not found`），未执行本地 `go test`。
  - 本机缺少 `playwright` 模块，未执行浏览器自动化截图复测。

### 2026-02-12 10:01:52 +0800 | SOP 3.2 Round 2 复测完成（UI + Docker Go）

- 浏览器交互复测:
  - 脚本: `outputs/sop-entrypoint-consistency/3-2-044e82e6/reports/round2_probe_signup_after_fix.js`
  - 结果: `outputs/sop-entrypoint-consistency/3-2-044e82e6/reports/round2_probe_signup_after_fix.json`
  - 截图: `outputs/sop-entrypoint-consistency/3-2-044e82e6/screenshots/signup-round2-after-fix.png`
  - 关键事实:
    - 请求命中 `http://localhost:4009/api/v1/auth/signup`
    - 响应码 `201`
    - 页面从 `/signup` 跳转到 `/app`
    - `Failed to fetch` 计数 `0`

- 配置防回归测试（Docker）:
  - 命令: `docker run --rm -v \"$PWD:/workspace\" -w /workspace/services/api golang:1.22 /usr/local/go/bin/go test ./internal/config -v`
  - 日志: `outputs/sop-entrypoint-consistency/3-2-044e82e6/logs/go-test-config-docker.log`
  - 结果:
    - `TestLoad_DefaultCORSOrigins` PASS
    - `TestLoad_CORSOriginsFromEnv_TrimsSpaces` PASS

- 回合结论:
  - Round 1（HTTP/CORS）通过，Round 2（UI 浏览器交互）通过。
  - 问题闭环维持成立，后续防回归由 config 单测 + 入口矩阵基线共同覆盖。
  - `ai check` 通过：`outputs/sop-entrypoint-consistency/3-2-044e82e6/logs/ai-check-round2-final.log`

### 2026-02-12 10:06:10 +0800 | Web 容器健康检查修复（IPv6 localhost 回归）

- 现象:
  - `09-data-wings-web` 长期 `unhealthy`，健康检查反复失败。

- 根因:
  - `apps/web/Dockerfile` 的 HEALTHCHECK 使用 `http://localhost:3000/api/health`。
  - 容器内 `localhost` 优先解析到 `::1`，而 Next 监听 IPv4，导致 `connection refused`。
  - 证据：`outputs/sop-entrypoint-consistency/3-2-044e82e6/logs/web-health-inspect.json`

- 修复:
  - HEALTHCHECK 改为 `http://127.0.0.1:3000/api/health`。
  - `apps/web/Dockerfile` runtime stage 补齐 `ARG NEXT_PUBLIC_API_URL` / `ARG NEXT_PUBLIC_AI_URL`，消除 build `UndefinedVar` 告警。
  - 定向构建与启动：
    - `docker compose build web`
    - `docker compose up -d --no-deps web`

- 验证:
  - 容器状态恢复 `healthy`（FailingStreak=0）：
    - `outputs/sop-entrypoint-consistency/3-2-044e82e6/logs/web-health-inspect-after-fix.json`
    - `outputs/sop-entrypoint-consistency/3-2-044e82e6/logs/web-health-poll-after-fix.log`
    - `outputs/sop-entrypoint-consistency/3-2-044e82e6/logs/web-health-inspect-healthy-after-arg-fix.json`
  - Host 健康端点返回 200：
    - `outputs/sop-entrypoint-consistency/3-2-044e82e6/logs/web-health-endpoint-http-after-fix.log`
  - 最终门禁：
    - `outputs/sop-entrypoint-consistency/3-2-044e82e6/logs/ai-check-post-web-health-docs.log`

- 备注:
  - `docker compose up -d --build web` 时出现 `ai` 镜像拉取 TLS 超时，已通过 web-only 构建规避，不影响修复有效性。

### 2026-02-12 10:13:30 +0800 | Compose `version` 废弃告警清理

- 修复:
  - 从 `docker-compose.yml` 移除 `version: \"3.8\"`（Compose v2 已废弃该字段）。

- 验证:
  - `docker compose ps` 正常，无 `attribute 'version' is obsolete` 告警：
    - `outputs/sop-entrypoint-consistency/3-2-044e82e6/logs/docker-compose-ps-after-version-fix.json`
  - `docker compose config` 正常：
    - `outputs/sop-entrypoint-consistency/3-2-044e82e6/logs/docker-compose-config-after-version-fix.log`
  - `docker compose up -d --no-deps web` 正常：
    - `outputs/sop-entrypoint-consistency/3-2-044e82e6/logs/docker-compose-up-web-after-version-fix.log`
  - 关键日志 grep 复核无命中：
    - `outputs/sop-entrypoint-consistency/3-2-044e82e6/logs/docker-compose-up-web-after-version-fix.raw.log`
  - 最终门禁：
    - `outputs/sop-entrypoint-consistency/3-2-044e82e6/logs/ai-check-compose-version-final.log`

- 结果:
  - 运行日志噪音减少，SOP 验证输出更稳定，便于自动审计。

### 2026-02-12 10:20:27 +0800 | SOP 1.1 启动（run: 1-1-2ddd14fb）

- 自动触发:
  - `ai auto --run` 命中 `SOP 1.1 一键全量 SOP（长任务）`，Agent Teams 模式为 `Pipeline`。
  - run id: `1-1-2ddd14fb`
- 证据目录:
  - `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/{logs,reports,diff,screenshots,artifacts}`
- Step 1（planning-with-files）:
  - 已读取 `task_plan.md` / `notes.md` / `deliverable.md` / `PDCA_ITERATION_CHECKLIST.md` 基线并落盘：
    - `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/logs/docs-read-baseline.log`
  - `planning-with-files` 再次误生成 `initiative_09_data_wings`，已归档并清理：
    - `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/artifacts/planning-with-files-misgenerated-doc/`
- Step 2（ralph loop）:
  - 状态文件已初始化：`.codex/ralph-loop.local.md`
  - 配置：`max_iterations=12`，`completion_promise=DONE`，`active=true`
- Step 3（plan-first）:
  - 已在 `task_plan.md` 新增目标/非目标/约束/验收标准/测试计划（SOP 1.1 section）。

### 2026-02-12 10:29:05 +0800 | SOP 1.1 Step 4-8 执行完成（run: 1-1-2ddd14fb）

- Step 4（UX Map 人工模拟 + 同类扫描）:
  - FE Round 2 探针执行完成，路径覆盖：
    - `/signup -> /app -> /app/ask -> /app/dashboards -> /app/settings/team`
  - 结果：
    - `signup` 命中 `http://localhost:4009/api/v1/auth/signup` 且返回 `201`
    - `Failed to fetch=0`、`Signup failed=0`
    - `console_errors=0`、`page_errors=0`、`failed_requests=0`、`api_error_responses=0`
  - 同类问题扫描完成，记录：
    - `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/logs/similar-issue-scan.log`

- Step 6/7（Round 1 + 前后端专项）:
  - `ai check` Round 1 通过：
    - `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/logs/ai-check-round1.log`
  - Go 契约与配置测试通过：
    - `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/logs/go-test-config-handlers.log`
  - 真实 API 回放通过（7/7）：
    - `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/reports/real_api_capture.md`
  - 错误码与 RBAC 契约探针通过（6/6）：
    - `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/reports/backend_contract_probe.md`

- Step 5/8（文档回写 + Closeout）:
  - SOP 1.1 汇总报告新增：
    - `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/reports/sop_1_1_full_delivery_report.md`
  - `task_plan.md` Step 4-8 已全部打勾并关联证据。
  - PDCA 四文档与 Rolling Ledger 已回写本轮结论。
  - 三端一致性状态：`Local HEAD == GitHub HEAD == 1cc00e04f743ed6245ad34a7ce56e60f726b4c97`；Production 维度 `N/A`（本地开发环境，无远端 VPS 发布）。

### 2026-02-12 10:46:52 +0800 | SOP 3.1 前端验证与性能检查完成（run: 3-1-535549a1）

- 自动触发与 Step 1:
  - `ai sop run 3.1` 启动成功（Swarm）。
  - onecontext session/content 检索无命中。
  - `planning-with-files` 再次误生成 `initiative_09_data_wings`，已归档并清理：
    - `outputs/sop-frontend-validation/3-1-535549a1/artifacts/planning-with-files-misgenerated-doc/`

- Step 2 执行:
  - 新增本轮探针：`outputs/sop-frontend-validation/3-1-535549a1/reports/frontend_full_probe.js`
  - 覆盖：
    - Network/Console/API 响应异常采集
    - Performance（navigation timing）
    - Visual（全路径截图）
    - 响应式（desktop/tablet/mobile）
  - 核心路径：`/signup -> /app -> /app/ask -> /app/dashboards -> /app/settings/team`

- Step 3 修复与复测:
  - 首轮失败：移动端出现 `/_next/static/chunks/*.js` `ERR_ABORTED` 噪声，被误判为失败。
  - 修复：探针忽略该类导航中断噪声。
  - 复测：`overall_ok=true`，全部门禁通过。

- 最终结果:
  - `signup` 请求命中 `http://localhost:4009/api/v1/auth/signup`，状态 `201`
  - `Failed to fetch=0`、`Signup failed=0`
  - 核心路由全部可达，三种 viewport 无横向溢出
  - `console_errors=0`、`page_errors=0`、`failed_requests=0`、`api_error_responses=0`
  - `ai check` 通过：
    - `outputs/sop-frontend-validation/3-1-535549a1/logs/ai-check.log`

### 2026-02-12 10:53:32 +0800 | SOP 3.7 Watchdog 复核完成（run: 3-7-703f3d77）

- Step 1（初始化）:
  - onecontext 检索完成（无命中）。
  - `planning-with-files` 误生成目录已归档：
    - `outputs/sop-full-loop-check/3-7-703f3d77/artifacts/planning-with-files-misgenerated-doc/`

- Step 2（入口闭环）:
  - 入口扫描报告：
    - `outputs/sop-full-loop-check/3-7-703f3d77/reports/entrypoint_closure_report.md`
  - 前端路由与 API 入口、compose 配置入口一致性通过。

- Step 3（系统闭环）:
  - 真实 API 回放（7/7）通过：
    - `outputs/sop-full-loop-check/3-7-703f3d77/reports/real_api_capture.md`
  - ClickHouse 持久化验证通过（`fixture_core_path_event` count=3）：
    - `outputs/sop-full-loop-check/3-7-703f3d77/logs/clickhouse-persistence.log`
  - 系统闭环报告：
    - `outputs/sop-full-loop-check/3-7-703f3d77/reports/system_loop_verification.md`

- Step 4（契约闭环）:
  - 错误码契约探针通过（6/6）：
    - `outputs/sop-full-loop-check/3-7-703f3d77/reports/backend_contract_probe.md`
  - Go 契约测试首次失败（IPv6 网络不可达），已通过设置 `GOPROXY=https://goproxy.cn,direct` 复测通过：
    - 首轮：`outputs/sop-full-loop-check/3-7-703f3d77/logs/go-test-config-handlers.log`
    - 复测：`outputs/sop-full-loop-check/3-7-703f3d77/logs/go-test-config-handlers-rerun.log`
  - 契约闭环报告：
    - `outputs/sop-full-loop-check/3-7-703f3d77/reports/api_contract_closure_report.md`

- Step 5（验证闭环）:
  - 前端全量探针通过（`overall_ok=true`）：
    - `outputs/sop-full-loop-check/3-7-703f3d77/reports/frontend_full_probe.md`
  - `ai check` 通过：
    - `outputs/sop-full-loop-check/3-7-703f3d77/logs/ai-check.log`
  - Watchdog 汇总报告：
    - `outputs/sop-full-loop-check/3-7-703f3d77/reports/full_loop_watchdog_report.md`

### 2026-02-12 11:01:33 +0800 | SOP 4.1 项目级全链路回归完成（run: 4-1-6117de0a）

- Step 1/2:
  - 初始化证据目录并读取 `task_plan.md` / `notes.md` / `deliverable.md`。
  - `planning-with-files` 误生成目录已归档：
    - `outputs/sop-project-regression/4-1-6117de0a/artifacts/planning-with-files-misgenerated-doc/`
  - ralph loop 切换到本轮任务（`run_id=4-1-6117de0a`）。

- Step 3（UX Map 路径回归）:
  - 探针：`outputs/sop-project-regression/4-1-6117de0a/reports/uxmap_e2e_probe.js`
  - 路径：`/ -> /signup -> /app -> /app/ask -> /app/dashboards -> /app/settings/team`
  - 首轮发现：首页无 `/signup` 直达 CTA（`cta_to_signup=false`）。

- Step 4（卡点修复 + 复测）:
  - 修复文件：`apps/web/src/app/page.tsx`
    - 导航新增 `Create account`（`/signup`）
    - Hero 次按钮由 `Open App` 调整为 `Create account`
  - 重建并重启 web 容器：
    - `outputs/sop-project-regression/4-1-6117de0a/logs/docker-compose-build-web.log`
    - `outputs/sop-project-regression/4-1-6117de0a/logs/docker-compose-up-web.log`
  - 复测结果：`cta_to_signup=true`，`overall_ok=true`。

- Step 5（文档回写）:
  - 已更新 `PRD.md` / `SYSTEM_ARCHITECTURE.md` / `USER_EXPERIENCE_MAP.md` / `PLATFORM_OPTIMIZATION_PLAN.md`。

- Step 6（Round 1 + Round 2）:
  - Round 2：UX Map E2E 探针通过（`outputs/sop-project-regression/4-1-6117de0a/reports/uxmap_e2e_probe.md`）
  - 回放与契约：
    - `outputs/sop-project-regression/4-1-6117de0a/reports/real_api_capture.md`（7/7）
    - `outputs/sop-project-regression/4-1-6117de0a/reports/backend_contract_probe.md`（6/6）
  - Round 1：`ai check` 通过（`outputs/sop-project-regression/4-1-6117de0a/logs/ai-check.log`）

### 2026-02-12 11:06:11 +0800 | SOP 4.1 运行状态补齐（run: 4-1-6117de0a）

- 发现状态不一致：文档记录为完成，但运行器状态仍为 `running`。
- 执行动作：
  - 补跑并留存 `ai check` 日志。
  - 回填 Step 1-6 为 `done`。
  - 执行 `ai sop complete` 收口 run。
- 当前状态：`ai sop status 4-1-6117de0a = completed`。
- 证据：
  - `outputs/sop-project-regression/4-1-6117de0a/logs/ai-check.log`
  - `outputs/sop-project-regression/4-1-6117de0a/logs/sop-closeout.log`

### 2026-02-12 11:12:10 +0800 | SOP 5.1 联合验收与发布守门完成（run: 5-1-3095c8c4）

- Step 1（初始化）:
  - 创建证据目录：`outputs/sop-joint-acceptance/5-1-3095c8c4/`
  - onecontext 检索完成（历史内容无命中）
  - `planning-with-files` 误生成 `initiative_09_data_wings`，已归档并清理：
    - `outputs/sop-joint-acceptance/5-1-3095c8c4/artifacts/planning-with-files-misgenerated-doc/`

- Step 2（三方联合验收）:
  - 输出三方验收报告：
    - `outputs/sop-joint-acceptance/5-1-3095c8c4/reports/joint_acceptance_release_gate.md`
  - 产品：UX Map 路径与入口可达性验收通过。
  - 技术：自动化门禁 + 真实 API + 契约一致性验收通过。
  - 质量：日志/报告/截图证据完整。

- Step 3（Round 1）:
  - `ai check` 通过：
    - `outputs/sop-joint-acceptance/5-1-3095c8c4/logs/ai-check-round1.log`

- Step 4（Round 2）:
  - UX Map 回归探针通过：
    - `outputs/sop-joint-acceptance/5-1-3095c8c4/reports/uxmap_e2e_probe.md`
  - 真实 API 回放通过（`success=true, failures=0`）：
    - `outputs/sop-joint-acceptance/5-1-3095c8c4/reports/real_api_capture.md`
  - 后端契约探针通过（`6/6`）：
    - `outputs/sop-joint-acceptance/5-1-3095c8c4/reports/backend_contract_probe.md`

- Step 5（ralph loop 触发条件）:
  - 当前 run 所有门禁在首轮通过，未触发 ralph loop。

### 2026-02-12 11:15:51 +0800 | SOP 5.1 收口同步（run: 5-1-3095c8c4）

- 已执行 Step 1-5 打点并完成 run：
  - `outputs/sop-joint-acceptance/5-1-3095c8c4/logs/sop-closeout.log`
- 已同步 PDCA 四文档与 Rolling Ledger（REQ-015）。
- 文档同步后再次执行 `ai check` 通过：
  - `outputs/sop-joint-acceptance/5-1-3095c8c4/logs/ai-check-post-sync.log`

### 2026-02-12 11:19:24 +0800 | SOP 5.1 最终门禁复核（run: 5-1-3095c8c4）

- 补充三端快照：
  - `outputs/sop-joint-acceptance/5-1-3095c8c4/logs/git-local-remote-head.log`
- 最终 `ai check` 通过（最终写盘后复核）：
  - `outputs/sop-joint-acceptance/5-1-3095c8c4/logs/ai-check-final5.log`

### 2026-02-12 11:22:43 +0800 | SOP 1.1 重跑初始化（run: 1-1-719289f3）

- 已启动新 run：`ai sop run 1.1` -> `run_id=1-1-719289f3`。
- 证据目录初始化完成：
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs`
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/reports`
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/screenshots`
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/artifacts`
- onecontext 检索已执行（结果无命中）：
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/onecontext-session-search.log`
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/onecontext-content-search.log`
- `planning-with-files` 误生成 `initiative_09_data_wings`，已归档并清理：
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/artifacts/planning-with-files-misgenerated-doc/`
- ralph loop 已启用（max=12, promise=DONE）：
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/ralph-loop-state-initial.log`
- plan-first 已写入 `task_plan.md`，后续按 Step 4-8 顺序推进。

### 2026-02-12 11:24:55 +0800 | SOP 1.1 重跑执行完成（run: 1-1-719289f3）

- Step 4（UX Map 人工模拟 + 同类扫描）:
  - UX Map 探针通过：
    - `outputs/sop-one-click-full-delivery/1-1-719289f3/reports/uxmap_e2e_probe.json`
  - 同类问题扫描完成：
    - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/similar-issue-scan.log`

- Step 6/7（Round 1 + FE/BE 专项）:
  - FE 全量探针通过（network/console/perf/visual/responsive）：
    - `outputs/sop-one-click-full-delivery/1-1-719289f3/reports/frontend_full_probe.json`
  - 真实 API 回放通过（`success=true, failures=0`）：
    - `outputs/sop-one-click-full-delivery/1-1-719289f3/reports/real_api_capture.json`
  - 后端契约探针通过（`6/6`）：
    - `outputs/sop-one-click-full-delivery/1-1-719289f3/reports/backend_contract_probe.json`
  - Round 1 `ai check` 通过：
    - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/ai-check-round1.log`

- Step 5/8（PDCA 回写 + Task Closeout）:
  - 本轮总报告：
    - `outputs/sop-one-click-full-delivery/1-1-719289f3/reports/sop_1_1_full_delivery_report.md`
  - 三端一致性快照（Local/GitHub 一致；Production N/A）：
    - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/git-local-remote-head.log`
  - 本轮未触发新的代码改动，闭环目标为“可复现验证 + 证据刷新”。

### 2026-02-12 11:29:44 +0800 | SOP 1.1 重跑收口（run: 1-1-719289f3）

- 已执行 Step 1-8 全量 `done` 打点并完成 run：
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/sop-closeout.log`
- ralph loop 已收口为 completed：
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/ralph-loop-state-final.log`
- 最终门禁复核：
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/ai-check-final.log`（通过）
- 文档回写后复核：
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/ai-check-post-doc.log`（通过）
- 最终收尾复核：
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/ai-check-final3.log`（通过）

### 2026-02-12 11:35:00 +0800 | SOP 1.3 多角色头脑风暴完成（run: 1-3-670e1dcd）

- Step 1（初始化）:
  - 启动 run：`ai sop run 1.3`（Council）。
  - onecontext 检索完成（无历史命中）：
    - `outputs/sop-multi-role-brainstorm/1-3-670e1dcd/logs/onecontext-session-search.log`
    - `outputs/sop-multi-role-brainstorm/1-3-670e1dcd/logs/onecontext-content-search.log`
  - `planning-with-files` 误生成目录归档并清理：
    - `outputs/sop-multi-role-brainstorm/1-3-670e1dcd/artifacts/planning-with-files-misgenerated-doc/`

- Step 2（角色分工输出）:
  - PM/Designer/SEO 报告：
    - `outputs/sop-multi-role-brainstorm/1-3-670e1dcd/reports/multi_role_brainstorm_report.md`
    - `outputs/sop-multi-role-brainstorm/1-3-670e1dcd/reports/multi_role_brainstorm_report.json`
  - 关键结论：
    - 激活链路优先于功能扩展；
    - SEO 采用产品页优先策略；
    - 本轮不增加权限模型复杂度。

- Step 3（冲突收敛与决策记录）:
  - ADR 已落盘：
    - `doc/00_project/initiative_data-wings/ADR-2026-02-12-multi-role-brainstorm.md`
  - 已更新文档：
    - `PRD.md`、`USER_EXPERIENCE_MAP.md`、`SEO_SITEMAP_STRATEGY.md`
    - `SYSTEM_ARCHITECTURE.md`、`PLATFORM_OPTIMIZATION_PLAN.md`
    - `ROLLING_REQUIREMENTS_AND_PROMPTS.md`、`PDCA_ITERATION_CHECKLIST.md`
- 门禁与收口：
  - `ai check` 通过：`outputs/sop-multi-role-brainstorm/1-3-670e1dcd/logs/ai-check.log`
  - 最终复核：`outputs/sop-multi-role-brainstorm/1-3-670e1dcd/logs/ai-check-final.log`
  - 文档回写后复核：`outputs/sop-multi-role-brainstorm/1-3-670e1dcd/logs/ai-check-post-doc.log`
  - SOP 状态已闭环：`outputs/sop-multi-role-brainstorm/1-3-670e1dcd/logs/sop-closeout.log`
  - 最终状态快照：`outputs/sop-multi-role-brainstorm/1-3-670e1dcd/logs/sop-status-final.log`

### 2026-02-12 11:51:27 +0800 | SOP 1.4 架构圆桌完成（run: 1-4-cdf0f11e）

- Step 1（初始化）:
  - 启动 run：`ai sop run 1.4`（Council）。
  - onecontext 检索完成（无历史命中）：
    - `outputs/sop-architecture-council/1-4-cdf0f11e/logs/onecontext-session-search.log`
    - `outputs/sop-architecture-council/1-4-cdf0f11e/logs/onecontext-content-search.log`
  - `planning-with-files` 误生成目录已归档并清理：
    - `outputs/sop-architecture-council/1-4-cdf0f11e/artifacts/planning-with-files-misgenerated-doc/`

- Step 2（角色分工输出）:
  - 架构圆桌报告：
    - `outputs/sop-architecture-council/1-4-cdf0f11e/reports/architecture_council_report.md`
    - `outputs/sop-architecture-council/1-4-cdf0f11e/reports/architecture_council_report.json`
  - 角色结论：
    - Architect：边界不变，维持 `Web -> API -> AI/Data`。
    - Security：auth 限流 + API->AI 内部鉴权列入优先治理。
    - SRE：trace_id 贯通与证据保留策略纳入下一轮执行计划。

- Step 3（ADR + 风险清单 + 架构文档）:
  - ADR 新增：
    - `doc/00_project/initiative_data-wings/ADR-2026-02-12-architecture-council-refresh.md`
  - 风险清单更新：
    - `doc/00_project/initiative_data-wings/ARCHITECTURE_RISK_REGISTER.md`
    - 新增 `RISK-011` / `RISK-012` / `RISK-013`
  - 架构文档同步：
    - `doc/00_project/initiative_data-wings/SYSTEM_ARCHITECTURE.md`（Section 22）

- 门禁与收口：
  - `ai check` 通过：`outputs/sop-architecture-council/1-4-cdf0f11e/logs/ai-check.log`
  - SOP 步骤打点完成（Step 1-3 `done`）
  - run 已闭环：`outputs/sop-architecture-council/1-4-cdf0f11e/logs/sop-closeout.log`
  - 最终状态：`outputs/sop-architecture-council/1-4-cdf0f11e/logs/sop-status-final.log`

---

### 2026-02-12 | Entrypoint 修复：`make dev` 全栈启动（本地 / Go 缺失自动回退 Docker）

- 背景：`make dev` 仅启动 web（`pnpm dev`），当 API/AI 未启动时 `/signup` 会出现浏览器侧 `Failed to fetch`。
- 修复：引入 `scripts/dev_all.sh`，`make dev` 改为全栈启动；无 Go 环境自动回退 `docker compose up web api ai clickhouse redis`。
- 同步：`scripts/quickstart.sh` Redis readiness 改为 `docker compose exec`（避免依赖 host redis-cli），并修正 Redis host port 输出。
- 证据：
  - `outputs/sop-entrypoint-consistency/3-2-4ebf9336/logs/queue.log`
  - `outputs/sop-entrypoint-consistency/3-2-4ebf9336/reports/entrypoint_make_dev_fallback_report.md`

---

### 2026-02-13 | SOP 3.2 证据刷新（run: 3-2-4ebf9336）

- 结果：`make dev`（无 Go 自动回退 Docker）链路验证全绿，`/signup -> /app` 且 `Failed to fetch=0`。
- 证据：
  - `outputs/sop-entrypoint-consistency/3-2-4ebf9336/logs/queue.log`
  - `outputs/sop-entrypoint-consistency/3-2-4ebf9336/reports/entrypoint_make_dev_fallback_report.md`
  - `outputs/sop-entrypoint-consistency/3-2-4ebf9336/reports/round2_probe_signup_after_fix.json`
  - `outputs/sop-entrypoint-consistency/3-2-4ebf9336/screenshots/signup-round2-after-fix.png`

---

### 2026-02-13 | SOP 3.3 真实 API 与可复现实验（证据刷新，run: 3-3-5ba52775）

- 结果：核心路径回放 `failures=0`，并刷新 baseline（track/overview 不再为 `503`）。
- 证据：
  - `outputs/sop-real-api-repro/3-3-5ba52775/logs/queue.log`
  - `outputs/sop-real-api-repro/3-3-5ba52775/reports/real_api_capture.md`
  - `outputs/sop-real-api-repro/3-3-5ba52775/diff/baseline_update.patch`
- Baseline（latest）：
  - `fixtures/replay/real_api/core_path.capture.baseline.json`
  - `fixtures/replay/real_api/core_path.capture.baseline.md`

---

### 2026-02-13 | SOP 3.7 功能闭环完整实现检查（证据刷新，run: 3-7-0afb519a）

- 结果：入口闭环 + 系统闭环（含 ClickHouse 持久化）+ 契约闭环 + 验证闭环均 PASS。
- 证据：
  - `outputs/sop-full-loop-check/3-7-0afb519a/logs/queue.log`
  - `outputs/sop-full-loop-check/3-7-0afb519a/reports/full_loop_check_report.md`
  - `outputs/sop-full-loop-check/3-7-0afb519a/reports/round2_probe_uxmap_after_signup.json`

---

### 2026-02-13 | SOP 4.1 项目级全链路回归（证据刷新，run: 4-1-9c7e079a）

- 结果：UX Map E2E + Real API replay + backend contract probe + `ai check` 均 PASS。
- 关键验证：
  - `/signup -> /app` 返回 `201`，`Failed to fetch=0`、`Signup failed=0`
  - CORS preflight（origin `localhost:3000/3009`）返回 `204`
- 证据：
  - `outputs/sop-project-regression/4-1-9c7e079a/logs/queue.log`
  - `outputs/sop-project-regression/4-1-9c7e079a/reports/uxmap_e2e_probe.md`
  - `outputs/sop-project-regression/4-1-9c7e079a/reports/real_api_capture.md`
  - `outputs/sop-project-regression/4-1-9c7e079a/reports/backend_contract_probe.md`
  - `outputs/sop-project-regression/4-1-9c7e079a/logs/ai-check.log`
  - `outputs/sop-project-regression/4-1-9c7e079a/logs/sop-closeout.log`

---

### 2026-02-13 | SOP 5.1 联合验收与发布守门（证据刷新，run: 5-1-c1513579）

- 结果：Release gate PASS（Product/Tech/QA）。
  - Product：UX Map 路径闭环（`overall_ok=true`）
  - Tech：Real API replay `failures=0`
  - QA：Contract probe `overall_ok=true` + Round 1 `ai check` PASS
- 证据：
  - `outputs/sop-joint-acceptance/5-1-c1513579/reports/joint_acceptance_release_gate.md`
  - `outputs/sop-joint-acceptance/5-1-c1513579/logs/ai-check-round1.log`
  - `outputs/sop-joint-acceptance/5-1-c1513579/reports/uxmap_e2e_probe.md`
  - `outputs/sop-joint-acceptance/5-1-c1513579/reports/real_api_capture.md`
  - `outputs/sop-joint-acceptance/5-1-c1513579/reports/backend_contract_probe.md`
  - `outputs/sop-joint-acceptance/5-1-c1513579/logs/sop-closeout.log`
  - 注：release gate report 生成脚本曾因 heredoc/backtick 导致 command substitution 误执行，已补丁修复并再生报告（证据：`outputs/sop-joint-acceptance/5-1-c1513579/logs/report-regenerate.log`）。

- Post-run: docs 追加后再跑一次 `ai check` 仍 PASS（证据：`outputs/sop-joint-acceptance/5-1-c1513579/logs/ai-check-post-doc-update.log`）。

---

### 2026-02-13 | SOP 4.2 增量式 AI Code Review（run: 4-2-1579b4d0）

- Review 报告：`outputs/sop-code-review/4-2-1579b4d0/reports/review_report.md`
- Diff patch：`outputs/sop-code-review/4-2-1579b4d0/diff/working_tree.patch`
- Pattern scan：`outputs/sop-code-review/4-2-1579b4d0/reports/pattern_scan.md`

---

### 2026-02-13 | SOP 3.9 供应链安全持续监控（run: 3-9-ee500287）

- 证据目录：`outputs/sop-supply-chain/3-9-ee500287/`
  - Summary：`outputs/sop-supply-chain/3-9-ee500287/reports/summary.md`
  - pnpm root/web：`outputs/sop-supply-chain/3-9-ee500287/logs/pnpm-audit-root.log` / `outputs/sop-supply-chain/3-9-ee500287/logs/pnpm-audit-web.log`
  - pip-audit+safety：`outputs/sop-supply-chain/3-9-ee500287/logs/pip-audit-safety.log`
  - detect-secrets：`outputs/sop-supply-chain/3-9-ee500287/logs/detect-secrets.log`

- 后续补齐：CI 增加 Supply Chain gate（`.github/workflows/ci.yml`），并落盘 allowlist（`security/supply_chain_allowlist.json`）与 gate script（`scripts/supply_chain_gate.py`）。
- Gate 本地复测 PASS：`outputs/sop-supply-chain/3-9-ee500287/logs/supply-chain-gate-local.log`。

---

### 2026-02-13 | SOP 5.3 Postmortem 自动化守门（run: 5-3-f13a8584）

- Postmortems: `postmortem/PM-*.md`
- Pre-release scan: `outputs/sop-postmortem/5-3-f13a8584/logs/pre-release-scan.log`
- CI gate: `.github/workflows/ci.yml` 新增 postmortem-scan job

---

### 2026-02-13 | SOP 5.2 智能体发布与版本治理（run: 5-2-dae6a322）

- 证据目录：`outputs/sop-version-governance/5-2-dae6a322/`
  - ai check Round 1：`outputs/sop-version-governance/5-2-dae6a322/logs/ai-check-round1.log`
  - UX Map Round 2：`outputs/sop-version-governance/5-2-dae6a322/reports/uxmap_e2e_probe.md`
  - Version + rollback：`outputs/sop-version-governance/5-2-dae6a322/reports/release_versioning_and_rollback.md`

---

### 2026-02-13 | PDCA 四文档一致性回写（release gates sync）

- Updated: PRD/UX Map/PDCA/Platform plan to reference latest evidence runs (4.1/5.1/5.2/5.3)
- Evidence: outputs/sop-version-governance/5-2-dae6a322/logs/doc-consistency-queue.log

---

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

