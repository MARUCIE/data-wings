#!/usr/bin/env python3
"""
Quick test script to verify LLM API integration.

Usage:
    python scripts/test_llm_api.py [provider]

Providers: gemini, poe, deepseek, qwen, openai
Default: gemini
"""

import asyncio
import json
import os
import sys
from pathlib import Path

import httpx
from dotenv import load_dotenv

# Load environment variables
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)


async def test_gemini():
    """Test Google Gemini API."""
    api_key = os.getenv("DW_GEMINI_API_KEY")
    model = os.getenv("DW_GEMINI_MODEL", "gemini-1.5-flash")

    if not api_key:
        print("ERROR: DW_GEMINI_API_KEY not set")
        return False

    print(f"Testing Gemini API (model: {model})...")

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(
            url,
            json={
                "contents": [
                    {
                        "role": "user",
                        "parts": [{"text": "Say 'Hello, Data Wings!' in JSON format: {\"message\": \"...\"}"}],
                    }
                ],
                "generationConfig": {
                    "temperature": 0.1,
                    "maxOutputTokens": 256,
                    "responseMimeType": "application/json",
                },
            },
        )

        if response.status_code != 200:
            print(f"ERROR: {response.status_code}")
            print(response.text)
            return False

        data = response.json()
        text = data["candidates"][0]["content"]["parts"][0]["text"]
        print(f"Response: {text}")
        return True


async def test_poe():
    """Test Poe API (OpenAI-compatible)."""
    api_key = os.getenv("DW_POE_API_KEY")
    model = os.getenv("DW_POE_MODEL", "GPT-4o")

    if not api_key:
        print("ERROR: DW_POE_API_KEY not set")
        return False

    print(f"Testing Poe API (model: {model})...")

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(
            "https://api.poe.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {api_key}"},
            json={
                "model": model,
                "messages": [
                    {"role": "user", "content": "Say 'Hello, Data Wings!' briefly."}
                ],
                "temperature": 0.1,
                "max_tokens": 100,
            },
        )

        if response.status_code != 200:
            print(f"ERROR: {response.status_code}")
            print(response.text)
            return False

        data = response.json()
        text = data["choices"][0]["message"]["content"]
        print(f"Response: {text}")
        return True


async def test_nl2sql():
    """Test NL2SQL translation with real API."""
    # Add parent directory to path
    sys.path.insert(0, str(Path(__file__).parent.parent / "services" / "ai"))

    from src.config import settings
    from src.nl2sql import NL2SQLEngine

    print(f"\nTesting NL2SQL (provider: {settings.llm_provider})...")

    engine = NL2SQLEngine()
    try:
        result = await engine.translate("How many events happened yesterday?")
        print(f"SQL: {result['sql']}")
        print(f"Explanation: {result['explanation']}")
        print(f"Confidence: {result['confidence']}")
        return True
    except Exception as e:
        print(f"ERROR: {e}")
        return False
    finally:
        await engine.close()


async def main():
    provider = sys.argv[1] if len(sys.argv) > 1 else "gemini"

    print("=" * 60)
    print("Data Wings - LLM API Test")
    print("=" * 60)

    # Test specific provider
    if provider == "gemini":
        success = await test_gemini()
    elif provider == "poe":
        success = await test_poe()
    else:
        print(f"Unknown provider: {provider}")
        print("Available: gemini, poe")
        sys.exit(1)

    if success:
        print("\n" + "=" * 60)
        # Test NL2SQL integration
        await test_nl2sql()

    print("\n" + "=" * 60)
    print("Test completed!")


if __name__ == "__main__":
    asyncio.run(main())
