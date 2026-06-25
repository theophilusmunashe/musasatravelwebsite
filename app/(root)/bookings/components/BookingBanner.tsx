"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

export default function BookingBanner() {
  const count = useCartStore((s) => s.getTotalItems());
  return (
    <div className="relative min-h-[55vh] flex items-end overflow-hidden">
      <Image
        src="https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711417/victoria-falls_kzd1kp.jpg"
        alt="Victoria Falls booking"
        fill className="object-cover" priority sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pb-14">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.3em] mb-3">Plan Your Visit</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4">
            Book Your
            <span className="block text-amber-400">Estate Experience</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">
            {count > 0
              ? `You have ${count} item${count !== 1 ? "s" : ""} pre-selected. Complete your details below and we'll confirm availability by email.`
              : "Tell us about your stay, wedding, conference, or event — our team will respond by email within 24 hours on business days."}
          </p>
          {count > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-sm px-4 py-2 rounded-full">
              <ShoppingBag className="w-4 h-4" />
              {count} pre-selected item{count !== 1 ? "s" : ""} loaded into your form
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
