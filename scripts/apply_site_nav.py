"""Replace mobile + desktop nav on all site pages to match index.html (with Hub link)."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
INDEX = (ROOT / "index.html").read_text(encoding="utf-8")

start = INDEX.find('    <nav\n      class="md:hidden')
end = INDEX.find('    <main id="main-content"')
if start == -1 or end == -1:
    raise SystemExit("Could not extract nav from index.html")

NAV_ROOT = INDEX[start:end]

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


def nav_for(rel_path: str) -> str:
    """Build nav HTML with correct relative links for a page path."""
    parts = rel_path.replace("\\", "/").split("/")
    depth = len(parts) - 1
    prefix = "../" * depth if depth else ""

    if depth == 0 and parts[0] == "index.html":
        home = "#"
    else:
        home = f"{prefix}index.html"

    if depth >= 2 and parts[0] == "pages" and parts[1] == "podcast":
        podcast = "index.html"
    elif depth >= 2 and parts[0] == "pages":
        podcast = f"{prefix}pages/podcast/index.html"
    else:
        podcast = f"{prefix}pages/podcast/index.html"

    nav = NAV_ROOT
    nav = nav.replace('href="#"', f'href="{home}"', 2)
    replacements = [
        ('href="about.html"', f'href="{prefix}about.html"'),
        ('href="curated-stories.html"', f'href="{prefix}curated-stories.html"'),
        ('href="hub.html"', f'href="{prefix}hub.html"'),
        ('href="featured-entrepreneur.html"', f'href="{prefix}featured-entrepreneur.html"'),
        ('href="pages/podcast/index.html"', f'href="{podcast}"'),
    ]
    for old, new in replacements:
        nav = nav.replace(old, new)
    return nav


def should_process(path: Path) -> bool:
    if path.name.startswith("_"):
        return False
    rel = path.relative_to(ROOT)
    if any(part in SKIP_DIRS for part in rel.parts):
        return False
    return path.suffix == ".html"


def apply(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    if 'id="mobile-nav"' not in text or 'id="sidebar"' not in text:
        return

    rel = str(path.relative_to(ROOT)).replace("\\", "/")
    nav = nav_for(rel)

    m_start = text.find('    <nav\n      class="md:hidden')
    if m_start == -1:
        m_start = text.find('    <nav\n      class="md:hidden fixed')
    m_end = text.find('    <main id="main-content"')
    if m_start == -1 or m_end == -1:
        print(f"skip (markers): {rel}")
        return

    text = text[:m_start] + nav + text[m_end:]
    path.write_text(text, encoding="utf-8")
    print(f"updated {rel}")


def main() -> None:
    for path in sorted(ROOT.rglob("*.html")):
        if should_process(path):
            apply(path)

    # Regenerate blog nav shell from blog index for ../../ prefix
    blog_index = ROOT / "pages/blog/index.html"
    if blog_index.exists():
        text = blog_index.read_text(encoding="utf-8")
        s = text.find('    <nav\n      class="md:hidden')
        e = text.find('    <main id="main-content"')
        if s != -1 and e != -1:
            (ROOT / "pages/blog/_nav-shell.html").write_text(text[s:e], encoding="utf-8")
            print("regenerated pages/blog/_nav-shell.html")


if __name__ == "__main__":
    main()
