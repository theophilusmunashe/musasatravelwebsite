"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { SITE_NAME } from "@/lib/site";
import brandStory from "@/assets/brand_story.png";

const ESTATE_FEATURES = [
  "2.5 Hectares of Serene Land",
  "6 En-Suite Bedrooms",
  "Weddings & Celebrations",
  "Conferences & Retreats",
  "Wine Tasting Events",
  "Sip & Paint Evenings",
  "Victoria Falls Views",
  "Versatile Entertainment Spaces",
];

export default function Note() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="the-estate" ref={ref} className="scroll-mt-24 bg-[#0a0a0a] py-24 md:py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* ── Image column ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-amber-500/10 rounded-3xl blur-2xl" />
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-amber-500/50 rounded-tl-2xl" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-amber-500/50 rounded-br-2xl" />

          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
            <Image
              src={brandStory}
              alt={`${SITE_NAME} brand story`}
              className="w-full h-auto object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -bottom-6 -right-4 md:right-6 bg-amber-500 text-black rounded-2xl px-5 py-4 shadow-xl shadow-amber-500/30"
          >
            <p className="text-2xl font-black leading-none">2.5</p>
            <p className="text-xs font-semibold mt-0.5">Hectares of Serenity</p>
          </motion.div>
        </motion.div>

        {/* ── Text column ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="flex flex-col gap-6"
        >
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.3em]">
            Our Brand Story
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.05] tracking-tight">
            A Place Called{" "}
            <span className="text-amber-400">Home</span>
          </h2>

          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            Tucked away on 2.5 hectares of serene land, {SITE_NAME} is a private estate where
            nature, elegance, and privacy come together in perfect harmony. With 6 beautifully
            designed en-suite bedrooms and versatile entertainment spaces, Kumusha is the perfect
            setting for weddings, conferences, intimate celebrations, or simply a peaceful escape.
            Sip wine at sunset, join a sip and paint evening, and take in Victoria Falls shimmering
            in the far distance — every moment shaped by the belief that home is where you truly
            belong.
          </p>

          <div className="h-px bg-gradient-to-r from-amber-500/50 via-amber-500/10 to-transparent" />

          <div>
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              What the Estate Offers
            </p>
            <div className="flex flex-wrap gap-2">
              {ESTATE_FEATURES.map((feature, i) => (
                <motion.span
                  key={feature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                  className="bg-white/5 border border-white/10 hover:border-amber-500/40 hover:bg-amber-500/10 text-white/70 hover:text-amber-400 text-sm px-4 py-1.5 rounded-full transition-all duration-300 cursor-default"
                >
                  {feature}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.a
            href="/#services"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors group w-fit mt-2"
          >
            Explore our services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
