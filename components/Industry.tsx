"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const EXPERIENCES = [
  {
    id: "1",
    slug: "weddings",
    mainImage: "/image/victoria-falls.jpg",
    name: "Weddings",
    tagline: "Say I do surrounded by nature",
  },
  {
    id: "2",
    slug: "conferences",
    mainImage: "/image/zimbabwe.jpg",
    name: "Conferences",
    tagline: "Retreats with room to breathe",
  },
  {
    id: "3",
    slug: "wine-tasting",
    mainImage: "/image/south-africa.jpg",
    name: "Wine Tasting",
    tagline: "Evenings of flavour and calm",
  },
  {
    id: "4",
    slug: "sip-and-paint",
    mainImage: "/image/namibia.jpg",
    name: "Sip & Paint",
    tagline: "Creativity with a view",
  },
  {
    id: "5",
    slug: "celebrations",
    mainImage: "/image/zambia.jpg",
    name: "Celebrations",
    tagline: "Intimate gatherings, beautifully hosted",
  },
  {
    id: "6",
    slug: "peaceful-escape",
    mainImage: "/image/botswana.jpg",
    name: "Peaceful Escape",
    tagline: "Victoria Falls in the far distance",
  },
];

const Industry = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experiences" ref={ref} className="scroll-mt-24 bg-[#0a0a0a] py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.3em] mb-3">
              On the Estate
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Gatherings &{" "}
              <span className="text-amber-400">Experiences</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-sm md:text-right leading-relaxed">
            Versatile entertainment spaces across 2.5 hectares — from grand
            celebrations to quiet evenings with wine and a canvas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXPERIENCES.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <Link
                href="/bookings"
                className="relative h-80 md:h-96 overflow-hidden group block rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors"
              >
                <Image
                  src={item.mainImage}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 duration-500 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-white font-bold text-xl mb-1">{item.name}</h4>
                  <p className="text-white/60 text-sm">{item.tagline}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/bookings" className="btn btn-primary hvr-fill-black inline-flex items-center gap-2">
            Join Us
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Industry;
