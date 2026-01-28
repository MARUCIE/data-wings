# Data Wings AI Service

AI-powered analytics service providing NL2SQL and automated insights.

## Features

- **NL2SQL Engine**: Convert natural language queries to SQL
- **Multi-LLM Support**: Gemini, OpenAI, DeepSeek, Qwen
- **ClickHouse Integration**: Optimized for analytics workloads
- **Real-time Processing**: Streaming responses for better UX

## Quick Start

```bash
# Install dependencies
pip install -e ".[dev]"

# Run development server
uvicorn src.main:app --reload --port 8001

# Run tests
pytest
```

## API Endpoints

- `POST /api/ask` - Natural language query
- `GET /health` - Health check

## Configuration

Set environment variables:
- `GEMINI_API_KEY` - Google Gemini API key
- `OPENAI_API_KEY` - OpenAI API key (optional)
- `CLICKHOUSE_HOST` - ClickHouse server host
- `CLICKHOUSE_PORT` - ClickHouse server port (default: 8123)

## License

MIT
