const fs = require("fs");

const page = process.argv[2];
const fragment = process.argv[3];
if (!page || !fragment) {
  console.error("Usage: node splice_ep4_transcript.cjs <page.html> <fragment.html>");
  process.exit(1);
}

let html = fs.readFileSync(page, "utf8");
const body = fs.readFileSync(fragment, "utf8");

const start = html.indexOf('            <div class="mt-6 space-y-4 text-sm leading-relaxed opacity-80">');
const end = html.indexOf("            </div>\n          </details>", start);
if (start === -1 || end === -1) {
  console.error("markers not found", start, end);
  process.exit(1);
}

const open =
  '            <div class="mt-6 space-y-4 text-sm leading-relaxed opacity-80">\n';
html = html.slice(0, start) + open + body + html.slice(end);
fs.writeFileSync(page, html, "utf8");
console.log("spliced transcript into", page);
