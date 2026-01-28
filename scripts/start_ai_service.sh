#!/bin/bash
cd /Users/mauricewen/Projects/09-data-wings/services/ai
source .venv/bin/activate
exec python3 -m uvicorn src.main:app --host 0.0.0.0 --port 8000
