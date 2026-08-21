import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "next-sanity";
import { SEED_TRAVEL_PACKAGES } from "./data/travel-packages.mjs";

function loadEnvFile(filename, { override = false } = {}) {
  const path = resolve(process.cwd(), filename);
  if (!existsSync(path)) return;
  for (const raw of readFileSync(path, "utf8").split(/\r?\n/)) {
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
    if (override || process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local", { override: true });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-31";

if (!projectId || projectId === "REPLACE_WITH_NEW_PROJECT_ID") {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID to your new Sanity project ID.");
  process.exit(1);
}
if (!token) {
  console.error("Set SANITY_API_TOKEN in .env.local (Editor token from the new project).");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function uploadImage(url, filename) {
  const res = await fetch(url, {
    headers: { "User-Agent": "MusasaTravelSeed/1.0" },
  });
  if (!res.ok) {
    throw new Error(`Image download failed (${res.status}) for ${filename}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buffer, { filename });
}

async function seedOne(pkg) {
  const asset = await uploadImage(pkg.image, `${pkg.id}.jpg`);
  const doc = {
    _id: `travelPackage-${pkg.id}`,
    _type: "travelPackage",
    name: pkg.name,
    slug: { _type: "slug", current: pkg.id },
    tagline: pkg.tagline,
    region: pkg.region,
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: pkg.name,
    },
    days: pkg.days,
    destinations: pkg.destinations,
    groupSize: pkg.groupSize,
    badge: pkg.badge || undefined,
    includes: pkg.includes,
    highlights: pkg.highlights,
    description: pkg.description,
    rating: pkg.rating,
    displayOrder: pkg.displayOrder,
  };
  await client.createOrReplace(doc);
  console.log("Seeded:", pkg.name);
}

async function main() {
  console.log(`Seeding ${SEED_TRAVEL_PACKAGES.length} packages into dataset "${dataset}"…`);
  for (const pkg of SEED_TRAVEL_PACKAGES) {
    try {
      await seedOne(pkg);
    } catch (err) {
      console.error("Failed:", pkg.name, err instanceof Error ? err.message : err);
      process.exitCode = 1;
    }
  }
  if (process.exitCode) {
    console.error("Finished with errors.");
  } else {
    console.log("Done. Open /studio → Travel Packages to review.");
  }
}

main();
