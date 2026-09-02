"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
  Star,
  Check,
  ShoppingBag,
  ChevronDown,
  ArrowRight,
  Languages,
  Award,
  Shield,
  Clock,
  TreePine,
  Mountain,
  Globe,
  Filter,
} from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import toast from "react-hot-toast";
import CardPhoto from "@/components/CardPhoto";

/* ─── Types ──────────────────────────────────────────────────────────── */
type Specialty = "all" | "wildlife" | "adventure" | "culture";

interface Guide {
  id: string;
  name: string;
  role: string;
  specialty: Exclude<Specialty, "all">;
  image: string;
  gallery?: string[];
  experience: string;
  languages: string[];
  rating: number;
  reviews: number;
  badge?: string;
  certifications: string[];
  highlights: string[];
  bio: string;
}

/* ─── Data ───────────────────────────────────────────────────────────── */

const SPECIALTIES: { id: Specialty; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Guides", icon: <Globe className="w-4 h-4" /> },
  { id: "wildlife", label: "Wildlife", icon: <TreePine className="w-4 h-4" /> },
  { id: "adventure", label: "Adventure", icon: <Mountain className="w-4 h-4" /> },
  { id: "culture", label: "Culture", icon: <Globe className="w-4 h-4" /> },
];

/* ─── Animations ─────────────────────────────────────────────────────── */
const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const cardVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

/* ─── Hero ───────────────────────────────────────────────────────────── */
function Hero({ activeSpec, setActiveSpec }: { activeSpec: Specialty; setActiveSpec: (s: Specialty) => void }) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1800&q=85" alt="African guide leading guests through the bush" fill priority className="object-cover" sizes="100vw" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 px-6 md:px-16 pb-16 max-w-7xl mx-auto w-full">
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
          <span className="block">Victoria Falls</span>
          <span className="block text-amber-400">Tour Guides</span>
          <span className="block">&amp; Safari Experts</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
          className="text-white/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          Each of our guides is a licensed expert who was born into this land and carries its stories in their bones. They don&apos;t just show you Africa — they reveal it.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="flex flex-wrap gap-8 mb-12">
          {[{ value: "3", label: "Expert Guides" }, { value: "14+", label: "Years Max Experience" }, { value: "100%", label: "Certified & Licensed" }, { value: "4.9★", label: "Average Rating" }].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-black text-amber-400">{s.value}</div>
              <div className="text-white/50 text-xs uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }} className="flex flex-wrap gap-2 items-center">
          <Filter className="w-4 h-4 text-white/40 mr-1" />
          {SPECIALTIES.map((s) => (
            <button key={s.id} onClick={() => setActiveSpec(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeSpec === s.id ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30" : "bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm border border-white/10"}`}>
              {s.icon}{s.label}
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

/* ─── Guide Card ─────────────────────────────────────────────────────── */
function GuideCard({ guide }: { guide: Guide }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem, items } = useCartStore();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isInCart = items.some((i) => i.id === guide.id);

  const handleAdd = () => {
    addItem({ id: guide.id, name: guide.name, category: "guide", price: "Price on request", priceNum: 0, image: guide.image, description: guide.role });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
    toast.success(`${guide.name} added to your trip!`, { icon: "🧭", style: { background: "#1a1a1a", color: "#fff", border: "1px solid #F59E0B", borderRadius: "12px" } });
  };

  return (
    <motion.div ref={ref} variants={cardVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="group bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-500">
      <div className="relative h-72 overflow-hidden">
        <motion.div animate={{ scale: hovered ? 1.05 : 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
          <CardPhoto
            src={guide.image}
            gallery={guide.gallery}
            alt={guide.name}
            title={guide.name}
            subtitle={guide.role}
            sizes="(max-width:768px) 100vw, 33vw"
            objectClass="object-cover object-top"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/20 to-transparent" />
            <div className="absolute top-3 left-3 flex gap-2">
              {guide.badge && <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">{guide.badge}</span>}
            </div>
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-white text-xs font-bold">{guide.rating}</span>
              <span className="text-white/40 text-xs">({guide.reviews})</span>
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="bg-black/60 backdrop-blur-sm text-white/60 text-xs px-2.5 py-1 rounded-full border border-white/10 capitalize">{guide.specialty}</span>
            </div>
          </CardPhoto>
        </motion.div>
      </div>

      <div className="p-5">
        <p className="text-amber-400/70 text-xs uppercase tracking-widest mb-1">{guide.role}</p>
        <h3 className="text-white text-xl font-bold mb-1 group-hover:text-amber-400 transition-colors duration-300">{guide.name}</h3>

        <div className="flex items-center gap-3 text-white/50 text-xs mb-4">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{guide.experience}</span>
          <span className="flex items-center gap-1"><Languages className="w-3 h-3" />{guide.languages.length} languages</span>
        </div>

        <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-4">{guide.bio}</p>

        <div className="grid grid-cols-2 gap-1.5 mb-4">
          {guide.highlights.map((h) => (
            <div key={h} className="flex items-center gap-1.5 text-white/60 text-xs">
              <Check className="w-3 h-3 text-amber-400 flex-shrink-0" /><span className="line-clamp-1">{h}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {guide.certifications.map((c) => (
            <span key={c} className="flex items-center gap-1 bg-white/5 border border-white/10 text-white/40 text-xs px-2 py-1 rounded-full">
              <Award className="w-3 h-3 text-amber-400/60" />{c}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-white/10">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${added || isInCart ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-amber-500 hover:bg-amber-400 text-black"}`}>
            {added || isInCart ? <><Check className="w-4 h-4" /><span>Added to Trip</span></> : <><ShoppingBag className="w-4 h-4" /><span>Book Guide — Get a Quote</span></>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Why Choose a Guide ─────────────────────────────────────────────── */
function WhyGuide() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const points = [
    { icon: <Shield className="w-6 h-6" />, title: "Your Safety Is Everything", body: "Every guide holds current wilderness first aid certification and dangerous game qualifications. In the bush, expertise equals safety." },
    { icon: <Award className="w-6 h-6" />, title: "Fully Licensed & Vetted", body: "All guides are licensed by the Zimbabwe Parks & Wildlife Management Authority and hold internationally recognised guiding qualifications." },
    { icon: <Languages className="w-6 h-6" />, title: "Multi-Lingual", body: "Our team speaks English, Shona, Ndebele, Tonga, Zulu, French, and Afrikaans — we speak your language and the land's language." },
    { icon: <Star className="w-6 h-6" />, title: "Consistently 5-Star Rated", body: "Across hundreds of verified reviews, our guides maintain an average rating of 4.9 out of 5 — the highest in the Victoria Falls region." },
  ];
  return (
    <section ref={ref} className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
        <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-3">The Musasa Guide Difference</p>
        <h2 className="text-3xl md:text-5xl font-black text-white">Why a Great Guide Changes Everything</h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {points.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 mb-4">{p.icon}</div>
            <h3 className="text-white font-bold text-lg mb-3">{p.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{p.body}</p>
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
        <Image src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1600&q=85" alt="Lion in the wild" fill className="object-cover" sizes="100vw" unoptimized />
        <div className="absolute inset-0 bg-black/75" />
      </div>
      <div className="relative z-10 py-24 px-6 md:px-16 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">See Africa Through a Master&apos;s Eyes</h2>
        <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">Book a guide above and add them to your trip. Combine with activities and accommodation for the complete Musasa experience.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {count > 0 ? (
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={openCart}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 justify-center">
              <ShoppingBag className="w-5 h-5" />View Your Trip ({count})
            </motion.button>
          ) : (
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} href="/services/activities"
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 py-4 rounded-xl text-lg transition-colors">
              Browse Activities
            </motion.a>
          )}
          <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} href="/contact"
            className="border border-white/30 hover:border-amber-400 text-white hover:text-amber-400 font-semibold px-10 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 justify-center">
            Ask a Question<ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Export ────────────────────────────────────────────────────── */
export default function TourGuidesClient({ guides }: { guides: Guide[] }) {
  const [activeSpec, setActiveSpec] = useState<Specialty>("all");
  const filtered = activeSpec === "all" ? guides : guides.filter((g) => g.specialty === activeSpec);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Hero activeSpec={activeSpec} setActiveSpec={setActiveSpec} />

      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="mb-12">
          <motion.div key={activeSpec} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-2">Meet the Team</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">Our Expert Guides</h2>
            </div>
            <p className="text-white/40 text-sm max-w-sm md:text-right">Book a guide below and add them to your trip alongside activities and accommodation.</p>
          </motion.div>
          <div className="mt-6 h-px bg-gradient-to-r from-amber-500/50 via-amber-500/10 to-transparent" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeSpec} variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((guide) => <GuideCard key={guide.id} guide={guide} />)}
          </motion.div>
        </AnimatePresence>
        {filtered.length === 0 && (
          <p className="text-center py-20 text-white/40 text-lg">No guides in this specialty yet.</p>
        )}
      </section>

      <WhyGuide />
      <CtaBanner />
      <div className="h-24" />
    </div>
  );
}
