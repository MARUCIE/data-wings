# Data Wings - 用户体验地图

**版本**: v1.0
**日期**: 2025-01-28
**作者**: UX 设计师
**PROJECT_DIR**: `/Users/mauricewen/Projects/09-data-wings`

---

## 1. 用户角色（Personas）

### 1.1 数据分析师 - Alex

| 属性 | 描述 |
|------|------|
| **角色描述** | 负责业务数据分析，具备 SQL 能力，日常产出分析报告 |
| **核心诉求** | 快速获取业务指标，自主完成分析，减少对数据工程师的依赖 |
| **痛点** | 取数排期长、SQL 编写繁琐、重复性报表工作多 |
| **期望** | 用自然语言提问即可获得分析结果，自动生成周报 |
| **关键场景** | 日常指标监控、临时分析需求、定期报告输出 |

### 1.2 产品经理 - Bella

| 属性 | 描述 |
|------|------|
| **角色描述** | 负责产品功能规划，关注用户行为和功能效果 |
| **核心诉求** | 实时了解功能效果，验证产品假设，数据驱动决策 |
| **痛点** | 埋点复杂需等开发、不懂 SQL、分析结果难以解读 |
| **期望** | 5 分钟接入，零代码看数据，AI 自动给建议 |
| **关键场景** | 功能上线效果分析、用户路径优化、A/B 测试 |

### 1.3 开发工程师 - Chris

| 属性 | 描述 |
|------|------|
| **角色描述** | 负责产品开发，需要集成 SDK 和实现埋点 |
| **核心诉求** | 快速完成集成，低维护成本，API 文档清晰 |
| **痛点** | SDK 体积大影响性能、埋点方案频繁变更、调试困难 |
| **期望** | SDK 轻量、Auto-Capture 减少工作量、实时调试工具 |
| **关键场景** | SDK 集成、埋点开发、数据校验、性能优化 |

### 1.4 企业管理者 - Diana

| 属性 | 描述 |
|------|------|
| **角色描述** | 技术/业务负责人，关注整体业务表现和技术选型 |
| **核心诉求** | 数据安全、成本可控、自主可控、合规达标 |
| **痛点** | 国外产品合规风险、私有化成本高、厂商锁定 |
| **期望** | 私有化部署、国产化、开源可审计、合规模板 |
| **关键场景** | 技术选型、数据安全审计、合规报告 |

---

## 2. 用户旅程（User Journey）

### 2.1 数据分析师旅程

```
阶段        认知           试用           使用           深度使用        推荐
           |              |              |              |              |
触点      搜索/推荐       注册/接入       日常分析        高级功能        分享/口碑
           |              |              |              |              |
行为      了解AI分析      5分钟接入      自然语言查询    预测分析        推荐同事
          对比竞品        首次看数据     创建仪表盘      自动洞察        社区贡献
           |              |              |              |              |
情绪       中             高             高             高              高
          "这个有意思"   "接入真快"    "省时间"       "太智能了"     "必须推荐"
           |              |              |              |              |
机会      突出AI差异      优化Onboard    查询建议       个性化洞察      激励机制
          案例展示        新手引导       模板库         学习偏好        社区运营
```

### 2.2 产品经理旅程

```
阶段        认知           试用           使用           深度使用        推荐
           |              |              |              |              |
触点      同行推荐        Demo/试用      看数据         洞察驱动决策    团队推广
           |              |              |              |              |
行为      了解功能        零代码接入     漏斗留存分析   AB测试分析      邀请同事
          关注易用性      首次提问       周报订阅       预测分析        写使用心得
           |              |              |              |              |
情绪       中             高             中-高          高              高
          "能不用SQL吗"  "终于能自己看" "数据有了"    "决策有依据"   "团队都用"
           |              |              |              |              |
机会      强调零代码      引导式提问     报告模板       决策建议        协作功能
          案例视频        示例问题       定时推送       场景化洞察      权限管理
```

---

## 3. 信息架构（Information Architecture）

### 3.1 一级导航

```
┌─────────────────────────────────────────────────────────────────┐
│  Logo   首页   分析   洞察   仪表盘   数据   设置      用户头像  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 完整导航结构

```
Data Wings
├── 首页 (Dashboard)
│   ├── 概览卡片
│   ├── 快捷入口
│   └── 最近访问
│
├── 分析 (Analytics)
│   ├── 事件分析
│   │   ├── 事件趋势
│   │   └── 事件明细
│   ├── 漏斗分析
│   ├── 留存分析
│   ├── 用户路径
│   ├── 分群分析
│   └── SQL 查询
│
├── 洞察 (Insights)
│   ├── AI 问答
│   ├── 自动洞察
│   ├── 异常告警
│   └── 预测分析
│
├── 仪表盘 (Dashboards)
│   ├── 我的仪表盘
│   ├── 团队仪表盘
│   └── 模板库
│
├── 数据 (Data)
│   ├── 事件管理
│   ├── 用户属性
│   ├── 数据导入
│   └── 数据导出
│
└── 设置 (Settings)
    ├── 项目设置
    ├── 团队管理
    ├── 集成配置
    ├── SDK 接入
    └── 账户设置
```

### 3.3 Mermaid 架构图

```mermaid
graph TB
    subgraph "Marketing Site"
        Home[首页]
        Features[功能特性]
        Pricing[定价]
        Docs[文档]
    end

    subgraph "App - 分析模块"
        Dashboard[概览首页]
        Analytics[分析]
        Insights[洞察]
        Dashboards[仪表盘]
        Data[数据管理]
        Settings[设置]
    end

    subgraph "Analytics 子模块"
        Events[事件分析]
        Funnel[漏斗分析]
        Retention[留存分析]
        Paths[用户路径]
        Cohorts[分群分析]
        SQL[SQL 查询]
    end

    subgraph "Insights 子模块"
        AskAI[AI 问答]
        AutoInsights[自动洞察]
        Alerts[异常告警]
        Predictions[预测分析]
    end

    Home --> Dashboard
    Dashboard --> Analytics
    Dashboard --> Insights
    Dashboard --> Dashboards

    Analytics --> Events
    Analytics --> Funnel
    Analytics --> Retention
    Analytics --> Paths
    Analytics --> Cohorts
    Analytics --> SQL

    Insights --> AskAI
    Insights --> AutoInsights
    Insights --> Alerts
    Insights --> Predictions
```

---

## 4. 核心页面流程

### 4.1 Onboarding 流程

```
注册 --> 创建项目 --> 选择平台 --> 安装SDK --> 验证数据 --> 首次分析
 |         |            |           |           |           |
邮箱注册   项目名称     Web/iOS    复制代码    实时校验    引导提问
手机注册   项目描述     Android    npm安装     成功提示    示例问题
SSO       行业选择     小程序                  错误排查    模板报告
```

**Onboarding 时序图**:

```mermaid
sequenceDiagram
    participant U as 用户
    participant W as Web App
    participant S as 后端服务
    participant SDK as SDK

    U->>W: 注册/登录
    W->>S: 创建用户
    S-->>W: 返回 Token

    U->>W: 创建项目
    W->>S: 生成 API Key
    S-->>W: 返回项目配置

    U->>W: 选择平台 (Web)
    W-->>U: 展示安装指南

    U->>SDK: 安装 SDK
    SDK->>S: 发送首个事件
    S-->>W: 通知数据到达

    W-->>U: 显示"数据接入成功"
    W-->>U: 引导至 AI 问答

    U->>W: 输入首个问题
    W->>S: 处理 NL 查询
    S-->>W: 返回分析结果
    W-->>U: 展示图表 + 解释
```

### 4.2 日常分析流程

```
提出问题 --> AI理解 --> 生成查询 --> 展示结果 --> 追问/调整 --> 保存/分享
    |          |          |           |           |            |
自然语言    意图识别    SQL生成    图表渲染    多轮对话      仪表盘
预设模板    参数确认    执行查询    数据解读    修改条件      导出报告
```

### 4.3 AI 交互流程

```mermaid
stateDiagram-v2
    [*] --> Idle: 打开 AI 问答
    Idle --> Typing: 用户输入
    Typing --> Understanding: 发送问题
    Understanding --> Clarifying: 需要澄清
    Understanding --> Executing: 理解完成
    Clarifying --> Understanding: 用户补充
    Executing --> Completed: 查询成功
    Executing --> Error: 查询失败
    Completed --> FollowUp: 用户追问
    FollowUp --> Understanding: 新问题
    Completed --> Idle: 结束对话
    Error --> Idle: 重新开始
```

---

## 5. 关键交互设计原则

### 5.1 AI 交互设计原则

| 原则 | 说明 | 示例 |
|------|------|------|
| **渐进披露** | 先给结论，再给详情 | "日活下降 15%"，点击展开"主要原因是..." |
| **可解释性** | 说明 AI 如何得出结论 | "我理解您在问过去 7 天的 DAU 趋势" |
| **容错性** | 提供修正机会 | "不对？点击这里调整时间范围" |
| **引导性** | 推荐下一步问题 | "您可能还想知道：留存率变化？" |
| **确定性** | 明确正在处理 | 加载动画 + "正在分析 1.2M 条数据..." |

### 5.2 数据可视化原则

| 原则 | 说明 |
|------|------|
| **图表自适应** | 根据数据特征自动选择最佳图表类型 |
| **色彩一致** | 同一指标在不同视图使用相同颜色 |
| **交互提示** | hover 显示详细数值，click 下钻 |
| **响应式** | 移动端自动调整图表布局 |

### 5.3 空状态处理

| 场景 | 处理方式 |
|------|----------|
| 无数据 | 引导接入 SDK，提供测试数据 |
| 无结果 | 建议调整条件，推荐相似查询 |
| 首次使用 | 交互式教程，示例问题 |
| 加载中 | 骨架屏 + 进度提示 |

### 5.4 错误处理

| 错误类型 | 处理方式 |
|----------|----------|
| 查询超时 | "数据量较大，已转为后台处理，完成后通知您" |
| 语义不明 | "我不太确定您的意思，您是想问...还是...？" |
| 权限不足 | "您没有访问该数据的权限，请联系管理员" |
| 系统错误 | "抱歉出了点问题，我们已记录，请稍后重试" |

---

## 6. 页面清单（Page Inventory）

### 6.1 公开页面

| 页面ID | 页面名称 | URL | 功能描述 | 用户角色 |
|--------|---------|-----|----------|----------|
| P-001 | 首页 | / | 产品介绍、核心价值 | 所有访客 |
| P-002 | 功能特性 | /features | 功能详细介绍 | 潜在用户 |
| P-003 | 定价 | /pricing | 版本对比、价格 | 决策者 |
| P-004 | 文档首页 | /docs | 文档导航 | 开发者 |
| P-005 | 快速开始 | /docs/quickstart | 5分钟入门 | 开发者 |
| P-006 | SDK 文档 | /docs/sdk/* | 各平台 SDK | 开发者 |
| P-007 | API 参考 | /docs/api | API 文档 | 开发者 |
| P-008 | 博客 | /blog | 内容营销 | 所有访客 |
| P-009 | 客户案例 | /customers | 成功案例 | 决策者 |
| P-010 | 关于我们 | /about | 公司介绍 | 所有访客 |

### 6.2 应用页面

| 页面ID | 页面名称 | URL | 功能描述 | 用户角色 |
|--------|---------|-----|----------|----------|
| A-001 | 登录 | /login | 用户登录 | 所有用户 |
| A-002 | 注册 | /signup | 用户注册 | 新用户 |
| A-003 | 概览首页 | /app | 数据概览、快捷入口 | 所有用户 |
| A-004 | AI 问答 | /app/ask | 自然语言查询 | 分析师、PM |
| A-005 | 事件分析 | /app/events | 事件趋势分析 | 分析师 |
| A-006 | 漏斗分析 | /app/funnels | 转化漏斗 | 分析师、PM |
| A-007 | 留存分析 | /app/retention | N日留存 | 分析师、PM |
| A-008 | 用户路径 | /app/paths | 行为路径 | 分析师、PM |
| A-009 | 分群分析 | /app/cohorts | 用户分群 | 分析师 |
| A-010 | SQL 查询 | /app/sql | 高级查询 | 分析师 |
| A-011 | 自动洞察 | /app/insights | AI 生成洞察 | 所有用户 |
| A-012 | 异常告警 | /app/alerts | 告警配置与历史 | 分析师、PM |
| A-013 | 预测分析 | /app/predictions | 流失/LTV 预测 | 分析师 |
| A-014 | 仪表盘列表 | /app/dashboards | 仪表盘管理 | 所有用户 |
| A-015 | 仪表盘详情 | /app/dashboards/:id | 查看仪表盘 | 所有用户 |
| A-016 | 仪表盘编辑 | /app/dashboards/:id/edit | 编辑仪表盘 | 分析师 |
| A-017 | 事件管理 | /app/data/events | 事件定义管理 | 开发者 |
| A-018 | 用户属性 | /app/data/properties | 用户属性管理 | 开发者 |
| A-019 | 数据导入 | /app/data/import | 历史数据导入 | 开发者 |
| A-020 | 项目设置 | /app/settings/project | 项目配置 | 管理者 |
| A-021 | 团队管理 | /app/settings/team | 成员与权限 | 管理者 |
| A-022 | SDK 接入 | /app/settings/sdk | SDK 配置与 Key | 开发者 |
| A-023 | 集成配置 | /app/settings/integrations | 第三方集成 | 开发者 |

---

## 7. Mermaid 架构图

### 7.1 整体页面架构

```mermaid
graph TB
    subgraph "公开网站"
        Landing[首页]
        Features[功能]
        Pricing[定价]
        Docs[文档]
        Blog[博客]
    end

    subgraph "应用 - 核心"
        Home[概览首页]
        Ask[AI 问答]
    end

    subgraph "应用 - 分析"
        Events[事件分析]
        Funnels[漏斗]
        Retention[留存]
        Paths[路径]
        Cohorts[分群]
        SQL[SQL]
    end

    subgraph "应用 - 洞察"
        Insights[自动洞察]
        Alerts[告警]
        Predictions[预测]
    end

    subgraph "应用 - 仪表盘"
        DashList[仪表盘列表]
        DashView[仪表盘查看]
        DashEdit[仪表盘编辑]
    end

    subgraph "应用 - 设置"
        Settings[项目设置]
        Team[团队管理]
        SDKConfig[SDK配置]
    end

    Landing --> Home
    Home --> Ask
    Home --> Events
    Home --> Insights
    Home --> DashList

    Ask --> Events
    Ask --> Funnels
    Ask --> DashEdit

    Events --> Funnels
    Events --> Retention
    Events --> Paths

    Insights --> Alerts
    Insights --> Predictions

    DashList --> DashView
    DashView --> DashEdit
```

### 7.2 用户角色访问图

```mermaid
graph LR
    subgraph "用户角色"
        Analyst[数据分析师]
        PM[产品经理]
        Dev[开发工程师]
        Manager[管理者]
    end

    subgraph "高频页面"
        Ask[AI 问答]
        Funnels[漏斗分析]
        Retention[留存分析]
        Insights[自动洞察]
        Dashboards[仪表盘]
    end

    subgraph "专属页面"
        SQL[SQL 查询]
        Predictions[预测分析]
        SDKConfig[SDK 配置]
        Team[团队管理]
    end

    Analyst --> Ask
    Analyst --> SQL
    Analyst --> Predictions
    Analyst --> Dashboards

    PM --> Ask
    PM --> Funnels
    PM --> Retention
    PM --> Insights

    Dev --> SDKConfig
    Dev --> Docs

    Manager --> Dashboards
    Manager --> Insights
    Manager --> Team
```

### 7.3 Onboarding 流程图

```mermaid
flowchart TD
    Start([开始]) --> Register[注册账号]
    Register --> CreateProject[创建项目]
    CreateProject --> SelectPlatform{选择平台}

    SelectPlatform -->|Web| WebSDK[安装 Web SDK]
    SelectPlatform -->|iOS| iOSSDK[安装 iOS SDK]
    SelectPlatform -->|Android| AndroidSDK[安装 Android SDK]
    SelectPlatform -->|小程序| MiniSDK[安装小程序 SDK]

    WebSDK --> Verify{验证数据}
    iOSSDK --> Verify
    AndroidSDK --> Verify
    MiniSDK --> Verify

    Verify -->|成功| FirstQuery[首次 AI 查询]
    Verify -->|失败| Debug[调试排查]
    Debug --> Verify

    FirstQuery --> Explore[探索更多功能]
    Explore --> End([完成])
```

### 7.4 AI 交互状态机

```mermaid
stateDiagram-v2
    [*] --> Idle

    Idle --> Typing: 用户开始输入
    Typing --> Idle: 清空输入
    Typing --> Sent: 发送问题

    Sent --> Processing: 服务端处理
    Processing --> Clarifying: 需要澄清
    Processing --> Generating: 生成结果

    Clarifying --> Typing: 用户补充
    Generating --> Rendering: 渲染图表
    Generating --> Error: 生成失败

    Rendering --> Complete: 展示完成
    Error --> Idle: 重新开始

    Complete --> FollowUp: 用户追问
    Complete --> Save: 保存结果
    Complete --> Idle: 结束对话

    FollowUp --> Sent: 新问题
    Save --> Complete: 保存成功
```

### 7.5 告警触发流程

```mermaid
sequenceDiagram
    participant Scheduler as 调度器
    participant Detector as 异常检测
    participant LLM as AI 分析
    participant Notifier as 通知服务
    participant User as 用户

    Scheduler->>Detector: 定时触发检测
    Detector->>Detector: 计算指标异常

    alt 发现异常
        Detector->>LLM: 请求分析原因
        LLM-->>Detector: 返回洞察
        Detector->>Notifier: 发送告警
        Notifier->>User: 邮件/钉钉/飞书
        User->>Detector: 查看详情
    else 无异常
        Detector->>Scheduler: 记录正常
    end
```

---

## 8. 设计系统规范

### 8.1 颜色体系

| 用途 | 颜色 | 色值 |
|------|------|------|
| 主色 | 蓝色 | #2563EB |
| 成功 | 绿色 | #10B981 |
| 警告 | 橙色 | #F59E0B |
| 错误 | 红色 | #EF4444 |
| 中性 | 灰色 | #6B7280 |
| 背景 | 浅灰 | #F9FAFB |

### 8.2 字体规范

| 用途 | 字号 | 字重 |
|------|------|------|
| H1 标题 | 32px | Bold |
| H2 标题 | 24px | Bold |
| H3 标题 | 20px | Semibold |
| 正文 | 14px | Regular |
| 辅助文字 | 12px | Regular |
| 数据数字 | 16px | Medium |

### 8.3 间距规范

| 级别 | 大小 | 用途 |
|------|------|------|
| xs | 4px | 图标与文字间距 |
| sm | 8px | 紧凑元素间距 |
| md | 16px | 标准元素间距 |
| lg | 24px | 区块间距 |
| xl | 32px | 页面区域间距 |

### 8.4 响应式断点

| 断点 | 宽度 | 布局 |
|------|------|------|
| Mobile | < 768px | 单列，抽屉导航 |
| Tablet | 768px - 1024px | 双列，折叠侧边栏 |
| Desktop | > 1024px | 多列，完整侧边栏 |

---

## 9. 可访问性要求

| 要求 | 标准 | 实现 |
|------|------|------|
| 颜色对比度 | WCAG AA (4.5:1) | 文字与背景对比度检查 |
| 键盘导航 | 全功能可用 | Tab 顺序、焦点样式 |
| 屏幕阅读器 | ARIA 标签 | 语义化 HTML、aria-label |
| 图表可访问 | 替代文本 | 数据表格、摘要文字 |

---

## 10. 度量指标

| 指标 | 目标 | 测量方式 |
|------|------|----------|
| Onboarding 完成率 | > 80% | 漏斗分析 |
| 首次查询时间 | < 5 分钟 | 事件间隔 |
| AI 查询满意度 | > 85% | 用户反馈 |
| 页面加载时间 | < 2 秒 | Performance API |
| 错误率 | < 1% | 异常监控 |

---

## 附录

### A. 竞品参考

- Amplitude: https://amplitude.com/
- PostHog: https://posthog.com/
- Mixpanel: https://mixpanel.com/

### B. 设计资源

- 设计稿：Figma（待创建）
- 组件库：Ant Design / Shadcn UI
- 图表库：ECharts / Recharts

---

猪哥云（四川）网络科技有限公司 | 合规网 www.hegui.com
猪哥云-数据产品部-Maurice | maurice_wen@proton.me
2025 猪哥云-灵阙企业级智能体平台
