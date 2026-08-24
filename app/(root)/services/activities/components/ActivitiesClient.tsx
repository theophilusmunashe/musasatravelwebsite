"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
  Clock,
  Users,
  Star,
  Check,
  ShoppingBag,
  ChevronDown,
  Zap,
  Globe,
  Waves,
  Wind,
  TreePine,
  Camera,
  Filter,
} from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import toast from "react-hot-toast";

/* ─── Types ──────────────────────────────────────────────────────────── */
type Category = "all" | "adventure" | "wildlife" | "culture" | "water" | "aerial";

interface Difficulty {
  label: string;
  color: string;
}

interface Activity {
  id: string;
  name: string;
  tagline: string;
  category: Exclude<Category, "all">;
  image: string;
  gallery: string[];
  duration: string;
  groupSize: string;
  price: string;
  priceNum: number;
  rating: number;
  reviews: number;
  difficulty: Difficulty;
  highlights: string[];
  description: string;
  badge?: string;
}

/* ─── Data ───────────────────────────────────────────────────────────── */

const CATEGORIES = [
  { id: "all" as Category, label: "All Experiences", icon: <Globe className="w-4 h-4" /> },
  { id: "adventure" as Category, label: "Adventure", icon: <Zap className="w-4 h-4" /> },
  { id: "wildlife" as Category, label: "Wildlife", icon: <TreePine className="w-4 h-4" /> },
  { id: "water" as Category, label: "Water", icon: <Waves className="w-4 h-4" /> },
  { id: "aerial" as Category, label: "Aerial", icon: <Wind className="w-4 h-4" /> },
  { id: "culture" as Category, label: "Culture", icon: <Camera className="w-4 h-4" /> },
];

/* ─── Stagger animation helper ───────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Hero Component ─────────────────────────────────────────────────── */
function ActivitiesHero({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: Category;
  setActiveCategory: (c: Category) => void;
}) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1800&q=85"
          alt="African safari landscape"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 px-6 md:px-16 pb-16 max-w-7xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6"
        >
          <span className="block">Victoria Falls</span>
          <span className="block text-amber-400">Activities</span>
          <span className="block">&amp; Tours</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-white/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
        >
          Choose from world-class Victoria Falls experiences curated by local experts. Build your itinerary — add as many as you like and checkout in one seamless flow.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap gap-8 mb-12"
        >
          {[
            { value: "12", label: "Unique Experiences" },
            { value: "4.8★", label: "Average Rating" },
            { value: "15K+", label: "Happy Travellers" },
            { value: "100%", label: "Satisfaction Rate" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-black text-amber-400">
                {stat.value}
              </div>
              <div className="text-white/50 text-xs uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Category filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap gap-2 items-center"
        >
          <Filter className="w-4 h-4 text-white/40 mr-1" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30"
                  : "bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm border border-white/10"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 right-8 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
        <span className="text-white/30 text-xs uppercase tracking-widest rotate-90 origin-center translate-y-4">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

/* ─── Activity Card ──────────────────────────────────────────────────── */
function ActivityCard({ activity }: { activity: Activity }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem, openCart, items } = useCartStore();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const isInCart = items.some((i) => i.id === activity.id);

  const handleAdd = () => {
    addItem({
      id: activity.id,
      name: activity.name,
      category: "activity",
      price: activity.price,
      priceNum: activity.priceNum,
      image: activity.image,
      duration: activity.duration,
      description: activity.tagline,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);

    toast.success(`${activity.name} added to your trip!`, {
      icon: "🌍",
      style: {
        background: "#1a1a1a",
        color: "#fff",
        border: "1px solid #F59E0B",
        borderRadius: "12px",
      },
      duration: 3000,
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
      className="group relative bg-[#111] rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-amber-500/30 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-64 md:h-72 overflow-hidden">
        <motion.div
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={activity.image}
            alt={activity.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {activity.badge && (
            <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
              {activity.badge}
            </span>
          )}
          <span
            className={`bg-black/60 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full border border-white/10 ${activity.difficulty.color}`}
          >
            {activity.difficulty.label}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-white text-xs font-bold">{activity.rating}</span>
          <span className="text-white/40 text-xs">({activity.reviews.toLocaleString()})</span>
        </div>

        {/* Category tag */}
        <div className="absolute bottom-3 left-3">
          <span className="text-white/60 text-xs uppercase tracking-widest">
            {activity.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <p className="text-amber-400/70 text-xs uppercase tracking-widest mb-1">
            {activity.tagline}
          </p>
          <h3 className="text-white text-xl font-bold leading-tight group-hover:text-amber-400 transition-colors duration-300">
            {activity.name}
          </h3>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-4 mb-4 text-white/50 text-xs">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {activity.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {activity.groupSize} people
          </div>
        </div>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-4">
          {activity.description}
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-1.5 mb-5">
          {activity.highlights.map((h) => (
            <div key={h} className="flex items-center gap-1.5 text-white/60 text-xs">
              <Check className="w-3 h-3 text-amber-400 flex-shrink-0" />
              <span className="line-clamp-1">{h}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-white/40 text-xs mb-0.5">Starting from</p>
            <p className="text-white font-bold text-lg">{activity.price}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
              added || isInCart
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-amber-500 hover:bg-amber-400 text-black"
            }`}
          >
            {added || isInCart ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Trip</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section header ─────────────────────────────────────────────────── */
function SectionHeader({ activeCategory }: { activeCategory: Category }) {
  const label =
    CATEGORIES.find((c) => c.id === activeCategory)?.label ?? "All Experiences";
  return (
    <div className="mb-12">
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-2">
            Browse Experiences
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            {label}
          </h2>
        </div>
        <p className="text-white/40 text-sm md:text-right max-w-sm">
          Select any experience and add it to your trip. Checkout whenever
          you&apos;re ready — or keep exploring.
        </p>
      </motion.div>
      <div className="mt-6 h-px bg-gradient-to-r from-amber-500/50 via-amber-500/10 to-transparent" />
    </div>
  );
}

/* ─── Why Choose Us ──────────────────────────────────────────────────── */
function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const points = [
    {
      icon: "🦁",
      title: "Expert Local Guides",
      body: "Every experience is led by certified guides born and raised in the Victoria Falls region — their knowledge of the land, wildlife, and culture is unmatched.",
    },
    {
      icon: "🛡️",
      title: "Safety First Always",
      body: "All activities meet or exceed international safety standards. Our safety record across 15 years of operations is spotless.",
    },
    {
      icon: "🌿",
      title: "Responsible Tourism",
      body: "We invest 10% of all profits directly into local conservation and community upliftment programmes that protect the ecosystem you've come to experience.",
    },
    {
      icon: "✈️",
      title: "Seamless Logistics",
      body: "From airport pickup to your last sundowner, every detail is handled. You focus on the wonder — we handle everything else.",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-24 px-6 md:px-16 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-3">
          Why Travel With Us
        </p>
        <h2 className="text-3xl md:text-5xl font-black text-white">
          The Musasa Difference
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {points.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 hover:bg-white/8 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{p.icon}</div>
            <h3 className="text-white font-bold text-lg mb-3">{p.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA Banner ─────────────────────────────────────────────────────── */
function CtaBanner() {
  const { openCart, getTotalItems } = useCartStore();
  const count = getTotalItems();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1534759926276-df9cac7c7b34?w=1600&q=85"
          alt="Zambezi sunset"
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <div className="relative z-10 py-24 px-6 md:px-16 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          Ready to Experience Africa Like Never Before?
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
          Add your favourite activities above, then checkout to complete your
          booking. Our team will confirm availability within 5 minutes.
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
              View Your Trip ({count} {count === 1 ? "item" : "items"})
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() =>
                window.scrollTo({ top: 400, behavior: "smooth" })
              }
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 py-4 rounded-xl text-lg transition-colors"
            >
              Browse Experiences
            </motion.button>
          )}
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="/contact"
            className="border border-white/30 hover:border-white/60 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-colors"
          >
            Talk to an Expert
          </motion.a>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Export ────────────────────────────────────────────────────── */
export default function ActivitiesClient({ activities }: { activities: Activity[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered =
    activeCategory === "all"
      ? activities
      : activities.filter((a) => a.category === activeCategory);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Hero */}
      <ActivitiesHero
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Activities Grid */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <SectionHeader activeCategory={activeCategory} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center py-20 text-white/40 text-lg">No experiences in this category yet.</p>
        )}
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* CTA Banner */}
      <CtaBanner />

      {/* Bottom padding for floating cart */}
      <div className="h-24" />
    </div>
  );
}
