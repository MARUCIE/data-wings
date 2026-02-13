# Data Wings - PDCA 迭代检查表

**版本**: v0.1
**日期**: 2026-01-28
**作者**: PM/QA

---

## 迭代检查清单

- [x] 目标与范围已明确（对应 SOP）
- [x] Persona 与测试矩阵已更新
- [x] 非生产环境与账号已确认
- [x] 关键路径与异常路径已执行
- [x] 证据已落盘可审计
- [x] 问题清单已整理并指派
- [x] 修复后复测完成
- [x] PRD 与 UX Map 已更新

备注：登录/权限管理页面已补齐（/login, /signup, /app/*）并完成 SOP 双轮验证；详见 deliverable.md 与 outputs/sop-* 证据目录。

---

## UI/UX 优化迭代

- [x] ui-skills / web-interface-guidelines 已应用
- [x] 单一主按钮规则已满足
- [x] 间距与层级问题已修复
- [x] network / console / performance / visual 证据齐全
- [x] PRD / UX Map 已更新

## 全量交付续航（Audit/Auth/Persona/Perf）

- [x] supply audit 已执行并留证据（证据：outputs/sop-joint-acceptance/5-1-c1513579/logs/ai-check-round1.log）
- [x] Supply chain CI gate 已接入（证据：outputs/sop-supply-chain/3-9-ee500287/reports/summary.md）
- [x] Postmortem scan CI gate 已接入（证据：outputs/sop-postmortem/5-3-f13a8584/reports/pre_release_scan.json）
- [x] 登录/注册页面可用（/login, /signup）（证据：outputs/sop-entrypoint-consistency/3-2-044e82e6/reports/round2_ui_signup_report.md）
- [x] RBAC 权限拦截生效（401/403）（证据：outputs/sop-full-loop-check/3-7-703f3d77/reports/api_contract_closure_report.md）
- [x] /app 路由对齐（/app, /app/ask, /app/dashboards）（证据：outputs/sop-project-regression/4-1-9c7e079a/reports/uxmap_e2e_probe.md）
- [x] Persona 真实流程复测与矩阵更新（证据：doc/00_project/initiative_data-wings/REAL_FLOW_TEST_EVIDENCE.md）
- [x] network / console / performance / visual 证据齐全（证据：outputs/sop-frontend-validation/3-1-535549a1/reports/frontend_full_probe.md）
- [x] PDCA 四文档与 Rolling Ledger 已更新（证据：outputs/sop-one-click-full-delivery/1-1-719289f3/reports/sop_1_1_full_delivery_report.md）

## SOP 1.1 一键全量交付（run: 1-1-2ddd14fb）

- [x] planning-with-files 初始化并读取 task_plan/notes/deliverable
- [x] ralph loop 已启用（max_iterations=12, promise=DONE）
- [x] plan-first（目标/非目标/约束/验收/测试计划）已落盘
- [x] UX Map Round 2 人工模拟测试完成并留存截图/日志/JSON
- [x] 前端专项（network/console/performance/visual）证据齐全
- [x] 后端专项（API 契约/错误码/入口一致性）证据齐全
- [x] Round 1 `ai check` 通过
- [x] Task Closeout 已完成（deliverable + rolling ledger + 三端一致性声明）

## SOP 3.1 前端验证与性能检查（run: 3-1-535549a1）

- [x] planning-with-files 初始化并读取 task_plan/notes
- [x] network/console/performance/visual regression 全量执行
- [x] 响应式验证（desktop/tablet/mobile）完成
- [x] 失败项修复并复测通过（`ERR_ABORTED` 噪声过滤）
- [x] `ai check` 通过并留存证据

## SOP 3.7 功能闭环复核（run: 3-7-703f3d77）

- [x] planning-with-files 初始化并读取 task_plan/notes
- [x] 入口闭环核对（UI/API/配置）通过
- [x] 系统闭环核对（真实 API + 持久化）通过
- [x] 契约闭环核对（错误码/RBAC/契约测试）通过
- [x] 验证闭环核对（E2E/回归 + ai check）通过

## SOP 4.1 项目级全链路回归（run: 4-1-9c7e079a）

- [x] planning-with-files 初始化并读取 task_plan/notes/deliverable
- [x] ralph loop 已启用并完成（max_iterations=12, promise=DONE）
- [x] 首页起点 UX Map 路径回归通过（`/ -> /signup -> /app -> /app/ask -> /app/dashboards -> /app/settings/team`）
- [x] 卡点修复完成（首页新增 `/signup` 入口）并复测通过
- [x] Round 1 `ai check` + Round 2 UX Map 回归双轮通过
- [x] SOP 运行状态已闭环（`ai sop status 4-1-9c7e079a = completed`）

## SOP 5.1 联合验收与发布守门（run: 5-1-c1513579）

- [x] planning-with-files 初始化并读取 task_plan/notes/deliverable
- [x] 产品/技术/质量三方联合验收报告已落盘
- [x] Round 1 `ai check` 通过
- [x] Round 2 UX Map + 真实 API + 契约探针通过
- [x] deliverable 已补充联合验收证据
- [x] 未触发 ralph loop（首轮通过）


## SOP 5.2 智能体发布与版本治理（run: 5-2-dae6a322）

- [x] planning-with-files 初始化并读取 task_plan/notes
- [x] Round 1 `ai check` 通过
- [x] Round 2 UX Map 门禁通过
- [x] 版本快照与回滚方案落盘（证据：outputs/sop-version-governance/5-2-dae6a322/reports/release_versioning_and_rollback.md）
- [x] deliverable 已补充版本治理证据

## SOP 5.3 Postmortem 自动化守门（run: 5-3-f13a8584）

- [x] Postmortems 已生成并补齐 triggers（证据：postmortem/PM-*.md）
- [x] Pre-release scan 通过（证据：outputs/sop-postmortem/5-3-f13a8584/reports/pre_release_scan.json）
- [x] CI gate 新增 `postmortem-scan` job（证据：.github/workflows/ci.yml）
- [x] Round 1 `ai check` 通过（证据：outputs/sop-postmortem/5-3-f13a8584/logs/ai-check.log）

## SOP 1.1 一键全量交付重跑（run: 1-1-719289f3）

- [x] planning-with-files 初始化并读取 task_plan/notes/deliverable
- [x] ralph loop 已启用（max_iterations=12, promise=DONE）
- [x] plan-first（目标/非目标/约束/验收/测试计划）已落盘
- [x] UX Map Round 2 人工模拟测试通过并留存证据
- [x] 前端专项（network/console/performance/visual/responsive）通过
- [x] 后端专项（real API replay + contract probe）通过
- [x] Round 1 `ai check` 通过
- [x] Task Closeout 完成（deliverable + rolling ledger + 三端一致性）

## SOP 1.3 多角色头脑风暴（run: 1-3-670e1dcd）

- [x] planning-with-files 初始化并读取 task_plan/notes
- [x] PM 产出竞品分析 + PRD 增量方向
- [x] Designer 产出 UX Map 增量策略
- [x] SEO 产出 sitemap 优先级与关键词簇策略
- [x] 冲突与一致性问题完成收敛并形成 ADR
- [x] PRD / UX Map / SEO / 架构 / 优化计划同步更新

## SOP 1.4 架构圆桌（run: 1-4-cdf0f11e）

- [x] planning-with-files 初始化并读取 task_plan/notes
- [x] 角色输出完成（Architect/Security/SRE）
- [x] ADR + 风险清单落盘并同步 SYSTEM_ARCHITECTURE
- [x] Round 1 `ai check` 通过
- [x] SOP 运行状态闭环（`ai sop status 1-4-cdf0f11e = completed`）
