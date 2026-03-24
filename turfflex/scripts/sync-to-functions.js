/**
 * Sync app source and config into .firebase/turfflex-app/functions
 * so the SSR function serves the latest Next.js app.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const functionsDir = path.join(root, ".firebase", "turfflex-app", "functions");

const dirsToCopy = ["app", "lib", "public", "components"];
const filesToCopy = [
  "next.config.js",
  "tailwind.config.ts",
  "postcss.config.js",
  "tsconfig.json",
  "next-env.d.ts",
];

// Copy images folder if at root (some setups use /images at root)
if (fs.existsSync(path.join(root, "images"))) {
  dirsToCopy.push("images");
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      if (name === "node_modules" || name === ".next") continue;
      copyRecursive(path.join(src, name), path.join(dest, name));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

console.log("Syncing app source to functions...");

for (const dir of dirsToCopy) {
  const src = path.join(root, dir);
  const dest = path.join(functionsDir, dir);
  if (fs.existsSync(src)) {
    if (fs.existsSync(dest)) {
      try {
        fs.rmSync(dest, { recursive: true });
      } catch (_) {}
    }
    copyRecursive(src, dest);
    console.log("  copied", dir + "/");
  }
}

for (const file of filesToCopy) {
  const src = path.join(root, file);
  const dest = path.join(functionsDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log("  copied", file);
  }
}

// Copy .env if present (for API keys, etc.)
const envSrc = path.join(root, ".env");
const envDest = path.join(functionsDir, ".env");
if (fs.existsSync(envSrc)) {
  fs.copyFileSync(envSrc, envDest);
  console.log("  copied .env");
}

console.log("Sync complete.");
