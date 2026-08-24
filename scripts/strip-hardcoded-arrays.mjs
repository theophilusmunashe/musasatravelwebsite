import { readFileSync, writeFileSync } from "fs";

function stripArray(file, constName) {
  const src = readFileSync(file, "utf8");
  const startToken = `const ${constName}`;
  const start = src.indexOf(startToken);
  if (start < 0) throw new Error(constName);
  const end = src.indexOf("\n];", src.indexOf("[", start));
  const after = end + 3;
  const next = src.slice(after).replace(/^\s*\n/, "\n");
  writeFileSync(file, src.slice(0, start) + next);
  console.log("stripped", constName, "from", file);
}

stripArray("app/(root)/services/activities/components/ActivitiesClient.tsx", "ACTIVITIES");
stripArray("app/(root)/services/accommodation/components/AccommodationClient.tsx", "ACCOMMODATIONS");
stripArray("app/(root)/services/tour-guides/components/TourGuidesClient.tsx", "GUIDES");
stripArray("app/(root)/services/shuttle-services/components/ShuttleClient.tsx", "SERVICES");
stripArray("app/(root)/services/customized-itinerary/components/ItineraryClient.tsx", "ITINERARIES");
