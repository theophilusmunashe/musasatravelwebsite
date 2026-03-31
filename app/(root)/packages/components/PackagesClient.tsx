"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
  MapPin, Clock, Users, Star, Check, ShoppingBag,
  ChevronDown, ArrowRight, Filter, Sparkles, Globe,
  Zap, Waves, Crown,
} from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import toast from "react-hot-toast";

type Region = "all" | "zimbabwe" | "southern-africa" | "beach" | "luxury";

interface Package {
  id: string;
  name: string;
  tagline: string;
  region: Exclude<Region, "all">;
  image: string;
  days: number;
  destinations: string[];
  groupSize: string;
  badge?: string;
  includes: string[];
  highlights: string[];
  description: string;
}

const PACKAGES: Package[] = [
  {
    id: "vic-falls-classic",
    name: "Victoria Falls Classic",
    tagline: "Africa's Greatest Wonder in 5 Days",
    region: "zimbabwe",
    // Victoria Falls waterfall — Zimbabwe
    image: "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=900&q=80",
    days: 5,
    destinations: ["Victoria Falls, Zimbabwe"],
    groupSize: "2–12",
    badge: "Best Seller",
    includes: ["Accommodation", "Activities", "Transfers", "Guide", "Most meals"],
    highlights: ["Falls walking tour", "Helicopter flight", "Sunset cruise", "Wildlife safari", "Bungee jump optional"],
    description: "The definitive Victoria Falls experience distilled into five perfectly balanced days. You will walk the rainforest paths to 12 viewpoints of the falls, take the helicopter 'Flight of Angels' above the mist column, glide along the upper Zambezi on a sunset cruise with sundowners, and spend a morning on game drive in the Zambezi National Park where white rhino and buffalo graze on the floodplains below your lodge.",
  },
  {
    id: "cape-town-explorer",
    name: "Cape Town Explorer",
    tagline: "The World's Most Beautiful City",
    region: "southern-africa",
    // Table Mountain & Cape Town — South Africa
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=900&q=80",
    days: 7,
    destinations: ["Cape Town, South Africa", "Cape Peninsula"],
    groupSize: "2–10",
    badge: "City & Nature",
    includes: ["Boutique hotel", "City tours", "Peninsula drive", "Wine tasting", "Transfers", "Breakfast daily"],
    highlights: ["Table Mountain cable car", "Cape of Good Hope", "Boulders Beach penguins", "Stellenbosch wine route", "V&A Waterfront"],
    description: "Seven days in the city that has been voted the world's most beautiful more times than any other destination. Cape Town delivers a combination of extraordinary natural beauty, vibrant culture, world-class cuisine, and thrilling outdoor adventure that is simply unique on earth. Your itinerary moves from the summit of Table Mountain to the colony of endangered African penguins at Boulders Beach, through the dramatic coastal scenery of Chapman's Peak to the Cape of Good Hope, and into the pastoral magnificence of the Stellenbosch and Franschhoek winelands.",
  },
  {
    id: "namibia-desert-safari",
    name: "Namibia Desert Safari",
    tagline: "Earth's Oldest Desert, Untouched",
    region: "southern-africa",
    // Sossusvlei red dunes — Namibia
    image: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=900&q=80",
    days: 10,
    destinations: ["Windhoek", "Sossusvlei", "Etosha NP", "Swakopmund"],
    groupSize: "2–8",
    badge: "Epic Journey",
    includes: ["All accommodation", "Game drives", "All transfers", "Specialist guide", "Most meals", "Park fees"],
    highlights: ["Sossusvlei red dunes at sunrise", "Deadvlei salt pan", "Etosha lion sightings", "Skeleton Coast", "Swakopmund adventures"],
    description: "Ten days through the country that has been described as the most visually dramatic on earth — where rust-red dunes rise 300 metres above white clay pans, ancient fossilised trees stand silhouetted against empty blue sky, and desert-adapted elephants walk single file through dry riverbeds. The journey begins in Windhoek before heading south to Sossusvlei, where Dune 45 offers a sunrise climb of otherworldly beauty, before heading north to Etosha National Park.",
  },
  {
    id: "zimbabwe-wildlife-safari",
    name: "Zimbabwe Wildlife Safari",
    tagline: "Africa's Hidden Safari Gem",
    region: "zimbabwe",
    // Elephant herd — Zimbabwe / Hwange
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=900&q=80",
    days: 7,
    destinations: ["Hwange NP", "Matetsi Reserve", "Victoria Falls"],
    groupSize: "2–8",
    includes: ["Safari lodge", "Game drives", "Walking safaris", "All meals & drinks", "Transfers", "Park fees"],
    highlights: ["Big Five territory", "Hwange elephant herds", "Matetsi private reserve", "Victoria Falls finale", "Expert tracker guides"],
    description: "Seven days through Zimbabwe's finest safari landscapes, bookended by the thunder of Victoria Falls. The itinerary opens with two nights in Hwange National Park — Zimbabwe's largest reserve and home to one of Africa's greatest elephant populations. Days four and five move to the Matetsi Private Game Reserve on the Zambezi River — 136,000 hectares traversed exclusively by lodge guests. The final two days are spent in Victoria Falls, combining the falls walking tour with a helicopter flight and sunset cruise.",
  },
  {
    id: "mozambique-beach-escape",
    name: "Mozambique Beach Escape",
    tagline: "The Indian Ocean's Last Paradise",
    region: "beach",
    // Turquoise Indian Ocean coast — Mozambique / Bazaruto Archipelago
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80",
    days: 6,
    destinations: ["Victoria Falls, Zimbabwe", "Bazaruto Archipelago, Mozambique"],
    groupSize: "2–10",
    badge: "Beach & Bush",
    includes: ["Safari lodge", "Island resort", "Dhow sailing", "Snorkelling", "Flights", "All meals"],
    highlights: ["Bazaruto island resort", "Dugong snorkelling", "Dhow sunset cruise", "Victoria Falls day", "Whale shark season"],
    description: "The combination that once discovered becomes impossible to resist — the primal thunder of Africa's greatest waterfall followed by the languid turquoise beauty of one of the Indian Ocean's most pristine island groups. Two days in Victoria Falls delivers the essential highlights. A scenic light aircraft then carries you east to the Bazaruto Archipelago, where five islands form a protected marine national park of extraordinary biodiversity with pristine coral reefs and sea-grass meadows.",
  },
  {
    id: "botswana-luxury-safari",
    name: "Botswana Luxury Safari",
    tagline: "The World's Premier Wildlife Destination",
    region: "luxury",
    // Okavango Delta aerial / Chobe elephants — Botswana
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80",
    days: 8,
    destinations: ["Chobe NP", "Okavango Delta", "Moremi Reserve"],
    groupSize: "2–6",
    badge: "Ultra Luxury",
    includes: ["All-inclusive lodges", "Helicopter transfers", "All game activities", "All meals & premium drinks", "Park fees", "Specialist guides"],
    highlights: ["Chobe River cruise", "Okavango Delta mokoro", "Moremi Big Five", "Helicopter transfers", "Star-bed sleeping", "All-inclusive premium"],
    description: "Eight days of uncompromising luxury across Botswana's three greatest wildlife destinations — Chobe, the Okavango Delta, and the Moremi Game Reserve. This fully all-inclusive, fly-in safari uses helicopter transfers between camps to maximise game viewing time. Chobe delivers extraordinary elephant concentrations; the Okavango Delta offers the unique experience of gliding through channels in a mokoro; and Moremi delivers the full Big Five alongside cheetah, wild dog, and unforgettable night drives.",
  },
  {
    id: "southern-africa-grand-tour",
    name: "Southern Africa Grand Tour",
    tagline: "The Ultimate African Epic",
    region: "southern-africa",
    // Sweeping savannah / acacia landscape — Southern Africa
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80",
    days: 14,
    destinations: ["Cape Town", "Namibia", "Botswana", "Victoria Falls"],
    groupSize: "2–6",
    badge: "Grand Journey",
    includes: ["All accommodation", "All flights", "All meals", "All activities", "Private guide throughout", "All transfers & fees"],
    highlights: ["Cape Town & Peninsula", "Namibia desert & dunes", "Chobe game drives", "Okavango Delta", "Victoria Falls finale"],
    description: "The most comprehensive southern African journey available — 14 days that traverse four countries and deliver the full emotional range of this extraordinary region, from the cosmopolitan beauty of Cape Town through the surreal emptiness of the Namib Desert to the wildlife spectacle of Botswana and the thunderous conclusion of Victoria Falls. This is southern Africa at its absolute best, delivered with a dedicated private guide who accompanies you throughout the entire journey.",
  },
  {
    id: "mauritius-luxury",
    name: "Mauritius Luxury Escape",
    tagline: "Island Perfection in the Indian Ocean",
    region: "beach",
    // Mauritius lagoon & beach — clear turquoise water
    image: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=900&q=80",
    days: 7,
    destinations: ["Mauritius"],
    groupSize: "2–8",
    badge: "Honeymoon Choice",
    includes: ["5-star resort", "All-inclusive", "Excursions", "Spa credits", "Water sports", "Airport transfers"],
    highlights: ["Private beach resort", "Underwater waterfall", "Catamaran cruise", "Black River Gorges", "World-class spa", "Reef snorkelling"],
    description: "Mauritius is Africa's definition of paradise — a volcanic island of green mountains, cobalt lagoons, and world-class beaches fringed by some of the Indian Ocean's most spectacular coral reefs. Seven days of total immersion in this island's extraordinary beauty, staying at a five-star resort with a private beach and multiple restaurants. Days are spent on catamaran cruises, hiking through the Black River Gorges National Park, and visiting the famous underwater waterfall optical illusion.",
  },
];

const REGIONS = [
  { id: "all" as Region, label: "All Packages", icon: <Globe className="w-4 h-4" /> },
  { id: "zimbabwe" as Region, label: "Zimbabwe", icon: <Zap className="w-4 h-4" /> },
  { id: "southern-africa" as Region, label: "Southern Africa", icon: <MapPin className="w-4 h-4" /> },
  { id: "beach" as Region, label: "Beach & Island", icon: <Waves className="w-4 h-4" /> },
  { id: "luxury" as Region, label: "Ultra Luxury", icon: <Crown className="w-4 h-4" /> },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const cardVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

/* ─── Hero ───────────────────────────────────────────────────────────── */
function Hero({ active, setActive }: { active: Region; setActive: (r: Region) => void }) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=85" alt="African travel packages" fill priority className="object-cover" sizes="100vw" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>
      <div className="relative z-10 px-6 md:px-16 pb-16 max-w-7xl mx-auto w-full">
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
          <span className="block">Africa, Perfectly</span>
          <span className="block text-amber-400">Packaged</span>
          <span className="block">for You.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
          className="text-white/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          Eight hand-crafted packages spanning Victoria Falls, Cape Town, Namibia, Botswana, Mozambique, and Mauritius — every detail included, nothing left to chance.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="flex flex-wrap gap-8 mb-12">
          {[{ value: "8", label: "Curated Packages" }, { value: "5–14", label: "Days Duration" }, { value: "6", label: "Destinations" }, { value: "100%", label: "All-Inclusive Options" }].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-black text-amber-400">{s.value}</div>
              <div className="text-white/50 text-xs uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }} className="flex flex-wrap gap-2 items-center">
          <Filter className="w-4 h-4 text-white/40 mr-1" />
          {REGIONS.map((r) => (
            <button key={r.id} onClick={() => setActive(r.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active === r.id ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30" : "bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm border border-white/10"}`}>
              {r.icon}{r.label}
            </button>
          ))}
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-6 right-8">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><ChevronDown className="w-5 h-5 text-white/50" /></motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Package Card ───────────────────────────────────────────────────── */
function PackageCard({ pkg }: { pkg: Package }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem, items } = useCartStore();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isInCart = items.some((i) => i.id === pkg.id);

  const handleAdd = () => {
    addItem({ id: pkg.id, name: pkg.name, category: "activity", price: "Price on request", priceNum: 0, image: pkg.image, duration: `${pkg.days} days`, description: pkg.tagline });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
    toast.success(`${pkg.name} added to your trip!`, { icon: "✈️", style: { background: "#1a1a1a", color: "#fff", border: "1px solid #F59E0B", borderRadius: "12px" } });
  };

  return (
    <motion.div ref={ref} variants={cardVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="group bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-500">
      <div className="relative h-60 overflow-hidden">
        <motion.div animate={{ scale: hovered ? 1.07 : 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
          <Image src={pkg.image} alt={pkg.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" unoptimized />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/10 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {pkg.badge && <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">{pkg.badge}</span>}
          <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">{pkg.days} Days</span>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-white text-xs font-bold">4.9</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="text-amber-400/70 text-xs uppercase tracking-widest mb-1">{pkg.tagline}</p>
        <h3 className="text-white text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors duration-300 leading-tight">{pkg.name}</h3>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.destinations.map((d) => (
            <span key={d} className="flex items-center gap-1 bg-white/5 border border-white/10 text-white/50 text-xs px-2.5 py-1 rounded-full">
              <MapPin className="w-3 h-3 text-amber-400" />{d}
            </span>
          ))}
        </div>

        <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-4">{pkg.description}</p>

        <div className="grid grid-cols-2 gap-1.5 mb-4">
          {pkg.highlights.slice(0, 4).map((h) => (
            <div key={h} className="flex items-center gap-1.5 text-white/60 text-xs">
              <Check className="w-3 h-3 text-amber-400 flex-shrink-0" /><span className="line-clamp-1">{h}</span>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Included</p>
          <div className="flex flex-wrap gap-1.5">
            {pkg.includes.map((inc) => (
              <span key={inc} className="bg-amber-500/10 border border-amber-500/20 text-amber-400/80 text-xs px-2 py-0.5 rounded-full">{inc}</span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-white/50 text-xs mb-5">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{pkg.days} days</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />Group: {pkg.groupSize}</span>
        </div>

        <div className="pt-4 border-t border-white/10">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${added || isInCart ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-amber-500 hover:bg-amber-400 text-black"}`}>
            {added || isInCart
              ? <><Check className="w-4 h-4" /><span>Added to Trip</span></>
              : <><ShoppingBag className="w-4 h-4" /><span>Add to Trip — Get a Quote</span></>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── CTA ────────────────────────────────────────────────────────────── */
function CtaBanner() {
  const { openCart, getTotalItems } = useCartStore();
  const count = getTotalItems();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=1600&q=85" alt="Victoria Falls" fill className="object-cover" sizes="100vw" unoptimized />
        <div className="absolute inset-0 bg-black/75" />
      </div>
      <div className="relative z-10 py-24 px-6 md:px-16 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">Can&apos;t Find What You&apos;re Looking For?</h2>
        <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">Every package above can be customised. Or let us design something entirely unique to you from scratch — most quotes are ready within 24 hours.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {count > 0 ? (
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={openCart}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 justify-center">
              <ShoppingBag className="w-5 h-5" />View Your Trip ({count})
            </motion.button>
          ) : (
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} href="/services/customized-itinerary"
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 justify-center">
              <Sparkles className="w-5 h-5" />Build a Custom Journey
            </motion.a>
          )}
          <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} href="/contact"
            className="border border-white/30 hover:border-amber-400 text-white hover:text-amber-400 font-semibold px-10 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 justify-center">
            Talk to an Expert<ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

export default function PackagesClient() {
  const [active, setActive] = useState<Region>("all");
  const filtered = active === "all" ? PACKAGES : PACKAGES.filter((p) => p.region === active);
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Hero active={active} setActive={setActive} />
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="mb-12">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-2">Curated Packages</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">{REGIONS.find(r => r.id === active)?.label ?? "All Packages"}</h2>
            </div>
            <p className="text-white/40 text-sm max-w-sm md:text-right">All packages can be customised. Add one to your trip and our team will prepare a personalised quote.</p>
          </motion.div>
          <div className="mt-6 h-px bg-gradient-to-r from-amber-500/50 via-amber-500/10 to-transparent" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
          </motion.div>
        </AnimatePresence>
      </section>
      <CtaBanner />
      <div className="h-24" />
    </div>
  );
}
