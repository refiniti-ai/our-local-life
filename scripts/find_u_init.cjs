const fs = require("fs");
const t = fs.readFileSync("assets/main-CJuVpVQo.js", "utf8");
const patterns = ["let u=", "var u=", "u=I", "u=ee", "$e=", "function $e", "u.sort", "currentCurated"];
for (const p of patterns) {
  const i = t.indexOf(p);
  console.log(p, i, i > -1 ? t.slice(i, i + 120) : "");
}
