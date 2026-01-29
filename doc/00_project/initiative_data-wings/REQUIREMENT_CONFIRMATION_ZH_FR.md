# Data Wings - 需求确认（中法对照）

**日期**: 2026-01-28
**PROJECT_DIR**: `/Users/mauricewen/Projects/09-data-wings`

---

## 需求确认表

| 编号 | 中文需求 | Français (FR) | 状态 | 备注 |
|------|----------|---------------|------|------|
| RC-001 | Planning-with-files 初始化并读取 task_plan/notes/deliverable，确保 PDCA_ITERATION_CHECKLIST 存在 | Initialiser planning-with-files et relire task_plan/notes/deliverable, assurer la présence de PDCA_ITERATION_CHECKLIST | 已完成 | 已更新并记录证据 |
| RC-002 | 启用 ralph loop（max 12，promise DONE） | Activer ralph loop (max 12, promesse DONE) | 已完成 | 状态文件已创建 |
| RC-003 | Plan-first：输出目标/非目标/约束/验收/测试计划 | Plan-first : objectifs / hors-scope / contraintes / critères / plan de test | 已完成 | 已输出 |
| RC-004 | 从首页按 UX Map 做人工模拟测试并留证据 | Tester manuellement depuis la homepage selon UX Map avec preuves | 已完成（局部覆盖） | 登录/权限页未实现 |
| RC-005 | 代码修改前滚动更新 PDCA 四文档 | Mettre à jour les 4 documents PDCA avant code changes | 已完成 | PRD/Architecture/UX/Optimization 已更新 |
| RC-006 | 交付前 ai check + UX Map 复测 | Exécuter ai check + retest UX Map avant livraison | 已完成 | ai check 通过，复测有证据 |
| RC-007 | 前端/后端检查要求 | Contrôles front/back requis | 已完成 | 前端完成 network/console/performance/visual 证据，后端核对契约与错误码 |
| RC-008 | Task Closeout（deliverable/ledger/一致性） | Task Closeout (deliverable/ledger/consistance) | 已完成 | 三端一致性标记 N/A |
| RC-009 | 前端 UI/UX 优化（ui-skills + web-interface-guidelines） | Optimisation UI/UX (ui-skills + web-interface-guidelines) | 已完成 | Home/Ask/Dashboard 已优化并留证据 |

---

## 结论

- 真实流程测试已完成，但登录/权限页面未实现，导致覆盖范围为 MVP 现有路由。
- UI/UX 优化已完成，证据留存于 `evidence/ui-ux/2026-01-28/`。
- 若补齐登录/权限页，应补做对应 UX Map 路径测试并更新证据。
