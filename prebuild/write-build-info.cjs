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
  branch: process.env.HEAD ?? exec("git rev-parse --abbrev-ref HEAD"),
  builtAt: new Date().toISOString(),
  commit: process.env.COMMIT_REF ?? exec("git show -s --format=%h HEAD"),
  ci: process.env.CI ? "ci" : "local",
};

const outPath = path.join(__dirname, "..", "build-info.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(info, null, 2));
console.log("Wrote build-info:", outPath, info);
