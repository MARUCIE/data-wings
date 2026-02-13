#!/usr/bin/env python3
"""Supply chain gate for CI.

This script enforces:
- pnpm audit: no high/critical advisories except allowlisted ones.
- lockfile hosts: must be in allowlist.
- pip-audit: no vulnerabilities (or extend with allowlist later).

Design goal: deterministic, machine-checkable gate.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any
from urllib.parse import urlparse
import re


def load_json(path: Path) -> Any:
    return json.loads(path.read_text())


def die(msg: str, code: int = 1) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    raise SystemExit(code)


def extract_candidate_urls_from_lockfile(text: str) -> list[str]:
    # Only consider download/source URLs (ignore homepage/deprecation links).
    urls: list[str] = []
    for line in text.splitlines():
        if 'tarball:' in line or 'resolved:' in line:
            urls.extend(re.findall(r"https?://[^\s\"']+", line))
    return urls


def check_lockfile_hosts(lockfiles: list[Path], allowed_hosts: set[str]) -> list[str]:
    bad: set[str] = set()
    for lf in lockfiles:
        if not lf.exists():
            continue
        urls = extract_candidate_urls_from_lockfile(lf.read_text(errors="ignore"))
        for u in urls:
            host = urlparse(u).hostname
            if not host:
                continue
            if host not in allowed_hosts:
                bad.add(f"{lf}:{host}")
    return sorted(bad)


def pnpm_high_critical_advisories(pnpm_audit: dict[str, Any]) -> dict[str, dict[str, Any]]:
    advisories = pnpm_audit.get("advisories")
    if not isinstance(advisories, dict):
        return {}
    out: dict[str, dict[str, Any]] = {}
    for adv_id, adv in advisories.items():
        if not isinstance(adv, dict):
            continue
        sev = adv.get("severity")
        if sev in ("high", "critical"):
            out[str(adv_id)] = adv
    return out


def pip_audit_vuln_count(pip_audit: Any) -> int:
    # `pip-audit -f json` returns {"dependencies": [...]} (default) in our run.
    if isinstance(pip_audit, dict) and isinstance(pip_audit.get("dependencies"), list):
        total = 0
        for dep in pip_audit["dependencies"]:
            if isinstance(dep, dict) and isinstance(dep.get("vulns"), list):
                total += len(dep["vulns"])
        return total

    # Older `pip-audit` may return a list.
    if isinstance(pip_audit, list):
        total = 0
        for dep in pip_audit:
            if isinstance(dep, dict) and isinstance(dep.get("vulns"), list):
                total += len(dep["vulns"])
        return total

    return 0


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--pnpm", required=True, help="Path to pnpm audit JSON output")
    ap.add_argument("--pip", required=True, help="Path to pip-audit JSON output")
    ap.add_argument("--allowlist", required=True, help="Path to supply chain allowlist JSON")
    ap.add_argument(
        "--lockfiles",
        nargs="*",
        default=["pnpm-lock.yaml", "apps/web/pnpm-lock.yaml"],
        help="Lockfiles to scan for allowed hosts",
    )

    args = ap.parse_args()

    allow = load_json(Path(args.allowlist))
    allowed_hosts = set(allow.get("allowed_lockfile_hosts", []))
    allowed_pnpm = allow.get("allowed_pnpm_advisories_high_or_critical", {})
    if not isinstance(allowed_pnpm, dict):
        die("allowlist.allowed_pnpm_advisories_high_or_critical must be an object")

    pnpm_audit = load_json(Path(args.pnpm))
    pip_audit = load_json(Path(args.pip))

    bad_hosts = check_lockfile_hosts([Path(p) for p in args.lockfiles], allowed_hosts)
    if bad_hosts:
        die("lockfile host(s) not allowed: " + ", ".join(bad_hosts))

    hi = pnpm_high_critical_advisories(pnpm_audit if isinstance(pnpm_audit, dict) else {})
    disallowed = []
    for adv_id, adv in hi.items():
        if adv_id not in allowed_pnpm:
            disallowed.append(
                {
                    "id": adv_id,
                    "severity": adv.get("severity"),
                    "module": adv.get("module_name"),
                    "ghsa": adv.get("github_advisory_id"),
                    "patched": adv.get("patched_versions"),
                    "url": adv.get("url"),
                }
            )

    pip_vulns = pip_audit_vuln_count(pip_audit)
    if pip_vulns:
        die(f"pip-audit vulnerabilities found: {pip_vulns}")

    if disallowed:
        print("Disallowed high/critical pnpm advisories:")
        print(json.dumps(disallowed, indent=2))
        raise SystemExit(2)

    # Print a concise summary for CI logs.
    meta = pnpm_audit.get("metadata", {}) if isinstance(pnpm_audit, dict) else {}
    vuln_counts = meta.get("vulnerabilities") if isinstance(meta, dict) else None
    print("OK: supply chain gate passed")
    print("- pnpm vulnerabilities:", json.dumps(vuln_counts, ensure_ascii=False) if vuln_counts else "N/A")
    print("- pnpm high/critical advisories:", len(hi))
    print("- pip-audit vulnerabilities:", pip_vulns)


if __name__ == "__main__":
    main()
