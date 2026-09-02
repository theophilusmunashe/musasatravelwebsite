"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { TravelPackage } from "@/lib/travel-packages";
import { useLiveTravelPackages } from "@/lib/use-live-packages";
import CardPhoto from "@/components/CardPhoto";

export default function FeaturedJourneys({
  packages: initialPackages,
}: {
  packages: TravelPackage[];
}) {
  const packages = useLiveTravelPackages(initialPackages);
  if (!packages.length) return null;

  return (
    <section className="bg-[#0a0a0a] text-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-2">
            Featured
          </p>
          <h2 className="text-3xl md:text-4xl font-black">Victoria Falls Safari Packages</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group relative h-96 overflow-hidden rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors"
            >
              <CardPhoto
                src={pkg.image}
                gallery={pkg.gallery}
                alt={pkg.imageAlt || pkg.name}
                title={pkg.name}
                subtitle={pkg.tagline}
                sizes="(max-width: 768px) 100vw, 33vw"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </CardPhoto>
              <Link
                href={`/packages/${pkg.slug}`}
                className="absolute bottom-0 left-0 right-0 z-[4] p-5"
              >
                {pkg.badge && (
                  <span className="inline-block bg-amber-500 text-black text-xs font-bold px-2.5 py-1 rounded-full mb-2">
                    {pkg.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold group-hover:text-amber-400 transition-colors">
                  {pkg.name}
                </h3>
                <p className="text-white/60 text-sm mt-1">{pkg.tagline}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-xl transition-colors"
          >
            All Journeys
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
