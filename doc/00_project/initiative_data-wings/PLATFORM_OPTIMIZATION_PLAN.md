# Data Wings - 平台优化计划

**版本**: v0.1
**日期**: 2026-01-28
**作者**: PM/Tech Lead

---

## 1. 优化目标

- 提升关键路径成功率与稳定性
- 降低接入与分析的操作成本
- 强化异常路径可恢复性

## 2. 优化范围

- Web App 关键路径
- API/AI 服务稳定性
- 事件采集与查询延迟

## 3. 关键指标

| 指标 | 基线 | 目标 | 备注 |
|------|------|------|------|
| 关键路径成功率 | 待测 | ≥ 95% | Real-Flow SOP 驱动 |
| 查询成功率 | 待测 | ≥ 95% | Ask / Query |
| 端到端延迟 | 待测 | < 5 min | 事件可查询 |

## 4. 待办与优先级

| 优先级 | 项目 | 说明 | 状态 |
|--------|------|------|------|
| P0 | 真实流程测试闭环 | Persona 覆盖 + 证据 | 已完成（局部覆盖） |
| P0 | 审计工具链补齐 | supply audit 证据 | 已完成（SOP 5.1） |
| P0 | 供应链 CI 门禁 | pnpm/pip audit + allowlist | 已完成（SOP 3.9） |
| P0 | Postmortem scan CI 门禁 | PM triggers + scan job | 已完成（SOP 5.3） |
| P0 | 发布版本治理 | version snapshot + rollback | 已完成（SOP 5.2） |

| P0 | 登录/权限闭环 | /login + RBAC + /app 路由 | 已完成（SOP 3.2/4.1） |
| P1 | 权限异常路径优化 | 403/重定向/提示 | 待开始 |
| P1 | SDK 接入引导优化 | 降低接入摩擦 | 待开始 |
| P1 | UI/UX 优化 | 间距/层级/单一主按钮 | 已完成 |
| P1 | 前端性能与视觉回归 | network/console/perf/visual | 已完成（SOP 3.1） |

## 5. 已发现问题（Real-Flow 测试）

| 日期 | 问题 | 影响 | 状态 |
|------|------|------|------|
| 2026-01-28 | AI NL2SQL 请求 403（Gemini API Key） | Ask 流程不可用 | 已修复（切换 Poe Provider） |
| 2026-01-28 | ClickHouse 查询扫描错误（String → interface） | Ask/Query 结果返回失败 | 已修复（类型化扫描） |
| 2026-01-28 | 前端端口 3100 CORS 被拒绝 | Dashboard 数据加载失败 | 已修复（CORS_ORIGINS 增补） |
| 2026-02-12 | signup 在 3000 入口触发 CORS 拦截（`Failed to fetch`） | 注册流程中断 | 已修复（CORS 基线统一为 3000/3009/3100） |
| 2026-02-12 | web 容器健康检查误报 unhealthy（localhost IPv6） | 运维监控误报，影响发布信心 | 已修复（HEALTHCHECK 使用 127.0.0.1） |
| 2026-02-12 | compose 持续输出 `version` 废弃告警 | 运行日志噪音，影响审计可读性 | 已修复（移除顶层 version 字段） |

## 6. 风险与缓解

| 风险 | 影响 | 缓解 |
|------|------|------|
| 测试环境不稳定 | 证据不可重复 | 固定版本与数据集 |
| 依赖外部 API | 流程中断 | 预留备用 Key |
| 入口/CORS 漂移 | 注册/登录等关键链路浏览器侧失败 | 固化入口矩阵 + CORS 基线 + 配置回归测试 |

## 7. SOTA SOP 对标优化（2026-02-11）

### 7.1 对标方向

| 方向 | 对标做法 | Data Wings 优先级 |
|------|------|------|
| 多角色分工 | Planner/Builder/Reviewer/Watchdog | P0 |
| 质量门禁 | PR + CI + Contract + E2E + 可审计证据 | P0 |
| 执行安全 | Sandbox + Permission Policy + Checkpoint | P0 |
| 可观测性 | tracing/eval/fallback track | P1 |
| 并行编排 | complex 任务采用 Swarm/Council | P1 |

### 7.2 12 周落地路线图

| 周期 | 目标 | 关键交付 |
|------|------|------|
| Week 1-2 | 统一 SOP 状态机 | run 状态标准 + 步骤回写规范 |
| Week 3-4 | 质量门禁固化 | contract/e2e/ai check 自动门禁 |
| Week 5-6 | 证据平台化 | 标准证据目录 + 汇总报告模板 |
| Week 7-8 | 策略与安全 | policy 配置化 + 沙盒 profile |
| Week 9-10 | 评测与观测 | eval 集 + 关键指标仪表盘 |
| Week 11-12 | 并行编排试点 | complex 任务 Swarm/Pipeline 对照实验 |

### 7.3 新增门禁指标

| 指标 | 当前 | 目标 | 采集方式 |
|------|------|------|------|
| SOP 闭环覆盖率 | 待测 | >= 95% | 任务状态机统计 |
| 质量门禁通过率 | 待测 | >= 95% | CI + 报告解析 |
| 证据完整率 | 待测 | 100% | 输出目录结构检查 |
| 回归逃逸率 | 待测 | < 2% | 发布后缺陷归因 |
| 平均恢复时长（MTTR） | 待测 | < 30 分钟 | 失败任务恢复日志 |

## 8. SOP 1.1 一键全量交付结果（2026-02-12）

### 8.1 门禁结果回填

| 指标 | 本轮结果 | 结论 |
|------|------|------|
| SOP 闭环覆盖率 | 100%（Step 1-8） | 达标 |
| 质量门禁通过率 | 100%（`ai check` + FE/BE 专项） | 达标 |
| 证据完整率 | 100%（logs/reports/screenshots/artifacts） | 达标 |
| 回归逃逸率 | 0（本轮未发现新阻断回归） | 达标 |

### 8.2 关键优化结论

1. FE 验证基线固化：`/signup -> /app -> /app/ask -> /app/dashboards -> /app/settings/team`。
2. BE 契约基线固化：`AUTH_INVALID_ROLE` / `AUTH_HEADER_MISSING` / `AUTH_FORBIDDEN`。
3. 真实 API 回放基线维持 7/7 通过。

### 8.3 证据路径

- `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/reports/sop_1_1_full_delivery_report.md`
- `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/reports/round2_uxmap_probe.json`
- `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/reports/backend_contract_probe.json`
- `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/reports/real_api_capture.md`
- `outputs/sop-one-click-full-delivery/1-1-2ddd14fb/logs/ai-check-round1.log`

## 9. SOP 4.1 项目级全链路回归结果（2026-02-12）

说明：证据目录为 `outputs/sop-project-regression/4-1-9c7e079a/`。

### 9.1 回归门禁结果

| 项目 | 结果 | 证据 |
|------|------|------|
| UX Map 核心路径 | PASS | `reports/uxmap_e2e_probe.json` |
| API 核心回放 | PASS（7/7） | `reports/real_api_capture.md` |
| 契约探针 | PASS（6/6） | `reports/backend_contract_probe.md` |
| 门禁检查 | PASS | `logs/ai-check.log` |

### 9.2 风险备注

- Go 容器测试在当前网络环境存在 IPv6 依赖下载失败风险，已通过 `GOPROXY` 复测规避并保留失败证据。

## 10. SOP 5.1 联合验收与发布守门结果（2026-02-12）

### 10.1 门禁结果

| 项目 | 结果 | 证据 |
|------|------|------|
| Round 1 `ai check` | PASS | `logs/ai-check-round1.log` |
| Round 2 UX Map 回归 | PASS | `reports/uxmap_e2e_probe.md` |
| Round 2 真实 API 回放 | PASS | `reports/real_api_capture.md` |
| Round 2 契约探针 | PASS（6/6） | `reports/backend_contract_probe.md` |
| 三方联合验收归档 | PASS | `reports/joint_acceptance_release_gate.md` |

说明：证据目录为 `outputs/sop-joint-acceptance/5-1-c1513579/`。

### 10.2 优化结论

- 发布前守门策略已从“单点验证”升级为“产品/技术/质量三方联合验收”。
- 当前迭代首轮通过全部门禁，未触发 ralph loop 重试。

### 10.3 SOP 5.2 发布与版本治理结果（2026-02-13）

- Version + rollback：`outputs/sop-version-governance/5-2-dae6a322/reports/release_versioning_and_rollback.md`
- Round 1 `ai check`：`outputs/sop-version-governance/5-2-dae6a322/logs/ai-check-round1.log`
- Round 2 UX Map：`outputs/sop-version-governance/5-2-dae6a322/reports/uxmap_e2e_probe.md`

### 10.4 SOP 5.3 Postmortem 自动化守门结果（2026-02-13）

- Postmortems：`postmortem/PM-*.md`
- Pre-release scan：`outputs/sop-postmortem/5-3-f13a8584/reports/pre_release_scan.json`
- CI Gate：`.github/workflows/ci.yml` `postmortem-scan` job



## 11. SOP 1.1 重跑稳定性结果（2026-02-12）

### 11.1 重跑门禁结果

| 项目 | 结果 | 证据 |
|------|------|------|
| Round 1 `ai check` | PASS | `logs/ai-check-round1.log` |
| UX Map 回归 | PASS | `reports/uxmap_e2e_probe.json` |
| FE 全量探针 | PASS | `reports/frontend_full_probe.json` |
| BE 回放 + 契约 | PASS | `reports/real_api_capture.json`, `reports/backend_contract_probe.json` |
| 三端一致性快照 | PASS | `logs/git-local-remote-head.log` |

说明：证据目录为 `outputs/sop-one-click-full-delivery/1-1-719289f3/`。

### 11.2 稳定性结论

- 连续执行多轮 SOP 后，当前交付链路仍保持稳定。
- 本轮无新增阻断性问题，主要收益为证据刷新与可审计追踪增强。

## 12. SOP 1.3 多角色头脑风暴优化清单（2026-02-12）

### 12.1 优先级落地项

| 优先级 | 优化项 | 说明 | 状态 |
|------|------|------|------|
| P0 | 激活链路引导卡 | signup 后提供下一步动作引导 | 待实施 |
| P0 | Dashboard 默认模板入口 | 降低空状态阻力 | 待实施 |
| P1 | Ask 场景化示例问题 | 提高首问成功率 | 待实施 |
| P1 | SEO 产品页优先优化 | 核心产品页权重先行 | 规划中 |
| P2 | 行业模板扩展（3 类） | 电商/SaaS/内容行业模板 | 规划中 |

### 12.2 证据与决策

- 报告：`outputs/sop-multi-role-brainstorm/1-3-670e1dcd/reports/multi_role_brainstorm_report.md`
- ADR：`doc/00_project/initiative_data-wings/ADR-2026-02-12-multi-role-brainstorm.md`

## 13. SOP 1.4 架构圆桌增量治理清单（2026-02-12）

### 13.1 P0/P1 优先事项

| 优先级 | 治理项 | 说明 | Owner | 状态 |
|------|------|------|------|------|
| P0 | Auth Rate Limit | signup/login 速率限制（IP+账号）+ 告警阈值 | Security+API | 待实施 |
| P0 | API->AI Internal Auth | internal token 或 mTLS，限制仅 API 可调用 AI | Security+SRE | 待实施 |
| P1 | Trace ID Propagation | Web/API/AI request_id/trace_id 贯通 | SRE | 待实施 |
| P1 | Evidence Retention | outputs 生命周期策略（脱敏+归档+清理） | SRE+QA | 待实施 |

### 13.2 风险台账与证据

- 风险清单：`doc/00_project/initiative_data-wings/ARCHITECTURE_RISK_REGISTER.md`
- ADR：`doc/00_project/initiative_data-wings/ADR-2026-02-12-architecture-council-refresh.md`
- 报告：`outputs/sop-architecture-council/1-4-cdf0f11e/reports/architecture_council_report.md`
