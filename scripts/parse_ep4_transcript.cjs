const fs = require("fs");
const path = require("path");

const src = process.argv[2];
const out = process.argv[3];
const episode = process.argv[4] || "4";
if (!src || !out) {
  console.error(
    "Usage: node parse_ep4_transcript.cjs <input.txt> <output.html> [episode]"
  );
  process.exit(1);
}

const raw = fs.readFileSync(src, "utf8");
const lines = raw.split(/\r?\n/);
const parts = [];

for (const line of lines) {
  let t = line.trim();
  if (!t) continue;
  if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(t)) continue;
  t = t.replace(/^\d{1,2}:\d{2}(:\d{2})?\s+/, "");
  if (t) parts.push(t);
}

let full = parts.join(" ");
full = full.replace(/\s+\d{1,2}:\d{2}(:\d{2})?\s+/g, " ");
full = full.replace(/^\d{1,2}:\d{2}(:\d{2})?\s+/, "");
full = full.replace(/\s+/g, " ").trim();
const chunks = full.split(/\s*>>\s*/).filter(Boolean);

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function splitIntoParagraphs(text, maxLen = 900) {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const paras = [];
  let buf = "";
  for (const s of sentences) {
    const next = (buf + s).trim();
    if (next.length > maxLen && buf) {
      paras.push(buf.trim());
      buf = s;
    } else {
      buf = next;
    }
  }
  if (buf.trim()) paras.push(buf.trim());
  return paras;
}

const speakers = ["Dustin", "Chris"];
const html = [];

chunks.forEach((chunk, i) => {
  const speaker = speakers[i % 2];
  const paras = splitIntoParagraphs(chunk);
  for (const p of paras) {
    html.push(
      `              <p><strong>${speaker}:</strong> ${escapeHtml(p)}</p>`
    );
  }
});

html.push(
  `              <p><em>Transcript adapted from the Mind Body Spirit Podcast, Episode ${episode}. Full audio and video available on YouTube.</em></p>`
);

fs.writeFileSync(out, html.join("\n") + "\n", "utf8");
console.log(`Wrote ${chunks.length} speaker turns, ${html.length - 1} paragraphs`);
