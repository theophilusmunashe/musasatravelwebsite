import { notFound } from "next/navigation";
import PackageDetail from "./PackageDetail";
import JsonLd from "../../../../components/JsonLd";
import {
  getRelatedTravelPackages,
  getTravelPackageBySlug,
  getTravelPackageSlugs,
} from "@/lib/travel-packages";
import {
  breadcrumbsJsonLd,
  packageTripJsonLd,
  pageMeta,
  truncateMeta,
} from "@/lib/seo";

export const revalidate = 300;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = await getTravelPackageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const pkg = await getTravelPackageBySlug(params.slug);
  if (!pkg) {
    return { title: "Safari package not found" };
  }
  return pageMeta({
    title: `${pkg.name} Safari Package`,
    description: truncateMeta(
      pkg.description ||
        `${pkg.tagline} Book this ${pkg.days}-day Victoria Falls and Africa safari with Musasa Travel.`
    ),
    path: `/packages/${pkg.slug}`,
    keywords: [
      pkg.name,
      "Victoria Falls safari package",
      "Musasa Travel",
      ...(pkg.destinations || []),
    ],
    image: pkg.image,
  });
}

export default async function PackageSlugPage({ params }: Props) {
  const pkg = await getTravelPackageBySlug(params.slug);
  if (!pkg) notFound();
  const related = await getRelatedTravelPackages(pkg.slug, pkg.region);
  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Home", path: "/" },
          { name: "Packages", path: "/packages" },
          { name: pkg.name, path: `/packages/${pkg.slug}` },
        ])}
      />
      <JsonLd data={packageTripJsonLd(pkg)} />
      <PackageDetail pkg={pkg} related={related} />
    </>
  );
}
