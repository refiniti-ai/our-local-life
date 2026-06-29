const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "..", "assets", "main-CJuVpVQo.js");
let bundle = fs.readFileSync(bundlePath, "utf8");

const oldFn =
  'function we(e){const t=document.documentElement;e.checked?(t.classList.add("dark"),t.classList.remove("light")):(t.classList.remove("dark"),t.classList.add("light")),document.querySelectorAll(".theme-toggle-input").forEach(r=>{r.checked=e.checked})}window.toggleTheme=we;';

const newFn =
  'const _themeKey="oll-theme";function _applyTheme(e){const t=document.documentElement;e?(t.classList.add("dark"),t.classList.remove("light")):(t.classList.remove("dark"),t.classList.add("light")),document.querySelectorAll(".theme-toggle-input").forEach(r=>{r.checked=e})}function we(e){_applyTheme(e.checked);try{localStorage.setItem(_themeKey,e.checked?"dark":"light")}catch{}}window.toggleTheme=we;try{const _saved=localStorage.getItem(_themeKey);_saved==="dark"?_applyTheme(!0):_saved==="light"&&_applyTheme(!1)}catch{};';

if (bundle.includes(newFn)) {
  console.log("Theme persistence already present in bundle.");
  process.exit(0);
}

if (!bundle.includes(oldFn)) {
  console.error("Could not find toggleTheme function in bundle.");
  process.exit(1);
}

bundle = bundle.replace(oldFn, newFn);
fs.writeFileSync(bundlePath, bundle);
console.log("Patched production bundle with theme persistence.");
