"use client";
import { useState, useRef } from "react";
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
  Sparkles,
  Globe,
  Pencil,
  HeartHandshake,
  ScanSearch,
} from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import toast from "react-hot-toast";

/* ─── Types ──────────────────────────────────────────────────────────── */
type Filter = "all" | "short" | "medium" | "extended";

interface Itinerary {
  id: string;
  name: string;
  tagline: string;
  image: string;
  days: number;
  filter: Exclude<Filter, "all">;
  destinations: string[];
  price: string;
  priceNum: number;
  groupSize: string;
  badge?: string;
  highlights: string[];
  description: string;
}

/* ─── Data ───────────────────────────────────────────────────────────── */
const ITINERARIES: Itinerary[] = [
  {
    id: "vic-falls-chobe",
    name: "Victoria Falls & Chobe Expedition",
    tagline: "Two Countries, One Unforgettable Journey",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80",
    days: 5,
    filter: "short",
    destinations: ["Victoria Falls, Zimbabwe", "Chobe, Botswana"],
    price: "From $1,850/person",
    priceNum: 1850,
    groupSize: "2–10",
    badge: "Best Seller",
    highlights: [
      "Victoria Falls walking tour",
      "Chobe full-day game drive",
      "Zambezi sunset cruise",
      "Luxury lodge stays",
    ],
    description:
      "The perfect introduction to southern Africa's crown jewels. Five transformative days that balance the raw thunder of Victoria Falls with the extraordinary wildlife spectacle of Chobe National Park — home to over 120,000 elephants. Days one and two are dedicated to the falls: walking tours through the rainforest, a sunset boat cruise on the upper Zambezi, and the optional bungee jump from the historic Victoria Falls Bridge. Days three and four cross into Botswana for immersive game drives and a Chobe River cruise. Day five is a gentle return, with a final sundowner watching elephants at the waterhole. All transfers, park fees, accommodation, and most meals are included.",
  },
  {
    id: "southern-safari-circuit",
    name: "Southern Safari Circuit",
    tagline: "The Great African Loop",
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=900&q=80",
    days: 10,
    filter: "medium",
    destinations: ["Zimbabwe", "Botswana", "Zambia"],
    price: "From $4,200/person",
    priceNum: 4200,
    groupSize: "2–8",
    badge: "Most Popular",
    highlights: [
      "Three-country circuit",
      "Hwange & Chobe safaris",
      "Zambezi houseboat",
      "Victoria Falls & Livingstone",
    ],
    description:
      "A decade of memories compressed into ten extraordinary days. This signature circuit begins in Victoria Falls before looping through Zimbabwe's largest national park — Hwange — where enormous elephant herds and resident lion prides await. Crossing into Zambia, you spend two nights on an intimate houseboat drifting the Lower Zambezi, where tigers fish jump beside the boat at dawn and hippo paths through the reeds fill the air with sound. The final leg crosses into Botswana for Chobe's legendary game drives and a river cruise. Expert naturalist guides accompany you throughout, transforming every sighting into a deeper understanding of these extraordinary ecosystems.",
  },
  {
    id: "cape-to-vic-falls",
    name: "Cape to Victoria Falls",
    tagline: "The Ultimate Southern African Road",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80",
    days: 14,
    filter: "extended",
    destinations: ["Cape Town, SA", "Namibia", "Victoria Falls, Zimbabwe"],
    price: "From $7,500/person",
    priceNum: 7500,
    groupSize: "2–6",
    badge: "Premium Journey",
    highlights: [
      "Cape Town city & winelands",
      "Namib Desert & Sossusvlei",
      "Etosha National Park",
      "Victoria Falls grand finale",
    ],
    description:
      "Africa's most iconic overland journey — from the staggering beauty of Cape Town and the Cape Peninsula through the otherworldly landscapes of Namibia's Namib Desert, the flamingo-filled Walvis Bay lagoon, and the vast Etosha salt pan with its extraordinary wildlife, before culminating in the thunder of Victoria Falls. Fourteen days that encompass the full emotional spectrum of this extraordinary continent: cosmopolitan Cape Town, the silence of the oldest desert on earth, the surreal geometry of red dunes at Sossusvlei, lions hunting at Etosha's floodlit waterholes, and finally the roar of one of the world's greatest natural wonders as your crescendo.",
  },
  {
    id: "mozambique-beach-safari",
    name: "Mozambique Beach & Safari Combo",
    tagline: "Bush Meets Beach in Perfect Balance",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
    days: 8,
    filter: "medium",
    destinations: ["Victoria Falls, Zimbabwe", "Vilankulo, Mozambique"],
    price: "From $3,100/person",
    priceNum: 3100,
    groupSize: "2–8",
    highlights: [
      "Victoria Falls highlights",
      "Bazaruto Archipelago",
      "Dhow sailing at sunset",
      "Dugong & whale shark snorkel",
    ],
    description:
      "Africa's best-kept secret for those who want both the wild and the sea. Four days in Victoria Falls for the falls, safari, and adrenaline, then a scenic flight east to Mozambique's Bazaruto Archipelago — a marine national park of extraordinary beauty where turquoise channels between islands shelter the last viable population of dugong in the Indian Ocean. The islands are encircled by pristine coral reefs, and whale sharks pass through from September to March. Accommodation is in luxurious island lodges where barefoot elegance and exceptional seafood are the only agenda. A beach-and-bush combination that cannot be replicated anywhere else in the world.",
  },
  {
    id: "dubai-africa-twin",
    name: "Dubai & Africa Twin Experience",
    tagline: "From Desert Skylines to African Wilderness",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80",
    days: 10,
    filter: "medium",
    destinations: ["Dubai, UAE", "Victoria Falls, Zimbabwe"],
    price: "From $4,800/person",
    priceNum: 4800,
    groupSize: "2–10",
    badge: "Unique Combo",
    highlights: [
      "Dubai desert safari & city",
      "Burj Khalifa & souks",
      "Victoria Falls & helicopter",
      "Luxury throughout",
    ],
    description:
      "The world's most dramatic contrast in ten remarkable days. Begin in Dubai for four nights of architectural wonder and desert luxury — the Burj Khalifa at sunrise, a private desert camp under the stars, the gold souk, and a dhow dinner cruise on the Dubai Creek. Then fly direct to Victoria Falls for six days of pure African wilderness: the falls, a helicopter flight of angels, game drives in Hwange, a sunset cruise on the Zambezi, and the optional adrenaline bucket list of bungee jumping and white water rafting. The juxtaposition of gleaming modernity and primal wilderness creates a journey of extraordinary depth and contrast that stays with you for life.",
  },
  {
    id: "namibia-delta",
    name: "Namibia Desert & Okavango Delta",
    tagline: "Desert Silence to Delta Symphony",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900&q=80",
    days: 12,
    filter: "extended",
    destinations: ["Namibia", "Okavango Delta, Botswana"],
    price: "From $6,200/person",
    priceNum: 6200,
    groupSize: "2–6",
    highlights: [
      "Sossusvlei red dunes",
      "Skeleton Coast wilderness",
      "Okavango Delta mokoro",
      "Moremi Game Reserve",
    ],
    description:
      "One of Africa's great journey of contrasts — from the bone-dry silence of the Namib, earth's oldest desert, to the flooded labyrinth of the Okavango Delta, the world's largest inland delta. Namibia's first week delivers Sossusvlei's iconic red sand dunes rising 325 metres above white clay pans, the eerie Deadvlei with its 900-year-old fossilised camel thorn trees, the wild and lonely Skeleton Coast, and Etosha's productive game viewing. A scenic flight east delivers you to Botswana's delta, where motorised mokoro (dugout canoe) trips through papyrus channels, walking safaris through prime lion territory, and intimate fly-camps under the stars create a second, completely different African experience of equal power.",
  },
];

const FILTERS: { id: Filter; label: string; days: string }[] = [
  { id: "all", label: "All Journeys", days: "" },
  { id: "short", label: "Short Break", days: "3–5 days" },
  { id: "medium", label: "Discovery", days: "6–10 days" },
  { id: "extended", label: "Grand Journey", days: "11+ days" },
];

/* ─── Animations ─────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Process Steps ──────────────────────────────────────────────────── */
const STEPS = [
  { icon: <Pencil className="w-6 h-6" />, title: "Share Your Vision", body: "Tell us your dream — destinations, pace, interests, budget. There are no wrong answers." },
  { icon: <ScanSearch className="w-6 h-6" />, title: "We Design & Research", body: "Our team crafts a detailed proposal within 24–48 hours using our deep local knowledge." },
  { icon: <HeartHandshake className="w-6 h-6" />, title: "Refine Together", body: "We iterate with you until every detail is exactly right. Your satisfaction is unconditional." },
  { icon: <Globe className="w-6 h-6" />, title: "Travel With Confidence", body: "We handle all logistics, bookings, and 24/7 on-ground support so you simply enjoy the journey." },
];

/* ─── Hero ───────────────────────────────────────────────────────────── */
function Hero({ activeFilter, setActiveFilter }: { activeFilter: Filter; setActiveFilter: (f: Filter) => void }) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1800&q=85"
          alt="Bespoke African journey"
          fill priority className="object-cover" sizes="100vw" unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 px-6 md:px-16 pb-16 max-w-7xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6"
        >
          <span className="block">Your Journey,</span>
          <span className="block text-amber-400">Your Rules,</span>
          <span className="block">Your Africa.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-white/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
        >
          No templates. No compromises. Every itinerary we build is designed
          exclusively for you — your pace, your passions, your people.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex flex-wrap gap-8 mb-12"
        >
          {[{ value: "500+", label: "Custom Journeys Built" }, { value: "15+", label: "Destinations" }, { value: "48h", label: "Quote Turnaround" }, { value: "100%", label: "Bespoke, Every Time" }].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-black text-amber-400">{s.value}</div>
              <div className="text-white/50 text-xs uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="flex flex-wrap gap-2"
        >
          {FILTERS.map((f) => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === f.id ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30" : "bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm border border-white/10"}`}>
              {f.label}{f.days && <span className="opacity-60 text-xs">· {f.days}</span>}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="absolute bottom-6 right-8">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Itinerary Card ─────────────────────────────────────────────────── */
function ItineraryCard({ item }: { item: Itinerary }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem, items } = useCartStore();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isInCart = items.some((i) => i.id === item.id);

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, category: "activity", price: item.price, priceNum: item.priceNum, image: item.image, duration: `${item.days} days`, description: item.tagline });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
    toast.success(`${item.name} added to your trip!`, { icon: "🗺️", style: { background: "#1a1a1a", color: "#fff", border: "1px solid #F59E0B", borderRadius: "12px" } });
  };

  return (
    <motion.div ref={ref} variants={cardVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="group bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-500">
      <div className="relative h-56 overflow-hidden">
        <motion.div animate={{ scale: hovered ? 1.07 : 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" unoptimized />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/10 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {item.badge && <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">{item.badge}</span>}
          <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">{item.days} Days</span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-amber-400/70 text-xs uppercase tracking-widest mb-1">{item.tagline}</p>
        <h3 className="text-white text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors duration-300 leading-tight">{item.name}</h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {item.destinations.map((d) => (
            <span key={d} className="flex items-center gap-1 bg-white/5 border border-white/10 text-white/50 text-xs px-2.5 py-1 rounded-full">
              <MapPin className="w-3 h-3 text-amber-400" />{d}
            </span>
          ))}
        </div>

        <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-4">{item.description}</p>

        <div className="grid grid-cols-2 gap-1.5 mb-5">
          {item.highlights.map((h) => (
            <div key={h} className="flex items-center gap-1.5 text-white/60 text-xs">
              <Check className="w-3 h-3 text-amber-400 flex-shrink-0" /><span className="line-clamp-1">{h}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-5 text-white/50 text-xs">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{item.days} days</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{item.groupSize} people</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-white/40 text-xs mb-0.5">Starting from</p>
            <p className="text-white font-bold text-lg">{item.price}</p>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAdd}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${added || isInCart ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-amber-500 hover:bg-amber-400 text-black"}`}>
            {added || isInCart ? <><Check className="w-4 h-4" /><span>Added</span></> : <><ShoppingBag className="w-4 h-4" /><span>Add to Trip</span></>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── How It Works ───────────────────────────────────────────────────── */
function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <section ref={ref} className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
        <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-3">Our Process</p>
        <h2 className="text-3xl md:text-5xl font-black text-white">How We Build Your Journey</h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((step, i) => (
          <motion.div key={step.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300">
            <div className="absolute -top-3 -left-3 w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center text-black text-xs font-black">{i + 1}</div>
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 mb-4">{step.icon}</div>
            <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{step.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────────────────── */
function CtaBanner() {
  const { openCart, getTotalItems } = useCartStore();
  const count = getTotalItems();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=85" alt="African safari" fill className="object-cover" sizes="100vw" unoptimized />
        <div className="absolute inset-0 bg-black/75" />
      </div>
      <div className="relative z-10 py-24 px-6 md:px-16 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">Build Something Truly Yours</h2>
        <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">Browse our sample journeys above, add one to your trip, or contact us to design a completely custom itinerary from scratch.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {count > 0 ? (
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={openCart}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 justify-center">
              <ShoppingBag className="w-5 h-5" />View Your Trip ({count})
            </motion.button>
          ) : (
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} href="/contact"
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 justify-center">
              <Sparkles className="w-5 h-5" />Request Custom Quote
            </motion.a>
          )}
          <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} href="/services/activities"
            className="border border-white/30 hover:border-amber-400 text-white hover:text-amber-400 font-semibold px-10 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 justify-center">
            Browse Activities<ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Export ────────────────────────────────────────────────────── */
export default function ItineraryClient() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const filtered = activeFilter === "all" ? ITINERARIES : ITINERARIES.filter((i) => i.filter === activeFilter);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Hero activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="mb-12">
          <motion.div key={activeFilter} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-2">Sample Journeys</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">Handcrafted Itineraries</h2>
            </div>
            <p className="text-white/40 text-sm max-w-sm md:text-right">Use these as inspiration, or we&apos;ll build something entirely unique to you.</p>
          </motion.div>
          <div className="mt-6 h-px bg-gradient-to-r from-amber-500/50 via-amber-500/10 to-transparent" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeFilter} variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => <ItineraryCard key={item.id} item={item} />)}
          </motion.div>
        </AnimatePresence>
      </section>

      <HowItWorks />
      <CtaBanner />
      <div className="h-24" />
    </div>
  );
}
