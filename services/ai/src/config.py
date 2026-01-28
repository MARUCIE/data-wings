"""Configuration for the AI service."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # LLM Configuration
    llm_provider: str = "deepseek"  # deepseek, qwen, openai
    deepseek_api_key: str = ""
    deepseek_base_url: str = "https://api.deepseek.com/v1"
    qwen_api_key: str = ""
    qwen_base_url: str = "https://dashscope.aliyuncs.com/compatible-mode/v1"
    openai_api_key: str = ""
    openai_base_url: str = "https://api.openai.com/v1"

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


settings = Settings()
