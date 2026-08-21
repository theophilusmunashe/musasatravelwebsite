"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  MapPin,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import { useCartStore } from "@/lib/cartStore";
import type { TravelPackage } from "@/lib/travel-packages";

export default function PackageDetail({
  pkg,
  related,
}: {
  pkg: TravelPackage;
  related: TravelPackage[];
}) {
  const [added, setAdded] = useState(false);
  const { addItem, items, openCart } = useCartStore();
  const isInCart = items.some((i) => i.id === pkg.id);

  const handleAdd = () => {
    addItem({
      id: pkg.id,
      name: pkg.name,
      category: "activity",
      price: "Price on request",
      priceNum: 0,
      image: pkg.image,
      duration: `${pkg.days} days`,
      description: pkg.tagline,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
    toast.success(`${pkg.name} added to your trip!`, {
      icon: "✈️",
      style: { background: "#1a1a1a", color: "#fff", border: "1px solid #F59E0B", borderRadius: "12px" },
    });
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.imageAlt || pkg.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-black/20" />
        <div className="relative z-10 px-6 md:px-16 pb-14 max-w-7xl mx-auto w-full">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-white/70 hover:text-amber-400 text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All packages
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {pkg.badge && (
              <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                {pkg.badge}
              </span>
            )}
            <span className="bg-black/50 border border-white/10 text-xs font-bold px-3 py-1 rounded-full">
              {pkg.days} days
            </span>
            <span className="flex items-center gap-1 bg-black/50 border border-white/10 text-xs font-bold px-3 py-1 rounded-full">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              {pkg.rating}
            </span>
          </div>
          <p className="text-amber-400/80 text-sm uppercase tracking-[0.25em] mb-3">{pkg.tagline}</p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-4xl">{pkg.name}</h1>
        </div>
      </section>

      <section className="px-6 md:px-16 py-16 max-w-7xl mx-auto grid lg:grid-cols-[1fr_340px] gap-12">
        <div>
          <div className="flex flex-wrap gap-6 text-white/60 text-sm mb-8">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              {pkg.days} days
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              Group {pkg.groupSize}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-10">
            {pkg.destinations.map((d) => (
              <span
                key={d}
                className="flex items-center gap-1 bg-white/5 border border-white/10 text-white/70 text-sm px-3 py-1.5 rounded-full"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {d}
              </span>
            ))}
          </div>
          <p className="text-white/70 text-lg leading-relaxed mb-12">{pkg.description}</p>

          <h2 className="text-2xl font-bold mb-4">Highlights</h2>
          <ul className="grid sm:grid-cols-2 gap-3 mb-12">
            {pkg.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-white/70">
                <Check className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mb-4">Included</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {pkg.includes.map((inc) => (
              <span
                key={inc}
                className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm px-3 py-1 rounded-full"
              >
                {inc}
              </span>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 h-fit bg-[#111] border border-white/10 rounded-2xl p-6">
          <p className="text-white/50 text-sm mb-1">From Musasa Travel</p>
          <p className="text-2xl font-black mb-6">Price on request</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold mb-3 ${
              added || isInCart
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-amber-500 hover:bg-amber-400 text-black"
            }`}
          >
            {added || isInCart ? (
              <>
                <Check className="w-4 h-4" />
                Added to Trip
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                Add to Trip
              </>
            )}
          </motion.button>
          {isInCart && (
            <button
              onClick={openCart}
              className="w-full text-sm text-amber-400 hover:text-amber-300 mb-4"
            >
              View your trip
            </button>
          )}
          <Link
            href="/services/customized-itinerary"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold border border-white/15 hover:border-amber-400 hover:text-amber-400"
          >
            <Sparkles className="w-4 h-4" />
            Customise this journey
          </Link>
          <p className="text-white/40 text-xs mt-4 leading-relaxed">
            Final pricing is confirmed when you book. Add this package and send an enquiry — we
            typically reply within 24 hours.
          </p>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="px-6 md:px-16 pb-24 max-w-7xl mx-auto">
          <h2 className="text-2xl font-black mb-6">You might also like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/packages/${item.slug}`}
                className="group bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30"
              >
                <div className="relative h-40">
                  <Image
                    src={item.image}
                    alt={item.imageAlt || item.name}
                    fill
                    className="object-cover"
                    sizes="33vw"
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <p className="text-amber-400/70 text-xs uppercase tracking-widest mb-1">
                    {item.tagline}
                  </p>
                  <h3 className="font-bold group-hover:text-amber-400">{item.name}</h3>
                  <p className="text-white/40 text-sm mt-2 flex items-center gap-1">
                    View package <ArrowRight className="w-3.5 h-3.5" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
