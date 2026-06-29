"""Inject early theme-restore script into all site HTML pages."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MARKER = 'data-oll-theme-init="true"'
SNIPPET = f"""    <script {MARKER}>
      (function () {{
        try {{
          if (localStorage.getItem("oll-theme") === "dark") {{
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
          }}
        }} catch (e) {{}}
      }})();
    </script>
"""

SKIP_DIRS = {
    "_firebase-live",
    "_firebase-live-sync",
    "our-local-life",
    "turfflex",
    "tanner-website",
    "dist",
    "node_modules",
    "docs",
}


def should_process(path: Path) -> bool:
    if path.name.startswith("_"):
        return False
    rel = path.relative_to(ROOT)
    if any(part in SKIP_DIRS for part in rel.parts):
        return False
    return path.suffix == ".html"


def apply(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    if MARKER in text:
        return False
    if "theme-toggle-input" not in text and "main-CJuVpVQo.js" not in text:
        return False

    anchor = '  <head>\n'
    if anchor not in text:
        return False

    updated = text.replace(anchor, anchor + SNIPPET, 1)
    path.write_text(updated, encoding="utf-8", newline="\n")
    return True


def main() -> None:
    changed = 0
    for path in sorted(ROOT.rglob("*.html")):
        if not should_process(path):
            continue
        if apply(path):
            changed += 1
            print(path.relative_to(ROOT))
    print(f"Updated {changed} HTML files with theme head script.")


if __name__ == "__main__":
    main()
