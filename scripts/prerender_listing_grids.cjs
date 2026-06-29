const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const root = path.join(__dirname, "..");

function storyCard(story) {
  const src = encodeURI(story.image);
  return `            <a
              href="${story.url.replace(/^\//, "")}"
              class="group block overflow-hidden rounded-[28px] border border-oll-dark/10 dark:border-white/20 bg-white/80 dark:bg-oll-dark/80"
            >
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  src="${src}"
                  alt="${story.title.replace(/"/g, "&quot;")}"
                  width="800"
                  height="600"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-white"
                />
              </div>
              <div class="p-6 space-y-3">
                <p class="text-xs uppercase tracking-widest opacity-60">${story.label}</p>
                <h3 class="font-serif text-2xl">${story.title}</h3>
                <p class="text-sm opacity-70">${story.description}</p>
                <span class="text-xs uppercase tracking-widest border-b border-current pb-1">
                  ${story.cta}
                </span>
              </div>
            </a>`;
}

function entrepreneurCard(profile) {
  const pillar = profile.pillar
    ? profile.pillar.charAt(0).toUpperCase() + profile.pillar.slice(1)
    : "";
  const src = encodeURI(profile.image);
  return `            <a
              href="${profile.url.replace(/^\//, "")}"
              class="group block overflow-hidden rounded-[28px] border border-oll-dark/10 dark:border-white/20 bg-white/80 dark:bg-oll-dark/80"
            >
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  src="${src}"
                  alt="${profile.name.replace(/"/g, "&quot;")}"
                  width="800"
                  height="600"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div class="p-6 space-y-3">
                ${
                  pillar
                    ? `<p class="text-xs uppercase tracking-widest opacity-90">${pillar}</p>`
                    : ""
                }
                <p class="text-xs uppercase tracking-widest opacity-60">${profile.archetype}</p>
                <h3 class="font-serif text-2xl">${profile.name}</h3>
                <p class="text-sm opacity-70">${profile.description}</p>
                <span class="text-xs uppercase tracking-widest border-b border-current pb-1">
                  View profile
                </span>
              </div>
            </a>`;
}

function preloadLinks(images) {
  return images
    .slice(0, 6)
    .map(
      (src) =>
        `    <link rel="preload" as="image" href="${encodeURI(src)}" />`
    )
    .join("\n");
}

function bumpScriptVersion(html) {
  return html.replace(
    /src="\/assets\/main-CJuVpVQo\.js(?:\?v=\d+)?"/,
    'src="/assets/main-CJuVpVQo.js?v=20260609"'
  );
}

function replaceGrid(html, gridId, innerHtml) {
  const openTag = `<div id="${gridId}" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"`;
  const start = html.indexOf(openTag);
  if (start === -1) return html;

  const tagEnd = html.indexOf(">", start);
  if (tagEnd === -1) return html;

  const contentStart = tagEnd + 1;
  let depth = 1;
  let i = contentStart;
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf("<div", i);
    const nextClose = html.indexOf("</div>", i);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 4;
    } else {
      depth -= 1;
      i = nextClose + 6;
    }
  }

  const newOpen = `<div id="${gridId}" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-prerendered="true">`;
  return (
    html.slice(0, start) +
    newOpen +
    "\n" +
    innerHtml +
    "\n          " +
    html.slice(i)
  );
}

function injectPreloads(html, images) {
  const preloads = preloadLinks(images);
  let doc = html.replace(/\s*<link rel="preload" as="image"[^>]*\/>/g, "");
  const scriptTag =
    '<script type="module" crossorigin src="/assets/main-CJuVpVQo.js';
  if (doc.includes(scriptTag)) {
    return doc.replace(scriptTag, `${preloads}\n    ${scriptTag}`);
  }
  return doc.replace(
    '<link rel="stylesheet" crossorigin href="/assets/main-DBjioDFf.css">',
    `${preloads}\n    <link rel="stylesheet" crossorigin href="/assets/main-DBjioDFf.css">`
  );
}

async function main() {
  const mod = await import(pathToFileURL(path.join(root, "assets/data/content.js")).href);
  const stories = [...mod.curatedStories].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const entrepreneurs = [...mod.entrepreneurs]
    .filter((e) => !e.placeholder)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const storiesHtml = stories.map(storyCard).join("\n");
  const entrepreneursHtml = entrepreneurs.map(entrepreneurCard).join("\n");

  const storiesPage = path.join(root, "curated-stories.html");
  let storiesDoc = fs.readFileSync(storiesPage, "utf8");
  storiesDoc = replaceGrid(storiesDoc, "curated-stories-grid", storiesHtml);
  storiesDoc = storiesDoc.replace(
    /Loading stories/,
    `${stories.length} ${stories.length === 1 ? "story" : "stories"} live`
  );
  storiesDoc = injectPreloads(storiesDoc, stories.map((s) => s.image));
  storiesDoc = bumpScriptVersion(storiesDoc);
  fs.writeFileSync(storiesPage, storiesDoc);

  const entPage = path.join(root, "featured-entrepreneur.html");
  let entDoc = fs.readFileSync(entPage, "utf8");
  entDoc = replaceGrid(entDoc, "entrepreneur-grid", entrepreneursHtml);
  entDoc = entDoc.replace(
    /Loading profiles/,
    `${entrepreneurs.length} profile${entrepreneurs.length === 1 ? "" : "s"} live`
  );
  entDoc = injectPreloads(entDoc, entrepreneurs.map((e) => e.image));
  entDoc = bumpScriptVersion(entDoc);
  fs.writeFileSync(entPage, entDoc);

  console.log(`Prerendered ${stories.length} stories and ${entrepreneurs.length} entrepreneurs`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
