const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "../assets/main-CJuVpVQo.js");
let t = fs.readFileSync(bundlePath, "utf8");

// Restore immediate grid render (remove defer)
t = t.replace(
  /const Oe=!!\(document\.getElementById\("curated-stories-grid"\)\|\|document\.getElementById\("entrepreneur-grid"\)\);Oe\|\|\(ne\(\),ke\(\)\);/,
  "ne();ke();"
);

// Disable runtime sitemap HTML fetch (causes flash + 10+ network requests per page)
t = t.replace(/De\(\)\.then\(e=>\{e\?\$e\(e\):Oe&&\(ne\(\),ke\(\)\)\}\)\.catch\(\(\)=>\{Oe&&\(ne\(\),ke\(\)\)\}\);/, "");

const replacements = [
  [
    'title:"The Practice of Presence: Inside Atma\'s Approach to Healing"',
    'title:"Meet Atma Erice: The Practice of Presence"',
  ],
  [
    "image:\"https://images.unsplash.com/photo-1526312426976-f4d754fa9bd6?q=80&w=2000&auto=format&fit=crop\",url:\"/pages/stories/the-practice-of-presence-inside-atmas-approach-to-healing.html\"",
    "image:\"/assets/image/The-Practice-of-Presence-Inside-Atma's-Approach-to-Healing.webp\",url:\"/pages/stories/the-practice-of-presence-inside-atmas-approach-to-healing.html\"",
  ],
  [
    'title:"Intentional Dating in a Swipe Driven World"',
    'title:"Meet Lai Lam: Intentional Dating in a Swipe Driven World"',
  ],
  [
    "image:\"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2000&auto=format&fit=crop\",url:\"/pages/stories/intentional-dating-resumate-lai-lam.html\"",
    "image:\"/assets/image/A-Conversation-with-Resumate-Founder-Lai-Lam.webp\",url:\"/pages/stories/intentional-dating-resumate-lai-lam.html\"",
  ],
  [
    'title:"Linking the Body: A Conversation with Demarius Parker"',
    'title:"Meet Demarius Parker: Linking the Body"',
  ],
  [
    'title:"Restoring the Soil with Christina \'Kat\' Cat"',
    'title:"Meet Christina \'Kat\' Cat: Restoring the Soil"',
  ],
  [
    "image:\"/assets/image/b7618599-c5f2-47b9-b999-f6ffedad5c5f.jpeg\",url:\"/pages/stories/restoring-the-soil-with-christina-kat-cat.html\"",
    "image:\"/assets/image/Restoring-the-Soil-with-Christina-Kat-Cat.webp\",url:\"/pages/stories/restoring-the-soil-with-christina-kat-cat.html\"",
  ],
  [
    "image:\"https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2000&auto=format&fit=crop\",url:\"/pages/stories/meet-chris-wuehr-mind-body-connection.html\"",
    "image:\"/assets/image/The-Mind-Behind-the-Mind-Body-Connection.webp\",url:\"/pages/stories/meet-chris-wuehr-mind-body-connection.html\"",
  ],
  [
    "image:\"/assets/image/lailam-founder-resumate-our-local-life3.webp\"",
    "image:\"/assets/image/lailam-founder-resumate-our-local-life.webp\"",
  ],
  [
    "image:\"/assets/image/Demarius-Parker-Body-Savant-Our-local-life.webp\"",
    "image:\"/assets/image/Demarius-Parker-The-Linker-Our-local-life.webp\"",
  ],
  [
    "image:\"/assets/image/chris-wuehr-thought-leader-our-local-life.webp\"",
    "image:\"/assets/image/chris-wuehr-thought-our-local-life.webp\"",
  ],
];

for (const [old, neu] of replacements) {
  if (!t.includes(old)) {
    console.warn("pattern not found:", old.slice(0, 60));
  } else {
    t = t.replace(old, neu);
  }
}

fs.writeFileSync(bundlePath, t);
console.log("bundle patched");
