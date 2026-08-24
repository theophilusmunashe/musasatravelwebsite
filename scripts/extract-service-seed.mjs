import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

function extractArray(file, name) {
  const src = readFileSync(file, "utf8");
  const startToken = `const ${name}`;
  const start = src.indexOf(startToken);
  if (start < 0) throw new Error(`Missing ${name} in ${file}`);
  const bracket = src.indexOf("[", start);
  const end = src.indexOf("\n];", bracket);
  if (end < 0) throw new Error(`Could not close ${name} in ${file}`);
  const literal = src.slice(bracket, end + 2);
  return Function(`"use strict"; return (${literal});`)();
}

const root = resolve(process.cwd());
const outDir = resolve(root, "scripts/data");
mkdirSync(outDir, { recursive: true });

const activities = extractArray(
  resolve(root, "app/(root)/services/activities/components/ActivitiesClient.tsx"),
  "ACTIVITIES"
).map((item, i) => ({
  ...item,
  difficultyLabel: item.difficulty?.label ?? "Easy",
  difficultyColor: item.difficulty?.color ?? "text-green-400",
  displayOrder: i + 1,
}));

const stays = extractArray(
  resolve(root, "app/(root)/services/accommodation/components/AccommodationClient.tsx"),
  "ACCOMMODATIONS"
).map((item, i) => ({ ...item, displayOrder: i + 1 }));

const guides = extractArray(
  resolve(root, "app/(root)/services/tour-guides/components/TourGuidesClient.tsx"),
  "GUIDES"
).map((item, i) => ({ ...item, displayOrder: i + 1 }));

const transfers = extractArray(
  resolve(root, "app/(root)/services/shuttle-services/components/ShuttleClient.tsx"),
  "SERVICES"
).map((item, i) => ({ ...item, displayOrder: i + 1 }));

const itineraries = extractArray(
  resolve(root, "app/(root)/services/customized-itinerary/components/ItineraryClient.tsx"),
  "ITINERARIES"
).map((item, i) => ({ ...item, displayOrder: i + 1 }));

function write(name, data) {
  const path = resolve(outDir, name);
  writeFileSync(path, JSON.stringify(data, null, 2));
  console.log(name, data.length);
}

write("activities.json", activities);
write("stays.json", stays);
write("guides.json", guides);
write("transfers.json", transfers);
write("itineraries.json", itineraries);
