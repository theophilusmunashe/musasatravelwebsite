import PackagesClient from "./components/PackagesClient";
import JsonLd from "../../../components/JsonLd";
import { getTravelPackages } from "@/lib/travel-packages";
import { breadcrumbsJsonLd, itemListJsonLd, pageMeta } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMeta({
  title: "Victoria Falls Safari Packages",
  description:
    "Book Victoria Falls safari packages with Musasa Travel — curated trips covering the Falls, Hwange, Botswana, Zambia and beach extensions across Southern Africa.",
  path: "/packages",
  keywords: [
    "Victoria Falls safari packages",
    "Victoria Falls travel package",
    "Zimbabwe safari package",
    "Hwange safari package",
    "Botswana safari package",
    "Musasa Travel packages",
  ],
});

export default async function PackagesPage() {
  const packages = await getTravelPackages();
  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Home", path: "/" },
          { name: "Victoria Falls safari packages", path: "/packages" },
        ])}
      />
      {packages.length > 0 && (
        <JsonLd
          data={itemListJsonLd(
            "Victoria Falls safari packages",
            packages.map((pkg) => ({
              name: pkg.name,
              path: `/packages/${pkg.slug}`,
            }))
          )}
        />
      )}
      <PackagesClient packages={packages} />
    </>
  );
}
