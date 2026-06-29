"""DEV-ONLY: swap Vite build refs back to source assets/js + assets/css.

Do NOT run after sync_from_firebase — live uses /assets/main-*.js and /assets/main-*.css.
"""
from __future__ import annotations

import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SKIP_DIRS = {"_firebase-live", "Home-Buyer-Team", "tanner-website", "turfflex", "our-local-life", "node_modules", "dist"}

VITE_HEAD = re.compile(
    r'\s*<script type="module" crossorigin src="/assets/main-[^"]+\.js"></script>\s*\n'
    r'\s*<link rel="stylesheet" crossorigin href="/assets/main-[^"]+\.css">\s*\n',
    re.MULTILINE,
)


def asset_prefix(rel: pathlib.Path) -> str:
    depth = len(rel.parts) - 1
    return ("../" * depth) if depth else ""


def fix_file(path: pathlib.Path) -> bool:
    text = path.read_text(encoding="utf-8")
    original = text
    rel = path.relative_to(ROOT)
    prefix = asset_prefix(rel)

    if VITE_HEAD.search(text):
        text = VITE_HEAD.sub(
            f'    <link rel="stylesheet" href="{prefix}assets/css/styles.css" />\n',
            text,
            count=1,
        )
    elif f'href="{prefix}assets/css/styles.css"' not in text:
        text = text.replace(
            "</head>",
            f'    <link rel="stylesheet" href="{prefix}assets/css/styles.css" />\n  </head>',
            1,
        )

    script = f'<script type="module" src="{prefix}assets/js/main.js"></script>'
    if script not in text:
        text = text.replace("</body>", f"    {script}\n  </body>", 1)

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    changed = 0
    for path in ROOT.rglob("*.html"):
        if any(part in SKIP_DIRS for part in path.relative_to(ROOT).parts):
            continue
        if fix_file(path):
            changed += 1
            print(f"fixed {path.relative_to(ROOT).as_posix()}")
    print(f"\n{changed} file(s) updated")


if __name__ == "__main__":
    main()
