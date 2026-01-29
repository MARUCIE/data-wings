# Data Wings - 网站地图与 SEO 策略

**版本**: v1.0
**日期**: 2025-01-28
**作者**: SEO 专家
**PROJECT_DIR**: `/Users/mauricewen/Projects/09-data-wings`

---

## 1. 网站地图（Sitemap）

### 1.1 公开网站（Marketing Site）

```
datawings.io/
├── /                           # 首页
├── /features/                  # 功能特性
│   ├── /features/ai-insights       # AI 洞察
│   ├── /features/natural-language  # 自然语言查询
│   ├── /features/auto-capture      # 自动埋点
│   ├── /features/funnels           # 漏斗分析
│   ├── /features/retention         # 留存分析
│   ├── /features/dashboards        # 仪表盘
│   ├── /features/predictions       # 预测分析
│   └── /features/compliance        # 合规模板
├── /solutions/                 # 解决方案
│   ├── /solutions/saas             # SaaS 产品
│   ├── /solutions/ecommerce        # 电商
│   ├── /solutions/fintech          # 金融科技
│   ├── /solutions/gaming           # 游戏
│   └── /solutions/enterprise       # 企业级
├── /pricing/                   # 定价
│   ├── /pricing/cloud              # 云服务定价
│   └── /pricing/self-hosted        # 私有化定价
├── /compare/                   # 竞品对比
│   ├── /compare/vs-sensors         # vs 神策
│   ├── /compare/vs-growingio       # vs GrowingIO
│   ├── /compare/vs-mixpanel        # vs Mixpanel
│   ├── /compare/vs-amplitude       # vs Amplitude
│   ├── /compare/vs-posthog         # vs PostHog
│   └── /compare/vs-ga4             # vs GA4
├── /customers/                 # 客户案例
│   ├── /customers/case-studies     # 案例详情
│   └── /customers/testimonials     # 客户证言
├── /resources/                 # 资源中心
│   ├── /resources/blog             # 博客
│   ├── /resources/guides           # 指南
│   ├── /resources/webinars         # 网络研讨会
│   ├── /resources/whitepapers      # 白皮书
│   └── /resources/templates        # 模板
├── /about/                     # 关于我们
│   ├── /about/team                 # 团队介绍
│   ├── /about/careers              # 招聘
│   └── /about/contact              # 联系我们
├── /open-source/               # 开源 [差异化]
│   ├── /open-source/github         # GitHub
│   ├── /open-source/contributing   # 贡献指南
│   └── /open-source/community      # 社区
└── /legal/                     # 法律
    ├── /legal/privacy              # 隐私政策
    ├── /legal/terms                # 服务条款
    └── /legal/security             # 安全
```

### 1.2 产品应用（App）

```
app.datawings.io/
├── /                           # 概览首页
├── /ask                        # AI 问答
├── /analytics/                 # 分析
│   ├── /analytics/events           # 事件分析
│   ├── /analytics/funnels          # 漏斗分析
│   ├── /analytics/retention        # 留存分析
│   ├── /analytics/paths            # 用户路径
│   ├── /analytics/cohorts          # 分群分析
│   └── /analytics/sql              # SQL 查询
├── /insights/                  # 洞察
│   ├── /insights/auto              # 自动洞察
│   ├── /insights/alerts            # 告警
│   └── /insights/predictions       # 预测
├── /app/dashboards/                # 仪表盘
│   ├── /app/dashboards/:id             # 仪表盘详情
│   └── /app/dashboards/:id/edit        # 编辑
├── /data/                      # 数据管理
│   ├── /data/events                # 事件管理
│   ├── /data/properties            # 属性管理
│   ├── /data/import                # 数据导入
│   └── /data/export                # 数据导出
└── /settings/                  # 设置
    ├── /settings/project           # 项目设置
    ├── /settings/team              # 团队管理
    ├── /settings/sdk               # SDK 配置
    ├── /settings/integrations      # 集成
    └── /settings/billing           # 账单
```

### 1.3 开发者文档（Docs）

```
docs.datawings.io/
├── /                           # 文档首页
├── /getting-started/           # 快速开始
│   ├── /getting-started/quickstart     # 5分钟入门
│   ├── /getting-started/concepts       # 核心概念
│   └── /getting-started/first-query    # 第一次查询
├── /sdks/                      # SDK 文档
│   ├── /sdks/javascript            # Web SDK
│   ├── /sdks/react                 # React SDK
│   ├── /sdks/vue                   # Vue SDK
│   ├── /sdks/python                # Python SDK
│   ├── /sdks/java                  # Java SDK
│   ├── /sdks/go                    # Go SDK
│   ├── /sdks/ios                   # iOS SDK
│   ├── /sdks/android               # Android SDK
│   └── /sdks/flutter               # Flutter SDK
├── /api/                       # API 参考
│   ├── /api/overview               # API 概览
│   ├── /api/authentication         # 认证
│   ├── /api/events                 # 事件 API
│   ├── /api/users                  # 用户 API
│   ├── /api/analytics              # 分析 API
│   └── /api/export                 # 导出 API
├── /integrations/              # 集成
│   ├── /integrations/segment       # Segment
│   ├── /integrations/zapier        # Zapier
│   ├── /integrations/slack         # Slack
│   └── /integrations/webhook       # Webhook
├── /self-hosting/              # 私有化部署
│   ├── /self-hosting/docker        # Docker
│   ├── /self-hosting/kubernetes    # Kubernetes
│   ├── /self-hosting/requirements  # 系统要求
│   └── /self-hosting/upgrade       # 升级指南
├── /data-model/                # 数据模型
│   ├── /data-model/events          # 事件模型
│   ├── /data-model/users           # 用户模型
│   └── /data-model/properties      # 属性
├── /tutorials/                 # 教程
│   ├── /tutorials/tracking-plan    # 埋点方案设计
│   ├── /tutorials/funnel-analysis  # 漏斗分析实战
│   ├── /tutorials/retention-optimization  # 留存优化
│   └── /tutorials/ai-queries       # AI 查询技巧
└── /changelog/                 # 更新日志
```

---

## 2. URL 规范

### 2.1 命名规则

| 规则 | 示例 | 说明 |
|------|------|------|
| 全小写 | `/features/ai-insights` | 避免大小写混淆 |
| 连字符分隔 | `/self-hosting` | 不使用下划线 |
| 语义化命名 | `/compare/vs-mixpanel` | 用户可读 |
| 无尾部斜杠 | `/pricing` | 规范化 |
| 层级不超过 3 层 | `/docs/sdks/javascript` | SEO 友好 |

### 2.2 多语言 URL 策略

**子目录模式**（推荐）:

```
datawings.io/              # 英文（默认）
datawings.io/zh-CN/        # 简体中文
datawings.io/zh-TW/        # 繁体中文
datawings.io/ja/           # 日语
```

**hreflang 配置**:

```html
<link rel="alternate" hreflang="en" href="https://datawings.io/features" />
<link rel="alternate" hreflang="zh-CN" href="https://datawings.io/zh-CN/features" />
<link rel="alternate" hreflang="x-default" href="https://datawings.io/features" />
```

### 2.3 Canonical URL 策略

| 场景 | Canonical |
|------|-----------|
| 分页 | 指向第一页 `/blog` |
| 筛选/排序 | 指向无参数版本 |
| 重复内容 | 指向权威版本 |
| AMP 页面 | 指向标准版本 |

### 2.4 重定向规则

| 类型 | 示例 | 说明 |
|------|------|------|
| 301 永久 | `/product` → `/features` | 页面合并 |
| 301 永久 | `/docs/sdk` → `/docs/sdks` | URL 规范化 |
| 302 临时 | `/pricing-cn` → `/zh-CN/pricing` | A/B 测试期间 |

---

## 3. SEO 关键词策略

### 3.1 关键词研究

#### 3.1.1 核心关键词（品牌词）

| 关键词 | 搜索意图 | 目标页面 |
|--------|----------|----------|
| Data Wings | 品牌搜索 | 首页 |
| Data Wings 数据分析 | 品牌 + 品类 | 首页 |

#### 3.1.2 品类关键词

| 关键词 | 月搜索量(估) | 竞争度 | 目标页面 |
|--------|-------------|--------|----------|
| 数据分析平台 | 5,000+ | 高 | /features |
| 用户行为分析 | 3,000+ | 中 | /features |
| 产品分析工具 | 2,000+ | 中 | /features |
| 埋点工具 | 1,500+ | 中 | /features/auto-capture |

#### 3.1.3 竞品替代词（高转化）

| 关键词 | 月搜索量(估) | 竞争度 | 目标页面 |
|--------|-------------|--------|----------|
| 神策数据替代方案 | 500+ | 低 | /compare/vs-sensors |
| GrowingIO 替代 | 300+ | 低 | /compare/vs-growingio |
| Mixpanel 中文替代 | 200+ | 低 | /compare/vs-mixpanel |
| Amplitude 免费替代 | 300+ | 低 | /compare/vs-amplitude |
| PostHog 中国版 | 100+ | 低 | /compare/vs-posthog |

#### 3.1.4 AI 差异化关键词（蓝海）

| 关键词 | 月搜索量(估) | 竞争度 | 目标页面 |
|--------|-------------|--------|----------|
| AI 数据分析 | 2,000+ | 低 | /features/ai-insights |
| 自然语言数据查询 | 500+ | 低 | /features/natural-language |
| 智能数据分析 | 1,000+ | 低 | /features/ai-insights |
| AI 驱动分析 | 300+ | 低 | /features |

#### 3.1.5 长尾关键词

| 关键词 | 搜索意图 | 目标页面 |
|--------|----------|----------|
| 用户留存分析怎么做 | 方法论 | /resources/guides |
| 漏斗分析工具推荐 | 选型 | /features/funnels |
| 开源数据分析平台 | 技术选型 | /open-source |
| 私有化部署分析平台 | 企业需求 | /pricing/self-hosted |
| 小程序数据分析 | 场景 | /docs/sdks |

#### 3.1.6 问题类关键词

| 关键词 | 目标页面 | 内容策略 |
|--------|----------|----------|
| 如何做用户行为分析 | /resources/guides | 教程文章 |
| 埋点方案怎么设计 | /docs/tutorials | 最佳实践 |
| 什么是漏斗分析 | /resources/blog | 科普文章 |
| 数据分析平台怎么选 | /resources/blog | 对比文章 |

### 3.2 关键词优先级矩阵

| 优先级 | 类型 | 关键词示例 | 策略 |
|--------|------|-----------|------|
| P1 | AI 差异化 | AI 数据分析、自然语言查询 | 重点内容建设 |
| P1 | 竞品替代 | 神策替代、Mixpanel 替代 | 对比页面 |
| P2 | 品类核心 | 数据分析平台、用户行为分析 | 功能页优化 |
| P2 | 开源蓝海 | 开源数据分析、PostHog 中文 | 开源社区 |
| P3 | 长尾教程 | 留存分析怎么做、漏斗分析教程 | 博客内容 |
| P3 | 品牌词 | Data Wings | 品牌建设 |

---

## 4. 内容策略

### 4.1 内容支柱

| 支柱 | 主题 | 内容类型 | 目标关键词 |
|------|------|----------|-----------|
| **产品分析方法论** | 埋点设计、指标体系、分析框架 | 指南、教程 | 数据分析方法 |
| **增长实践** | 留存优化、转化提升、激活策略 | 案例、实战 | 用户增长 |
| **AI 数据分析** | 自然语言查询、自动洞察、预测 | 特色内容 | AI 分析 |
| **开源与自托管** | Docker 部署、K8s、数据隐私 | 技术文档 | 开源分析 |

### 4.2 博客内容规划

#### Q1 内容计划（12 周）

| 周 | 类型 | 标题 | 目标关键词 |
|----|------|------|-----------|
| W1 | 对比 | 神策数据 vs Data Wings：AI 能力对比 | 神策替代 |
| W2 | 教程 | 5 分钟搭建产品分析体系 | 产品分析工具 |
| W3 | 对比 | GrowingIO vs Data Wings：无埋点技术对比 | GrowingIO 替代 |
| W4 | 指南 | 用户留存分析完全指南 | 用户留存分析 |
| W5 | 特色 | 如何用自然语言做数据分析 | AI 数据分析 |
| W6 | 教程 | 漏斗分析实战：从 0 到 1 | 漏斗分析 |
| W7 | 对比 | Mixpanel vs Data Wings：价格与功能对比 | Mixpanel 替代 |
| W8 | 指南 | 埋点方案设计最佳实践 | 埋点设计 |
| W9 | 特色 | AI 自动洞察：让数据主动说话 | 智能数据分析 |
| W10 | 教程 | A/B 测试入门到精通 | A/B 测试 |
| W11 | 对比 | PostHog vs Data Wings：开源方案对比 | 开源数据分析 |
| W12 | 案例 | SaaS 产品如何用 Data Wings 提升留存 | SaaS 数据分析 |

### 4.3 竞品对比页策略

**页面结构**:

```markdown
# [竞品名] vs Data Wings：[核心差异]

## TL;DR（核心结论）
- 适合选择 [竞品] 的场景
- 适合选择 Data Wings 的场景

## 功能对比表
| 功能 | [竞品] | Data Wings |
|------|--------|------------|
| AI 能力 | ... | ... |

## 定价对比
...

## 迁移指南
...

## FAQ
...
```

**预期转化率**: 15-25%（参考 PostHog 数据）

---

## 5. 技术 SEO

### 5.1 Meta 标签规范

**Title 模板**:
- 首页: `Data Wings - AI 驱动的开源数据分析平台`
- 功能页: `[功能名] - Data Wings 数据分析`
- 博客: `[文章标题] | Data Wings 博客`
- 文档: `[文档标题] - Data Wings 文档`

**Description 模板**:
- 长度: 150-160 字符
- 包含: 核心价值 + 差异化 + CTA
- 示例: `Data Wings 是 AI 原生的开源数据分析平台，支持自然语言查询、自动洞察生成。5 分钟快速接入，免费开始使用。`

### 5.2 结构化数据（Schema.org）

**Organization**:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Data Wings",
  "url": "https://datawings.io",
  "logo": "https://datawings.io/logo.png",
  "sameAs": [
    "https://github.com/datawings",
    "https://twitter.com/datawings"
  ]
}
```

**SoftwareApplication**:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Data Wings",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

**Article**（博客）:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "author": {...},
  "datePublished": "...",
  "dateModified": "..."
}
```

**FAQ**（常见问题）:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [...]
}
```

**Breadcrumb**:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
```

### 5.3 Open Graph / Twitter Card

**OG 标签**:

```html
<meta property="og:title" content="Data Wings - AI 驱动的数据分析平台" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://datawings.io/og-image.png" />
<meta property="og:url" content="https://datawings.io" />
<meta property="og:type" content="website" />
```

**Twitter Card**:

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@datawings" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

### 5.4 性能优化

| 指标 | 目标 | 优化策略 |
|------|------|----------|
| LCP | < 2.5s | 图片懒加载、CDN |
| CLS | < 0.1 | 预留图片尺寸、字体加载优化 |
| FID | < 100ms | 代码分割、延迟加载 |
| TTFB | < 600ms | 边缘缓存、服务端优化 |

### 5.5 技术清单

- [ ] XML Sitemap 生成与提交
- [ ] robots.txt 配置
- [ ] 404 页面优化（推荐内容）
- [ ] 301 重定向规则
- [ ] hreflang 多语言配置
- [ ] Canonical URL 设置
- [ ] 结构化数据实现
- [ ] Core Web Vitals 优化

---

## 6. 竞品 SEO 分析

### 6.1 神策数据

| 维度 | 分析 | Data Wings 机会 |
|------|------|-----------------|
| 关键词 | 品牌词强，AI 内容少 | AI 数据分析内容 |
| 内容 | 行业报告、白皮书多 | 实操教程、开源社区 |
| 外链 | 行业媒体、合作伙伴 | GitHub、开发者社区 |

### 6.2 GrowingIO

| 维度 | 分析 | Data Wings 机会 |
|------|------|-----------------|
| 关键词 | "无埋点"定位清晰 | "AI 原生"差异化 |
| 内容 | 在线学院体系完善 | AI 实操内容 |
| 策略 | 教育市场为主 | 技术+实操结合 |

### 6.3 PostHog

| 维度 | 分析 | Data Wings 机会 |
|------|------|-----------------|
| 关键词 | 开源、自托管强势 | 中文市场、AI 能力 |
| 内容 | 透明度高（公开指标） | 本地化内容 |
| 外链 | GitHub Stars 35K+ | 中文开源社区 |

---

## 7. 执行路线图

### 7.1 Month 1: 基础建设

- [ ] 网站技术 SEO 审计与修复
- [ ] XML Sitemap 配置
- [ ] Google Search Console / 百度站长 提交
- [ ] 核心页面 Meta 优化
- [ ] 结构化数据实现

### 7.2 Month 2-3: 内容建设

- [ ] 6 篇竞品对比文章
- [ ] 4 篇核心功能指南
- [ ] 文档 SEO 优化
- [ ] 开源页面建设

### 7.3 Month 4-6: 规模化

- [ ] 博客周更计划执行
- [ ] 外链建设（技术社区、开发者博客）
- [ ] 多语言内容
- [ ] 持续优化迭代

### 7.4 KPI 目标

| 指标 | Month 1 | Month 3 | Month 6 |
|------|---------|---------|---------|
| 索引页面数 | 50 | 150 | 300 |
| 自然流量 UV | 500 | 3,000 | 10,000 |
| 关键词 Top 10 | 5 | 20 | 50 |
| 关键词 Top 100 | 20 | 100 | 300 |
| GitHub Stars | 500 | 2,000 | 5,000 |

---

## 附录

### A. 关键词追踪工具

- 百度指数
- 5118
- Ahrefs
- SEMrush

### B. 参考资源

- Google Search Central: https://developers.google.com/search
- Schema.org: https://schema.org
- PostHog SEO 策略: https://posthog.com/blog/seo-strategy

---

猪哥云（四川）网络科技有限公司 | 合规网 www.hegui.com
猪哥云-数据产品部-Maurice | maurice_wen@proton.me
2025 猪哥云-灵阙企业级智能体平台
