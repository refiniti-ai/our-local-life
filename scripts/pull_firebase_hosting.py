"""Mirror live Firebase Hosting (our-local-life.web.app) into ./_firebase-live-sync/."""
from __future__ import annotations

import fnmatch
import json
import pathlib
import re
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "_firebase-live-sync"
BASE = "https://our-local-life.web.app"

SKIP_DIRS = {
    "_firebase-live",
    "_firebase-live-sync",
    "Home-Buyer-Team",
    "tanner-website",
    "turfflex",
    "our-local-life",
    ".git",
    "node_modules",
    "dist",
    "scripts",
    "docs",
}

REF_RE = re.compile(
    r"""(?:src|href)=["']([^"']+)["']""",
    re.IGNORECASE,
)

EXTRA_SEEDS = [
    "index.html",
    "about.html",
    "curated-stories.html",
    "featured-entrepreneur.html",
    "contact.html",
    "press-kit.html",
    "sitemap.xml",
    "assets/main-CJuVpVQo.js",
    "assets/main-DBjioDFf.css",
]


def load_ignore_patterns() -> list[str]:
    cfg = json.loads((ROOT / "firebase.json").read_text(encoding="utf-8"))
    return cfg.get("hosting", {}).get("ignore", [])


def ignored(rel_posix: str, patterns: list[str]) -> bool:
    if rel_posix.startswith(".") or "/." in f"/{rel_posix}":
        return True
    for pat in patterns:
        if fnmatch.fnmatch(rel_posix, pat) or fnmatch.fnmatch(rel_posix, pat.lstrip("./")):
            return True
    return False


def local_candidates(patterns: list[str]) -> list[str]:
    paths: list[str] = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        rel = path.relative_to(ROOT)
        if any(part in SKIP_DIRS for part in rel.parts):
            continue
        rel_posix = rel.as_posix()
        if ignored(rel_posix, patterns):
            continue
        paths.append(rel_posix)
    return sorted(set(paths))


def normalize_path(raw: str) -> str | None:
    raw = raw.strip()
    if not raw or raw.startswith(("#", "mailto:", "tel:", "javascript:")):
        return None
    if raw.startswith("http://") or raw.startswith("https://"):
        parsed = urllib.parse.urlparse(raw)
        if parsed.netloc and "our-local-life.web.app" not in parsed.netloc and "ourlocallife.com" not in parsed.netloc:
            return None
        raw = parsed.path or ""
    raw = raw.split("?")[0].split("#")[0].lstrip("/")
    if not raw:
        return "index.html"
    return raw


def extract_refs(text: str) -> set[str]:
    found: set[str] = set()
    for match in REF_RE.finditer(text):
        norm = normalize_path(match.group(1))
        if norm:
            found.add(norm)
    for match in re.finditer(r'url\((["\']?)(/assets/[^)\'"]+)\1\)', text):
        norm = normalize_path(match.group(2))
        if norm:
            found.add(norm)
    return found


def fetch(url: str) -> tuple[int, bytes, str]:
    req = urllib.request.Request(url, headers={"User-Agent": "oll-firebase-mirror/2.0"})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            ctype = resp.headers.get("Content-Type", "")
            return resp.status, resp.read(), ctype
    except urllib.error.HTTPError as e:
        return e.code, b"", ""


def save_file(rel: str, body: bytes) -> None:
    dest = OUT / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(body)


def main() -> None:
    patterns = load_ignore_patterns()
    queue: list[str] = []
    seen: set[str] = set()
    ok = skip = 0

    for seed in EXTRA_SEEDS + local_candidates(patterns):
        if seed not in seen:
            seen.add(seed)
            queue.append(seed)

    try:
        status, body, _ = fetch(f"{BASE}/sitemap.xml")
        if status == 200 and body:
            root = ET.fromstring(body)
            ns = {"sm": "https://www.sitemaps.org/schemas/sitemap/0.9"}
            for loc in root.findall(".//sm:loc", ns):
                if loc.text:
                    norm = normalize_path(loc.text)
                    if norm and norm not in seen:
                        seen.add(norm)
                        queue.append(norm)
    except ET.ParseError:
        pass

    while queue:
        rel = queue.pop(0)
        encoded = urllib.parse.quote(rel, safe="/")
        url = f"{BASE}/{encoded}"
        status, body, ctype = fetch(url)
        if status != 200 or not body:
            skip += 1
            continue

        save_file(rel, body)
        ok += 1
        print(f"OK  {rel}")

        if "html" in ctype or rel.endswith(".html") or rel.endswith(".js") or rel.endswith(".css"):
            try:
                text = body.decode("utf-8", errors="replace")
            except Exception:
                text = ""
            for ref in extract_refs(text):
                if ref not in seen:
                    seen.add(ref)
                    queue.append(ref)

    print(f"\nDone: {ok} downloaded, {skip} skipped")
    print(f"Output: {OUT}")
    print("Sync: robocopy _firebase-live-sync . /E /IS /IT")


if __name__ == "__main__":
    main()
