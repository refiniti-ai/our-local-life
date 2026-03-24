/**
 * Allow unauthenticated access to the Cloud Run function so that
 * the live site (https://turfflex-app.web.app) can serve /quote, /login, etc.
 * Run once after deploying, or when you see "Your client does not have permission to get URL ..."
 */
const { spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const root = path.resolve(__dirname, "..");
const firebasercPath = path.join(root, ".firebaserc");
let projectId = "turfflex-app";
if (fs.existsSync(firebasercPath)) {
  try {
    const rc = JSON.parse(fs.readFileSync(firebasercPath, "utf8"));
    projectId = rc.projects?.default || projectId;
  } catch (_) {}
}

const region = "us-central1";
const serviceName = "ssrturfflexapp";

console.log(`Allowing public access to ${serviceName} (project: ${projectId})...`);
const result = spawnSync(
  "gcloud",
  [
    "run",
    "services",
    "add-iam-policy-binding",
    serviceName,
    `--region=${region}`,
    `--member=allUsers`,
    `--role=roles/run.invoker`,
    `--project=${projectId}`,
  ],
  { stdio: "inherit", shell: true }
);

if (result.status !== 0) {
  console.error("\nIf gcloud is not installed or you're not logged in, run:");
  console.error("  gcloud auth login");
  console.error("  gcloud config set project", projectId);
  console.error("\nOr in Google Cloud Console: Cloud Run → ssrturfflexapp → Security → Allow unauthenticated invocations");
  process.exit(result.status || 1);
}
console.log("Done. The live site should now allow /quote and /login without permission errors.");
