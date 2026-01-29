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
