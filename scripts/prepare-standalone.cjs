/**
 * After `npm run build` with output: "standalone", assemble a cPanel-ready
 * folder with server.js at the root (Passenger), plus public + .next/static.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const standalone = path.join(root, ".next", "standalone");
const staticSrc = path.join(root, ".next", "static");
const publicSrc = path.join(root, "public");
const passengerServer = path.join(root, "scripts", "cpanel-server.js");
const deployDir = path.join(root, "deploy-cpanel");

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

function findAppRoot(dir, depth = 0) {
  if (depth > 10) return null;
  const serverJs = path.join(dir, "server.js");
  const nextDir = path.join(dir, ".next");
  if (fs.existsSync(serverJs) && fs.existsSync(nextDir)) {
    return dir;
  }
  if (!fs.existsSync(dir)) return null;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!name.isDirectory()) continue;
    if (name.name === "node_modules") continue;
    const found = findAppRoot(path.join(dir, name.name), depth + 1);
    if (found) return found;
  }
  return null;
}

const appRoot = findAppRoot(standalone) || standalone;
console.log("Standalone app root:", path.relative(root, appRoot) || ".next/standalone");

if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true, force: true });
}
copyDir(appRoot, deployDir);

const outerModules = path.join(standalone, "node_modules");
const deployModules = path.join(deployDir, "node_modules");
if (fs.existsSync(outerModules) && appRoot !== standalone) {
  copyDir(outerModules, deployModules);
}

copyDir(staticSrc, path.join(deployDir, ".next", "static"));
copyDir(publicSrc, path.join(deployDir, "public"));
copyDir(staticSrc, path.join(deployDir, "public", "_next", "static"));
copyDir(staticSrc, path.join(deployDir, "_next", "static"));

// LiteSpeed serves files from the document root, not Next's public/ folder.
// /image/favicon.png must exist as deploy-cpanel/image/favicon.png.
const skipWebRoot = new Set([
  "server.js",
  "package.json",
  "package-lock.json",
  "node_modules",
  ".next",
  "tmp",
  "next-standalone-server.js",
]);
if (fs.existsSync(publicSrc)) {
  for (const name of fs.readdirSync(publicSrc, { withFileTypes: true })) {
    if (skipWebRoot.has(name.name)) continue;
    const from = path.join(publicSrc, name.name);
    const to = path.join(deployDir, name.name);
    if (name.isDirectory()) copyDir(from, to);
    else {
      fs.copyFileSync(from, to);
      console.log("Copied:", path.relative(root, from), "→", path.relative(root, to));
    }
  }
}

const generatedServer = path.join(deployDir, "server.js");
if (fs.existsSync(generatedServer)) {
  fs.copyFileSync(generatedServer, path.join(deployDir, "next-standalone-server.js"));
}
if (!fs.existsSync(passengerServer)) {
  console.error("Missing scripts/cpanel-server.js");
  process.exit(1);
}
fs.copyFileSync(passengerServer, generatedServer);
fs.writeFileSync(
  path.join(deployDir, "app.js"),
  'require("./server.js");\n'
);
console.log("Installed Passenger-compatible server.js (and app.js alias)");

const pkgPath = path.join(deployDir, "package.json");
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  pkg.scripts = { ...(pkg.scripts || {}), start: "node server.js" };
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}

const tmpDir = path.join(deployDir, "tmp");
fs.mkdirSync(tmpDir, { recursive: true });
fs.writeFileSync(
  path.join(tmpDir, "restart.txt"),
  `restart ${new Date().toISOString()} ${Date.now()}\n`
);

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

const staticN = countFiles(path.join(deployDir, ".next", "static"));
const publicN = countFiles(path.join(deployDir, "public"));
if (staticN < 5) {
  console.error(
    "\nERROR: deploy-cpanel/.next/static looks empty or missing.",
    "\nLocal images and JS chunks will 404 on the server.\n"
  );
  process.exit(1);
}
if (publicN < 1) {
  console.error(
    "\nERROR: deploy-cpanel/public is missing or empty.",
    "\nURLs like /image/... will 404.\n"
  );
  process.exit(1);
}
if (!fs.existsSync(path.join(deployDir, "server.js"))) {
  console.error("\nERROR: deploy-cpanel/server.js is missing.\n");
  process.exit(1);
}

console.log(
  `Verified: ${staticN} files under deploy-cpanel/.next/static, ${publicN} under deploy-cpanel/public`
);
console.log("\nReady to upload the CONTENTS of: deploy-cpanel/");
console.log("cPanel startup file: server.js");
console.log("cPanel application root: the folder that contains server.js");
console.log("Application mode: Production, Node.js 20\n");
