# ADR-2026-02-12: Architecture Council Refresh Decisions

- Date: 2026-02-12
- SOP: 1.4 架构圆桌
- Run: 1-4-cdf0f11e
- Status: Accepted

## Context

在完成 1.1/4.1/5.1/1.3 后，项目进入“持续交付稳定期”。
本轮架构圆桌目标是确认系统边界是否需要变更，并收敛安全与可靠性增量事项。

## Decisions

1. **边界不变**：维持 `Web -> API -> AI/Data` 分层，不引入跨层调用。
2. **安全增量**：将 auth 速率限制、API->AI 内部鉴权强化纳入下一轮优先事项。
3. **SRE 增量**：建立 evidence retention 机制与 trace_id 贯通要求。
4. **门禁不降级**：发布前继续强制三门禁（`ai check + UX Map + contract probe`）。

## Consequences

- 优点：降低大改带来的回归风险，保证当前交付链路稳定。
- 代价：部分深层架构优化延后到后续里程碑。
- 风险控制：以风险清单持续跟踪，按 P0/P1/P2 逐项实施。

## References

- `outputs/sop-architecture-council/1-4-cdf0f11e/reports/architecture_council_report.md`
- `doc/00_project/initiative_data-wings/ARCHITECTURE_RISK_REGISTER.md`
- `doc/00_project/initiative_data-wings/SYSTEM_ARCHITECTURE.md`
