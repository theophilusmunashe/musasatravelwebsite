"use client";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRight,
  BedDouble,
  PartyPopper,
  Wine,
  Palette,
} from "lucide-react";

const SERVICES = [
  {
    icon: <BedDouble className="w-7 h-7" />,
    title: "Private Stays",
    href: "/#the-estate",
    description:
      "Six beautifully designed en-suite bedrooms on 2.5 hectares of serene land — the perfect peaceful escape, with versatile entertainment spaces and Victoria Falls in the far distance.",
  },
  {
    icon: <PartyPopper className="w-7 h-7" />,
    title: "Events & Celebrations",
    href: "/bookings",
    description:
      "Host weddings, conferences, and intimate celebrations in an elegant private setting where nature, privacy, and warm hospitality come together effortlessly.",
  },
  {
    icon: <Wine className="w-7 h-7" />,
    title: "Wine Tasting",
    href: "/#experiences",
    description:
      "Savour curated wine tasting evenings on the estate — relaxed, refined, and framed by open skies with the mist of Victoria Falls on the horizon.",
  },
  {
    icon: <Palette className="w-7 h-7" />,
    title: "Sip & Paint",
    href: "/#experiences",
    description:
      "Unwind at our sip and paint events overlooking Victoria Falls in the far distance — creativity, conversation, and a glass in hand as the sun sets.",
  },
];

export default function Service() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="scroll-mt-24 bg-[#111] py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.3em] mb-3">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              A Sanctuary for{" "}
              <span className="text-amber-400">Every Occasion</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs md:text-right leading-relaxed">
            From peaceful getaways to grand celebrations — all on one private
            estate overlooking Victoria Falls.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-amber-500/50 via-amber-500/10 to-transparent mb-14" />

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.08,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link href={item.href} className="group block h-full">
                <div className="h-full flex flex-col bg-[#1a1a1a] border border-white/5 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300 hover:bg-[#1f1f1f] hover:shadow-xl hover:shadow-amber-500/5">

                  {/* Icon */}
                  <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mb-5 text-amber-400 group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-500 transition-all duration-300">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-base mb-3 group-hover:text-amber-400 transition-colors duration-300 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/45 text-sm leading-relaxed flex-1 mb-6">
                    {item.description}
                  </p>

                  {/* Link */}
                  <div className="flex items-center gap-1.5 text-amber-500 text-xs font-semibold uppercase tracking-wider group-hover:gap-2.5 transition-all duration-300">
                    <span>Explore</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
