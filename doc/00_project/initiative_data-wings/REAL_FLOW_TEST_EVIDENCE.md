# Data Wings - 真实流程测试证据

**版本**: v1.0
**日期**: 2026-01-28
**作者**: QA/PM

---

## 1. 执行记录

| 日期 | Persona | 入口 | 关键路径 | 结果 | 证据路径 | 备注 |
|------|---------|------|----------|------|----------|------|
| 2026-01-28 | Persona A | / (3100) | 首页→Ask→Dashboard | 通过（修复后） | `evidence/real-flow/2026-01-28/` | Ask+CORS 修复后复测通过 |
| 2026-01-28 | Persona B | /dashboard | Dashboard→Ask | 通过 | `evidence/real-flow/2026-01-28/` | 采用 API+UI 混合验证 |
| 2026-01-28 | Persona C | /dashboard | Dashboards API→List | 通过 | `evidence/real-flow/2026-01-28/` | UI 管理页尚未实现（当时） |
| 2026-02-12 | Persona C | /app/settings/team (3009) | 登录→团队管理→权限校验 | 通过 | `outputs/sop-project-regression/4-1-6117de0a/reports/uxmap_e2e_probe.md` | SOP 4.1 UX Map 回归补充覆盖 |

---

## 2. 异常路径记录

| 日期 | Persona | 异常场景 | 期望 | 实际 | 证据路径 | 备注 |
|------|---------|----------|------|------|----------|------|
| 2026-01-28 | Persona A | Ask LLM 403 | 错误提示 | 已复现并修复 | `evidence/real-flow/2026-01-28/ai_direct_ask_after_fix.json` | 切换 Poe Provider |
| 2026-01-28 | Persona B | Ask 缺失 question | 400 | 400 | `evidence/real-flow/2026-01-28/persona-b_ask_invalid_after_restart.json` | API 校验生效 |
| 2026-01-28 | Persona C | Dashboard 缺失 name | 400 | 400 | `evidence/real-flow/2026-01-28/persona-c_dashboard_create_invalid_after_restart.json` | API 校验生效 |

---

## 3. 成功率汇总

| 维度 | 目标 | 实际 | 备注 |
|------|------|------|------|
| 关键路径成功率 | ≥ 95% | 3/3（局部覆盖） | 登录/权限页已实现；2026-02-12 已通过 SOP 回归补充覆盖（见 outputs/sop-project-regression/4-1-6117de0a/reports/uxmap_e2e_probe.md） |
| 异常路径正确率 | = 100% | 3/3 | Ask 缺参/仪表盘缺参/LLM 403 均有证据 |
