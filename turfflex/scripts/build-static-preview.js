/**
 * Build a static export to out/ so that "firebase serve" shows correct styles.
 * Temporarily enables output: "export" and moves two API routes aside so the build succeeds.
 */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const nextConfigPath = path.join(root, "next.config.js");
const availabilityRoute = path.join(root, "app", "api", "availability", "route.ts");
const authMeRoute = path.join(root, "app", "api", "auth", "me", "route.ts");

const nextConfigWithExport = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: "export",
};

module.exports = nextConfig;
`;

const nextConfigWithoutExport = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
`;

function restore() {
  try {
    fs.writeFileSync(nextConfigPath, nextConfigWithoutExport);
    if (fs.existsSync(availabilityRoute + ".preview-bak")) {
      fs.renameSync(availabilityRoute + ".preview-bak", availabilityRoute);
    }
    if (fs.existsSync(authMeRoute + ".preview-bak")) {
      fs.renameSync(authMeRoute + ".preview-bak", authMeRoute);
    }
  } catch (e) {
    console.error("Restore error:", e.message);
  }
}

// Backup and remove API routes that break static export
if (fs.existsSync(availabilityRoute)) {
  fs.renameSync(availabilityRoute, availabilityRoute + ".preview-bak");
}
if (fs.existsSync(authMeRoute)) {
  fs.renameSync(authMeRoute, authMeRoute + ".preview-bak");
}

// Enable static export
fs.writeFileSync(nextConfigPath, nextConfigWithExport);

process.on("exit", restore);
process.on("SIGINT", () => { restore(); process.exit(1); });
process.on("SIGTERM", () => { restore(); process.exit(1); });

console.log("Cleaning .next...");
spawnSync("npm", ["run", "clean"], { cwd: root, stdio: "inherit", shell: true });

console.log("Building static export for preview (out/)...");
const result = spawnSync("npm", ["run", "build"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
});

restore();

if (result.status !== 0) {
  process.exit(result.status || 1);
}
console.log("Preview build complete. Run 'firebase serve' to view with correct styles.");
