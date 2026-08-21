"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import type { BookingDestination } from "@/lib/booking-destinations";

type Props = {
  destination: BookingDestination;
};

export default function BookingBanner({ destination }: Props) {
  const count = useCartStore((s) => s.getTotalItems());
  return (
    <div className="relative min-h-[52vh] md:min-h-[55vh] flex items-end overflow-hidden">
      <Image
        src={destination.bannerImage}
        alt={`${destination.label} — book with Musasa Travel`}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/92" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pb-12 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.3em] mb-3">{destination.listPageKicker}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4">
            Book Your
            <span className="block text-amber-400">{destination.bannerTitleAccent}</span>
          </h1>
          <p className="text-white/65 text-base md:text-lg max-w-2xl leading-relaxed">{destination.bannerSubtitle}</p>
          {count > 0 && (
            <div className="mt-5 inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-200 text-sm px-4 py-2 rounded-full">
              <ShoppingBag className="w-4 h-4" />
              {count} item{count !== 1 ? "s" : ""} in your cart — we&apos;ll fold them into your {destination.label} enquiry
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
