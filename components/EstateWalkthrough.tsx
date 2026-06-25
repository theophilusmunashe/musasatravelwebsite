"use client";

import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Footprints } from "lucide-react";

const EstatePanoramaViewer = dynamic(() => import("./EstatePanoramaViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center bg-[#111]">
      <div className="flex flex-col items-center gap-3 text-white/40">
        <Footprints className="h-8 w-8 animate-pulse text-amber-400/60" aria-hidden />
        <p className="text-sm">Loading estate walkthrough…</p>
      </div>
    </div>
  ),
});

export default function EstateWalkthrough() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section
      id="estate-walkthrough"
      ref={ref}
      className="scroll-mt-24 bg-[#0a0a0a] px-6 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
              Virtual Tour
            </p>
            <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">
              Walk Through{" "}
              <span className="text-amber-400">Our Estate</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/40 md:text-right">
            Step inside Kumusha from anywhere. Explore the grounds in 360° and
            get a feel for the space before you arrive.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-amber-500/5 blur-2xl" />
          <div className="absolute -left-3 -top-3 h-20 w-20 rounded-tl-2xl border-l-2 border-t-2 border-amber-500/40" />
          <div className="absolute -bottom-3 -right-3 h-20 w-20 rounded-br-2xl border-b-2 border-r-2 border-amber-500/40" />

          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/60">
            <div className="relative aspect-[16/10] min-h-[420px] w-full md:aspect-[21/9] md:min-h-[480px]">
              <EstatePanoramaViewer onReady={() => setIsLoaded(true)} />
            </div>

            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#111]">
                <Footprints className="h-8 w-8 animate-pulse text-amber-400/60" aria-hidden />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
