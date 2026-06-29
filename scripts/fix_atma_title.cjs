const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "../assets/data/content.js");
let s = fs.readFileSync(file, "utf8");
s = s.replace(
  /title: "The Practice of Presence: Inside Atma[\u2019']s Approach to Healing",/,
  'title: "Meet Atma Erice: The Practice of Presence",'
);
fs.writeFileSync(file, s);
console.log("fixed atma title");
