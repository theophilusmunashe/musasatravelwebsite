import TourGuidesClient from "./components/TourGuidesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour Guides - Musasa Travel",
  description:
    "Explore through the eyes of passionate experts who breathe life into every landmark and hidden trail. Six certified guides covering wildlife, adventure, culture, photography, and birding.",
};

export default function TourGuidesPage() {
  return <TourGuidesClient />;
}
