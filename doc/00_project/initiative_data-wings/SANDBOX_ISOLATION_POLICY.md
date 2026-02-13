# Data Wings Sandbox Isolation Policy

**版本**: v1.0  
**日期**: 2026-02-11  
**适用范围**: 本地开发任务、CI 关键任务、敏感脚本执行  

---

## 1. 目标

为关键任务提供统一沙盒执行边界，降低以下风险：

- 凭证泄漏与越权访问
- 非预期文件改写
- 网络外联导致的数据外传
- 资源失控（CPU/内存/进程/执行时长）

---

## 2. 执行入口

- 脚本入口：`scripts/sandbox_task.sh`
- 后端模式：
  - `local`：本地 Docker 隔离（默认）
  - `cloud`：云沙盒适配模式（通过 `DW_CLOUD_SANDBOX_CMD` 注入供应商命令）

命令示例：

```bash
# 离线文档审计（默认 network=none）
scripts/sandbox_task.sh docs-audit -- "ls -la /workspace/doc"

# 仅打印策略和实际 docker 命令
scripts/sandbox_task.sh --dry-run go-unit -- "cd /workspace/services/api && go test ./..."
```

---

## 3. 关键任务策略矩阵

| task | 网络 | 可写路径（白名单） | CPU | 内存 | PIDs | 超时（秒） |
|------|------|--------------------|-----|------|------|-------------|
| `docs-audit` | `none` | `.sandbox-tmp`, `outputs`, `doc` | 1.0 | 1g | 128 | 300 |
| `web-lint` | `none` | `.sandbox-tmp`, `outputs`, `apps/web` | 2.0 | 2g | 256 | 900 |
| `go-unit` | `none` | `.sandbox-tmp`, `outputs`, `services/api` | 2.0 | 2g | 256 | 900 |
| `ai-unit` | `none` | `.sandbox-tmp`, `outputs`, `services/ai` | 2.0 | 2g | 256 | 900 |
| `integration-smoke` | `bridge` | `.sandbox-tmp`, `outputs`, `doc`, `apps/web`, `services/api`, `services/ai` | 4.0 | 4g | 512 | 1200 |

---

## 4. 安全基线

本地沙盒统一启用以下约束：

- `--read-only` 根文件系统
- `--cap-drop ALL`
- `--security-opt no-new-privileges:true`
- `--tmpfs /tmp` 与 `--tmpfs /run`
- 只读挂载项目目录，按任务覆写最小可写子目录
- 默认 `--network none`（仅 `integration-smoke` 放开）

---

## 5. 云沙盒适配规则

当使用 `backend=cloud` 时：

- 必须显式设置 `DW_CLOUD_SANDBOX_CMD`
- 脚本会将任务策略参数（network/cpu/memory/timeout）传入云命令
- 未设置 `DW_CLOUD_SANDBOX_CMD` 时，执行失败并返回错误码 `2`

示例：

```bash
export DW_CLOUD_SANDBOX_CMD="daytona sandbox run"
scripts/sandbox_task.sh --backend cloud docs-audit -- "ls -la /workspace/doc"
```

---

## 6. 证据要求

每次 SOP 执行需在以下路径保存证据：

- `outputs/<sop-id>/<run-id>/logs`：命令输出与运行参数
- `outputs/<sop-id>/<run-id>/reports`：策略说明与结果报告
- `outputs/<sop-id>/<run-id>/diff`：代码与文档改动

---

## 7. 后续增强

- 接入 mTLS / internal token（API -> AI）
- 将 `sandbox_task.sh` 策略矩阵纳入 CI 校验（禁止策略漂移）
- 对 `integration-smoke` 增加 egress allowlist（域名/端口级）
