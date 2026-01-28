"""
Tests for NL2SQL Engine

These tests verify:
1. SQL generation from natural language
2. Response parsing
3. Error handling
"""

import json
from unittest.mock import AsyncMock, patch

import pytest

from src.nl2sql import NL2SQLEngine


@pytest.fixture
def engine():
    """Create NL2SQL engine instance."""
    return NL2SQLEngine()


class TestNL2SQLEngine:
    """Tests for NL2SQLEngine class."""

    def test_init(self, engine):
        """Test engine initialization."""
        assert engine is not None
        assert engine.provider == "deepseek"

    def test_parse_response_valid_json(self, engine):
        """Test parsing valid JSON response."""
        response = json.dumps({
            "sql": "SELECT COUNT(*) FROM events",
            "explanation": "Counts all events",
            "confidence": 0.95,
        })

        result = engine._parse_response(response)

        assert result["sql"] == "SELECT COUNT(*) FROM events"
        assert result["explanation"] == "Counts all events"
        assert result["confidence"] == 0.95

    def test_parse_response_markdown_json(self, engine):
        """Test parsing JSON wrapped in markdown code block."""
        response = """```json
{
    "sql": "SELECT COUNT(*) FROM events",
    "explanation": "Counts all events",
    "confidence": 0.9
}
```"""

        result = engine._parse_response(response)

        assert result["sql"] == "SELECT COUNT(*) FROM events"
        assert result["confidence"] == 0.9

    def test_parse_response_missing_sql(self, engine):
        """Test parsing response without sql field."""
        response = json.dumps({
            "explanation": "Some explanation",
            "confidence": 0.8,
        })

        with pytest.raises(ValueError, match="missing 'sql' field"):
            engine._parse_response(response)

    def test_parse_response_invalid_json(self, engine):
        """Test parsing invalid JSON response."""
        response = "This is not JSON"

        with pytest.raises(ValueError, match="Could not parse"):
            engine._parse_response(response)

    @pytest.mark.asyncio
    async def test_translate_calls_llm(self, engine):
        """Test that translate calls the LLM provider."""
        mock_response = json.dumps({
            "sql": "SELECT COUNT(DISTINCT user_id) FROM events WHERE event_date = today()",
            "explanation": "Counts unique users today",
            "confidence": 0.92,
        })

        with patch.object(engine, "_call_llm", new_callable=AsyncMock) as mock_call:
            mock_call.return_value = mock_response

            result = await engine.translate("How many users today?")

            mock_call.assert_called_once()
            assert "SELECT" in result["sql"]
            assert result["confidence"] == 0.92

    @pytest.mark.asyncio
    async def test_translate_with_context(self, engine):
        """Test translate with additional context."""
        mock_response = json.dumps({
            "sql": "SELECT COUNT(*) FROM events WHERE event_date >= '2025-01-01'",
            "explanation": "Counts events since start date",
            "confidence": 0.88,
        })

        with patch.object(engine, "_call_llm", new_callable=AsyncMock) as mock_call:
            mock_call.return_value = mock_response

            result = await engine.translate(
                "How many events?",
                context={"start_date": "2025-01-01"},
            )

            # Verify context was included in the call
            call_args = mock_call.call_args
            assert "2025-01-01" in call_args[0][1]  # user_prompt

    @pytest.mark.asyncio
    async def test_translate_error_handling(self, engine):
        """Test translate handles LLM errors."""
        with patch.object(engine, "_call_llm", new_callable=AsyncMock) as mock_call:
            mock_call.side_effect = RuntimeError("API error")

            with pytest.raises(RuntimeError, match="NL2SQL translation failed"):
                await engine.translate("How many users?")


class TestSQLGeneration:
    """Tests for specific SQL generation patterns."""

    @pytest.fixture
    def engine(self):
        return NL2SQLEngine()

    @pytest.mark.asyncio
    async def test_dau_query(self, engine):
        """Test DAU query generation."""
        mock_response = json.dumps({
            "sql": "SELECT toDate(event_time) AS date, uniq(user_id) AS dau FROM events WHERE event_date >= today() - 7 GROUP BY date ORDER BY date",
            "explanation": "Daily active users for the last 7 days",
            "confidence": 0.95,
        })

        with patch.object(engine, "_call_llm", new_callable=AsyncMock) as mock_call:
            mock_call.return_value = mock_response

            result = await engine.translate("What's the DAU trend this week?")

            assert "uniq(user_id)" in result["sql"]
            assert "GROUP BY" in result["sql"]

    @pytest.mark.asyncio
    async def test_event_count_query(self, engine):
        """Test event count query generation."""
        mock_response = json.dumps({
            "sql": "SELECT event_name, count() AS count FROM events GROUP BY event_name ORDER BY count DESC LIMIT 10",
            "explanation": "Top 10 events by count",
            "confidence": 0.93,
        })

        with patch.object(engine, "_call_llm", new_callable=AsyncMock) as mock_call:
            mock_call.return_value = mock_response

            result = await engine.translate("What are the top events?")

            assert "event_name" in result["sql"]
            assert "count()" in result["sql"]

    @pytest.mark.asyncio
    async def test_retention_query(self, engine):
        """Test retention query generation."""
        mock_response = json.dumps({
            "sql": """
            WITH cohort AS (
                SELECT user_id, min(toDate(event_time)) AS cohort_date
                FROM events
                GROUP BY user_id
            )
            SELECT cohort_date, count() AS users
            FROM cohort
            GROUP BY cohort_date
            """,
            "explanation": "User cohort analysis",
            "confidence": 0.85,
        })

        with patch.object(engine, "_call_llm", new_callable=AsyncMock) as mock_call:
            mock_call.return_value = mock_response

            result = await engine.translate("Show me user retention")

            assert "cohort" in result["sql"].lower()


class TestSchemaInjection:
    """Tests for schema injection in prompts."""

    def test_schema_in_system_prompt(self):
        """Test that schema is included in system prompt."""
        from src.schema import CLICKHOUSE_SCHEMA, BUSINESS_GLOSSARY

        engine = NL2SQLEngine()
        prompt = engine.SYSTEM_PROMPT.format(
            schema=CLICKHOUSE_SCHEMA,
            glossary=BUSINESS_GLOSSARY,
        )

        # Verify schema elements are present
        assert "events" in prompt
        assert "users" in prompt
        assert "event_name" in prompt
        assert "user_id" in prompt

        # Verify glossary elements are present
        assert "DAU" in prompt
        assert "MAU" in prompt
        assert "Retention" in prompt
