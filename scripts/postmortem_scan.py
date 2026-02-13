#!/usr/bin/env python3
"""Scan git changes against postmortem triggers.

Conventions:
- Postmortems live under `postmortem/PM-*.md`.
- Each PM contains a JSON code fence with {"status": "fixed|open", "triggers": [...]}
- Trigger types:
  - path: substring match on changed file paths
  - keyword: substring match in diff text
  - regex: regex search in diff text

Exit codes:
- 0: OK (no open PM triggered)
- 2: BLOCK (open PM triggered)
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass
class Trigger:
    type: str
    pattern: str


@dataclass
class Postmortem:
    path: Path
    status: str
    triggers: list[Trigger]


def run(cmd: list[str]) -> str:
    return subprocess.check_output(cmd, text=True)


def load_postmortems(root: Path) -> list[Postmortem]:
    pms: list[Postmortem] = []
    for pm_path in sorted(root.glob('PM-*.md')):
        text = pm_path.read_text(errors='ignore')

        # Find the first ```json code block that contains "triggers".
        m = re.search(r"```json\s*(\{[\s\S]*?\})\s*```", text)
        if not m:
            continue
        try:
            obj = json.loads(m.group(1))
        except Exception:
            continue

        status = str(obj.get('status', 'open'))
        triggers_raw = obj.get('triggers', [])
        triggers: list[Trigger] = []
        if isinstance(triggers_raw, list):
            for t in triggers_raw:
                if isinstance(t, dict) and 'type' in t and 'pattern' in t:
                    triggers.append(Trigger(type=str(t['type']), pattern=str(t['pattern'])))

        pms.append(Postmortem(path=pm_path, status=status, triggers=triggers))

    return pms


def diff_payload(base: str | None, head: str | None) -> tuple[list[str], str]:
    if base and head:
        changed = run(['git', 'diff', '--name-only', f'{base}', f'{head}']).splitlines()
        patch = run(['git', 'diff', f'{base}', f'{head}'])
        return changed, patch

    changed = run(['git', 'diff', '--name-only']).splitlines()
    patch = run(['git', 'diff'])
    return changed, patch


def match(pm: Postmortem, changed_files: list[str], patch: str) -> list[dict[str, Any]]:
    hits: list[dict[str, Any]] = []
    for trig in pm.triggers:
        if trig.type == 'path':
            if any(trig.pattern in p for p in changed_files):
                hits.append({'type': trig.type, 'pattern': trig.pattern, 'match': 'changed_files'})
        elif trig.type == 'keyword':
            if trig.pattern in patch:
                hits.append({'type': trig.type, 'pattern': trig.pattern, 'match': 'diff'})
        elif trig.type == 'regex':
            try:
                if re.search(trig.pattern, patch):
                    hits.append({'type': trig.type, 'pattern': trig.pattern, 'match': 'diff'})
            except re.error:
                # Invalid regex should be treated as a PM authoring error.
                hits.append({'type': 'regex_invalid', 'pattern': trig.pattern, 'match': 'pm'})
    return hits


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument('--base', default=None)
    ap.add_argument('--head', default=None)
    ap.add_argument('--out', default=None)
    args = ap.parse_args()

    pms = load_postmortems(Path('postmortem'))
    changed_files, patch = diff_payload(args.base, args.head)

    report: dict[str, Any] = {
        'base': args.base,
        'head': args.head,
        'changed_files_count': len(changed_files),
        'postmortems': [],
        'blocked': False,
    }

    blocked = False
    for pm in pms:
        hits = match(pm, changed_files, patch)
        if not hits:
            continue
        entry = {
            'pm': str(pm.path),
            'status': pm.status,
            'hits': hits,
        }
        report['postmortems'].append(entry)
        if pm.status != 'fixed':
            blocked = True

    report['blocked'] = blocked

    if args.out:
        Path(args.out).write_text(json.dumps(report, indent=2))

    if blocked:
        print('BLOCK: open postmortem trigger hit')
        print(json.dumps(report, indent=2))
        raise SystemExit(2)

    print('OK: postmortem scan passed')
    if report['postmortems']:
        print('Triggered fixed PMs:', len(report['postmortems']))


if __name__ == '__main__':
    main()
