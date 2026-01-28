# Build stage
FROM python:3.11-slim AS builder

WORKDIR /app

# Install build dependencies
RUN pip install --no-cache-dir hatchling

# Copy project files
COPY pyproject.toml ./
COPY src ./src

# Build wheel
RUN pip wheel --no-deps --wheel-dir /app/wheels .

# Runtime stage
FROM python:3.11-slim

WORKDIR /app

# Install runtime dependencies
COPY --from=builder /app/wheels /app/wheels
RUN pip install --no-cache-dir /app/wheels/*.whl && rm -rf /app/wheels

# Copy source code
COPY src ./src

# Create non-root user
RUN useradd -m -r appuser
USER appuser

# Expose port
EXPOSE 8001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD python -c "import httpx; httpx.get('http://localhost:8001/health').raise_for_status()"

# Run server
CMD ["python", "-m", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8001"]
