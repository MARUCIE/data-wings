"""
NL2SQL Engine - Natural Language to SQL Translation

Supports multiple LLM providers with automatic fallback:
1. Google Gemini (AI Studio) - Priority, $300 free credit
2. Poe API (OpenAI-compatible) - $50-100/month
3. DeepSeek (cost-effective)
4. Qwen (good Chinese support)
5. OpenAI (optional, highest quality)
"""

import json
from typing import Any

import httpx
import structlog

from .config import settings
from .schema import CLICKHOUSE_SCHEMA, BUSINESS_GLOSSARY

logger = structlog.get_logger()


class NL2SQLEngine:
    """
    Natural Language to SQL translation engine.

    Uses LLM to convert user questions into optimized ClickHouse SQL queries.
    """

    SYSTEM_PROMPT = """You are an expert SQL analyst for a data analytics platform.
Your task is to convert natural language questions into ClickHouse SQL queries.

## Database Schema
{schema}

## Business Glossary
{glossary}

## Rules
1. Use ClickHouse SQL syntax (not MySQL or PostgreSQL)
2. Always use appropriate date functions: toDate(), toStartOfDay(), toStartOfWeek()
3. For time ranges, use relative expressions: now() - INTERVAL 7 DAY
4. Always include appropriate WHERE clauses for performance
5. Use WITH for complex subqueries
6. Return JSON with keys: sql, explanation, confidence (0-1)

## Output Format
Return ONLY valid JSON:
{{"sql": "SELECT ...", "explanation": "This query...", "confidence": 0.95}}
"""

    def __init__(self) -> None:
        """Initialize the NL2SQL engine."""
        self.client = httpx.AsyncClient(timeout=60.0)
        self.provider = settings.llm_provider

    async def translate(
        self,
        question: str,
        context: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        """
        Translate natural language question to SQL.

        Args:
            question: The user's natural language question
            context: Optional context (e.g., selected time range, filters)

        Returns:
            Dictionary with sql, explanation, confidence, and optional data
        """
        logger.info("Translating question", question=question, provider=self.provider)

        system_prompt = self.SYSTEM_PROMPT.format(
            schema=CLICKHOUSE_SCHEMA,
            glossary=BUSINESS_GLOSSARY,
        )

        user_prompt = f"Question: {question}"
        if context:
            user_prompt += f"\nContext: {json.dumps(context)}"

        try:
            response = await self._call_llm(system_prompt, user_prompt)
            result = self._parse_response(response)
            logger.info(
                "Translation successful",
                question=question,
                confidence=result.get("confidence"),
            )
            return result
        except Exception as e:
            logger.exception("Translation failed", question=question)
            raise RuntimeError(f"NL2SQL translation failed: {e}") from e

    async def _call_llm(self, system_prompt: str, user_prompt: str) -> str:
        """Call the configured LLM provider."""
        if self.provider == "gemini":
            return await self._call_gemini(system_prompt, user_prompt)
        elif self.provider == "poe":
            return await self._call_poe(system_prompt, user_prompt)
        elif self.provider == "deepseek":
            return await self._call_deepseek(system_prompt, user_prompt)
        elif self.provider == "qwen":
            return await self._call_qwen(system_prompt, user_prompt)
        elif self.provider == "openai":
            return await self._call_openai(system_prompt, user_prompt)
        else:
            raise ValueError(f"Unknown LLM provider: {self.provider}")

    async def _call_gemini(self, system_prompt: str, user_prompt: str) -> str:
        """Call Google Gemini API (AI Studio)."""
        url = (
            f"{settings.gemini_base_url}/models/{settings.gemini_model}:generateContent"
            f"?key={settings.gemini_api_key}"
        )

        # Gemini uses a different request format
        response = await self.client.post(
            url,
            json={
                "contents": [
                    {
                        "role": "user",
                        "parts": [{"text": f"{system_prompt}\n\n{user_prompt}"}],
                    }
                ],
                "generationConfig": {
                    "temperature": 0.1,
                    "topP": 0.95,
                    "topK": 40,
                    "maxOutputTokens": 2048,
                    "responseMimeType": "application/json",
                },
            },
        )
        response.raise_for_status()
        data = response.json()

        # Extract text from Gemini response
        candidates = data.get("candidates", [])
        if not candidates:
            raise ValueError("No candidates in Gemini response")

        content = candidates[0].get("content", {})
        parts = content.get("parts", [])
        if not parts:
            raise ValueError("No parts in Gemini response")

        return parts[0].get("text", "")

    async def _call_poe(self, system_prompt: str, user_prompt: str) -> str:
        """Call Poe API (OpenAI-compatible)."""
        response = await self.client.post(
            f"{settings.poe_base_url}/chat/completions",
            headers={"Authorization": f"Bearer {settings.poe_api_key}"},
            json={
                "model": settings.poe_model,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                "temperature": 0.1,
            },
        )
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]

    async def _call_deepseek(self, system_prompt: str, user_prompt: str) -> str:
        """Call DeepSeek API."""
        response = await self.client.post(
            f"{settings.deepseek_base_url}/chat/completions",
            headers={"Authorization": f"Bearer {settings.deepseek_api_key}"},
            json={
                "model": settings.deepseek_model,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                "temperature": 0.1,
                "response_format": {"type": "json_object"},
            },
        )
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]

    async def _call_qwen(self, system_prompt: str, user_prompt: str) -> str:
        """Call Qwen API (via DashScope compatible mode)."""
        response = await self.client.post(
            f"{settings.qwen_base_url}/chat/completions",
            headers={"Authorization": f"Bearer {settings.qwen_api_key}"},
            json={
                "model": settings.qwen_model,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                "temperature": 0.1,
            },
        )
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]

    async def _call_openai(self, system_prompt: str, user_prompt: str) -> str:
        """Call OpenAI API."""
        response = await self.client.post(
            f"{settings.openai_base_url}/chat/completions",
            headers={"Authorization": f"Bearer {settings.openai_api_key}"},
            json={
                "model": settings.openai_model,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                "temperature": 0.1,
                "response_format": {"type": "json_object"},
            },
        )
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]

    def _parse_response(self, response: str) -> dict[str, Any]:
        """Parse LLM response into structured result."""
        try:
            # Try to parse as JSON directly
            result = json.loads(response)
        except json.JSONDecodeError:
            # Try to extract JSON from markdown code block
            import re

            json_match = re.search(r"```(?:json)?\s*(.*?)\s*```", response, re.DOTALL)
            if json_match:
                result = json.loads(json_match.group(1))
            else:
                # Try to find JSON object in response
                json_match = re.search(r"\{.*\}", response, re.DOTALL)
                if json_match:
                    result = json.loads(json_match.group(0))
                else:
                    raise ValueError(f"Could not parse LLM response as JSON: {response}")

        # Validate required fields
        if "sql" not in result:
            raise ValueError("LLM response missing 'sql' field")

        return {
            "sql": result["sql"],
            "explanation": result.get("explanation", ""),
            "confidence": float(result.get("confidence", 0.5)),
        }

    async def close(self) -> None:
        """Close the HTTP client."""
        await self.client.aclose()
