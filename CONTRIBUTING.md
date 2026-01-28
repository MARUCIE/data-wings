# 贡献指南

感谢你对 Data Wings 项目的关注！本文档将帮助你了解如何参与贡献。

## 行为准则

请尊重所有项目参与者，保持友好、包容的交流氛围。

## 如何贡献

### 报告 Bug

1. 在 [Issues](https://github.com/your-org/data-wings/issues) 中搜索是否已存在相似问题
2. 如果没有，创建新 Issue，包含：
   - 清晰的标题
   - 复现步骤
   - 期望行为 vs 实际行为
   - 环境信息（OS、浏览器、Node 版本等）
   - 相关日志或截图

### 提交功能建议

1. 在 Issues 中创建 Feature Request
2. 描述功能的使用场景和预期价值
3. 如果可能，提供设计草图或伪代码

### 提交代码

#### 1. Fork 并克隆

```bash
git clone https://github.com/your-username/data-wings.git
cd data-wings
git remote add upstream https://github.com/your-org/data-wings.git
```

#### 2. 创建分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

分支命名规范：
- `feature/xxx` - 新功能
- `fix/xxx` - Bug 修复
- `docs/xxx` - 文档更新
- `refactor/xxx` - 代码重构
- `test/xxx` - 测试相关

#### 3. 开发

```bash
# 安装依赖
make install

# 启动开发环境
make docker-up
make dev

# 运行测试
make test

# 代码检查
make lint
```

#### 4. 提交

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
git commit -m "feat(sdk): add batch event tracking"
git commit -m "fix(api): handle null user_id in track endpoint"
git commit -m "docs: update README with API examples"
```

提交类型：
- `feat` - 新功能
- `fix` - Bug 修复
- `docs` - 文档
- `style` - 代码格式（不影响功能）
- `refactor` - 重构
- `test` - 测试
- `chore` - 构建/工具相关

#### 5. 推送并创建 PR

```bash
git push origin feature/your-feature-name
```

在 GitHub 上创建 Pull Request，包含：
- 清晰的标题（遵循 Conventional Commits）
- 变更说明
- 相关 Issue 链接（如有）
- 测试结果截图（如适用）

## 开发规范

### 代码风格

#### TypeScript/JavaScript

- 使用 ESLint + Prettier
- 严格模式 TypeScript
- 函数和类型需要 JSDoc 注释

```typescript
/**
 * Track a custom event
 * @param eventName - Name of the event
 * @param properties - Event properties
 */
track(eventName: string, properties?: Record<string, unknown>): void {
  // ...
}
```

#### Go

- 遵循 [Effective Go](https://go.dev/doc/effective_go)
- 使用 golangci-lint
- 公开函数需要注释

```go
// Track records a new event in the analytics database.
// It validates the event structure and returns an error if invalid.
func (h *EventHandler) Track(c *gin.Context) {
    // ...
}
```

#### Python

- 遵循 PEP 8
- 使用 Black 格式化
- 使用 mypy 类型检查
- 函数需要 docstring

```python
async def translate(self, question: str, context: dict | None = None) -> dict:
    """
    Translate natural language question to SQL.

    Args:
        question: The natural language question
        context: Optional context for the query

    Returns:
        Dict containing sql, explanation, and confidence
    """
    # ...
```

### 测试要求

- 新功能必须包含单元测试
- Bug 修复应添加回归测试
- 测试覆盖率不应降低

```bash
# 运行所有测试
make test

# 运行特定服务测试
cd services/api && go test ./...
cd services/ai && pytest
cd packages/sdk && pnpm test
```

### 文档要求

- API 变更需更新 README
- 新功能需在相关文档中说明
- 复杂逻辑需添加代码注释

## 项目结构说明

```
data-wings/
├── apps/web/                # Next.js 前端
│   ├── src/
│   │   ├── app/            # App Router 页面
│   │   ├── components/     # React 组件
│   │   └── lib/            # 工具函数
│   └── package.json
│
├── packages/sdk/            # JavaScript SDK
│   ├── src/
│   │   ├── client.ts       # 主客户端
│   │   ├── storage.ts      # 存储抽象
│   │   └── types.ts        # 类型定义
│   └── package.json
│
├── services/api/            # Go API 服务
│   ├── cmd/                # 入口
│   ├── internal/
│   │   ├── config/         # 配置
│   │   ├── handlers/       # HTTP 处理器
│   │   ├── models/         # 数据模型
│   │   └── repository/     # 数据访问
│   └── go.mod
│
├── services/ai/             # Python AI 服务
│   ├── src/
│   │   ├── main.py         # FastAPI 入口
│   │   ├── nl2sql.py       # NL2SQL 引擎
│   │   └── config.py       # 配置
│   ├── tests/
│   └── requirements.txt
│
└── infra/                   # 基础设施配置
    └── clickhouse/
        └── init/           # 初始化脚本
```

## 发布流程

1. 更新版本号（遵循 SemVer）
2. 更新 CHANGELOG
3. 创建 Release PR
4. 合并后自动发布

```bash
# 发布补丁版本 (0.0.x)
make release-patch

# 发布次要版本 (0.x.0)
make release-minor

# 发布主要版本 (x.0.0)
make release-major
```

## 获取帮助

- 查看 [文档](doc/)
- 在 Issues 中提问
- 联系维护者：maurice_wen@proton.me

## 许可

贡献的代码将遵循项目的 MIT 许可证。

---

猪哥云（四川）网络科技有限公司 | 合规网 www.hegui.com
猪哥云-数据产品部-Maurice | maurice_wen@proton.me
2025 猪哥云-灵阙企业级智能体平台
