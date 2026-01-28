"""
NL2SQL Engine - 自然语言转 SQL 引擎

支持多 LLM 后端：DeepSeek、Qwen、OpenAI
"""

import os
import json
import time
from dataclasses import dataclass
from typing import Literal
from openai import OpenAI

from schema import get_schema_context, BUSINESS_GLOSSARY, EVENT_NAME_MAPPING


@dataclass
class QueryResult:
    """查询结果"""
    natural_language: str      # 原始自然语言输入
    sql: str                   # 生成的 SQL
    explanation: str           # SQL 解释
    confidence: float          # 置信度 (0-1)
    latency_ms: int           # 生成延迟 (毫秒)
    model: str                # 使用的模型
    error: str | None = None  # 错误信息


class NL2SQLEngine:
    """自然语言转 SQL 引擎"""

    # LLM 配置
    LLM_CONFIGS = {
        "deepseek": {
            "base_url": "https://api.deepseek.com",
            "model": "deepseek-chat",
            "env_key": "DEEPSEEK_API_KEY",
        },
        "qwen": {
            "base_url": "https://dashscope.aliyuncs.com/compatible-mode/v1",
            "model": "qwen-max",
            "env_key": "DASHSCOPE_API_KEY",
        },
        "openai": {
            "base_url": "https://api.openai.com/v1",
            "model": "gpt-4o",
            "env_key": "OPENAI_API_KEY",
        },
    }

    def __init__(
        self,
        llm_provider: Literal["deepseek", "qwen", "openai"] = "deepseek",
        temperature: float = 0.1,
        max_tokens: int = 2048,
    ):
        self.llm_provider = llm_provider
        self.temperature = temperature
        self.max_tokens = max_tokens

        # 初始化 LLM 客户端
        config = self.LLM_CONFIGS[llm_provider]
        api_key = os.getenv(config["env_key"])
        if not api_key:
            raise ValueError(f"Missing API key: {config['env_key']}")

        self.client = OpenAI(
            api_key=api_key,
            base_url=config["base_url"],
        )
        self.model = config["model"]

        # 加载 Schema 上下文
        self.schema_context = get_schema_context()

    def _build_system_prompt(self) -> str:
        """构建系统 Prompt"""
        return f"""你是一个专业的数据分析 SQL 专家，专门为 Data Wings 数据分析平台生成 ClickHouse SQL 查询。

## 你的任务
将用户的自然语言问题转换为准确的 ClickHouse SQL 查询。

## 数据库 Schema
{self.schema_context}

## 输出要求
请严格按照以下 JSON 格式输出：
```json
{{
    "sql": "生成的 SQL 查询（使用 ClickHouse 语法）",
    "explanation": "SQL 的解释（用中文，简洁说明查询逻辑）",
    "confidence": 0.95
}}
```

## 注意事项
1. 使用 ClickHouse 语法（如 toDate(), today(), dateDiff() 等）
2. 日期函数使用 ClickHouse 格式
3. 时间范围默认使用最近 7 天
4. 返回结果按时间倒序或按数值降序排列
5. 限制结果数量，避免返回过多数据
6. 只输出 JSON，不要有其他内容
"""

    def _build_user_prompt(self, natural_language: str) -> str:
        """构建用户 Prompt"""
        # 预处理：替换业务术语
        processed = natural_language
        for term, definition in BUSINESS_GLOSSARY.items():
            if term in processed:
                processed = f"{processed}（注：{term} = {definition}）"
                break

        # 预处理：替换事件名称
        for cn_name, en_name in EVENT_NAME_MAPPING.items():
            if cn_name in processed:
                processed = f"{processed}（注：{cn_name} 对应事件名 '{en_name}'）"
                break

        return f"请将以下自然语言问题转换为 SQL 查询：\n\n{processed}"

    def query(self, natural_language: str) -> QueryResult:
        """
        将自然语言转换为 SQL

        Args:
            natural_language: 自然语言问题

        Returns:
            QueryResult: 查询结果
        """
        start_time = time.time()

        try:
            # 调用 LLM
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": self._build_system_prompt()},
                    {"role": "user", "content": self._build_user_prompt(natural_language)},
                ],
                temperature=self.temperature,
                max_tokens=self.max_tokens,
            )

            # 解析响应
            content = response.choices[0].message.content.strip()

            # 提取 JSON（处理可能的 markdown 代码块）
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0].strip()
            elif "```" in content:
                content = content.split("```")[1].split("```")[0].strip()

            result = json.loads(content)

            latency_ms = int((time.time() - start_time) * 1000)

            return QueryResult(
                natural_language=natural_language,
                sql=result.get("sql", ""),
                explanation=result.get("explanation", ""),
                confidence=result.get("confidence", 0.0),
                latency_ms=latency_ms,
                model=self.model,
            )

        except json.JSONDecodeError as e:
            latency_ms = int((time.time() - start_time) * 1000)
            return QueryResult(
                natural_language=natural_language,
                sql="",
                explanation="",
                confidence=0.0,
                latency_ms=latency_ms,
                model=self.model,
                error=f"JSON 解析失败: {e}",
            )
        except Exception as e:
            latency_ms = int((time.time() - start_time) * 1000)
            return QueryResult(
                natural_language=natural_language,
                sql="",
                explanation="",
                confidence=0.0,
                latency_ms=latency_ms,
                model=self.model,
                error=str(e),
            )

    def batch_query(self, questions: list[str]) -> list[QueryResult]:
        """批量查询"""
        return [self.query(q) for q in questions]


def main():
    """演示用法"""
    # 检查 API Key
    if not os.getenv("DEEPSEEK_API_KEY"):
        print("请设置 DEEPSEEK_API_KEY 环境变量")
        print("export DEEPSEEK_API_KEY=your_key")
        return

    # 创建引擎
    engine = NL2SQLEngine(llm_provider="deepseek")

    # 测试查询
    test_questions = [
        "过去 7 天的日活用户数趋势",
        "注册到付费的转化率是多少",
        "哪个渠道的用户留存最高",
        "今天点击登录按钮的用户有多少",
    ]

    print("=" * 60)
    print("NL2SQL Engine 测试")
    print("=" * 60)

    for question in test_questions:
        print(f"\n问题: {question}")
        print("-" * 40)

        result = engine.query(question)

        if result.error:
            print(f"错误: {result.error}")
        else:
            print(f"SQL:\n{result.sql}")
            print(f"\n解释: {result.explanation}")
            print(f"置信度: {result.confidence:.0%}")
            print(f"延迟: {result.latency_ms}ms")


if __name__ == "__main__":
    main()
