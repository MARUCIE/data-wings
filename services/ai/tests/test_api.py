"""
Tests for AI Service API endpoints

These tests verify:
1. Health check endpoint
2. Ask endpoint (NL2SQL)
3. Insights endpoint
"""

from unittest.mock import AsyncMock, patch

import pytest
from fastapi.testclient import TestClient

from src.main import app


@pytest.fixture
def client():
    """Create test client."""
    return TestClient(app)


class TestHealthEndpoint:
    """Tests for /health endpoint."""

    def test_health_check(self, client):
        """Test health check returns OK."""
        response = client.get("/health")

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        assert data["service"] == "data-wings-ai"
        assert "version" in data


class TestAskEndpoint:
    """Tests for /api/v1/ask endpoint."""

    def test_ask_requires_question(self, client):
        """Test that question is required."""
        response = client.post("/api/v1/ask", json={})

        assert response.status_code == 422  # Validation error

    def test_ask_with_valid_question(self, client):
        """Test ask with valid question."""
        mock_result = {
            "sql": "SELECT COUNT(*) FROM events",
            "explanation": "Counts all events",
            "confidence": 0.9,
        }

        with patch("src.main.nl2sql_engine.translate", new_callable=AsyncMock) as mock_translate:
            mock_translate.return_value = mock_result

            response = client.post(
                "/api/v1/ask",
                json={"question": "How many events?"},
            )

            assert response.status_code == 200
            data = response.json()
            assert data["question"] == "How many events?"
            assert data["sql"] == "SELECT COUNT(*) FROM events"
            assert data["confidence"] == 0.9

    def test_ask_with_context(self, client):
        """Test ask with additional context."""
        mock_result = {
            "sql": "SELECT COUNT(*) FROM events WHERE event_date >= '2025-01-01'",
            "explanation": "Counts events since date",
            "confidence": 0.85,
        }

        with patch("src.main.nl2sql_engine.translate", new_callable=AsyncMock) as mock_translate:
            mock_translate.return_value = mock_result

            response = client.post(
                "/api/v1/ask",
                json={
                    "question": "How many events?",
                    "context": {"start_date": "2025-01-01"},
                },
            )

            assert response.status_code == 200
            mock_translate.assert_called_once_with(
                question="How many events?",
                context={"start_date": "2025-01-01"},
            )

    def test_ask_handles_translation_error(self, client):
        """Test ask handles translation errors."""
        with patch("src.main.nl2sql_engine.translate", new_callable=AsyncMock) as mock_translate:
            mock_translate.side_effect = RuntimeError("Translation failed")

            response = client.post(
                "/api/v1/ask",
                json={"question": "How many events?"},
            )

            assert response.status_code == 500


class TestInsightsEndpoint:
    """Tests for /api/v1/insights endpoint."""

    def test_insights_requires_metric(self, client):
        """Test that metric is required."""
        response = client.post("/api/v1/insights", json={})

        assert response.status_code == 422

    def test_insights_with_valid_metric(self, client):
        """Test insights with valid metric."""
        response = client.post(
            "/api/v1/insights",
            json={"metric": "dau"},
        )

        assert response.status_code == 200
        data = response.json()
        assert data["metric"] == "dau"
        assert "summary" in data
        assert "trend" in data
        assert "anomalies" in data
        assert "recommendations" in data

    def test_insights_with_time_range(self, client):
        """Test insights with custom time range."""
        response = client.post(
            "/api/v1/insights",
            json={
                "metric": "events",
                "time_range": "30d",
                "dimensions": ["device_type"],
            },
        )

        assert response.status_code == 200
        data = response.json()
        assert "30d" in data["summary"]
