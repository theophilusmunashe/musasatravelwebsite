import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description:
      "Book Victoria Falls tours, safaris, lodges and airport transfers with Musasa Travel & Tours.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#F59E0B",
    lang: "en-ZW",
    icons: [
      {
        src: "/image/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
