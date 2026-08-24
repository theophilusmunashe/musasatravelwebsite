"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Check,
  ShoppingBag,
  ChevronDown,
  Wifi,
  Utensils,
  Car,
  Waves,
  Shield,
  Coffee,
  MapPin,
  Moon,
  Filter,
  Users,
  ArrowRight,
  Leaf,
  Crown,
  Tent,
  Building2,
  Home,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import toast from "react-hot-toast";

/* ─── Types ──────────────────────────────────────────────────────────── */
type Category =
  | "all"
  | "musasa"
  | "luxury"
  | "safari-lodge"
  | "eco-lodge"
  | "boutique"
  | "resort";

interface Accommodation {
  id: string;
  name: string;
  tagline: string;
  category: Exclude<Category, "all">;
  image: string;
  location: string;
  country: string;
  price: string;
  priceNum: number;
  rating: number;
  reviews: number;
  nights: string;
  guests: string;
  badge?: string;
  amenities: string[];
  highlights: string[];
  description: string;
}

/* ─── Data ───────────────────────────────────────────────────────────── */

const CATEGORIES: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Properties", icon: <Home className="w-4 h-4" /> },
  { id: "musasa", label: "Musasa Exclusive", icon: <Sparkles className="w-4 h-4" /> },
  { id: "luxury", label: "Luxury", icon: <Crown className="w-4 h-4" /> },
  { id: "safari-lodge", label: "Safari Lodge", icon: <Tent className="w-4 h-4" /> },
  { id: "eco-lodge", label: "Eco Lodge", icon: <Leaf className="w-4 h-4" /> },
  { id: "boutique", label: "Boutique", icon: <Building2 className="w-4 h-4" /> },
  { id: "resort", label: "Resort", icon: <Waves className="w-4 h-4" /> },
];

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  "Wi-Fi": <Wifi className="w-3.5 h-3.5" />,
  Restaurant: <Utensils className="w-3.5 h-3.5" />,
  Transfer: <Car className="w-3.5 h-3.5" />,
  Pool: <Waves className="w-3.5 h-3.5" />,
  Security: <Shield className="w-3.5 h-3.5" />,
  Breakfast: <Coffee className="w-3.5 h-3.5" />,
};

/* ─── Animations ─────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Hero ───────────────────────────────────────────────────────────── */
function AccommodationHero({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: Category;
  setActiveCategory: (c: Category) => void;
}) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800&q=85"
          alt="Luxury African lodge at sunset"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 px-6 md:px-16 pb-16 max-w-7xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6"
        >
          <span className="block">Your Perfect</span>
          <span className="block text-amber-400">African</span>
          <span className="block">Sanctuary</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-white/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
        >
          From cantilevered river suites perched above the Zambezi to pioneering
          eco-lodges deep in the bush — every property is hand-picked and
          personally vetted by our team.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex flex-wrap gap-8 mb-12"
        >
          {[
            { value: "9", label: "Curated Properties" },
            { value: "4.8★", label: "Average Rating" },
            { value: "5", label: "Countries" },
            { value: "100%", label: "Personally Vetted" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-black text-amber-400">{s.value}</div>
              <div className="text-white/50 text-xs uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
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
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Accommodation Card ─────────────────────────────────────────────── */
function AccommodationCard({ property }: { property: Accommodation }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem, items } = useCartStore();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const isInCart = items.some((i) => i.id === property.id);

  const handleAdd = () => {
    addItem({
      id: property.id,
      name: property.name,
      category: "accommodation",
      price: property.price,
      priceNum: property.priceNum,
      image: property.image,
      duration: property.nights,
      description: property.tagline,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2500);

    toast.success(`${property.name} added to your trip!`, {
      icon: "🏨",
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
      className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-500"
    >
      {/* Image */}
      <Link href={`/services/accommodation/${property.id}`} className="relative h-64 md:h-72 overflow-hidden block">
        <motion.div
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/10 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {property.badge && (
            property.badge === "Musasa Exclusive" ? (
              <span className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-400 text-black text-xs font-black px-3 py-1 rounded-full shadow-lg shadow-amber-500/40">
                <Sparkles className="w-3 h-3" />
                {property.badge}
              </span>
            ) : (
              <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                {property.badge}
              </span>
            )
          )}
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-white text-xs font-bold">{property.rating}</span>
          <span className="text-white/40 text-xs">({property.reviews.toLocaleString()})</span>
        </div>

        {/* Location */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-amber-400" />
          <span className="text-white/70 text-xs">
            {property.location}, {property.country}
          </span>
        </div>

        {/* Category chip */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-black/60 backdrop-blur-sm text-white/60 text-xs px-2.5 py-1 rounded-full border border-white/10 capitalize">
            {property.category.replace("-", " ")}
          </span>
        </div>
      </Link>
      <div className="p-5">
        <div className="mb-3">
          <p className="text-amber-400/70 text-xs uppercase tracking-widest mb-1">
            {property.tagline}
          </p>
          <Link href={`/services/accommodation/${property.id}`}>
            <h3 className="text-white text-xl font-bold leading-tight group-hover:text-amber-400 transition-colors duration-300">
              {property.name}
            </h3>
          </Link>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-4 mb-4 text-white/50 text-xs">
          <div className="flex items-center gap-1">
            <Moon className="w-3.5 h-3.5" />
            {property.nights}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {property.guests}
          </div>
        </div>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-4">
          {property.description}
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-1.5 mb-5">
          {property.highlights.map((h) => (
            <div key={h} className="flex items-center gap-1.5 text-white/60 text-xs">
              <Check className="w-3 h-3 text-amber-400 flex-shrink-0" />
              <span className="line-clamp-1">{h}</span>
            </div>
          ))}
        </div>

        {/* Amenity pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {property.amenities.slice(0, 4).map((a) => (
            <span
              key={a}
              className="flex items-center gap-1 bg-white/5 border border-white/10 text-white/50 text-xs px-2 py-1 rounded-full"
            >
              {AMENITY_ICONS[a] ?? null}
              {a}
            </span>
          ))}
          {property.amenities.length > 4 && (
            <span className="bg-white/5 border border-white/10 text-white/40 text-xs px-2 py-1 rounded-full">
              +{property.amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-white/40 text-xs mb-0.5">Starting from</p>
            <p className="text-white font-bold text-lg">{property.price}</p>
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

/* ─── Section Header ─────────────────────────────────────────────────── */
function SectionHeader({ activeCategory }: { activeCategory: Category }) {
  const label =
    CATEGORIES.find((c) => c.id === activeCategory)?.label ?? "All Properties";
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
            Browse Properties
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white">{label}</h2>
        </div>
        <p className="text-white/40 text-sm md:text-right max-w-sm">
          Add any property to your trip and checkout when ready — or bundle it
          with activities for a seamless booking.
        </p>
      </motion.div>
      <div className="mt-6 h-px bg-gradient-to-r from-amber-500/50 via-amber-500/10 to-transparent" />
    </div>
  );
}

/* ─── Why Choose Us ──────────────────────────────────────────────────── */
function WhyStayWithUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const points = [
    {
      icon: "🔍",
      title: "Personally Vetted",
      body: "Every property is personally inspected by our team. We only list places we would stay ourselves — no exceptions, no compromises.",
    },
    {
      icon: "💰",
      title: "Best Rate Guaranteed",
      body: "We match or beat any price you find elsewhere. Our direct relationships with every property mean you never overpay.",
    },
    {
      icon: "🎯",
      title: "Perfect Match Promise",
      body: "Not happy with your accommodation? We'll find you an alternative immediately. Your satisfaction is unconditionally guaranteed.",
    },
    {
      icon: "📞",
      title: "24/7 In-Destination Support",
      body: "Our Victoria Falls team is available around the clock for the duration of your stay — for anything, at any hour.",
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-3">
          Our Promise
        </p>
        <h2 className="text-3xl md:text-5xl font-black text-white">
          Why Book With Musasa
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
          src="https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1600&q=85"
          alt="Elephants at sunset — Zimbabwe"
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>
      <div className="relative z-10 py-24 px-6 md:px-16 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          Your Dream Safari Starts Tonight
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
          Add your preferred property to your trip, then checkout to complete
          your booking. Combine accommodation with activities for the ultimate
          Victoria Falls experience.
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
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => window.scrollTo({ top: 500, behavior: "smooth" })}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 py-4 rounded-xl text-lg transition-colors"
            >
              Browse Properties
            </motion.button>
          )}
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="/services/activities"
            className="border border-white/30 hover:border-amber-400 text-white hover:text-amber-400 font-semibold px-10 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 justify-center"
          >
            Add Activities
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Export ────────────────────────────────────────────────────── */
export default function AccommodationClient({ stays }: { stays: Accommodation[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered =
    activeCategory === "all"
      ? stays
      : stays.filter((a) => a.category === activeCategory);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Hero */}
      <AccommodationHero
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Properties Grid */}
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
            {filtered.map((property) => (
              <AccommodationCard key={property.id} property={property} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/40 text-lg">No properties in this category yet.</p>
          </motion.div>
        )}
      </section>

      {/* Why Stay With Us */}
      <WhyStayWithUs />

      {/* CTA */}
      <CtaBanner />

      <div className="h-24" />
    </div>
  );
}
