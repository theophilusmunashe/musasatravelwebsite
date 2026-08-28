/**
 * cPanel / CloudLinux Passenger entry for the Next.js standalone build.
 *
 * LiteSpeed serves files that exist at the document root. Next must not be
 * given a hostname of 127.0.0.1 / 0.0.0.0 — that 400s CSS and images when
 * the browser Host header is www.musasatravel.com.
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
const BLOCKED_ROOT = new Set([
  "server.js",
  "package.json",
  "package-lock.json",
  "node_modules",
  ".next",
  "tmp",
  "next-standalone-server.js",
]);

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

function pathnameFrom(req) {
  const raw = req.url || "/";
  try {
    if (/^https?:\/\//i.test(raw)) {
      return new URL(raw).pathname || "/";
    }
  } catch {
    // fall through to url.parse
  }
  return parse(raw, true).pathname || "/";
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
  if (!rel || rel.split(/[/\\]/).includes("..")) return null;
  if (BLOCKED_ROOT.has(rel.split(/[/\\]/)[0])) return null;

  if (decoded.startsWith("/_next/static/")) {
    const staticRel = decoded.slice("/_next/static/".length);
    return (
      resolveUnder(path.join(__dirname, "_next", "static"), staticRel) ||
      resolveUnder(path.join(__dirname, ".next", "static"), staticRel) ||
      resolveUnder(path.join(__dirname, "public", "_next", "static"), staticRel)
    );
  }

  return (
    resolveUnder(__dirname, rel) ||
    resolveUnder(path.join(__dirname, "public"), rel)
  );
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  res.statusCode = 200;
  res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  fs.createReadStream(filePath).pipe(res);
}

function sendMissing(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("Not Found");
}

const app = next({
  dev: false,
  dir: __dirname,
});
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer((req, res) => {
      const pathname = pathnameFrom(req);
      const filePath = fileForUrl(pathname);
      if (filePath) {
        sendFile(res, filePath);
        return;
      }
      if (pathname.startsWith("/_next/static/") || pathname.startsWith("/image/")) {
        sendMissing(res);
        return;
      }
      handle(req, res, parse(req.url || "/", true));
    });

    if (typeof PhusionPassenger !== "undefined") {
      server.listen("passenger", () => {
        console.log("Musasa Next.js ready (Passenger)");
      });
      return;
    }

    server.listen(port, "0.0.0.0", () => {
      console.log(`Musasa Next.js ready on 0.0.0.0:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start Next.js on cPanel:", error);
    process.exit(1);
  });
