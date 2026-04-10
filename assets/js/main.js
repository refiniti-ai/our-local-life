import {
  curatedStories,
  entrepreneurs,
  podcasts,
  magazineIssues,
} from "../data/content.js";

const PILLAR_LABELS = {
  mind: "Mind",
  body: "Body",
  soul: "Soul",
  community: "Community",
};

const pillarLabel = (pillar) => PILLAR_LABELS[pillar] || "";

/** Arizona (no DST). Used for “current issue” month on the home hero. */
const PHOENIX_TZ = "America/Phoenix";

const MAGAZINE_MONTH_SLUGS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

/** Which `*-issue.html` files exist under `pages/magazine/`. Add slugs as you publish new months. */
const MAGAZINE_ISSUE_PAGES_AVAILABLE = new Set(["january-issue.html"]);

function getPhoenixMonthLongName() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: PHOENIX_TZ,
    month: "long",
  }).format(new Date());
}

function getHeroMagazineIssueHref() {
  const monthLong = getPhoenixMonthLongName();
  const idx = MAGAZINE_MONTH_SLUGS.indexOf(monthLong.toLowerCase());
  const slug = idx >= 0 ? MAGAZINE_MONTH_SLUGS[idx] : "january";
  const filename = `${slug}-issue.html`;
  const fallback =
    [...MAGAZINE_ISSUE_PAGES_AVAILABLE][0] || "january-issue.html";
  const path = MAGAZINE_ISSUE_PAGES_AVAILABLE.has(filename)
    ? `pages/magazine/${filename}`
    : `pages/magazine/${fallback}`;
  return new URL(path, window.location.href).href;
}

function updateHomeHeroMagazineLinks() {
  const monthLong = getPhoenixMonthLongName();
  const label = `${monthLong.toUpperCase()} ISSUE`;
  const href = getHeroMagazineIssueHref();

  document.querySelectorAll("[data-hero-magazine-link]").forEach((el) => {
    el.setAttribute("href", href);
  });
  document.querySelectorAll("[data-hero-magazine-label]").forEach((el) => {
    el.textContent = label;
  });
}

function toggleTheme(checkbox) {
  const html = document.documentElement;
  if (checkbox.checked) {
    html.classList.add("dark");
    html.classList.remove("light");
  } else {
    html.classList.remove("dark");
    html.classList.add("light");
  }
  document.querySelectorAll(".theme-toggle-input").forEach((input) => {
    input.checked = checkbox.checked;
  });
}
window.toggleTheme = toggleTheme;

function toggleSubscribe() {
  const modal = document.getElementById("subscribe-modal");
  if (!modal) return;
  const isOpen = modal.classList.contains("visible-modal");
  modal.classList.toggle("visible-modal", !isOpen);
  modal.classList.toggle("hidden-modal", isOpen);
}
window.toggleSubscribe = toggleSubscribe;


const mobileToggle = document.getElementById("mobile-toggle");
const mobileMenu = document.getElementById("mobile-menu");
if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    const mobileNav = document.getElementById("mobile-nav");
    if (mobileNav) {
      mobileNav.classList.toggle("mobile-open");
    }
  });
}

const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("main-content");
const iconContracted = document.getElementById("icon-contracted");
const iconExpanded = document.getElementById("icon-expanded");
const logoExpanded = document.getElementById("logo-expanded");
let isExpanded = false;

if (menuToggle && sidebar && mainContent && iconContracted && iconExpanded) {
  menuToggle.addEventListener("click", () => {
    isExpanded = !isExpanded;
    if (isExpanded) {
      sidebar.classList.add("expanded");
      mainContent.classList.add("sidebar-expanded");
      iconContracted.classList.add("hidden");
      iconExpanded.classList.remove("hidden");
      if (logoExpanded) {
        logoExpanded.style.opacity = "1";
        logoExpanded.style.pointerEvents = "auto";
      }
    } else {
      sidebar.classList.remove("expanded");
      mainContent.classList.remove("sidebar-expanded");
      iconContracted.classList.remove("hidden");
      iconExpanded.classList.add("hidden");
      if (logoExpanded) {
        logoExpanded.style.opacity = "0";
        logoExpanded.style.pointerEvents = "none";
      }
    }
  });
}

const scrollContainer = document.getElementById("mbs-grid");
const scrollLeftBtn = document.getElementById("scroll-left");
const scrollRightBtn = document.getElementById("scroll-right");
if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
  scrollLeftBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: -350, behavior: "smooth" });
  });
  scrollRightBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: 350, behavior: "smooth" });
  });
}

const podcastContainer = document.getElementById("podcast-grid");
const podcastLeftBtn = document.getElementById("podcast-scroll-left");
const podcastRightBtn = document.getElementById("podcast-scroll-right");
if (podcastContainer && podcastLeftBtn && podcastRightBtn) {
  podcastLeftBtn.addEventListener("click", () => {
    podcastContainer.scrollBy({ left: -350, behavior: "smooth" });
  });
  podcastRightBtn.addEventListener("click", () => {
    podcastContainer.scrollBy({ left: 350, behavior: "smooth" });
  });
}

function setupMbsFilters() {
  const mbsFilters = document.querySelectorAll("#mbs-filters .filter-btn");
  const mbsCards = document.querySelectorAll(".mbs-card");
  if (!mbsFilters.length || !mbsCards.length) return;

  mbsFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      mbsFilters.forEach((b) => {
        b.classList.remove("active");
        b.classList.add("opacity-50");
      });
      btn.classList.add("active");
      btn.classList.remove("opacity-50");

      const filter = btn.getAttribute("data-filter");
      mbsCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

const podcastFilters = document.querySelectorAll("#podcast-filters .filter-btn");
const podcastCards = document.querySelectorAll(".podcast-card");
if (podcastFilters.length && podcastCards.length) {
  podcastFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      podcastFilters.forEach((b) => {
        b.classList.remove("active");
        b.classList.add("opacity-50");
      });
      btn.classList.add("active");
      btn.classList.remove("opacity-50");

      const filter = btn.getAttribute("data-filter");
      podcastCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

const sortByDateDesc = (list) =>
  [...list].sort((a, b) => new Date(b.date) - new Date(a.date));

const getLatestItem = (list) => sortByDateDesc(list)[0];

let currentCuratedStories = curatedStories || [];
let currentEntrepreneurs = entrepreneurs || [];

const applyContentUpdate = ({ stories, entrepreneurList } = {}) => {
  if (Array.isArray(stories) && stories.length) {
    currentCuratedStories = sortByDateDesc(stories);
  }
  if (Array.isArray(entrepreneurList) && entrepreneurList.length) {
    currentEntrepreneurs = sortByDateDesc(entrepreneurList);
  }
  renderLatestStoryCard();
  renderLatestEntrepreneurCard();
  renderCuratedStoriesCarousel();
  renderCuratedStoriesGrid();
  renderEntrepreneurGrid();
  renderMagazineCollections();
};

function renderLatestStoryCard() {
  const container = document.getElementById("latest-story-card");
  if (!container) return;
  const latestStory = getLatestItem(currentCuratedStories);
  if (!latestStory) return;
  container.innerHTML = `
    <a href="${latestStory.url}" class="block group">
      <div class="aspect-[4/3] overflow-hidden mb-8">
        <img
          src="${latestStory.image}"
          alt="${latestStory.title}"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 class="font-serif text-3xl mb-4">Free the Body. Free the Mind.</h3>
      <p class="text-sm opacity-70 max-w-md mx-auto leading-relaxed font-sans">
        Emotional weight and mental fog often live in your physical tissue. Through targeted fascia release, diaphragmatic breathing, and heart alignment, you can return to the clarity and confidence required for peak performance.
      </p>
    </a>
  `;
}

function renderLatestEntrepreneurCard() {
  const container = document.getElementById("latest-entrepreneur-card");
  if (!container) return;
  const latestEntrepreneur = getLatestItem(currentEntrepreneurs);
  if (!latestEntrepreneur) return;
  const imageSrc = encodeURI(latestEntrepreneur.image);
  const profileHref = new URL(latestEntrepreneur.url, window.location.href).href;
  container.innerHTML = `
    <a href="${profileHref}" class="block group">
      <div class="aspect-[4/3] overflow-hidden mb-8">
        <img
          src="${imageSrc}"
          alt="${latestEntrepreneur.name}"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 class="font-serif text-3xl mb-4">Meet the Great Minds of Our Local Life</h3>
      <p class="text-sm opacity-70 max-w-md mx-auto leading-relaxed font-sans">
        Explore the stories, visions, and impact of the ethical entrepreneurs and creative leaders shaping our community. Discover how these thinkers are turning high-vibe concepts into local reality.
      </p>
    </a>
  `;
}

function renderCuratedStoriesCarousel() {
  const container = document.getElementById("mbs-grid");
  if (!container) return;
  container.innerHTML = currentCuratedStories
    .map(
      (story) => `
        <a
          href="${story.url}"
          class="mbs-card flex-shrink-0 w-full md:w-[350px] relative h-[500px] rounded-[30px] overflow-hidden group cursor-pointer scroll-item"
          data-category="${story.category}"
        >
          <img
            src="${story.image}"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="${story.title}"
          />
          <div class="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
          <div class="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur text-white text-[10px] uppercase tracking-widest">
            ${story.label}
          </div>
          <div class="absolute bottom-8 left-8 right-8 text-white">
            <span class="text-[10px] uppercase tracking-widest opacity-80 mb-2 block">
              ${story.label}
            </span>
            <h3 class="font-serif text-3xl mb-3 leading-tight">
              ${story.title}
            </h3>
            <span class="text-xs uppercase tracking-widest border-b border-white pb-1">
              ${story.cta}
            </span>
          </div>
        </a>
      `
    )
    .join("");
}

function renderCuratedStoriesGrid() {
  const container = document.getElementById("curated-stories-grid");
  if (!container) return;
  container.innerHTML = currentCuratedStories
    .map(
      (story) => `
        <a
          href="${story.url}"
          class="group block overflow-hidden rounded-[28px] border border-oll-dark/10 dark:border-white/20 bg-white/80 dark:bg-oll-dark/80"
        >
          <div class="aspect-[4/3] overflow-hidden">
            <img
              src="${story.image}"
              alt="${story.title}"
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
        </a>
      `
    )
    .join("");

  const count = document.getElementById("curated-story-count");
  if (count) {
    count.textContent = `${currentCuratedStories.length} story${currentCuratedStories.length === 1 ? "" : "ies"} live`;
  }
}

function renderEntrepreneurGrid() {
  const container = document.getElementById("entrepreneur-grid");
  if (!container) return;
  container.innerHTML = currentEntrepreneurs
    .map(
      (profile) => `
        <a
          href="${profile.url}"
          class="group block overflow-hidden rounded-[28px] border border-oll-dark/10 dark:border-white/20 bg-white/80 dark:bg-oll-dark/80"
        >
          <div class="aspect-[4/3] overflow-hidden">
            <img
              src="${profile.image}"
              alt="${profile.name}"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div class="p-6 space-y-3">
            ${
              profile.pillar
                ? `<p class="text-xs uppercase tracking-widest opacity-90">${pillarLabel(profile.pillar)}</p>`
                : ""
            }
            <p class="text-xs uppercase tracking-widest opacity-60">${profile.archetype}</p>
            <h3 class="font-serif text-2xl">${profile.name}</h3>
            <p class="text-sm opacity-70">${profile.description}</p>
            <span class="text-xs uppercase tracking-widest border-b border-current pb-1">
              ${profile.placeholder ? "Coming soon" : "View profile"}
            </span>
          </div>
        </a>
      `
    )
    .join("");

  const count = document.getElementById("entrepreneur-count");
  if (count) {
    const liveCount = currentEntrepreneurs.length;
    count.textContent = `${liveCount} profile${liveCount === 1 ? "" : "s"} live`;
  }
}

function renderPodcastGrid() {
  const container = document.getElementById("podcast-grid-page");
  if (!container) return;
  const podcastPlaceholders = podcasts.filter((podcast) => podcast.placeholder);
  const podcastBase = podcasts.filter((podcast) => !podcast.placeholder);
  const podcastFilled = ensureMinimumItems(podcastBase, 6, podcastPlaceholders);

  container.innerHTML = podcastFilled
    .map(
      (episode) => `
        <a
          href="${episode.url}"
          class="group block overflow-hidden rounded-[28px] border border-oll-dark/10 dark:border-white/20 bg-white/80 dark:bg-oll-dark/80"
        >
          <div class="aspect-[4/3] overflow-hidden">
            <img
              src="${episode.image}"
              alt="${episode.title}"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div class="p-6 space-y-3">
            <p class="text-xs uppercase tracking-widest opacity-60">Podcast</p>
            <h3 class="font-serif text-2xl">${episode.title}</h3>
            <p class="text-sm opacity-70">${episode.description}</p>
            <span class="text-xs uppercase tracking-widest border-b border-current pb-1">
              ${episode.placeholder ? "Coming soon" : "Listen now"}
            </span>
          </div>
        </a>
      `
    )
    .join("");

  const count = document.getElementById("podcast-count");
  if (count) {
    count.textContent = `${podcastBase.length} episode${podcastBase.length === 1 ? "" : "s"} live`;
  }
}

function renderMagazineIssue() {
  const hero = document.getElementById("issue-hero");
  if (!hero) return;
  const latestIssue = getLatestItem(magazineIssues);
  if (!latestIssue) return;
  hero.innerHTML = `
    <div class="absolute inset-0">
      <video autoplay loop muted playsinline class="w-full h-full object-cover opacity-90">
        <source
          src="https://zyq.has.mybluehost.me/website_ee8080dc/wp-content/uploads/2025/11/Our-Local-Life-2.mp4"
          type="video/mp4"
        />
      </video>
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
    </div>
    <div class="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
      <span class="text-xs uppercase tracking-[0.4em] text-oll-sand">
        ${latestIssue.title}
      </span>
      <h1 class="font-serif text-4xl md:text-6xl leading-tight mt-6">
        ${latestIssue.subtitle}
      </h1>
      <p class="text-lg md:text-xl text-white/80 mt-6 max-w-2xl mx-auto">
        ${latestIssue.description}
      </p>
    </div>
  `;
}

function renderMagazineCollections() {
  const storiesContainer = document.getElementById("magazine-stories-grid");
  if (storiesContainer) {
    storiesContainer.innerHTML = currentCuratedStories
      .slice(0, 3)
      .map(
        (story) => `
          <a
            href="${story.url}"
            class="group block overflow-hidden rounded-[28px] border border-oll-dark/10 dark:border-white/20 bg-white/80 dark:bg-oll-dark/80"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                src="${story.image}"
                alt="${story.title}"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
          </a>
        `
      )
      .join("");
  }

  const entrepreneursContainer = document.getElementById(
    "magazine-entrepreneurs-grid"
  );
  if (entrepreneursContainer) {
    entrepreneursContainer.innerHTML = currentEntrepreneurs
      .map(
        (profile) => `
          <a
            href="${profile.url}"
            class="group block overflow-hidden rounded-[28px] border border-oll-dark/10 dark:border-white/20 bg-white/80 dark:bg-oll-dark/80"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                src="${profile.image}"
                alt="${profile.name}"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div class="p-6 space-y-3">
              ${
                profile.pillar
                  ? `<p class="text-xs uppercase tracking-widest opacity-90">${pillarLabel(profile.pillar)}</p>`
                  : ""
              }
              <p class="text-xs uppercase tracking-widest opacity-60">${profile.archetype}</p>
              <h3 class="font-serif text-2xl">${profile.name}</h3>
              <p class="text-sm opacity-70">${profile.description}</p>
              <span class="text-xs uppercase tracking-widest border-b border-current pb-1">
                View profile
              </span>
            </div>
          </a>
        `
      )
      .join("");
  }
}

renderLatestStoryCard();
renderLatestEntrepreneurCard();
renderCuratedStoriesCarousel();
renderCuratedStoriesGrid();
renderEntrepreneurGrid();
renderPodcastGrid();
renderMagazineIssue();
renderMagazineCollections();
setupMbsFilters();
updateHomeHeroMagazineLinks();

const getMetaContent = (doc, key) => {
  const meta = doc.querySelector(`meta[name="${key}"], meta[property="${key}"]`);
  return meta ? meta.getAttribute("content")?.trim() : "";
};

const getDocTitle = (doc) => doc.querySelector("title")?.textContent?.trim() || "";

const normalizeTitle = (rawTitle) =>
  (rawTitle || "")
    .replace("| Curated Story", "")
    .replace("| Featured Entrepreneur", "")
    .trim();

const VALID_PILLARS = ["mind", "body", "soul", "community"];

const inferPillarFromSpotlightSlug = (slug) => {
  if (!slug) return "community";
  const s = slug.toLowerCase();
  if (s.includes("chris-wuehr") || s.includes("dustin-defrates")) return "mind";
  if (s.includes("demarius-parker")) return "body";
  if (s.includes("atma")) return "soul";
  return "community";
};

const inferCategory = (doc) => {
  const explicit = getMetaContent(doc, "oll:category");
  if (explicit) return explicit.toLowerCase();
  const title = getMetaContent(doc, "og:title") || getDocTitle(doc);
  const description =
    getMetaContent(doc, "og:description") || getMetaContent(doc, "description");
  const text = `${title} ${description}`;
  if (/mind\b/i.test(text)) return "mind";
  if (/body\b/i.test(text)) return "body";
  if (/soul\b/i.test(text)) return "soul";
  return "community";
};

const mapStoryFromDoc = (path, doc) => {
  const title = normalizeTitle(getMetaContent(doc, "og:title") || getDocTitle(doc));
  const description =
    getMetaContent(doc, "og:description") ||
    getMetaContent(doc, "description") ||
    "A curated story from Our Local Life.";
  const image =
    getMetaContent(doc, "og:image") ||
    "https://images.unsplash.com/photo-1474314243412-cd4a79f02c5a?q=80&w=2000&auto=format&fit=crop";
  const date = getMetaContent(doc, "oll:date") || "1900-01-01";
  const category = inferCategory(doc);
  const label =
    category === "community"
      ? "Community"
      : category.charAt(0).toUpperCase() + category.slice(1);
  const slug = path.split("/").pop().replace(".html", "");

  return {
    id: slug,
    title: title || "Curated Story",
    description,
    image,
    url: path.startsWith("/") ? path : `/${path}`,
    category,
    label,
    cta: "Read story",
    date,
  };
};

const mapEntrepreneurFromDoc = (path, doc) => {
  const title = normalizeTitle(getMetaContent(doc, "og:title") || getDocTitle(doc));
  const description =
    getMetaContent(doc, "og:description") ||
    getMetaContent(doc, "description") ||
    "A featured entrepreneur spotlight.";
  const image =
    getMetaContent(doc, "og:image") ||
    "https://images.unsplash.com/photo-1474314243412-cd4a79f02c5a?q=80&w=2000&auto=format&fit=crop";
  const date = getMetaContent(doc, "oll:date") || "1900-01-01";
  const archetype = getMetaContent(doc, "oll:archetype") || "Featured Entrepreneur";
  const slug = path.split("/").pop().replace(".html", "");
  const pillarMeta = getMetaContent(doc, "oll:pillar").toLowerCase();
  const pillar = VALID_PILLARS.includes(pillarMeta)
    ? pillarMeta
    : inferPillarFromSpotlightSlug(slug);

  return {
    id: slug,
    name: title || "Featured Entrepreneur",
    pillar,
    archetype,
    description,
    image,
    url: path.startsWith("/") ? path : `/${path}`,
    date,
  };
};

const loadContentFromSitemap = async () => {
  let xmlText = "";
  try {
    const response = await fetch("sitemap.xml", { cache: "no-store" });
    if (!response.ok) return null;
    xmlText = await response.text();
  } catch (error) {
    return null;
  }

  const xmlDoc = new DOMParser().parseFromString(xmlText, "application/xml");
  const locs = Array.from(xmlDoc.querySelectorAll("url > loc"))
    .map((node) => node.textContent?.trim())
    .filter(Boolean);

  const storyPaths = locs
    .filter((loc) => loc.includes("/stories/"))
    .map((loc) => {
      const slug = new URL(loc).pathname.split("/").pop();
      return `pages/stories/${slug}.html`;
    });

  const spotlightPaths = locs
    .filter((loc) => loc.includes("/spotlight/"))
    .map((loc) => {
      const slug = new URL(loc).pathname.split("/").pop();
      return `pages/spotlight/${slug}.html`;
    });

  const storyResults = await Promise.all(
    storyPaths.map(async (path) => {
      try {
        const response = await fetch(path, { cache: "no-store" });
        if (!response.ok) return null;
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        return mapStoryFromDoc(path, doc);
      } catch (error) {
        return null;
      }
    })
  );

  const entrepreneurResults = await Promise.all(
    spotlightPaths.map(async (path) => {
      try {
        const response = await fetch(path, { cache: "no-store" });
        if (!response.ok) return null;
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        return mapEntrepreneurFromDoc(path, doc);
      } catch (error) {
        return null;
      }
    })
  );

  return {
    stories: storyResults.filter(Boolean),
    entrepreneurList: entrepreneurResults.filter(Boolean),
  };
};

loadContentFromSitemap()
  .then((result) => {
    if (!result) return;
    applyContentUpdate(result);
  })
  .catch(() => {});




