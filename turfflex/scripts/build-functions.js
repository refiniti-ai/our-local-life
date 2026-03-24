/**
 * Run npm install (if needed) and npm run build inside .firebase/turfflex-app/functions
 */
const { spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const root = path.resolve(__dirname, "..");
const functionsDir = path.join(root, ".firebase", "turfflex-app", "functions");

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: functionsDir, stdio: "inherit", shell: true });
  if (r.status !== 0) process.exit(r.status || 1);
}

// On Windows, Next's internal cleanup sometimes fails (EINVAL/readlink) when
// cleaning the previous .next output. Force-remove the build artifacts first.
const nextDir = path.join(functionsDir, ".next");
try {
  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true });
  }
} catch (e) {
  console.warn("Warning: could not fully clean .next:", e.message);
}

// Use Node 20 so firebase-frameworks doesn't emit EBADENGINE (it supports ^16 || ^18 || ^20 || ^22).
const pkgPath = path.join(functionsDir, "package.json");
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  if (pkg.engines?.node !== "20") {
    pkg.engines = pkg.engines || {};
    pkg.engines.node = "20";
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  }
}

// Clean install so node_modules is fresh (avoids stale deps).
const lockPath = path.join(functionsDir, "package-lock.json");
const nodeModulesPath = path.join(functionsDir, "node_modules");
for (const p of [lockPath, nodeModulesPath]) {
  if (fs.existsSync(p)) {
    try {
      fs.rmSync(p, { recursive: true, force: true });
      console.log("Removed", path.basename(p));
    } catch (e) {
      console.warn("Could not remove", p, e.message);
    }
  }
}

console.log("Installing dependencies in functions folder...");
run("npm", ["install"]);

console.log("Building Next.js app in functions folder...");
run("npm", ["run", "build"]);

// Cloud Build uses npm ci when package-lock.json is present; lock file from Node 24
// can be incompatible and cause "Missing: ... from lock file". Remove it so
// Cloud Build runs npm install instead.
if (fs.existsSync(lockPath)) {
  try {
    fs.unlinkSync(lockPath);
    console.log("Removed package-lock.json so Cloud Build uses npm install (avoids npm ci sync errors).");
  } catch (e) {
    console.warn("Could not remove package-lock.json:", e.message);
  }
}

console.log("Functions build complete.");
