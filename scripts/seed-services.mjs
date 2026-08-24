import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "next-sanity";
import { readFile } from "fs/promises";

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
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID.");
  process.exit(1);
}
if (!token) {
  console.error("Set SANITY_API_TOKEN in .env.local.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

async function uploadImage(url, filename) {
  if (!url) return null;
  const res = await fetch(url, { headers: { "User-Agent": "MusasaTravelSeed/1.0" } });
  if (!res.ok) throw new Error(`Image download failed (${res.status}) ${filename}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buffer, { filename });
}

function imageField(asset, alt) {
  if (!asset) return undefined;
  return { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt };
}

async function loadJson(name) {
  const raw = await readFile(resolve(process.cwd(), "scripts/data", name), "utf8");
  return JSON.parse(raw);
}

async function seedDocs(type, items, buildDoc) {
  for (const item of items) {
    try {
      const doc = await buildDoc(item);
      await client.createOrReplace(doc);
      console.log("Seeded:", type, item.name);
    } catch (err) {
      console.error("Failed:", type, item.name, err instanceof Error ? err.message : err);
      process.exitCode = 1;
    }
  }
}

async function main() {
  const activities = await loadJson("activities.json");
  const stays = await loadJson("stays.json");
  const guides = await loadJson("guides.json");
  const transfers = await loadJson("transfers.json");
  const itineraries = await loadJson("itineraries.json");

  await seedDocs("activity", activities, async (item) => {
    const asset = await uploadImage(item.image, `${item.id}.jpg`);
    const gallery = [];
    for (const [i, url] of (item.gallery || []).entries()) {
      if (!url) continue;
      const g = await uploadImage(url, `${item.id}-g${i}.jpg`);
      if (g) gallery.push({ _type: "image", _key: `g${i}`, asset: { _type: "reference", _ref: g._id } });
    }
    return {
      _id: `activity-${item.id}`,
      _type: "activity",
      name: item.name,
      slug: { _type: "slug", current: item.id },
      tagline: item.tagline,
      category: item.category,
      image: imageField(asset, item.name),
      gallery,
      duration: item.duration,
      groupSize: item.groupSize,
      price: item.price,
      priceNum: item.priceNum,
      rating: item.rating,
      reviews: item.reviews,
      difficultyLabel: item.difficultyLabel || item.difficulty?.label,
      difficultyColor: item.difficultyColor || item.difficulty?.color,
      badge: item.badge,
      highlights: item.highlights,
      description: item.description,
      displayOrder: item.displayOrder,
    };
  });

  await seedDocs("stay", stays, async (item) => {
    const asset = await uploadImage(item.image, `${item.id}.jpg`);
    return {
      _id: `stay-${item.id}`,
      _type: "stay",
      name: item.name,
      slug: { _type: "slug", current: item.id },
      tagline: item.tagline,
      category: item.category,
      image: imageField(asset, item.name),
      location: item.location,
      country: item.country,
      price: item.price,
      priceNum: item.priceNum,
      rating: item.rating,
      reviews: item.reviews,
      nights: item.nights,
      guests: item.guests,
      badge: item.badge,
      amenities: item.amenities,
      highlights: item.highlights,
      description: item.description,
      displayOrder: item.displayOrder,
    };
  });

  await seedDocs("tourGuide", guides, async (item) => {
    const asset = await uploadImage(item.image, `${item.id}.jpg`);
    return {
      _id: `tourGuide-${item.id}`,
      _type: "tourGuide",
      name: item.name,
      slug: { _type: "slug", current: item.id },
      role: item.role,
      specialty: item.specialty,
      image: imageField(asset, item.name),
      experience: item.experience,
      languages: item.languages,
      rating: item.rating,
      reviews: item.reviews,
      badge: item.badge,
      certifications: item.certifications,
      highlights: item.highlights,
      bio: item.bio,
      displayOrder: item.displayOrder,
    };
  });

  await seedDocs("transfer", transfers, async (item) => {
    const asset = await uploadImage(item.image, `${item.id}.jpg`);
    return {
      _id: `transfer-${item.id}`,
      _type: "transfer",
      name: item.name,
      slug: { _type: "slug", current: item.id },
      tagline: item.tagline,
      type: item.type,
      image: imageField(asset, item.name),
      price: item.price,
      priceNum: item.priceNum,
      duration: item.duration,
      capacity: item.capacity,
      badge: item.badge,
      amenities: item.amenities,
      routes: item.routes,
      highlights: item.highlights,
      description: item.description,
      displayOrder: item.displayOrder,
    };
  });

  await seedDocs("itinerary", itineraries, async (item) => {
    const asset = await uploadImage(item.image, `${item.id}.jpg`);
    return {
      _id: `itinerary-${item.id}`,
      _type: "itinerary",
      name: item.name,
      slug: { _type: "slug", current: item.id },
      tagline: item.tagline,
      image: imageField(asset, item.name),
      days: item.days,
      filter: item.filter,
      destinations: item.destinations,
      price: item.price,
      priceNum: item.priceNum,
      groupSize: item.groupSize,
      badge: item.badge,
      highlights: item.highlights,
      description: item.description,
      displayOrder: item.displayOrder,
    };
  });

  console.log(process.exitCode ? "Finished with errors." : "Done. Open /studio → Services.");
}

main();
