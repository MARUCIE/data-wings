# Data Wings 产品需求文档（PRD）

**版本**: v1.0
**日期**: 2026-01-28
**作者**: 产品经理
**状态**: 初稿

---

## 1. 产品概述

### 1.1 产品愿景

**让每个人都能用自然语言洞察数据价值**

Data Wings 致力于成为 AI-Native 的开源数据分析平台，通过自然语言交互降低数据分析门槛，让业务人员无需依赖数据团队即可获取洞察，同时为技术团队提供灵活可扩展的分析引擎。

### 1.2 目标用户（Persona）

| 角色 | 描述 | 核心诉求 | 痛点 |
|------|------|----------|------|
| **业务分析师** | 负责业务数据分析，具备基础 SQL 能力 | 快速获取业务指标，自主完成分析 | 依赖数据团队排期，分析周期长 |
| **产品经理** | 关注用户行为和产品指标 | 实时了解功能效果，验证假设 | 埋点复杂，取数困难 |
| **增长运营** | 负责用户增长和留存 | 发现增长机会，优化转化漏斗 | 缺乏自动化洞察能力 |
| **数据工程师** | 搭建数据基础设施 | 低维护成本，高扩展性 | 商业产品锁定，定制化困难 |
| **CTO/技术负责人** | 技术选型决策者 | 数据安全，成本可控，自主可控 | 国外产品合规风险，私有化成本高 |

### 1.3 核心价值主张

1. **AI 原生**: 自然语言查询替代 SQL，自动生成洞察报告
2. **零门槛接入**: Auto-Capture 自动埋点，5 分钟完成数据接入
3. **开源自主**: 核心引擎 MIT 开源，避免厂商锁定
4. **国产化适配**: 支持 DeepSeek/Qwen 等国产 LLM，满足私有化部署需求
5. **合规内置**: 预置业财税合规分析模板，开箱即用

### 1.4 与竞品的差异化

| 维度 | Data Wings | 神策/GrowingIO | Amplitude | PostHog |
|------|------------|----------------|-----------|---------|
| AI 能力 | 核心能力，NL2Analytics | 辅助功能 | AI 驱动洞察 | 基础 AI |
| 开源策略 | 核心开源 (MIT) | 闭源 | 闭源 | 开源 (MIT) |
| 国产 LLM | 原生支持 | 不支持 | 不支持 | 不支持 |
| 自动埋点 | 内置 Auto-Capture | 需配置 | 需配置 | 内置 |
| 合规模板 | 业财税预置 | 通用 | 通用 | 通用 |
| 私有化 | 原生支持 | 支持（高价） | 不支持 | 支持 |

---

## 2. 范围定义

### 2.1 核心功能（Must Have / P0）

| 功能模块 | 功能点 | 说明 |
|----------|--------|------|
| **数据接入** | SDK 埋点 | Web/iOS/Android/小程序 SDK |
| | Auto-Capture | 自动采集点击、页面访问等基础事件 |
| | 数据导入 | 支持 CSV、API、数据库导入 |
| **事件分析** | 事件趋势 | 单事件/多事件趋势分析 |
| | 漏斗分析 | 转化漏斗构建与分析 |
| | 留存分析 | N日留存、自定义留存 |
| | 用户路径 | 行为路径可视化 |
| **AI 分析** | 自然语言查询 | 用自然语言提问，返回分析结果 |
| | 自动洞察 | 自动发现数据异常和增长机会 |
| **可视化** | 仪表盘 | 自定义仪表盘，拖拽式布局 |
| | 图表组件 | 折线图、柱状图、饼图、表格等 |
| **账号与权限** | 登录/注册 | 支持邮箱登录/注册（MVP） |
| | 角色权限 | 基于角色的访问控制（RBAC） |

### 2.2 重要功能（Should Have / P1）

| 功能模块 | 功能点 | 说明 |
|----------|--------|------|
| **高级分析** | 分群分析 | 用户分群与对比分析 |
| | 归因分析 | 多触点归因模型 |
| | A/B 测试 | 实验分组与效果分析 |
| **AI 增强** | 预测分析 | 流失预测、LTV 预测 |
| | 异常检测 | 指标异常自动告警 |
| | 智能报告 | 自动生成周报/月报 |
| **协作** | 报告分享 | 仪表盘/报告链接分享 |
| | 权限管理 | 基于角色的访问控制 |
| **合规模板** | 业财税模板 | 预置合规分析场景 |

### 2.3 可选功能（Could Have / P2）

| 功能模块 | 功能点 | 说明 |
|----------|--------|------|
| **高级功能** | 实时分析 | 秒级数据更新 |
| | SQL 编辑器 | 高级用户自定义 SQL |
| | 数据仓库集成 | Snowflake/BigQuery 等集成 |
| **扩展能力** | 插件市场 | 第三方分析插件 |
| | API 网关 | 开放 API 能力 |
| **企业功能** | SSO 集成 | LDAP/SAML/OAuth |
| | 审计日志 | 操作审计与合规 |

### 2.4 非目标（Scope Out）

- CDP（客户数据平台）完整能力
- 营销自动化（MA）
- 实时推荐系统
- 数据治理平台
- ETL 工具

---

## 3. 功能详细说明（P0 功能）

### 3.1 数据接入 - SDK 埋点

**用户故事**:
> As a 数据工程师
> I want 快速集成数据采集 SDK
> So that 产品数据能够被自动采集和分析

**功能描述**:
- 提供多端 SDK：Web (JavaScript)、iOS (Swift)、Android (Kotlin)、小程序 (微信/支付宝)
- 支持事件追踪（track）、用户标识（identify）、属性设置（setUserProperties）
- 支持离线缓存与批量上报
- 数据压缩与加密传输

**验收标准（AC）**:
1. 集成代码少于 10 行即可完成初始化
2. SDK 体积：Web < 30KB (gzip)，移动端 < 500KB

### 3.2 账号与权限（MVP）

**用户故事**:
> As a 管理者
> I want 通过登录管理团队成员与权限
> So that 关键数据与功能可控访问

**功能描述**:
- 支持邮箱登录与注册（MVP）
- 基于 JWT 的访问令牌
- 角色与权限：Admin / Analyst / PM / Engineer
- 权限控制：
  - /app/settings/* 仅 Admin
  - /app/ask 对 Analyst/PM 可用
  - /app/dashboards 对所有登录用户可用

**验收标准（AC）**:
1. 登录成功后可访问 /app 页面
2. 未登录用户访问 /app/* 自动跳转至 /login
3. 权限不足时返回 403，前端提示明确
3. 数据延迟：从采集到可查询 < 5 分钟
4. 支持自定义事件属性，单事件属性 < 100 个
5. 提供数据校验工具，实时验证埋点正确性

**技术依赖**:
- 数据接收服务（Kafka/Pulsar）
- 数据存储（ClickHouse）
- CDN 分发

### 3.2 数据接入 - Auto-Capture

**用户故事**:
> As a 产品经理
> I want 无需手动埋点即可采集基础用户行为
> So that 我能快速开始分析而不等待开发排期

**功能描述**:
- 自动采集：页面访问（pageview）、元素点击（click）、表单提交（submit）
- 智能元素识别：基于 CSS 选择器、XPath、视觉特征自动标记元素
- 可视化圈选：在页面上直接选择元素定义事件
- 支持开关控制，可随时启用/禁用

**验收标准（AC）**:
1. 集成后 0 配置即可采集 pageview 和 click
2. 元素识别准确率 > 95%
3. 可视化圈选支持 Chrome/Firefox/Safari
4. 不影响页面加载性能，FCP 增量 < 50ms
5. 支持按域名/页面/元素类型过滤采集

**技术依赖**:
- DOM 监听与事件捕获
- 元素指纹算法
- Chrome Extension（圈选工具）

### 3.3 事件分析 - 漏斗分析

**用户故事**:
> As a 增长运营
> I want 分析用户从访问到转化的完整路径
> So that 我能发现转化瓶颈并优化

**功能描述**:
- 自定义漏斗步骤（最多 10 步）
- 支持时间窗口设置（1小时 ~ 30天）
- 支持按属性分组对比（渠道、设备、地区等）
- 转化率趋势分析
- 流失用户下钻

**验收标准（AC）**:
1. 漏斗创建 < 30 秒（拖拽式配置）
2. 查询响应时间 < 3 秒（千万级数据）
3. 支持导出漏斗各阶段用户列表
4. 支持保存漏斗为看板组件
5. 支持漏斗对比（A/B 组、时间段对比）

**技术依赖**:
- 窗口函数计算引擎
- 用户行为序列存储
- 实时/离线混合计算

### 3.4 事件分析 - 留存分析

**用户故事**:
> As a 产品经理
> I want 了解用户的留存情况和生命周期
> So that 我能评估产品的用户粘性

**功能描述**:
- 标准 N 日留存曲线
- 自定义留存事件（初始事件 + 回访事件）
- 支持用户分群留存对比
- 留存同期群分析
- 生命周期价值预估

**验收标准（AC）**:
1. 支持 1-90 日留存分析
2. 查询响应时间 < 5 秒
3. 支持按周/月粒度聚合
4. 支持导出留存数据
5. 自动计算留存率置信区间

**技术依赖**:
- 同期群计算逻辑
- 时间序列聚合
- 统计显著性计算

### 3.5 AI 分析 - 自然语言查询（NL2Analytics）

**用户故事**:
> As a 业务分析师
> I want 用自然语言描述分析需求
> So that 我不需要写 SQL 就能获取数据洞察

**功能描述**:
- 自然语言输入框，支持中英文
- 理解业务术语（转化率、留存、DAU 等）
- 自动生成查询并返回可视化结果
- 支持追问和结果调整
- 查询历史和收藏

**验收标准（AC）**:
1. 常见分析场景识别准确率 > 90%
2. 查询生成延迟 < 2 秒
3. 支持至少 50 种标准分析模式
4. 提供查询建议和自动补全
5. 支持多轮对话式分析

**示例查询**:
- "过去 7 天的日活趋势"
- "注册到首次付费的转化率是多少"
- "哪个渠道的用户留存最高"
- "本周相比上周，核心指标有什么变化"

**技术依赖**:
- LLM 接口（OpenAI/DeepSeek/Qwen）
- 语义解析与意图识别
- Schema 映射与查询生成
- 结果可视化渲染

### 3.6 AI 分析 - 自动洞察

**用户故事**:
> As a 运营负责人
> I want 系统自动发现数据中的异常和机会
> So that 我不会错过重要的业务信号

**功能描述**:
- 自动监控核心指标
- 异常检测与告警（同比/环比异常）
- 增长机会识别（高价值用户特征、高转化路径）
- 每日/每周洞察摘要
- 洞察推送（邮件/钉钉/飞书）

**验收标准（AC）**:
1. 异常检测召回率 > 85%，精确率 > 70%
2. 洞察生成延迟 < 1 小时（每日凌晨批处理）
3. 支持自定义监控指标
4. 支持设置告警阈值
5. 洞察报告可导出为 PDF/PNG

**技术依赖**:
- 时间序列异常检测算法
- LLM 洞察生成
- 消息推送服务

### 3.7 可视化 - 仪表盘

**用户故事**:
> As a 数据分析师
> I want 创建和管理数据仪表盘
> So that 团队能实时了解业务状况

**功能描述**:
- 拖拽式仪表盘编辑器
- 丰富的图表组件库
- 全局筛选器（时间、用户属性）
- 自动刷新与定时邮件
- 响应式布局（PC/移动端适配）

**验收标准（AC）**:
1. 仪表盘创建 < 2 分钟（从空白到完成）
2. 单仪表盘支持 50+ 组件
3. 页面加载时间 < 3 秒
4. 支持仪表盘模板
5. 支持嵌入外部系统（iframe）

**技术依赖**:
- 前端拖拽框架
- 图表库（ECharts/Recharts）
- 响应式布局引擎

---

## 4. AI 能力规格

### 4.1 自然语言查询（NL2Analytics）

**架构设计**:

```
用户输入 -> 意图识别 -> Schema映射 -> 查询生成 -> 执行优化 -> 结果渲染
                |
            上下文管理（多轮对话）
```

**LLM 配置**:

| 参数 | 推荐值 | 说明 |
|------|--------|------|
| 模型 | DeepSeek-V3 / Qwen-Max / GPT-4o | 根据部署环境选择 |
| Temperature | 0.1 | 保证查询稳定性 |
| Max Tokens | 2048 | 查询生成足够 |
| Timeout | 10s | 用户体验阈值 |

**Schema 映射策略**:
- 维护业务术语词典（DAU = 日活跃用户数）
- 自动推断时间范围（"上周" -> 7天前到今天）
- 实体识别（渠道名、事件名、属性名）

### 4.2 自动洞察生成

**洞察类型**:

| 类型 | 触发条件 | 示例 |
|------|----------|------|
| 异常检测 | 指标偏离 > 2 sigma | "今日注册数下降 35%，创 30 日新低" |
| 趋势变化 | 连续 3 日单向变化 | "付费率连续 5 日上升，累计提升 12%" |
| 对比洞察 | 分群差异显著 | "iOS 用户留存比 Android 高 20%" |
| 归因发现 | 高影响因子 | "来自小红书渠道的用户 LTV 是平均值的 2.3 倍" |

### 4.3 预测分析

**支持场景**:
- 用户流失预测（7日/30日流失概率）
- LTV 预测（基于早期行为预测生命周期价值）
- 指标预测（基于历史数据预测未来趋势）

**模型选型**:
- 流失预测：XGBoost / LightGBM
- LTV 预测：Lifetimes / BG-NBD
- 趋势预测：Prophet / ARIMA

### 4.4 异常检测

**算法策略**:

| 场景 | 算法 | 参数 |
|------|------|------|
| 短期异常 | 动态阈值（同比/环比） | 阈值 = 均值 +/- 2 sigma |
| 趋势突变 | CUSUM 检测 | 灵敏度可调 |
| 季节性异常 | STL 分解 + 残差检测 | 周/月周期 |
| 多维异常 | Isolation Forest | contamination=0.1 |

---

## 5. 非功能需求

### 5.1 性能指标

| 指标 | 目标值 | 测量方法 |
|------|--------|----------|
| 查询响应时间（P95） | < 3 秒 | 千万级数据查询 |
| 页面加载时间（P95） | < 2 秒 | LCP 指标 |
| SDK 数据延迟 | < 5 分钟 | 从采集到可查询 |
| 系统可用性 | > 99.9% | 年度 SLA |
| 数据准确性 | > 99.99% | 抽样校验 |

### 5.2 安全合规

| 要求 | 实现方式 |
|------|----------|
| 数据加密 | 传输 TLS 1.3，存储 AES-256 |
| 访问控制 | RBAC + 数据行级权限 |
| 审计日志 | 全操作记录，保留 1 年 |
| 数据脱敏 | PII 字段自动脱敏 |
| GDPR 合规 | 数据删除 API，导出 API |
| 等保 2.0 | 三级等保适配 |
| 认证方式 | JWT（短期访问令牌） |

### 5.3 可扩展性

| 维度 | 目标 |
|------|------|
| 数据规模 | 支持 PB 级数据存储 |
| 并发用户 | 支持 1000+ 同时在线 |
| 事件吞吐 | 支持 100K+ QPS 数据写入 |
| 水平扩展 | 计算/存储分离，弹性扩缩 |

---

## 6. 成功指标（KPI）

### 6.1 北极星指标

**周活跃查询用户数（WAU-Query）**

定义：每周至少发起 1 次数据查询的唯一用户数

目标：
- MVP 阶段：100 WAU
- V1.0 阶段：1,000 WAU
- V2.0 阶段：10,000 WAU

### 6.2 过程指标

| 指标 | 定义 | MVP 目标 | V1.0 目标 |
|------|------|----------|-----------|
| 接入转化率 | 注册 -> 完成数据接入 | > 30% | > 50% |
| 查询成功率 | 查询返回结果 / 总查询 | > 90% | > 95% |
| NL 查询占比 | NL 查询 / 总查询 | > 20% | > 40% |
| 仪表盘创建数 | 平均每用户创建仪表盘数 | > 2 | > 5 |
| NPS | 净推荐值 | > 30 | > 50 |
| 付费转化率 | 免费 -> 付费 | > 2% | > 5% |

---

## 7. 风险与依赖

### 7.1 技术风险

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| NL2SQL 准确率不达标 | 中 | 高 | 预置常见查询模板，人工反馈优化 |
| 大数据量查询性能 | 中 | 高 | ClickHouse 分区优化，预聚合 |
| 多端 SDK 兼容性 | 中 | 中 | 渐进式发布，灰度测试 |
| LLM API 稳定性 | 低 | 高 | 多 LLM 供应商，本地模型备份 |

### 7.2 市场风险

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| 竞品快速跟进 AI 能力 | 高 | 中 | 深耕垂直场景，建立数据壁垒 |
| 开源社区活跃度不足 | 中 | 中 | 早期种子用户运营，贡献者激励 |
| 企业付费意愿低 | 中 | 高 | 清晰的开源/商业边界，价值证明 |

### 7.3 资源依赖

| 依赖 | 类型 | 状态 | 负责人 |
|------|------|------|--------|
| ClickHouse 集群 | 基础设施 | 待部署 | 运维团队 |
| LLM API 额度 | 外部服务 | 已申请 | AI 团队 |
| 设计资源 | 人力 | 需协调 | 设计团队 |
| 前端开发 | 人力 | 进行中 | 前端团队 |

---

## 8. 里程碑规划

### 8.1 MVP 范围（Month 1-2）

**目标**: 验证核心价值，获取种子用户反馈

**功能范围**:
- Web SDK + Auto-Capture
- 事件趋势分析
- 基础漏斗分析
- 自然语言查询（基础版）
- 简易仪表盘

**交付标准**:
- 5 分钟完成接入
- 支持 10 万日事件量
- NL 查询覆盖 20 种场景

### 8.2 V1.0 范围（Month 3-4）

**目标**: 功能完备，开放公测

**新增功能**:
- 全端 SDK（iOS/Android/小程序）
- 留存分析 + 用户路径
- 自动洞察
- 权限管理
- 业财税合规模板

**交付标准**:
- 支持 1000 万日事件量
- NL 查询覆盖 50 种场景
- 洞察准确率 > 80%

### 8.3 V2.0 愿景（Month 5-8）

**目标**: 企业级能力，商业化

**新增功能**:
- 预测分析
- A/B 测试
- 归因分析
- SSO / 审计日志
- 数据仓库集成
- 开放 API

**交付标准**:
- 支持 1 亿日事件量
- 企业级 SLA
- 完善的商业版功能

---

## 9. 质量与验收（Real-Flow SOP）

### 9.1 真实流程测试要求

- 必须在非生产环境执行多类型客户真实流程测试（至少 3 类 Persona）
- 覆盖“入口 → 任务 → 结果”全链路与异常路径
- 必须使用真实 API/真实账号（禁止 mock）
- 必须留存可审计证据（截图/日志/请求）
- 注册链路必须覆盖多入口验证：`http://localhost:3000` 与 `http://localhost:3009` 均可完成 `/signup -> /api/v1/auth/signup`

### 9.2 验收标准（AC）

1. 关键路径成功率 ≥ 95%
2. 异常路径提示准确、可恢复
3. 证据归档到 `REAL_FLOW_TEST_EVIDENCE.md`
4. 复测通过后更新 PRD 与 UX Map
5. `Origin:3000/3009` 对 `POST /api/v1/auth/signup` 预检均返回 `204`，创建账号返回 `201`
6. Docker `web` 服务健康检查稳定为 `healthy`（`/api/health` 连续检查通过）
7. `docker compose` 常用命令（`ps/config/up`）不再输出 `version` 废弃告警

### 9.3 UI/UX 优化要求

- 应用 `ui-skills` 与 `web-interface-guidelines` 规范
- 修复间距与层级问题，保持单一主按钮
- 关键交互需可键盘访问并具备清晰的 `focus-visible`
- 前端验证必须包含 network / console / performance / visual regression 证据

---

## 10. SOTA SOP 基准后的产品化要求（2026-02-11）

### 10.1 目标

对齐近 12 个月全球 SOTA 平台在“流程工程化”上的共同实践，将 Data Wings 的交付体系从“功能实现”升级为“可治理 SOP 系统”。

### 10.2 新增需求（P0/P1）

| 优先级 | 需求 | 验收标准 |
|------|------|------|
| P0 | SOP 状态机标准化（plan/execute/verify/evidence/closeout） | 任一任务均可追踪到状态与证据路径 |
| P0 | 质量门禁统一化（contract/e2e/ai check + supply-chain + postmortem-scan） | 未过 gate 任务不可标记完成 |
| P0 | 证据目录标准化（outputs/<sop-id>/<run-id>/） | logs/reports/diff/screenshot 结构完整 |
| P1 | 角色模板化（Planner/Builder/Reviewer/Watchdog） | complex 任务强制角色分工 |
| P1 | 评测与观测（eval/tracing） | 输出通过率、回归率、重试轨迹等指标 |

### 10.3 新增非功能指标

| 指标 | 目标值 | 说明 |
|------|------|------|
| SOP 闭环完成率 | >= 95% | 完整覆盖 5 个阶段 |
| 质量门禁命中率 | 100% | 每次交付必须存在门禁证据 |
| 回归逃逸率 | < 2% | 发布后 P0/P1 回归问题占比 |
| 证据完整率 | 100% | 结构化证据目录齐全 |
| 任务可复现率 | >= 90% | 使用 fixture/replay 可复跑 |

### 10.4 风险与约束

| 风险 | 应对策略 |
|------|------|
| 流程过度复杂导致交付变慢 | 任务复杂度分层（simple/medium/complex） |
| 门禁流于形式 | 强制 machine-readable 报告 + 自动校验 |
| 多代理冲突 | complex 任务默认 Watchdog 或 Pipeline |

---

## 11. 一键全量交付验收基线（SOP 1.1, 2026-02-12）

### 11.1 目标

将“功能可用”升级为“可审计闭环完成”：

1. 所有步骤（plan-first -> verify -> closeout）必须落盘。
2. Round 1 与 Round 2 必须同时通过。
3. 前后端入口、契约、错误码、CORS 基线必须一致。

### 11.2 验收门禁（新增）

| Gate | 必要证据 | 通过标准 |
|------|------|------|
| Round 1 | `ai check` 日志 | `OK: ai check 通过` |
| Round 2（FE） | 浏览器探针 JSON + 截图 | `/signup -> /app` 成功，`Failed to fetch=0`，核心路由可达 |
| Round 2（BE） | 真实 API 回放 + 契约探针 | 核心路径 7/7，错误码契约 6/6 |
| Closeout | deliverable + rolling ledger + notes | 证据路径与结论可追踪 |

### 11.3 本轮结果（run: 1-1-2ddd14fb）

- Round 1：通过（`outputs/sop-one-click-full-delivery/1-1-2ddd14fb/logs/ai-check-round1.log`）
- Round 2（FE）：通过（`outputs/sop-one-click-full-delivery/1-1-2ddd14fb/reports/round2_uxmap_probe.json`）
- Round 2（BE）：通过（`outputs/sop-one-click-full-delivery/1-1-2ddd14fb/reports/backend_contract_probe.json`）
- 全量交付总报告：`outputs/sop-one-click-full-delivery/1-1-2ddd14fb/reports/sop_1_1_full_delivery_report.md`

---

## 12. 项目级全链路回归验收基线（SOP 4.1, 2026-02-12）

### 12.1 验收目标

在项目级别验证“首页入口 -> UX Map 核心路径 -> API 契约 -> 回归门禁”持续成立。

### 12.2 本轮结果（证据刷新，run: 4-1-9c7e079a，2026-02-13）

- UX Map Round 2 探针通过（首页 + 注册 + 核心路径）：
  - `outputs/sop-project-regression/4-1-9c7e079a/reports/uxmap_e2e_probe.json`
- 真实 API 回放通过（7/7）：
  - `outputs/sop-project-regression/4-1-9c7e079a/reports/real_api_capture.md`
- 契约探针通过（6/6）：
  - `outputs/sop-project-regression/4-1-9c7e079a/reports/backend_contract_probe.md`
- Round 1 门禁通过：
  - `outputs/sop-project-regression/4-1-9c7e079a/logs/ai-check.log`

---

## 13. 联合验收与发布守门基线（SOP 5.1, 2026-02-12）

### 13.1 验收目标

在发布前由产品/技术/质量三方联合验收，确保“双轮门禁 + 证据完备”成立后才允许进入发布流程。

### 13.2 本轮结果（证据刷新，run: 5-1-c1513579，2026-02-13）

- 联合验收报告：
  - `outputs/sop-joint-acceptance/5-1-c1513579/reports/joint_acceptance_release_gate.md`
- Round 1（`ai check`）通过：
  - `outputs/sop-joint-acceptance/5-1-c1513579/logs/ai-check-round1.log`
- Round 2（UX Map）通过：
  - `outputs/sop-joint-acceptance/5-1-c1513579/reports/uxmap_e2e_probe.md`
- Round 2（真实 API + 契约探针）通过：
  - `outputs/sop-joint-acceptance/5-1-c1513579/reports/real_api_capture.md`
  - `outputs/sop-joint-acceptance/5-1-c1513579/reports/backend_contract_probe.md`

### 13.3 守门结论

发布前联合验收门禁在当前迭代首轮通过，未触发 ralph loop。

---

### 13.4 版本治理与回滚基线（SOP 5.2, 2026-02-13）

- Version + rollback 报告：
  - `outputs/sop-version-governance/5-2-dae6a322/reports/release_versioning_and_rollback.md`
- Round 1（`ai check`）：
  - `outputs/sop-version-governance/5-2-dae6a322/logs/ai-check-round1.log`
- Round 2（UX Map）：
  - `outputs/sop-version-governance/5-2-dae6a322/reports/uxmap_e2e_probe.md`

### 13.5 Postmortem 自动化守门基线（SOP 5.3, 2026-02-13）

- Postmortems：`postmortem/PM-*.md`（machine-readable triggers：path/keyword/regex）
- Pre-release scan：`outputs/sop-postmortem/5-3-f13a8584/reports/pre_release_scan.json`
- CI Gate：`.github/workflows/ci.yml` 新增 `postmortem-scan` job（命中 open trigger 直接阻塞 merge/release）


## 14. 一键全量交付重跑验收基线（SOP 1.1 rerun, 2026-02-12）

### 14.1 验收目标

在不引入新需求的前提下，对当前基线执行完整 SOP 1.1 重跑，验证持续交付稳定性与证据可复用性。

### 14.2 本轮结果（run: 1-1-719289f3）

- Round 1 通过：
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/logs/ai-check-round1.log`
- Round 2 UX Map 通过：
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/reports/uxmap_e2e_probe.json`
- FE 专项通过：
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/reports/frontend_full_probe.json`
- BE 专项通过：
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/reports/real_api_capture.json`
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/reports/backend_contract_probe.json`
- Closeout 报告：
  - `outputs/sop-one-click-full-delivery/1-1-719289f3/reports/sop_1_1_full_delivery_report.md`

### 14.3 结论

重跑验证通过，当前版本满足“可重复交付 + 可审计证据”要求。

---

## 15. 多角色头脑风暴增量决策（SOP 1.3, 2026-02-12）

### 15.1 目标

通过 Council 模式收敛 PM / Designer / SEO 的关键分歧，形成“可执行且低回归风险”的产品增量方向。

### 15.2 PM 产出（竞品分析 + PRD 结论）

| 方向 | 对标洞察 | 本轮 PRD 决策 |
|------|------|------|
| 激活漏斗 | Amplitude/Mixpanel 在激活与留存模板上成熟 | 新增激活漏斗模板优先级（先模板后扩功能） |
| 开源转化 | PostHog 的开源转化链路清晰 | 增加开源入口与产品内 GitHub 引导 |
| 行业模板 | 国内竞品行业化模板覆盖更广 | 增补 3 个行业模板（电商/SaaS/内容） |

### 15.3 角色冲突与决策

- 冲突 1：先扩功能还是先优化激活链路。
- 冲突 2：SEO 优先博客还是优先产品页。
- 冲突 3：是否同步提升权限复杂度。

决策：

1. 先优化激活链路与默认模板入口，功能扩展后置。
2. SEO 采用“产品页优先，内容页补位”。
3. 本轮不变更权限模型，仅强化可观测与测试门禁。

### 15.4 证据

- `outputs/sop-multi-role-brainstorm/1-3-670e1dcd/reports/multi_role_brainstorm_report.md`
- `doc/00_project/initiative_data-wings/ADR-2026-02-12-multi-role-brainstorm.md`

---

## 16. 架构圆桌产品约束（SOP 1.4, 2026-02-12）

### 16.1 产品层结论

1. 本轮不扩系统边界，优先做低风险增量（激活链路/模板入口）。
2. 安全与可靠性改进以“门禁不降级”为前提推进。
3. 后续功能实施需先满足 auth 限流与内部鉴权治理计划。

### 16.2 决策依据

- `outputs/sop-architecture-council/1-4-cdf0f11e/reports/architecture_council_report.md`
- `doc/00_project/initiative_data-wings/ADR-2026-02-12-architecture-council-refresh.md`

## 附录

### A. 术语表

| 术语 | 定义 |
|------|------|
| DAU | Daily Active Users，日活跃用户 |
| MAU | Monthly Active Users，月活跃用户 |
| LTV | Lifetime Value，用户生命周期价值 |
| ARPU | Average Revenue Per User，平均每用户收入 |
| NL2Analytics | Natural Language to Analytics，自然语言转分析 |

### B. 参考竞品

- 神策数据：https://www.sensorsdata.cn/
- GrowingIO：https://www.growingio.com/
- Amplitude：https://amplitude.com/
- PostHog：https://posthog.com/
- Mixpanel：https://mixpanel.com/

---

猪哥云（四川）网络科技有限公司 | 合规网 www.hegui.com
猪哥云-数据产品部-Maurice | maurice_wen@proton.me
2025 猪哥云-灵阙企业级智能体平台
