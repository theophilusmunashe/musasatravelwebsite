"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Users,
  Star,
  Check,
  ShoppingBag,
  ChevronDown,
  ArrowRight,
  Filter,
  Sparkles,
  Globe,
  Zap,
  Waves,
  Crown,
} from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import toast from "react-hot-toast";
import type { TravelPackage, TravelPackageRegion } from "@/lib/travel-packages";
import { packagePriceLabel } from "@/lib/travel-packages";
import { useLiveTravelPackages } from "@/lib/use-live-packages";

type Region = "all" | TravelPackageRegion;

const REGIONS = [
  { id: "all" as Region, label: "All Packages", icon: <Globe className="w-4 h-4" /> },
  { id: "zimbabwe" as Region, label: "Zimbabwe", icon: <Zap className="w-4 h-4" /> },
  { id: "southern-africa" as Region, label: "Southern Africa", icon: <MapPin className="w-4 h-4" /> },
  { id: "beach" as Region, label: "Beach & Island", icon: <Waves className="w-4 h-4" /> },
  { id: "luxury" as Region, label: "Ultra Luxury", icon: <Crown className="w-4 h-4" /> },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function Hero({
  active,
  setActive,
  count,
  minDays,
  maxDays,
}: {
  active: Region;
  setActive: (r: Region) => void;
  count: number;
  minDays: number;
  maxDays: number;
}) {
  const durationLabel =
    count === 0 ? "—" : minDays === maxDays ? `${minDays}` : `${minDays}–${maxDays}`;

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=85"
          alt="Victoria Falls safari packages with Musasa Travel"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>
      <div className="relative z-10 px-6 md:px-16 pb-16 max-w-7xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6"
        >
          <span className="block">Victoria Falls</span>
          <span className="block text-amber-400">Safari Packages</span>
          <span className="block">Built for You</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-white/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
        >
          Hand-crafted Victoria Falls safari packages spanning Zimbabwe, Cape Town, Namibia, Botswana,
          Mozambique and Mauritius — every detail included, nothing left to chance.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex flex-wrap gap-8 mb-12"
        >
          {[
            { value: String(count), label: "Curated Packages" },
            { value: durationLabel, label: "Days Duration" },
            { value: "6", label: "Destinations" },
            { value: "100%", label: "All-Inclusive Options" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-black text-amber-400">{s.value}</div>
              <div className="text-white/50 text-xs uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="flex flex-wrap gap-2 items-center"
        >
          <Filter className="w-4 h-4 text-white/40 mr-1" />
          {REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setActive(r.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === r.id
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30"
                  : "bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm border border-white/10"
              }`}
            >
              {r.icon}
              {r.label}
            </button>
          ))}
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-6 right-8">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function PackageCard({ pkg }: { pkg: TravelPackage }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem, items } = useCartStore();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isInCart = items.some((i) => i.id === pkg.id);

  const handleAdd = () => {
    addItem({
      id: pkg.id,
      name: pkg.name,
      category: "activity",
      price: packagePriceLabel(pkg),
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
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-500"
    >
      <Link href={`/packages/${pkg.slug}`} className="block">
        <div className="relative h-60 overflow-hidden">
          <motion.div
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={pkg.image}
              alt={pkg.imageAlt || pkg.name}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
              unoptimized
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/10 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            {pkg.badge && (
              <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                {pkg.badge}
              </span>
            )}
            <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
              {pkg.days} Days
            </span>
          </div>
          <div className="absolute bottom-3 right-3">
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-white text-xs font-bold">{pkg.rating}</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <p className="text-amber-400/70 text-xs uppercase tracking-widest mb-1">{pkg.tagline}</p>
        <Link href={`/packages/${pkg.slug}`}>
          <h3 className="text-white text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors duration-300 leading-tight">
            {pkg.name}
          </h3>
        </Link>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.destinations.map((d) => (
            <span
              key={d}
              className="flex items-center gap-1 bg-white/5 border border-white/10 text-white/50 text-xs px-2.5 py-1 rounded-full"
            >
              <MapPin className="w-3 h-3 text-amber-400" />
              {d}
            </span>
          ))}
        </div>

        <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-4">{pkg.description}</p>

        <div className="grid grid-cols-2 gap-1.5 mb-4">
          {pkg.highlights.slice(0, 4).map((h) => (
            <div key={h} className="flex items-center gap-1.5 text-white/60 text-xs">
              <Check className="w-3 h-3 text-amber-400 flex-shrink-0" />
              <span className="line-clamp-1">{h}</span>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Included</p>
          <div className="flex flex-wrap gap-1.5">
            {pkg.includes.map((inc) => (
              <span
                key={inc}
                className="bg-amber-500/10 border border-amber-500/20 text-amber-400/80 text-xs px-2 py-0.5 rounded-full"
              >
                {inc}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-white/50 text-xs mb-5">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {pkg.days} days
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            Group: {pkg.groupSize}
          </span>
        </div>
        {pkg.pricing?.trim() && (
          <p className="text-amber-400 font-semibold text-sm mb-5">{pkg.pricing.trim()}</p>
        )}

        <div className="pt-4 border-t border-white/10 grid grid-cols-1 gap-2">
          <Link
            href={`/packages/${pkg.slug}`}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border border-white/15 text-white hover:border-amber-400 hover:text-amber-400 transition-colors"
          >
            View package
            <ArrowRight className="w-4 h-4" />
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
              added || isInCart
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-amber-500 hover:bg-amber-400 text-black"
            }`}
          >
            {added || isInCart ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Trip</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Trip — Get a Quote</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function CtaBanner() {
  const { openCart, getTotalItems } = useCartStore();
  const count = getTotalItems();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=1600&q=85"
          alt="Victoria Falls"
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>
      <div className="relative z-10 py-24 px-6 md:px-16 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          Can&apos;t Find What You&apos;re Looking For?
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
          Every package above can be customised. Or let us design something entirely unique to you
          from scratch — most quotes are ready within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {count > 0 ? (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={openCart}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 justify-center"
            >
              <ShoppingBag className="w-5 h-5" />
              View Your Trip ({count})
            </motion.button>
          ) : (
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="/services/customized-itinerary"
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 justify-center"
            >
              <Sparkles className="w-5 h-5" />
              Build a Custom Journey
            </motion.a>
          )}
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="/contact"
            className="border border-white/30 hover:border-amber-400 text-white hover:text-amber-400 font-semibold px-10 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 justify-center"
          >
            Talk to an Expert
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

export default function PackagesClient({ packages: initialPackages }: { packages: TravelPackage[] }) {
  const packages = useLiveTravelPackages(initialPackages);
  const [active, setActive] = useState<Region>("all");
  const filtered = active === "all" ? packages : packages.filter((p) => p.region === active);
  const days = packages.map((p) => p.days);
  const minDays = days.length ? Math.min(...days) : 0;
  const maxDays = days.length ? Math.max(...days) : 0;

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Hero
        active={active}
        setActive={setActive}
        count={packages.length}
        minDays={minDays}
        maxDays={maxDays}
      />
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="mb-12">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-2">Curated Packages</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                {REGIONS.find((r) => r.id === active)?.label ?? "All Packages"}
              </h2>
            </div>
            <p className="text-white/40 text-sm max-w-sm md:text-right">
              All packages can be customised. Add one to your trip and our team will prepare a
              personalised quote.
            </p>
          </motion.div>
          <div className="mt-6 h-px bg-gradient-to-r from-amber-500/50 via-amber-500/10 to-transparent" />
        </div>
        {filtered.length === 0 ? (
          <p className="text-white/50 text-center py-16">
            No packages in this category yet. Add them in Studio under Travel Packages, or run the
            seed script after connecting your new Sanity project.
          </p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>
      <CtaBanner />
      <div className="h-24" />
    </div>
  );
}
