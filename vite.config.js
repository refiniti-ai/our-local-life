import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: true,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
        about: "about.html",
        curatedStories: "curated-stories.html",
        featuredEntrepreneur: "featured-entrepreneur.html",
        contact: "contact.html",
        pressKit: "press-kit.html",
        magazineJanuary: "pages/magazine/january-issue.html",
        magazineApril: "pages/magazine/april-issue.html",
        podcastIndex: "pages/podcast/index.html",
        blogIndex: "pages/blog/index.html",
        podcastEnergyLeak:
          "pages/podcast/youre-not-tired-your-energy-is-leaking.html",
        podcastAlignment:
          "pages/podcast/youre-not-thinking-wrong-youre-out-of-alignment.html",
        podcastResets:
          "pages/podcast/you-dont-need-more-control-you-need-better-resets.html",
        podcastDeficientBody:
          "pages/podcast/you-cant-think-your-way-out-of-a-deficient-body.html",
        podcastBiblicalWisdom:
          "pages/podcast/biblical-wisdom-meets-energetic-spirituality.html",
        podcastBreakTheLoop:
          "pages/podcast/break-the-loop-where-your-energy-is-actually-leaking.html",
        storyKat: "pages/stories/restoring-the-soil-with-christina-kat-cat.html",
        storyChris: "pages/stories/meet-chris-wuehr-mind-body-connection.html",
        storyDemarius: "pages/stories/linking-the-body-demarius-parker.html",
        storyLai: "pages/stories/intentional-dating-resumate-lai-lam.html",
        storyDustin: "pages/stories/dustin-defrates-building-people-places-purpose.html",
        blogEnergyLeak: "pages/blog/youre-not-tired-your-energy-is-leaking.html",
        spotlightKat: "pages/spotlight/christina-kat-cat-sapropel-organics.html",
        spotlightChris: "pages/spotlight/chris-wuehr-mind-body-connection.html",
        spotlightDemarius: "pages/spotlight/demarius-parker-body-whisperer.html",
        spotlightLai: "pages/spotlight/lai-lam-resumate-intentional-dating.html",
        spotlightDustin: "pages/spotlight/dustin-defrates-builder-of-people-places-purpose.html",
      },
    },
  },
});
