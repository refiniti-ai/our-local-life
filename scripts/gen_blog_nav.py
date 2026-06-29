from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
L = (ROOT / "curated-stories.html").read_text(encoding="utf-8").splitlines()
block = "\n".join(L[87:471])
block = block.replace('href="pages/podcast/index.html"', 'href="../podcast/index.html"')
for a, b in [
    ('href="index.html"', 'href="../../index.html"'),
    ('href="about.html"', 'href="../../about.html"'),
    ('href="curated-stories.html"', 'href="../../curated-stories.html"'),
    ('href="featured-entrepreneur.html"', 'href="../../featured-entrepreneur.html"'),
]:
    block = block.replace(a, b)
(ROOT / "pages" / "blog" / "_nav-shell.html").write_text(block + "\n", encoding="utf-8")
print("OK", len(block))
