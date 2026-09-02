"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { TravelPackage } from "@/lib/travel-packages";
import CardPhoto from "@/components/CardPhoto";

export default function Other({ data }: { data: TravelPackage[] }) {
  if (!data.length) return null;

  return (
    <div className="max-w-6xl mx-auto py-12 md:px-0 px-4 space-y-8">
      <h4 className="text-lg sm:text-xl text-[#111] md:text-2xl lg:text-3xl font-medium">
        View Other Packages
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {data.map((pkg) => (
          <div key={pkg.id} className="group relative h-80 overflow-hidden rounded-2xl">
            <CardPhoto
              src={pkg.image}
              gallery={pkg.gallery}
              alt={pkg.imageAlt || pkg.name}
              title={pkg.name}
              subtitle={pkg.tagline}
              sizes="(max-width: 768px) 100vw, 33vw"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </CardPhoto>
            <Link href={`/packages/${pkg.slug}`} className="absolute bottom-0 left-0 right-0 z-[4] p-5 text-white">
              <h3 className="text-xl font-bold">{pkg.name}</h3>
              <p className="text-white/70 text-sm mt-1">{pkg.tagline}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Link href="/packages" className="btn btn-primary hvr-fill-black">
          View Our Packages
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
