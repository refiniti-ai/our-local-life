const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "..", "assets", "main-CJuVpVQo.js");
let bundle = fs.readFileSync(bundlePath, "utf8");

const marker = "}],y=[";
const helper =
  '}],m=e=>{const t=I.find(r=>r.url===e);return t?t.image:""},y=[';

if (!bundle.includes("image:m(")) {
  console.log("No image:m() calls found — bundle already fixed.");
  process.exit(0);
}

if (bundle.includes(helper)) {
  console.log("m() helper already present.");
  process.exit(0);
}

if (!bundle.includes(marker)) {
  console.error("Could not find y array marker in bundle.");
  process.exit(1);
}

bundle = bundle.replace(marker, helper);
fs.writeFileSync(bundlePath, bundle);
console.log("Added story image resolver (m) before blog array.");
