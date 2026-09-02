/**
 * Build Next.js static HTML for cPanel. API routes are stashed for the export
 * build, then restored so Vercel/local still have them.
 */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.join(__dirname, "..");
const apiDir = path.join(root, "app", "api");
const stashDir = path.join(root, ".api-stash");

function restoreApi() {
  if (!fs.existsSync(stashDir)) return;
  if (fs.existsSync(apiDir)) {
    fs.rmSync(apiDir, { recursive: true, force: true });
  }
  fs.cpSync(stashDir, apiDir, { recursive: true });
  fs.rmSync(stashDir, { recursive: true, force: true });
}

if (!fs.existsSync(apiDir)) {
  console.error("Missing app/api — cannot stash API routes.");
  process.exit(1);
}

if (fs.existsSync(stashDir)) {
  fs.rmSync(stashDir, { recursive: true, force: true });
}
fs.cpSync(apiDir, stashDir, { recursive: true });
fs.rmSync(apiDir, { recursive: true, force: true });

const result = spawnSync("npx", ["next", "build"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: { ...process.env, CPANEL_STATIC: "1" },
});

restoreApi();

if (result.status !== 0) {
  process.exit(result.status || 1);
}

const prepare = spawnSync("node", [path.join(__dirname, "prepare-static-cpanel.cjs")], {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: process.env,
});
process.exit(prepare.status || 0);
