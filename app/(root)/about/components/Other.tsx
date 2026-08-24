"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { TravelPackage } from "@/lib/travel-packages";

export default function Other({ data }: { data: TravelPackage[] }) {
  if (!data.length) return null;

  return (
    <div className="max-w-6xl mx-auto py-12 md:px-0 px-4 space-y-8">
      <h4 className="text-lg sm:text-xl text-[#111] md:text-2xl lg:text-3xl font-medium">
        View Other Packages
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {data.map((pkg) => (
          <Link
            key={pkg.id}
            href={`/packages/${pkg.slug}`}
            className="group relative h-80 overflow-hidden rounded-2xl"
          >
            <Image
              src={pkg.image}
              alt={pkg.imageAlt || pkg.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-5 text-white">
              <h3 className="text-xl font-bold">{pkg.name}</h3>
              <p className="text-white/70 text-sm mt-1">{pkg.tagline}</p>
            </div>
          </Link>
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
