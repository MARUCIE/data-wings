"""
NL2SQL Query Test Cases

A comprehensive set of test queries to validate the NL2SQL engine
generates correct ClickHouse SQL for various question types.
"""

import pytest

# Test cases: (question, expected_keywords_in_sql)
NL2SQL_TEST_CASES = [
    # Basic counting
    (
        "How many events happened yesterday?",
        ["count", "events", "event_date", "today() - 1"],
    ),
    (
        "Total number of users",
        ["count", "users"],
    ),

    # Time-based queries
    (
        "Show events from the last 7 days",
        ["events", "event_date", "7", "DAY"],
    ),
    (
        "What happened last week?",
        ["events", "toStartOfWeek", "7"],
    ),
    (
        "Events this month",
        ["events", "toStartOfMonth", "INTERVAL"],
    ),

    # Aggregation queries
    (
        "Daily active users for the past week",
        ["count", "DISTINCT", "user_id", "event_date", "GROUP BY"],
    ),
    (
        "Average events per user",
        ["avg", "count", "user_id", "GROUP BY"],
    ),
    (
        "Top 10 most common event types",
        ["event_name", "count", "GROUP BY", "ORDER BY", "LIMIT 10"],
    ),

    # Filtering queries
    (
        "How many sign up events?",
        ["count", "event_name", "sign_up"],
    ),
    (
        "Events from mobile devices",
        ["events", "device_type", "mobile"],
    ),
    (
        "Users from China",
        ["users", "country", "CN"],
    ),

    # Funnel/conversion queries
    (
        "How many users signed up and then created a dashboard?",
        ["sign_up", "create_dashboard", "user_id"],
    ),

    # Trend queries
    (
        "Event trend by day",
        ["event_date", "count", "GROUP BY", "ORDER BY"],
    ),
    (
        "Compare this week vs last week",
        ["toStartOfWeek", "count", "GROUP BY"],
    ),

    # Dimension breakdown
    (
        "Events by browser",
        ["browser", "count", "GROUP BY"],
    ),
    (
        "Users by country",
        ["country", "count", "GROUP BY"],
    ),
    (
        "Traffic by UTM source",
        ["utm_source", "count", "GROUP BY"],
    ),

    # Chinese language queries
    (
        "过去7天每天有多少事件？",
        ["count", "event_date", "7", "DAY", "GROUP BY"],
    ),
    (
        "昨天有多少用户访问？",
        ["count", "user_id", "event_date", "today() - 1"],
    ),
    (
        "按设备类型统计事件数",
        ["device_type", "count", "GROUP BY"],
    ),
    (
        "最近一周的日活用户数",
        ["count", "DISTINCT", "user_id", "event_date", "7", "DAY"],
    ),
]


def validate_sql_contains_keywords(sql: str, keywords: list[str]) -> bool:
    """Check if SQL contains all expected keywords (case-insensitive)."""
    sql_lower = sql.lower()
    for keyword in keywords:
        if keyword.lower() not in sql_lower:
            return False
    return True


class TestNL2SQLQueryCoverage:
    """Test NL2SQL with various query types."""

    @pytest.mark.parametrize("question,expected_keywords", NL2SQL_TEST_CASES)
    async def test_query_translation(
        self,
        question: str,
        expected_keywords: list[str],
    ):
        """Test that NL2SQL generates SQL with expected keywords."""
        # Import here to allow running without full environment
        try:
            from src.nl2sql import NL2SQLEngine
            from src.config import settings

            if not settings.gemini_api_key and not settings.poe_api_key:
                pytest.skip("No API key configured")

            engine = NL2SQLEngine()
            result = await engine.translate(question)

            assert "sql" in result
            assert result["confidence"] >= 0.5

            # Check for expected keywords
            sql = result["sql"]
            missing = [k for k in expected_keywords if k.lower() not in sql.lower()]

            if missing:
                pytest.fail(
                    f"SQL missing expected keywords: {missing}\n"
                    f"Question: {question}\n"
                    f"SQL: {sql}"
                )

            await engine.close()

        except ImportError:
            pytest.skip("NL2SQL engine not available")


# Quick validation without pytest
if __name__ == "__main__":
    import asyncio

    async def quick_test():
        """Quick test of a few queries."""
        try:
            from src.nl2sql import NL2SQLEngine

            engine = NL2SQLEngine()

            test_questions = [
                "How many events happened yesterday?",
                "过去7天每天有多少事件？",
                "Top 10 most common event types",
            ]

            print("Quick NL2SQL Validation")
            print("=" * 60)

            for q in test_questions:
                print(f"\nQ: {q}")
                try:
                    result = await engine.translate(q)
                    print(f"SQL: {result['sql']}")
                    print(f"Confidence: {result['confidence']}")
                except Exception as e:
                    print(f"Error: {e}")

            await engine.close()

        except ImportError as e:
            print(f"Import error: {e}")
            print("Run from services/ai directory with venv activated")

    asyncio.run(quick_test())
