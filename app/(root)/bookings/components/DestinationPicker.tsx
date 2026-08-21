"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { BOOKING_DESTINATION_ORDER, BOOKING_DESTINATIONS, type BookingDestinationId } from "@/lib/booking-destinations";

type Props = {
  onSelect: (id: BookingDestinationId) => void;
};

export default function DestinationPicker({ onSelect }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-3xl mx-auto mb-14 md:mb-20"
      >
        <p className="text-amber-400/95 text-xs font-bold uppercase tracking-[0.28em] mb-4">Musasa Travel</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
          Where would you like
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">
            Musasa to take you?
          </span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-white/50 leading-relaxed">
          Choose a destination to open the trip planner. Each region has its own experiences, stays, and indicative rates — then
          send everything in one enquiry by email and WhatsApp.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
        {BOOKING_DESTINATION_ORDER.map((id, index) => {
          const d = BOOKING_DESTINATIONS[id];
          return (
            <motion.button
              key={id}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onSelect(id)}
              className="group relative text-left rounded-[28px] overflow-hidden ring-1 ring-white/10 bg-zinc-900 min-h-[220px] sm:min-h-[260px] shadow-[0_24px_80px_rgba(0,0,0,0.45)] hover:ring-amber-400/40 transition-all hover:-translate-y-1 hover:shadow-amber-900/20"
            >
              <Image
                src={d.bannerImage}
                alt={`${d.label}, ${d.region}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-55 group-hover:opacity-70"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${d.pickerCardClass}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="relative z-10 flex flex-col justify-end h-full min-h-[220px] sm:min-h-[260px] p-6 md:p-8">
                <div className="flex items-center gap-2 text-white/40 text-[11px] font-bold uppercase tracking-widest mb-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400/90" />
                  {d.region}
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">{d.label}</h2>
                <p className="mt-2 text-sm text-white/55 leading-relaxed line-clamp-2">{d.pickerTeaser}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-amber-300 text-sm font-bold">
                  Start planning
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 group-hover:bg-amber-500 group-hover:text-black group-hover:ring-amber-400 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
