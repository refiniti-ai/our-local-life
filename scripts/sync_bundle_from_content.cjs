const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const contentPath = path.join(root, "assets/data/content.js");
const bundlePath = path.join(root, "assets/main-CJuVpVQo.js");

async function main() {
  const mod = await import(pathToFileURL(contentPath).href);
  const curatedStories = mod.curatedStories;
  const entrepreneurs = mod.entrepreneurs;
  const podcasts = mod.podcasts;
  if (!curatedStories || !entrepreneurs || !podcasts) {
    console.error("Could not load content.js exports");
    process.exit(1);
  }

  function toJsArray(items) {
    return (
      "[" +
      items
        .map((e) => {
          const pairs = Object.entries(e).map(([k, v]) => {
            const val =
              typeof v === "string" ? JSON.stringify(v) : String(v);
            return `${k}:${val}`;
          });
          return `{${pairs.join(",")}}`;
        })
        .join(",") +
      "]"
    );
  }

  let bundle = fs.readFileSync(bundlePath, "utf8");
  const iMatch = bundle.match(/I=\[/);
  const bMatch = bundle.indexOf(",b=[");
  if (!iMatch || bMatch === -1) {
    console.error("Could not find I= or b= in bundle");
    process.exit(1);
  }

  const mMatch = bundle.indexOf(",m=e=>", bMatch);
  if (mMatch === -1) {
    console.error("Could not find m= helper after b= array");
    process.exit(1);
  }

  const underscoreStart = bundle.indexOf(",_=[", iMatch.index);
  if (underscoreStart === -1) {
    console.error("Could not find _= array");
    process.exit(1);
  }

  const newI = "I=" + toJsArray(curatedStories);
  const newUnderscore = ",_=" + toJsArray(entrepreneurs);
  const newB = ",b=" + toJsArray(podcasts);

  bundle =
    bundle.slice(0, iMatch.index) +
    newI +
    newUnderscore +
    newB +
    bundle.slice(mMatch);

  fs.writeFileSync(bundlePath, bundle);

  const { execFileSync } = require("child_process");
  execFileSync("node", [path.join(__dirname, "fix_bundle_m.cjs")], {
    stdio: "inherit",
  });

  console.log(
    `Synced bundle: ${curatedStories.length} stories, ${entrepreneurs.length} entrepreneurs, ${podcasts.length} podcasts`
  );
}

function pathToFileURL(p) {
  const { pathToFileURL } = require("url");
  return pathToFileURL(p);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
