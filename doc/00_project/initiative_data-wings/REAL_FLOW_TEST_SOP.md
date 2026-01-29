# Data Wings - 多类型客户真实流程测试 SOP

**版本**: v1.0
**日期**: 2026-01-28
**作者**: QA/PM
**PROJECT_DIR**: `/Users/mauricewen/Projects/09-data-wings`

---

## 1. 目标与范围

**目标**:
- 覆盖至少 3 类客户画像，执行真实流程与异常路径
- 以非生产环境 + 真实 API 完整验证“入口 → 任务 → 结果”
- 形成可审计证据（截图/日志/请求）与复测闭环

**范围**:
- Web App + API + AI 服务的端到端流程
- 关键业务路径与权限/数据异常路径

**不在范围**:
- 生产环境压测
- Mock/假数据流程

---

## 2. 环境与前置条件

**环境要求**:
- 非生产环境（staging/sandbox）
- 具备真实 API Key（LLM/ClickHouse/SDK Key）
- 具备测试账号（不同权限角色）

**默认测试账号（MVP）**:
- admin@datawings.local / datawings123 (Admin)
- analyst@datawings.local / datawings123 (Analyst)
- pm@datawings.local / datawings123 (PM)
- engineer@datawings.local / datawings123 (Engineer)

**基础地址（待补齐）**:
- Web App: `<STAGING_WEB_URL>`
- API: `<STAGING_API_URL>`
- AI Service: `<STAGING_AI_URL>`

**当前实现路由（以代码为准）**:
- Web: `/`, `/login`, `/signup`, `/app`, `/app/ask`, `/app/dashboards`, `/app/settings/team`
- API: `/health`, `/api/v1/track`, `/api/v1/identify`, `/api/v1/batch`, `/api/v1/query`, `/api/v1/ask`, `/api/v1/overview`, `/api/v1/dashboards`
- AI: `/health`, `/api/v1/ask`, `/api/v1/insights`

---

## 3. 客户画像（至少 3 类）

> 维度：规模 / 角色 / 权限 / 渠道 / 设备

### Persona A: Startup 技术负责人（小型团队）
- **规模**: 5-20 人
- **角色**: CTO / 全栈
- **权限**: Owner/Admin
- **渠道**: 官网自助注册
- **设备**: MacBook + Chrome

### Persona B: 中型企业数据分析师
- **规模**: 100-500 人
- **角色**: 数据分析师
- **权限**: Analyst（只读/有限写）
- **渠道**: 团队邀请链接
- **设备**: Windows + Edge/Chrome

### Persona C: 大型企业业务负责人
- **规模**: 1000+ 人
- **角色**: 业务负责人/总监
- **权限**: Manager（受限管理权限）
- **渠道**: 销售/合作伙伴交付
- **设备**: iPad + Safari

---

## 4. 入口 → 任务 → 结果 脚本（含异常路径）

### 4.1 Persona A 脚本（注册与接入闭环）

**入口**: 官网首页 → 注册 → 项目创建

**关键任务**:
1. 注册账号并创建项目
2. 获取 SDK Key
3. 接入 Web SDK（track/page/identify）
4. 登录后进入 /app 仪表盘查看数据
5. 使用 /app/ask 进行自然语言查询

**预期结果**:
- 事件在 5 分钟内可查询
- Dashboard 显示指标卡片与趋势
- AI 问答返回 SQL 与结果

**异常路径**:
- 使用无效 SDK Key → API 返回 401/403
- 未上报事件 → 仪表盘展示空态与引导

---

### 4.2 Persona B 脚本（分析与权限边界）

**入口**: 邀请链接 → 登录 → 进入 /app

**关键任务**:
1. 查看概览指标与趋势图
2. 执行 AI 问答（业务问题）
3. 尝试编辑仪表盘（应受限）

**预期结果**:
- 可读权限下成功查看数据
- AI 问答正常返回
- 编辑/设置类操作触发权限拦截

**异常路径**:
- 访问管理页面（/app/settings/team）→ 403 或重定向
- API 返回权限不足 → 前端提示明确

---

### 4.3 Persona C 脚本（管理与集成）

**入口**: 销售交付 → 登录 → /app/settings/team

**关键任务**:
1. 查看团队成员与权限列表
2. 配置集成（API Key/Token）
3. 导出/分享仪表盘链接

**预期结果**:
- 管理权限页面可访问
- 集成配置成功保存
- 分享链接可用

**异常路径**:
- 集成配置缺失字段 → 表单校验阻止提交
- API 超时 → 前端提示重试与错误日志

---

## 5. 测试矩阵模板

| 客户类型 | 入口 | 设备 | 权限 | 关键路径 | 预期结果 | 证据 |
|---------|------|------|------|---------|---------|------|
| Persona A | 首页 → 注册 → /app | Mac + Chrome | Admin | 注册 → SDK → /app → /app/ask | 事件可查询，AI 返回结果 | 截图/日志 |
| Persona B | 邀请 → /login | Windows + Edge | Analyst | /app → /app/ask → 权限拦截 | 只读成功，拦截正确 | 截图/请求 |
| Persona C | 交付 → /login | iPad + Safari | Manager | /app/settings/team → 集成 → 分享 | 保存成功，分享可用 | 截图/日志 |

---

## 6. UX Map 对齐

**映射原则**:
- 使用 `USER_EXPERIENCE_MAP.md` 的页面清单与用户旅程阶段
- 脚本必须映射到 Page ID 与 Journey 阶段

**映射示例**:
- P-001 首页 → A-002 注册 → A-003 概览 → A-004 AI 问答
- A-020 项目设置 → A-021 团队管理 → A-023 集成配置

---

## 7. 证据与记录规范

**证据类型**:
- 页面截图（关键步骤）
- API 请求/响应日志
- 关键错误日志（console / server）

**存放路径**:
- `doc/00_project/initiative_data-wings/evidence/real-flow/YYYY-MM-DD/`

**命名规范**:
- `persona-<id>_step-<n>_<result>.png`
- `persona-<id>_api_<endpoint>_<timestamp>.log`

---

## 8. 执行与复测流程

1. 按 Persona 脚本逐条执行
2. 记录证据与测试矩阵
3. 汇总问题与成功率
4. 修复后复测同一脚本
5. 更新 PRD 与 UX Map

---

## 9. 成功标准

- 关键路径成功率 ≥ 95%
- 异常路径提示准确、可理解、可恢复
- 证据齐全可审计
