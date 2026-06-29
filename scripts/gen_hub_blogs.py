"""Generate hub blog HTML pages from PDF content."""
from __future__ import annotations

import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "pages" / "hub"
DATA = json.loads((ROOT / "assets" / "data" / "hub-blogs.json").read_text(encoding="utf-8"))
NAV = (OUT / "_nav-shell.html").read_text(encoding="utf-8")
SUBSCRIBE_MODAL = """
    <div
      id="subscribe-modal"
      class="modal hidden-modal fixed inset-0 z-[60] flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onclick="toggleSubscribe()"
      ></div>
      <div
        class="relative bg-white dark:bg-oll-dark p-12 max-w-lg w-full text-center shadow-2xl border border-oll-sand text-oll-dark dark:text-white"
      >
        <button
          onclick="toggleSubscribe()"
          class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h3 class="font-serif text-3xl mb-2">Join Our Community</h3>
        <p class="text-sm opacity-60 mb-8">
          Receive our weekly curation of slow living, culinary arts, and local stories.
        </p>
        <form class="space-y-4">
          <input type="text" name="firstName" autocomplete="given-name" placeholder="First Name" aria-label="First name" class="w-full border-b border-gray-300 dark:border-white/20 p-2 focus:outline-none focus:border-oll-dark dark:focus:border-white bg-transparent text-sm" />
          <input type="email" name="email" autocomplete="email" placeholder="Email Address" aria-label="Email address" class="w-full border-b border-gray-300 dark:border-white/20 p-2 focus:outline-none focus:border-oll-dark dark:focus:border-white bg-transparent text-sm" />
          <button type="submit" class="w-full bg-oll-dark dark:bg-white text-white dark:text-oll-dark py-3 uppercase tracking-widest text-xs font-bold mt-6 transition-colors">Subscribe</button>
        </form>
      </div>
    </div>
"""

CARD = """          <a
            href="pages/hub/{slug}.html"
            class="group block overflow-hidden rounded-[28px] border border-oll-dark/10 dark:border-white/20 bg-white/80 dark:bg-oll-dark/80"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                src="{image}"
                alt="{title}"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-white"
              />
            </div>
            <div class="p-6 space-y-3">
              <p class="text-xs uppercase tracking-widest opacity-60">Community</p>
              <h3 class="font-serif text-2xl">{title}</h3>
              <p class="text-sm opacity-70">{description}</p>
              <span class="text-xs uppercase tracking-widest border-b border-current pb-1">Read story</span>
            </div>
          </a>"""


def p(text: str) -> str:
    return f'            <p class="text-sm leading-relaxed opacity-80">{text}</p>'


def page_html(blog: dict) -> str:
    body = "\n".join(p(x) for x in blog["paragraphs"])
    links = ""
    if blog.get("links"):
        links = "\n".join(
            f'            <p class="text-sm"><a href="{u}" class="border-b border-current" target="_blank" rel="noopener noreferrer">{u}</a></p>'
            for u in blog["links"]
        )
    byline = ""
    if blog.get("byline"):
        byline = f'            <p class="text-xs uppercase tracking-widest opacity-60 mt-8">{blog["byline"]}</p>'

    return f"""<!DOCTYPE html>
<html lang="en" class="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{blog["title"]} | Our Local Life Hub</title>
    <meta name="description" content="{blog["description"]}" />
    <meta name="oll:category" content="community" />
    <meta name="oll:date" content="{blog["date"]}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://ourlocallife.com/hub/{blog["slug"]}" />
    <meta property="og:title" content="{blog["title"]} | Our Local Life Hub" />
    <meta property="og:description" content="{blog["description"]}" />
    <meta property="og:image" content="{blog["image"]}" />
    <meta property="og:type" content="article" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {{
        darkMode: "class",
        theme: {{
          extend: {{
            colors: {{
              "oll-dark": "#111111",
              "oll-sand": "#DED9D5",
              "oll-sand-light": "#F2F0EE",
            }},
            fontFamily: {{
              serif: ['"Playfair Display"', "serif"],
              sans: ['"Inter"', "sans-serif"],
            }},
            boxShadow: {{
              float:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }},
          }},
        }},
      }};
    </script>
    <script type="module" crossorigin src="/assets/main-CJuVpVQo.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/main-DBjioDFf.css" />
  </head>
  <body class="font-sans antialiased selection:bg-oll-sand selection:text-oll-dark bg-white dark:bg-oll-dark text-oll-dark dark:text-white transition-colors duration-500" id="page-body">
{NAV}
    <main id="main-content" class="md:ml-24 pt-16 md:pt-0">
      <header class="relative min-h-[50vh] bg-oll-dark text-white overflow-hidden">
        <div class="absolute inset-0">
          <img src="{blog["image"]}" alt="{blog["title"]}" class="w-full h-full object-cover opacity-70" />
          <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
        </div>
        <div class="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
          <span class="text-xs uppercase tracking-[0.4em] text-oll-sand">Community · Old Town Scottsdale</span>
          <h1 class="font-serif text-3xl md:text-5xl leading-tight mt-6">{blog["title"]}</h1>
          <p class="text-base md:text-lg text-white/80 mt-4 max-w-2xl mx-auto">{blog["description"]}</p>
        </div>
      </header>
      <section class="py-20 bg-white dark:bg-oll-dark border-b border-oll-dark/10 dark:border-white/10">
        <div class="max-w-3xl mx-auto px-6 space-y-6">
          <p class="text-xs uppercase tracking-[0.3em] opacity-60 text-center">Our Local Life · Feb 2016</p>
{body}
{links}
{byline}
          <p class="pt-8 text-center">
            <a href="../../hub.html" class="text-xs uppercase tracking-widest border-b border-current pb-1">← Back to the Hub</a>
          </p>
        </div>
      </section>
    </main>
{SUBSCRIBE_MODAL}
  </body>
</html>
"""


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    cards = []
    SKIP_CUSTOM = {
        "mayor-jim-lane-interview",
        "metropolis-ryan-rinaldo",
        "cactus-crossfit",
        "el-hefe-whiskey-row",
        "the-toasted-cork",
        "the-bloguettes",
        "pretty-salon",
    }
    for blog in DATA:
        slug = blog["slug"]
        if slug in SKIP_CUSTOM and (OUT / f"{slug}.html").exists():
            print(f"Skip custom {slug}.html")
            continue
        (OUT / f"{slug}.html").write_text(page_html(blog), encoding="utf-8")
        cards.append(
            CARD.format(
                slug=slug,
                image=blog["image"],
                title=blog["title"],
                description=blog["description"],
            )
        )
        print(f"Wrote pages/hub/{slug}.html")

    hub = ROOT / "hub.html"
    text = hub.read_text(encoding="utf-8")
    grid = "\n".join(cards)
    text = re.sub(
        r'<span id="community-story-count"[^>]*>.*?</span>',
        '<span id="community-story-count" class="text-xs uppercase tracking-widest opacity-60">12 community stories live</span>',
        text,
        count=1,
    )
    text = re.sub(
        r'<div id="community-hub-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"></div>',
        f'<div id="hub-blog-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">\n{grid}\n          </div>',
        text,
        count=1,
    )
    hub.write_text(text, encoding="utf-8")
    print("Updated hub.html")


if __name__ == "__main__":
    main()
