"""
Data Wings AI Service - NL2SQL and Automated Insights

This service provides:
- Natural Language to SQL translation (NL2SQL)
- Automated insights generation
- Anomaly detection
- Query optimization suggestions
"""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

import structlog
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .config import settings
from .nl2sql import NL2SQLEngine

logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan handler."""
    logger.info("Starting Data Wings AI Service", version="0.1.0")
    yield
    logger.info("Shutting down Data Wings AI Service")


app = FastAPI(
    title="Data Wings AI Service",
    description="NL2SQL and automated insights for analytics",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize NL2SQL engine
nl2sql_engine = NL2SQLEngine()


class AskRequest(BaseModel):
    """Natural language query request."""

    question: str
    context: dict | None = None


class AskResponse(BaseModel):
    """NL2SQL response with generated SQL and results."""

    question: str
    sql: str
    explanation: str
    confidence: float
    data: list[dict] | None = None
    error: str | None = None


class InsightRequest(BaseModel):
    """Request for automated insights."""

    metric: str
    time_range: str = "7d"
    dimensions: list[str] | None = None


class InsightResponse(BaseModel):
    """Automated insight response."""

    metric: str
    summary: str
    trend: str
    anomalies: list[dict]
    recommendations: list[str]


@app.get("/health")
async def health_check() -> dict:
    """Health check endpoint."""
    return {
        "status": "ok",
        "service": "data-wings-ai",
        "version": "0.1.0",
    }


@app.post("/api/v1/ask", response_model=AskResponse)
async def ask_question(request: AskRequest) -> AskResponse:
    """
    Convert natural language question to SQL and execute.

    This is the core NL2SQL endpoint that:
    1. Parses the natural language question
    2. Generates optimized ClickHouse SQL
    3. Optionally executes the query
    4. Returns results with explanation
    """
    try:
        result = await nl2sql_engine.translate(
            question=request.question,
            context=request.context,
        )
        return AskResponse(
            question=request.question,
            sql=result["sql"],
            explanation=result["explanation"],
            confidence=result["confidence"],
            data=result.get("data"),
        )
    except Exception as e:
        logger.exception("NL2SQL translation failed", question=request.question)
        raise HTTPException(status_code=500, detail=str(e)) from e


@app.post("/api/v1/insights", response_model=InsightResponse)
async def generate_insights(request: InsightRequest) -> InsightResponse:
    """
    Generate automated insights for a metric.

    Analyzes trends, detects anomalies, and provides recommendations.
    """
    # TODO: Implement automated insights engine
    return InsightResponse(
        metric=request.metric,
        summary=f"Analysis for {request.metric} over {request.time_range}",
        trend="stable",
        anomalies=[],
        recommendations=["Implement automated insights engine"],
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001)
