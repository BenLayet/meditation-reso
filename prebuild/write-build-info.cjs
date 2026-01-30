// file: scripts/write-build-info.js
const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

function exec(cmd) {
  try {
    return execSync(cmd).toString().trim();
  } catch {
    return null;
  }
}

const info = {
  commit: exec("git show -s --format=%h HEAD"),
  builtAt: new Date().toISOString(),
  branch: exec("git rev-parse --abbrev-ref HEAD"),
};

const outPath = path.join(__dirname, "..", "build-info.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(info, null, 2));
console.log("Wrote build-info:", outPath, info);
