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

---

## 当前进度

**Phase**: 5 - 项目脚手架（已完成）
**Status**: 已完成
**Last Updated**: 2025-01-28

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
| 交付物清单 | deliverable.md | [ ] 待更新 |

---

## 下一步行动

1. ~~**更新 deliverable.md** - 标记所有交付物完成状态~~ [x] 完成
2. ~~**Git 初始提交** - 提交所有规划文档~~ [x] 完成
3. ~~**技术 Spike** - 验证 NL2SQL 技术可行性~~ [x] 完成
4. ~~**项目脚手架** - 初始化前后端项目结构~~ [x] 完成
5. **本地开发环境** - `docker compose up -d` 启动完整开发栈
6. **配置 API Keys** - 复制 `.env.example` 到 `.env` 并填入 DeepSeek API Key
7. **端到端测试** - 验证 NL2SQL 真实调用
8. **设计稿** - 基于 UX Map 开始 Figma 设计
9. **SDK 开发** - JavaScript/TypeScript SDK

---

猪哥云（四川）网络科技有限公司 | 合规网 www.hegui.com
猪哥云-数据产品部-Maurice | maurice_wen@proton.me
2025 猪哥云-灵阙企业级智能体平台
