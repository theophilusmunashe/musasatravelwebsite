/**
 * After `npm run build` with output: "standalone", copies `public` and
 * `.next/static` into `.next/standalone` so you can zip that folder for cPanel.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const standalone = path.join(root, ".next", "standalone");
const staticSrc = path.join(root, ".next", "static");
const staticDest = path.join(standalone, ".next", "static");
const publicSrc = path.join(root, "public");
const publicDest = path.join(standalone, "public");

if (!fs.existsSync(standalone)) {
  console.error("Missing .next/standalone — run npm run build first.");
  process.exit(1);
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn("Skip (missing):", src);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
  console.log("Copied:", path.relative(root, src), "→", path.relative(root, dest));
}

copyDir(staticSrc, staticDest);
copyDir(publicSrc, publicDest);

function countFiles(dir) {
  if (!fs.existsSync(dir)) return 0;
  let n = 0;
  const walk = (d) => {
    for (const name of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, name.name);
      if (name.isDirectory()) walk(p);
      else n += 1;
    }
  };
  walk(dir);
  return n;
}

const staticN = countFiles(staticDest);
const publicN = countFiles(publicDest);
if (staticN < 5) {
  console.error(
    "\nERROR: .next/standalone/.next/static looks empty or missing.",
    "\nLocal images (next/image imports, chunks) will 404 on the server.",
    "\nRun from project root: npm run build && node scripts/prepare-standalone.cjs\n"
  );
  process.exit(1);
}
if (publicN < 1) {
  console.error(
    "\nERROR: .next/standalone/public is missing or empty.",
    "\nURLs like /image/... will 404. Ensure ./public exists before build.\n"
  );
  process.exit(1);
}

console.log(`Verified: ${staticN} files under standalone/.next/static, ${publicN} under standalone/public`);
console.log("\nReady to zip the CONTENTS of: .next/standalone/");
console.log("cPanel startup file: server.js (inside that folder)");
console.log("Set application root to the folder that contains server.js");
console.log("Upload ALL of: server.js, node_modules/, .next/, public/ (no parent-only upload).\n");
