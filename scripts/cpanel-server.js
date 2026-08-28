/**
 * cPanel / CloudLinux Passenger entry for the Next.js standalone build.
 * Serves /_next/static and public files from disk first so LiteSpeed/Passenger
 * cannot 400 them when the public Host header is www.musasatravel.com.
 */
process.env.NODE_ENV = "production";
process.chdir(__dirname);

if (typeof PhusionPassenger !== "undefined") {
  PhusionPassenger.configure({ autoInstall: false });
}

const fs = require("fs");
const path = require("path");
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const hostname = "0.0.0.0";
const MIME = {
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

function resolveUnder(rootDir, rel) {
  const root = path.resolve(rootDir);
  const resolved = path.resolve(root, rel);
  if (resolved !== root && !resolved.startsWith(root + path.sep)) {
    return null;
  }
  try {
    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
      return resolved;
    }
  } catch {
    return null;
  }
  return null;
}

function fileForUrl(pathname) {
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  if (!decoded || decoded.includes("\0")) return null;
  const rel = decoded.replace(/^\/+/, "");
  if (rel.split(/[/\\]/).includes("..")) return null;

  if (decoded.startsWith("/_next/static/")) {
    const staticRel = decoded.slice("/_next/static/".length);
    return (
      resolveUnder(path.join(__dirname, ".next", "static"), staticRel) ||
      resolveUnder(path.join(__dirname, "public", "_next", "static"), staticRel) ||
      resolveUnder(path.join(__dirname, "_next", "static"), staticRel)
    );
  }

  return resolveUnder(path.join(__dirname, "public"), rel);
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  fs.createReadStream(filePath).pipe(res);
}

const app = next({
  dev: false,
  dir: __dirname,
  hostname,
  port,
});
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer((req, res) => {
      const parsedUrl = parse(req.url || "/", true);
      const filePath = fileForUrl(parsedUrl.pathname || "/");
      if (filePath) {
        sendFile(res, filePath);
        return;
      }
      handle(req, res, parsedUrl);
    });

    if (typeof PhusionPassenger !== "undefined") {
      server.listen("passenger", () => {
        console.log("Musasa Next.js ready (Passenger)");
      });
      return;
    }

    server.listen(port, hostname, () => {
      console.log(`Musasa Next.js ready on ${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start Next.js on cPanel:", error);
    process.exit(1);
  });
