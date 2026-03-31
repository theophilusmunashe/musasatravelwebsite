"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const DESTINATIONS = [
  "Zimbabwe",
  "South Africa",
  "Namibia",
  "Mozambique",
  "Zambia",
  "Botswana",
  "Dubai",
  "Mauritius",
];

export default function Note() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-[#0a0a0a] py-24 md:py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* ── Image column ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Amber glow behind image */}
          <div className="absolute -inset-4 bg-amber-500/10 rounded-3xl blur-2xl" />

          {/* Decorative border frame */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-amber-500/50 rounded-tl-2xl" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-amber-500/50 rounded-br-2xl" />

          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
            <Image
              height={477}
              width={436}
              src="https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772533792/Gemini_Generated_Image_6m5qa66m5qa66m5q_u9gclh.png"
              alt="Musasa Travel brand story"
              className="w-full h-auto object-cover"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Floating stat badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -bottom-6 -right-4 md:right-6 bg-amber-500 text-black rounded-2xl px-5 py-4 shadow-xl shadow-amber-500/30"
          >
            <p className="text-2xl font-black leading-none">8+</p>
            <p className="text-xs font-semibold mt-0.5">Destinations</p>
          </motion.div>
        </motion.div>

        {/* ── Text column ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="flex flex-col gap-6"
        >
          {/* Overline */}
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.3em]">
            Our Brand Story
          </p>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.05] tracking-tight">
            Under the{" "}
            <span className="text-amber-400">Canopy</span>{" "}
            of Care
          </h2>

          {/* Body */}
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            In the African wild, the Musasa tree is legendary for its sprawling
            shade and deep, resilient roots. We founded Musasa Travel &amp; Tours
            on that same principle. Based in Victoria Falls, Zimbabwe, we act as
            your global canopy — offering a{" "}
            <span className="text-white/90 italic">&ldquo;covering&rdquo;</span>{" "}
            of safety, luxury, and seamless logistics no matter where you fly.
            While our heart is rooted in African soil, our reach spans
            continents, connecting you to the world&apos;s most breathtaking
            destinations with the stability of a true local expert.
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-amber-500/50 via-amber-500/10 to-transparent" />

          {/* Destinations */}
          <div>
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              Where Our Roots Reach
            </p>
            <div className="flex flex-wrap gap-2">
              {DESTINATIONS.map((dest, i) => (
                <motion.span
                  key={dest}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                  className="bg-white/5 border border-white/10 hover:border-amber-500/40 hover:bg-amber-500/10 text-white/70 hover:text-amber-400 text-sm px-4 py-1.5 rounded-full transition-all duration-300 cursor-default"
                >
                  {dest}
                </motion.span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.a
            href="/about"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors group w-fit mt-2"
          >
            Learn more about us
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
