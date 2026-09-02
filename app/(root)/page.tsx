import FormComponent from "../../components/FormComponent";
import Hero from "../../components/Hero";
import Industry from "../../components/Industry";
import FeaturedJourneys from "../../components/FeaturedJourneys";
import Note from "../../components/Note";
import Service from "../../components/Services";
import JsonLd from "../../components/JsonLd";
import { getTravelPackages } from "@/lib/travel-packages";
import { breadcrumbsJsonLd, itemListJsonLd, pageMeta } from "@/lib/seo";
import { pageRevalidate } from "@/lib/page-revalidate";

export const revalidate = pageRevalidate;

export const metadata = {
  ...pageMeta({
    title: "Musasa Travel & Tours — Rooted in Africa, Reaching the World",
    description:
      "Book Victoria Falls tours, safari packages, lodges and airport transfers with Musasa Travel — a local travel agency based in Victoria Falls, Zimbabwe.",
    path: "/",
    keywords: [
      "Victoria Falls tours",
      "book Victoria Falls",
      "Victoria Falls safari",
      "Musasa Travel",
      "Victoria Falls travel agency",
      "Zimbabwe safari packages",
      "Victoria Falls activities",
      "Victoria Falls airport transfer",
    ],
  }),
  title: {
    absolute: "Musasa Travel & Tours — Rooted in Africa, Reaching the World",
  },
};

export default async function Home() {
  const packages = await getTravelPackages();

  return (
    <main className="h-full">
      <JsonLd data={breadcrumbsJsonLd([{ name: "Home", path: "/" }])} />
      {packages.length > 0 && (
        <JsonLd
          data={itemListJsonLd(
            "Victoria Falls safari packages",
            packages.slice(0, 8).map((pkg) => ({
              name: pkg.name,
              path: `/packages/${pkg.slug}`,
            }))
          )}
        />
      )}
      <Hero />
      <Note />
      <Service />
      <Industry />
      <FeaturedJourneys packages={packages.slice(0, 3)} />
      <FormComponent />
    </main>
  );
}
