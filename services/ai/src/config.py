"""Configuration for the AI service."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # LLM Configuration
    # Priority: gemini > poe > deepseek > qwen > openai
    llm_provider: str = "gemini"  # gemini, poe, deepseek, qwen, openai

    # Google Gemini (AI Studio) - Priority 1: $300 free credit
    gemini_api_key: str = ""
    gemini_base_url: str = "https://generativelanguage.googleapis.com/v1beta"
    gemini_model: str = "gemini-2.0-flash"  # gemini-2.5-flash, gemini-2.0-flash, gemini-2.5-pro

    # Poe API (OpenAI-compatible) - Priority 2: $50-100/month
    poe_api_key: str = ""
    poe_base_url: str = "https://api.poe.com/v1"
    poe_model: str = "GPT-4o"  # GPT-4o, Claude-3.5-Sonnet, etc.

    # DeepSeek - Priority 3
    deepseek_api_key: str = ""
    deepseek_base_url: str = "https://api.deepseek.com/v1"
    deepseek_model: str = "deepseek-chat"

    # Qwen (DashScope) - Priority 4
    qwen_api_key: str = ""
    qwen_base_url: str = "https://dashscope.aliyuncs.com/compatible-mode/v1"
    qwen_model: str = "qwen-plus"

    # OpenAI - Priority 5 (optional)
    openai_api_key: str = ""
    openai_base_url: str = "https://api.openai.com/v1"
    openai_model: str = "gpt-4-turbo-preview"

    # Database Configuration
    clickhouse_host: str = "localhost"
    clickhouse_port: int = 8123
    clickhouse_user: str = "default"
    clickhouse_password: str = ""
    clickhouse_database: str = "data_wings"

    # Redis Configuration
    redis_url: str = "redis://localhost:6379/0"

    # CORS Configuration
    cors_origins: list[str] = ["http://localhost:3000"]

    # Service Configuration
    debug: bool = False
    log_level: str = "INFO"

    class Config:
        """Pydantic settings configuration."""

        env_prefix = "DW_"
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"  # Allow extra fields in .env


settings = Settings()
