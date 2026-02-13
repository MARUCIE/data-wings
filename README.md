# Data Wings

> AI-Native 的开源数据分析平台

[![CI](https://github.com/your-org/data-wings/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/data-wings/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 项目概述

Data Wings 是一个 AI 驱动的数据统计分析平台，对标神策数据、GrowingIO、Mixpanel、Amplitude、PostHog 等竞品。

**核心差异化**：
- **AI 原生**：自然语言查询 + 自动洞察生成
- **开源策略**：核心引擎 MIT 开源
- **国产化**：支持 DeepSeek/Qwen 等国产 LLM
- **私有化**：原生支持私有化部署

## 快速开始

### 环境要求

- Node.js >= 18
- Docker & Docker Compose
- Go >= 1.22（本地模式：运行 API 服务）
- Python >= 3.11（本地模式：运行 AI 服务）
- pnpm >= 8（或使用 `npx pnpm`）

### 一键启动

```bash
# 1. 克隆仓库
git clone https://github.com/your-org/data-wings.git
cd data-wings

# 2. 安装依赖并启动
make setup

# 3. 或者分步执行
make install      # 安装所有依赖
make docker-up    # 启动基础设施（ClickHouse, Redis）
make seed         # 生成测试数据
make dev          # 启动开发服务器（本地模式；若未安装 Go 则自动回退 Docker Compose）
```

### 服务端口

| 服务 | 本地开发端口 | Docker Compose 暴露端口 | 说明 |
|------|--------------|---------------------------|------|
| Web | 3000 | 3009 | 前端应用 |
| API | 8080 | 4009 | Go API 服务 |
| AI | 8001 | 8009 | Python AI 服务 |
| ClickHouse | 9000/8123 | 9000/8123 | 分析数据库 |
| Redis | 6379 | 6309 | 缓存 |

### 配置 API Key

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env，填入 LLM API Key
# DEEPSEEK_API_KEY=sk-xxx
# QWEN_API_KEY=sk-xxx
# OPENAI_API_KEY=sk-xxx (可选)
```

## 项目结构

```
data-wings/
├── apps/
│   └── web/                 # Next.js 前端应用
├── packages/
│   └── sdk/                 # JavaScript/TypeScript SDK
├── services/
│   ├── api/                 # Go API 服务
│   └── ai/                  # Python AI 服务
├── infra/
│   └── clickhouse/          # ClickHouse 初始化脚本
├── scripts/                 # 开发脚本
├── doc/                     # 项目文档
└── docker-compose.yml       # Docker 编排
```

## SDK 使用

### 安装

```bash
npm install @data-wings/sdk
# 或
pnpm add @data-wings/sdk
```

### 基本用法

```typescript
import { DataWings } from '@data-wings/sdk';

// 初始化
const dw = new DataWings({
  apiKey: 'your-api-key',
  endpoint: 'https://api.datawings.io',
  autoCapture: true,  // 自动采集页面浏览
});

// 追踪事件
dw.track('button_click', {
  button_name: 'signup',
  page: '/home',
});

// 用户识别
dw.identify('user-123', {
  email: 'user@example.com',
  plan: 'pro',
});

// 页面浏览（SPA 场景）
dw.page('Home Page', {
  category: 'Landing',
});
```

### 自动采集

SDK 支持自动采集以下事件：
- **页面浏览**：自动追踪页面加载和 SPA 路由变化
- **点击事件**：可选，追踪带 `data-dw-track` 属性的元素

```typescript
// 启用自动采集
const dw = new DataWings({
  apiKey: 'your-api-key',
  autoCapture: true,
  autoTrackClicks: true,  // 可选：自动追踪点击
});
```

## API 参考

### 认证（JWT）

```bash
# 注册
POST /api/v1/auth/signup
{
  "email": "admin@datawings.local",
  "password": "datawings123",
  "role": "admin"
}

# 登录
POST /api/v1/auth/login
{
  "email": "admin@datawings.local",
  "password": "datawings123"
}

# 获取当前用户（需 Authorization）
GET /api/v1/auth/me
Authorization: Bearer <token>
```

### 事件追踪

```bash
# 单事件追踪
POST /api/v1/track
{
  "event_name": "page_view",
  "anonymous_id": "anon-123",
  "user_id": "user-456",  // 可选
  "properties": {
    "page": "/home",
    "referrer": "google.com"
  }
}

# 批量追踪
POST /api/v1/batch
{
  "events": [...]
}

# 用户识别
POST /api/v1/identify
{
  "user_id": "user-456",
  "anonymous_id": "anon-123",
  "traits": {
    "email": "user@example.com"
  }
}
```

### 自然语言查询

```bash
Authorization: Bearer <token>

POST /api/v1/ask
{
  "question": "过去7天的日活用户数是多少？"
}

# 响应
{
  "question": "过去7天的日活用户数是多少？",
  "sql": "SELECT toDate(event_time) as date, count(DISTINCT user_id) as dau FROM events WHERE event_time >= now() - INTERVAL 7 DAY GROUP BY date ORDER BY date",
  "explanation": "查询过去7天每天的独立用户数",
  "confidence": 0.92
}
```

### 仪表盘

```bash
# 获取数据概览
Authorization: Bearer <token>
GET /api/v1/overview

# 列出仪表盘
Authorization: Bearer <token>
GET /api/v1/dashboards

# 获取单个仪表盘
Authorization: Bearer <token>
GET /api/v1/dashboards/:id

# 创建仪表盘
Authorization: Bearer <token>
POST /api/v1/dashboards

# 更新仪表盘
Authorization: Bearer <token>
PUT /api/v1/dashboards/:id

# 删除仪表盘
Authorization: Bearer <token>
DELETE /api/v1/dashboards/:id
```

### 团队管理（Admin）

```bash
Authorization: Bearer <token>

# 成员列表
GET /api/v1/team

# 添加成员
POST /api/v1/team
{
  "email": "analyst@datawings.local",
  "password": "datawings123",
  "role": "analyst"
}

# 移除成员
DELETE /api/v1/team/:id
```

## 开发命令

```bash
# 安装依赖
make install

# 启动开发服务器
make dev

# 运行测试
make test

# 代码检查
make lint

# 构建
make build

# Docker 操作
make docker-up      # 启动基础设施
make docker-down    # 停止基础设施
make docker-build   # 构建所有镜像

# 数据操作
make seed           # 生成测试数据
make seed-clean     # 清理并重新生成

# 发布
make release-patch  # 发布补丁版本
make release-minor  # 发布次要版本
make release-major  # 发布主要版本

# 沙盒执行（隔离关键任务）
make sandbox-dry-run TASK=docs-audit CMD='ls -la /workspace/doc'
make sandbox-task TASK=go-unit CMD='cd /workspace/services/api && go test ./...'
```

## 沙盒化执行（Global Sandbox）

关键任务默认建议通过 `scripts/sandbox_task.sh` 执行，启用最小权限隔离：

- 根文件系统只读（`--read-only`）
- 默认禁网（`--network none`）
- 限制 CPU / 内存 / 进程数 / 超时
- 仅白名单路径可写（如 `outputs`、`.sandbox-tmp`、任务相关目录）

示例：

```bash
# 文档审计：离线 + 最小可写路径
scripts/sandbox_task.sh docs-audit -- "ls -la /workspace/doc"

# 先查看策略，不实际执行
scripts/sandbox_task.sh --dry-run web-lint -- "cd /workspace/apps/web && pnpm lint"
```

## 真实 API 回放与回归（No Mock）

使用真实 API 生成并回放 fixtures：

```bash
# 启动非生产环境
docker compose up -d web api ai clickhouse redis

# 执行真实 API 核心路径并生成捕获报告
python3 scripts/replay_real_api_fixture.py \
  --fixture fixtures/replay/real_api/core_path.fixture.json \
  --base-url http://localhost:4009 \
  --capture-output outputs/replay/real_api_capture.json \
  --report-output outputs/replay/real_api_capture.md
```

验收约束：
- 最终验收必须通过真实 API。
- 不得以 mock 响应替代核心路径验收。

## 文档索引

| 文档 | 说明 |
|------|------|
| [PRD](doc/00_project/initiative_data-wings/PRD.md) | 产品需求文档 |
| [UX Map](doc/00_project/initiative_data-wings/USER_EXPERIENCE_MAP.md) | 用户体验地图 |
| [系统架构](doc/00_project/initiative_data-wings/SYSTEM_ARCHITECTURE.md) | 系统架构设计 |
| [沙盒隔离策略](doc/00_project/initiative_data-wings/SANDBOX_ISOLATION_POLICY.md) | 全局沙盒运行与配额策略 |
| [SEO 策略](doc/00_project/initiative_data-wings/SEO_SITEMAP_STRATEGY.md) | 网站地图与 SEO |
| [竞品分析](doc/00_project/initiative_data-wings/notes.md) | 竞品调研笔记 |
| [任务计划](doc/00_project/initiative_data-wings/task_plan.md) | 任务计划与决策记录 |
| [CONTRIBUTING](CONTRIBUTING.md) | 贡献指南 |

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Next.js 14, React 18, TypeScript, TailwindCSS |
| 后端 | Go 1.21+ (Gin), Python 3.11+ (FastAPI) |
| 数据库 | ClickHouse (分析), Redis (缓存) |
| AI/ML | DeepSeek, Qwen, OpenAI (可选) |
| 构建 | pnpm, Turborepo, Docker |
| CI/CD | GitHub Actions |

## 里程碑

| 阶段 | 时间 | 目标 | 状态 |
|------|------|------|------|
| MVP | Month 1-2 | Web SDK + 事件分析 + NL 查询 | 进行中 |
| V1.0 | Month 3-4 | 全端 SDK + 自动洞察 | 规划中 |
| V2.0 | Month 5-8 | 预测分析 + 企业功能 | 规划中 |

## 贡献

欢迎贡献代码！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详情。

## License

MIT License

---

猪哥云（四川）网络科技有限公司 | 合规网 www.hegui.com
猪哥云-数据产品部-Maurice | maurice_wen@proton.me
2025 猪哥云-灵阙企业级智能体平台
