#!/usr/bin/env python3
"""Replay real API fixtures and optionally record request/response evidence."""

from __future__ import annotations

import argparse
import copy
import datetime as dt
import json
import random
import re
import string
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any


def _now_iso() -> str:
    return dt.datetime.now(dt.timezone.utc).isoformat()


def _rand_suffix(n: int = 8) -> str:
    alphabet = string.ascii_lowercase + string.digits
    return "".join(random.choice(alphabet) for _ in range(n))


def _json_get(data: Any, path: str) -> Any:
    current = data
    for part in path.split("."):
        if isinstance(current, dict) and part in current:
            current = current[part]
            continue
        return None
    return current


def _redact(obj: Any) -> Any:
    if isinstance(obj, dict):
        masked: dict[str, Any] = {}
        for k, v in obj.items():
            if k.lower() in {"token", "authorization", "access_token", "refresh_token"}:
                masked[k] = "<redacted>"
            else:
                masked[k] = _redact(v)
        return masked
    if isinstance(obj, list):
        return [_redact(i) for i in obj]
    return obj


_placeholder_re = re.compile(r"\{\{([A-Z0-9_]+)\}\}")


def _replace_placeholders(value: Any, variables: dict[str, Any]) -> Any:
    if isinstance(value, str):
        m = _placeholder_re.fullmatch(value)
        if m:
            key = m.group(1)
            return variables.get(key, value)

        def repl(match: re.Match[str]) -> str:
            key = match.group(1)
            v = variables.get(key)
            return str(v) if v is not None else match.group(0)

        return _placeholder_re.sub(repl, value)
    if isinstance(value, dict):
        return {k: _replace_placeholders(v, variables) for k, v in value.items()}
    if isinstance(value, list):
        return [_replace_placeholders(v, variables) for v in value]
    return value


def _request_json(
    method: str,
    url: str,
    headers: dict[str, str],
    body: Any | None,
    timeout: float,
) -> tuple[int, dict[str, str], str, Any | None]:
    body_bytes = None
    if body is not None:
        body_bytes = json.dumps(body, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(url=url, method=method, headers=headers, data=body_bytes)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read().decode("utf-8", errors="replace")
            try:
                parsed = json.loads(raw)
            except json.JSONDecodeError:
                parsed = None
            return resp.status, dict(resp.headers.items()), raw, parsed
    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8", errors="replace")
        try:
            parsed = json.loads(raw)
        except json.JSONDecodeError:
            parsed = None
        return e.code, dict(e.headers.items()), raw, parsed


def run() -> int:
    parser = argparse.ArgumentParser(description="Replay real API fixture.")
    parser.add_argument(
        "--fixture",
        default="fixtures/replay/real_api/core_path.fixture.json",
        help="fixture json path",
    )
    parser.add_argument("--base-url", default="http://localhost:4009", help="API base URL")
    parser.add_argument("--email", default="", help="email for signup/login")
    parser.add_argument("--password", default="datawings123", help="password for signup/login")
    parser.add_argument("--anon-id", default="", help="anonymous id for tracking")
    parser.add_argument(
        "--capture-output",
        default="",
        help="write full request/response capture json",
    )
    parser.add_argument(
        "--report-output",
        default="",
        help="write markdown report",
    )
    parser.add_argument("--timeout", type=float, default=20.0, help="HTTP timeout seconds")
    args = parser.parse_args()

    fixture_path = Path(args.fixture)
    fixture = json.loads(fixture_path.read_text(encoding="utf-8"))
    steps: list[dict[str, Any]] = fixture.get("steps", [])

    ts = int(dt.datetime.now(dt.timezone.utc).timestamp())
    variables: dict[str, Any] = copy.deepcopy(fixture.get("variables", {}))
    variables["EMAIL"] = args.email or f"replay-admin-{ts}-{_rand_suffix(4)}@datawings.local"
    variables["PASSWORD"] = args.password
    variables["ANON_ID"] = args.anon_id or f"anon-{ts}-{_rand_suffix(6)}"

    default_headers: dict[str, str] = fixture.get("default_headers", {})

    capture: dict[str, Any] = {
        "name": fixture.get("name", "fixture"),
        "fixture": str(fixture_path),
        "base_url": args.base_url.rstrip("/"),
        "generated_at": _now_iso(),
        "variables": {
            "EMAIL": variables["EMAIL"],
            "PASSWORD": "<redacted>",
            "ANON_ID": variables["ANON_ID"],
        },
        "steps": [],
    }

    failures = 0
    for idx, step in enumerate(steps, 1):
        name = step["name"]
        method = step.get("method", "GET").upper()
        path = step["path"]
        url = f"{args.base_url.rstrip('/')}{path}"
        headers = dict(default_headers)
        headers.update(step.get("headers", {}))
        if step.get("auth") == "bearer" and variables.get("TOKEN"):
            headers["Authorization"] = f"Bearer {variables['TOKEN']}"

        body = _replace_placeholders(step.get("body"), variables)
        expect_status = step.get("expect_status", [200])

        status, response_headers, raw, response_json = _request_json(
            method=method,
            url=url,
            headers=headers,
            body=body,
            timeout=args.timeout,
        )

        ok = status in expect_status
        if not ok:
            failures += 1

        extract = step.get("extract", {})
        for var_name, path_expr in extract.items():
            if response_json is None:
                continue
            value = _json_get(response_json, path_expr)
            if value is not None:
                variables[var_name] = value

        capture["steps"].append(
            {
                "index": idx,
                "name": name,
                "request": {
                    "method": method,
                    "url": url,
                    "headers": _redact(headers),
                    "body": body,
                },
                "response": {
                    "status": status,
                    "headers": response_headers,
                    "json": _redact(response_json) if response_json is not None else None,
                    "raw": raw if response_json is None else None,
                },
                "expect_status": expect_status,
                "ok": ok,
            }
        )

    capture["summary"] = {
        "total_steps": len(steps),
        "failures": failures,
        "success": failures == 0,
        "finished_at": _now_iso(),
    }

    if args.capture_output:
        out = Path(args.capture_output)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps(capture, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    if args.report_output:
        out = Path(args.report_output)
        out.parent.mkdir(parents=True, exist_ok=True)
        lines = [
            "# Real API Replay Report",
            "",
            f"- fixture: `{fixture_path}`",
            f"- base_url: `{args.base_url}`",
            f"- generated_at: `{capture['generated_at']}`",
            f"- success: `{capture['summary']['success']}`",
            f"- failures: `{capture['summary']['failures']}`",
            "",
            "| # | step | status | expected | ok |",
            "|---|------|--------|----------|----|",
        ]
        for s in capture["steps"]:
            lines.append(
                f"| {s['index']} | {s['name']} | {s['response']['status']} | {s['expect_status']} | {'yes' if s['ok'] else 'no'} |"
            )
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(
        json.dumps(
            {
                "success": failures == 0,
                "failures": failures,
                "capture_output": args.capture_output or None,
                "report_output": args.report_output or None,
                "email": variables["EMAIL"],
            },
            ensure_ascii=False,
        )
    )
    return 0 if failures == 0 else 1


if __name__ == "__main__":
    sys.exit(run())
