import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PackageDetail from "./PackageDetail";
import {
  getRelatedTravelPackages,
  getTravelPackageBySlug,
  getTravelPackageSlugs,
} from "@/lib/travel-packages";

export const revalidate = 300;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = await getTravelPackageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = await getTravelPackageBySlug(params.slug);
  if (!pkg) {
    return { title: "Package not found" };
  }
  return {
    title: pkg.name,
    description: pkg.description,
    openGraph: {
      title: `${pkg.name} | Musasa Travel & Tours`,
      description: pkg.tagline,
      url: `/packages/${pkg.slug}`,
    },
  };
}

export default async function PackageSlugPage({ params }: Props) {
  const pkg = await getTravelPackageBySlug(params.slug);
  if (!pkg) notFound();
  const related = await getRelatedTravelPackages(pkg.slug, pkg.region);
  return <PackageDetail pkg={pkg} related={related} />;
}
