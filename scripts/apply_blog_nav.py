"""Splice shared nav from _nav-shell.html into blog pages and append subscribe modal."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NAV = (ROOT / "pages/blog/_nav-shell.html").read_text(encoding="utf-8")
MODAL = """
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
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h3 class="font-serif text-3xl mb-2">Join Our Community</h3>
        <p class="text-sm opacity-60 mb-8">
          Receive our weekly curation of slow living, culinary arts, and local stories.
        </p>
        <form class="space-y-4">
          <input
            type="text"
            name="firstName"
            autocomplete="given-name"
            placeholder="First Name"
            aria-label="First name"
            class="w-full border-b border-gray-300 dark:border-white/20 p-2 focus:outline-none focus:border-oll-dark dark:focus:border-white bg-transparent text-sm"
          />
          <input
            type="email"
            name="email"
            autocomplete="email"
            placeholder="Email Address"
            aria-label="Email address"
            class="w-full border-b border-gray-300 dark:border-white/20 p-2 focus:outline-none focus:border-oll-dark dark:focus:border-white bg-transparent text-sm"
          />
          <button
            type="submit"
            class="w-full bg-oll-dark dark:bg-white text-white dark:text-oll-dark py-3 uppercase tracking-widest text-xs font-bold mt-6 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
"""

for name in ("youre-not-tired-your-energy-is-leaking.html", "index.html"):
    path = ROOT / "pages/blog" / name
    text = path.read_text(encoding="utf-8")
    start = text.find('    <nav\n      class="md:hidden')
    if start == -1:
        raise SystemExit(f"{name}: start marker not found")
    end = text.find('    <main id="main-content"')
    if end == -1:
        raise SystemExit(f"{name}: main not found")
    text = text[:start] + NAV + "\n" + text[end:]
    if 'id="subscribe-modal"' not in text:
        inj = '    <script type="module" src="../../assets/js/main.js"></script>'
        if inj not in text:
            raise SystemExit(f"{name}: script tag not found")
        text = text.replace(inj, MODAL + "\n" + inj, 1)
    path.write_text(text, encoding="utf-8")
    print("updated", name)
