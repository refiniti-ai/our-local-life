# Image guidelines for Our Local Life

Recommended **resolution**, **aspect ratio**, and **file size** so images look sharp and load fast across every section.

---

## Quick reference

| Use case | Resolution | Aspect ratio | Max file size | Format |
|----------|------------|--------------|---------------|--------|
| **Hero (full-bleed)** | 1920×1080 or 2400×1350 | 16:9 (or 3:2) | 400–600 KB | JPEG/WebP |
| **Card / grid / carousel** | 1200×900 | **4:3** | 200–300 KB | WebP or JPEG |
| **Spotlight lifestyle box** | 1000×720 | ~4:3 | 200–300 KB | WebP or JPEG |
| **MBS carousel (tall cards)** | 700×1050 | 2:3 | 200–300 KB | WebP or JPEG |
| **og:image / social** | 1200×630 | 1.91:1 | &lt; 300 KB | JPEG |

Use these for **curated stories**, **spotlight profiles**, **entrepreneur cards**, **heroes**, and **social sharing**.

---

## By section (how the site uses images)

### 1. Curated Stories grid & Featured Entrepreneurs grid
- **CSS:** `aspect-[4/3]`, inside `max-w-7xl` (1280px); cards are ~400px wide (3-col) or ~600px (2-col).
- **Optimal:** **1200×900 px** (4:3). Covers 2× retina up to 600px display width.
- **File size:** Aim **&lt; 250 KB** (WebP) or **&lt; 400 KB** (JPEG) at 80–85% quality.

### 2. Homepage “Latest story” / “Latest entrepreneur” cards
- Same **4:3** cards as above.
- **Use the same:** **1200×900 px**, **&lt; 250 KB** WebP or **&lt; 400 KB** JPEG.

### 3. Mind / Body / Soul carousel (MBS cards)
- **CSS:** `md:w-[350px]` × `h-[500px]` → ~2:3.
- **Optimal:** **700×1050 px** (2:3). Or **1200×900** (4:3) if you crop to 4:3 and accept letterboxing; 4:3 is simpler if one asset is used in both grid and carousel.
- **File size:** **&lt; 250 KB**.

### 4. Story & spotlight hero (full-bleed header)
- Full viewport width; often with overlay.
- **Optimal:** **1920×1080 px** (16:9) or **2400×1350**. For more vertical crop use **1920×1280** (3:2).
- **File size:** **&lt; 500 KB** (WebP) or **&lt; 600 KB** (JPEG).

### 5. Spotlight “Hero image” / lifestyle box (right column)
- **CSS:** `h-[360px]`, width ~40–45% of `max-w-6xl` (~450–520px).
- **Optimal:** **1000×720 px** (≈4:3) or **1200×900** if reusing the same file as card images.
- **File size:** **&lt; 250 KB**.

### 6. In-article / editorial images
- **CSS:** `max-w-3xl` or `max-w-5xl` (≈896px or 1024px).
- **Optimal:** **1200×900** (4:3) or **1600×900** (16:9); **&lt; 300 KB**.

### 7. Video poster & Media Hub thumbnails
- **CSS:** `aspect-video` (16:9).
- **Optimal:** **1280×720** or **1600×900**; **&lt; 250 KB**.

### 8. og:image / Twitter / Facebook
- **Optimal:** **1200×630 px** (1.91:1); **&lt; 300 KB** JPEG.

---

## One-size-fits-most (simplest)

If you want **one resolution for most uses** (grids, cards, spotlight box, in-article):

- **Resolution:** **1200×900 px** (4:3)
- **Format:** WebP preferred, JPEG fallback
- **Quality:** 80–85%
- **File size:** **200–300 KB**

Then use the same image for:
- Curated Stories grid
- Featured Entrepreneurs grid
- Latest story / latest entrepreneur cards
- Spotlight lifestyle box (and optionally hero, if cropped similarly)
- In-article lifestyle images

For **full-bleed heroes** and **social (og:image)**, export a second version:
- Hero: **1920×1080** (or 2400×1350), **&lt; 500 KB**
- Social: **1200×630**, **&lt; 300 KB**

---

## Format & quality

- **WebP:** Best balance of quality and size; use when possible.
- **JPEG:** 80–85% quality for photos; avoid 100% (large files, little visual gain).
- **Filename:** Use URL-safe names (no spaces, or use `%20` in paths). Example: `dustin-defrates-our-local-life.jpeg` or keep spaces and encode in code as `Dustin%20Defrates_our%20local%20life.jpeg`.

---

## Container widths (reference)

- **max-w-5xl:** 1024px  
- **max-w-6xl:** 1152px  
- **max-w-7xl:** 1280px  

Images are displayed with `object-cover` in fixed aspect containers, so supplying the **aspect ratio** above matters more than matching container width exactly; the listed resolutions cover up to 2× retina for those containers.
