# NL2SQL 技术 Spike

> 验证自然语言查询转 SQL 的技术可行性

## 目标

1. 验证 DeepSeek/Qwen API 在 NL2SQL 场景的效果
2. 测试 Schema 映射策略
3. 评估查询准确率和延迟
4. 产出技术决策建议

## 测试场景

| 场景 | 自然语言输入 | 预期 SQL |
|------|-------------|----------|
| 日活趋势 | "过去 7 天的日活用户数" | SELECT date, COUNT(DISTINCT user_id) ... |
| 漏斗分析 | "注册到付费的转化率" | WITH funnel AS ... |
| 留存分析 | "7 日留存率" | SELECT ... |
| 事件分析 | "点击登录按钮的用户数" | SELECT COUNT(*) WHERE event = 'click' ... |

## 文件结构

```
nl2sql/
├── README.md           # 本文件
├── schema.py           # Analytics Schema 定义
├── nl2sql_engine.py    # NL2SQL 核心引擎
├── test_queries.py     # 测试用例
└── benchmark.md        # 性能基准报告
```

## 运行方式

```bash
# 安装依赖
pip install openai httpx

# 设置 API Key
export DEEPSEEK_API_KEY=your_key

# 运行测试
python test_queries.py
```

## 技术决策

（待 Spike 完成后填写）
