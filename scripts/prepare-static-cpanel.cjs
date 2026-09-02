/**
 * Copy LiteSpeed/PHP helpers into Next's static `out/` folder for cPanel FTP.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "out");
const phpSrc = path.join(__dirname, "cpanel-php");
const htaccessSrc = path.join(__dirname, "cpanel-static.htaccess");

function loadEnvFile(filename) {
  const file = path.join(root, filename);
  if (!fs.existsSync(file)) return;
  for (const raw of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

if (!fs.existsSync(path.join(outDir, "index.html"))) {
  console.error("Missing out/index.html — run the cPanel static build first.");
  process.exit(1);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

copyDir(phpSrc, path.join(outDir, "api"));
fs.copyFileSync(htaccessSrc, path.join(outDir, ".htaccess"));

const mailConfig = {
  resend_key: process.env.RESEND_API_KEY || "",
  resend_from: process.env.RESEND_FROM || "Musasa Travel <onboarding@resend.dev>",
  contact_to: process.env.CONTACT_EMAIL_TO || "info@musasatravel.com",
  bookings_to: process.env.BOOKINGS_EMAIL_TO || "bookings@musasatravel.com",
  enquiries_to: process.env.ENQUIRIES_EMAIL_TO || "enquiries@musasatravel.com",
};

fs.writeFileSync(
  path.join(outDir, "api", "mail-config.php"),
  "<?php\nreturn json_decode(" + JSON.stringify(JSON.stringify(mailConfig)) + ", true);\n"
);

if (!mailConfig.resend_key) {
  console.warn(
    "WARNING: RESEND_API_KEY is empty. Contact/booking forms on cPanel will return 503 until the GitHub secret is set."
  );
}

function safeDirName(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sanitizeExportDirs(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const from = path.join(dir, entry.name);
    sanitizeExportDirs(from);
    const next = safeDirName(entry.name);
    if (!next || next === entry.name) continue;
    const to = path.join(dir, next);
    if (fs.existsSync(to)) {
      console.warn(`Skipping rename of "${entry.name}" — "${next}" already exists`);
      continue;
    }
    fs.renameSync(from, to);
    console.log(`Renamed unsafe export folder "${entry.name}" → "${next}"`);
  }
}

sanitizeExportDirs(path.join(outDir, "packages"));
sanitizeExportDirs(path.join(outDir, "services"));

const favicon = path.join(outDir, "image", "favicon.png");
if (!fs.existsSync(favicon)) {
  console.error("Missing out/image/favicon.png");
  process.exit(1);
}

console.log("cPanel static bundle ready in out/ (index.html + .htaccess + PHP mail).");
