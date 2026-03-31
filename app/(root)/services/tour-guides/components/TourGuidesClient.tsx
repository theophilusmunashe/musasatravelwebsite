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
  Camera,
  Binoculars,
  Mountain,
  Globe,
  Filter,
  Eye,
} from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import toast from "react-hot-toast";

/* ─── Types ──────────────────────────────────────────────────────────── */
type Specialty = "all" | "wildlife" | "adventure" | "culture" | "photography" | "birding";

interface Guide {
  id: string;
  name: string;
  role: string;
  specialty: Exclude<Specialty, "all">;
  image: string;
  experience: string;
  languages: string[];
  rating: number;
  reviews: number;
  price: string;
  priceNum: number;
  badge?: string;
  certifications: string[];
  highlights: string[];
  bio: string;
}

/* ─── Data ───────────────────────────────────────────────────────────── */
const GUIDES: Guide[] = [
  {
    id: "guide-tendai",
    name: "Tendai Moyo",
    role: "Senior Wildlife Naturalist",
    specialty: "wildlife",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    experience: "14 years",
    languages: ["English", "Shona", "Ndebele", "Zulu"],
    rating: 5.0,
    reviews: 412,
    price: "From $90/day",
    priceNum: 90,
    badge: "Top Rated",
    certifications: ["ZPWMA Licensed", "FGASA Level 3", "First Aid Wilderness"],
    highlights: ["Expert tracker", "Big Five specialist", "Hwange & Chobe expert", "Published naturalist"],
    bio: "With 14 years working across Zimbabwe and Botswana's finest reserves, Tendai is widely regarded as one of the finest wildlife naturalists in southern Africa. His tracking ability is extraordinary — he can read a game trail like a book, identifying not just the species but the age, sex, emotional state, and direction of travel of every animal that passed. His encyclopaedic knowledge of animal behaviour transforms a standard game drive into a masterclass in African ecology. Tendai's patient, unhurried guiding style allows wildlife encounters to unfold naturally and without pressure, creating experiences of genuine depth. He has been published in three African wildlife journals and mentors young Zimbabwean guides through a local conservation programme.",
  },
  {
    id: "guide-farai",
    name: "Farai Sibanda",
    role: "Adventure & Adrenaline Specialist",
    specialty: "adventure",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
    experience: "9 years",
    languages: ["English", "Ndebele", "Afrikaans"],
    rating: 4.9,
    reviews: 287,
    price: "From $80/day",
    priceNum: 80,
    certifications: ["Swift Water Rescue", "Rafting Guide Level 4", "First Aid Wilderness"],
    highlights: ["White water rafting expert", "Bungee & gorge guide", "Microlight certified", "Canopy & zip-line"],
    bio: "Farai grew up on the banks of the Zambezi and has spent his entire adult life guiding travellers through its most dramatic experiences. As a certified Swift Water Rescue technician and internationally qualified white water guide, he has led thousands of guests down the Grade 5 rapids of the Batoka Gorge without a single safety incident — a testament to his technical skill and unwavering attention to safety. Beyond the water, Farai guides bungee jump groups from the Victoria Falls Bridge, microlight flights, and gorge swing experiences. His infectious enthusiasm and calm under pressure create an atmosphere of total confidence that allows guests to push their personal limits and discover reservoirs of courage they didn't know they had.",
  },
  {
    id: "guide-nomvula",
    name: "Nomvula Dube",
    role: "Cultural Heritage Specialist",
    specialty: "culture",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    experience: "11 years",
    languages: ["English", "Ndebele", "Shona", "Tonga", "Zulu"],
    rating: 4.9,
    reviews: 334,
    price: "From $75/day",
    priceNum: 75,
    badge: "Cultural Expert",
    certifications: ["Cultural Heritage Guide", "Community Tourism Cert.", "Traditional Arts Facilitator"],
    highlights: ["Five languages spoken", "Village ceremony access", "Traditional cooking guide", "Oral history storyteller"],
    bio: "Nomvula is the rare guide who can genuinely bridge cultures — her warm, open personality and fluency in five languages (including the rare Tonga language of the Zambezi valley's original inhabitants) allow her to facilitate authentic connections between travellers and communities that simply cannot be replicated. Born in a village 30 kilometres from Victoria Falls, she grew up participating in the traditional ceremonies, crafts, and foodways that she now shares with travellers. Her village tours reach places and people that no other guide can access — private ceremonies, elders who share oral history passed down for 20 generations, and craft masters who demonstrate techniques on the verge of extinction. Nomvula's passion is cultural preservation through authentic cultural tourism.",
  },
  {
    id: "guide-james",
    name: "James Mpofu",
    role: "Master Birding Guide",
    specialty: "birding",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    experience: "17 years",
    languages: ["English", "Shona"],
    rating: 5.0,
    reviews: 198,
    price: "From $85/day",
    priceNum: 85,
    badge: "Specialist",
    certifications: ["BirdLife Zimbabwe", "SAOS Advanced Birding", "Species Reporting Authority"],
    highlights: ["750+ species identified", "Rare species specialist", "Sunrise walk expert", "Published bird lists"],
    bio: "James is one of Zimbabwe's most celebrated birding guides and has been instrumental in developing Victoria Falls as a world-class birding destination. Over 17 years he has personally identified more than 750 bird species in the greater Victoria Falls region — including 12 species considered very rare for the area — and his ability to identify birds by call alone in dense riverine forest is considered extraordinary even by professional ornithologists. His morning birding walks along the Zambezi leave before dawn and routinely deliver sightings of 40–60 species in three hours, including the iconic African fish eagle, Pel's fishing owl, African skimmer, and the dazzling malachite kingfisher. James corresponds with BirdLife International and contributes to global species monitoring databases.",
  },
  {
    id: "guide-chiedza",
    name: "Chiedza Mutasa",
    role: "Photography & Visual Storytelling",
    specialty: "photography",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    experience: "7 years",
    languages: ["English", "Shona", "French"],
    rating: 4.8,
    reviews: 156,
    price: "From $95/day",
    priceNum: 95,
    certifications: ["Professional Photography", "Drone Pilot License", "Wildlife Ethics in Photography"],
    highlights: ["Wildlife photo coaching", "Golden hour positioning", "Drone footage operator", "Published photographer"],
    bio: "Chiedza combines exceptional guiding skills with a deep understanding of light, composition, and the art of capturing Africa's beauty. Her photographs have been published in National Geographic Traveller, Conde Nast Traveller, and multiple wildlife photography journals. As your photography guide, she positions you in the right place at the right time — whether that's the precise angle of light on the falls at 7am, the perfect distance for a lion portrait at golden hour, or the choreography of a hippo yawn at sunset. She coaches guests on camera technique from beginner to advanced level, operates a licensed drone for aerial footage, and understands animal behaviour well enough to anticipate photographic moments before they happen.",
  },
  {
    id: "guide-solomon",
    name: "Solomon Ncube",
    role: "Wilderness Tracking Expert",
    specialty: "wildlife",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=600&q=80",
    experience: "20 years",
    languages: ["English", "Ndebele", "Tswana"],
    rating: 5.0,
    reviews: 521,
    price: "From $100/day",
    priceNum: 100,
    badge: "Master Guide",
    certifications: ["FGASA Trails Guide", "Dangerous Game Certified", "Anti-Poaching Unit Graduate"],
    highlights: ["20 years in the bush", "Big Five walking safaris", "Night tracking specialist", "Wilderness survival training"],
    bio: "In 20 years of professional guiding, Solomon has led over 3,000 walking safaris across southern Africa's most challenging and rewarding wilderness areas — including over 400 encounters with lion, elephant, and buffalo on foot. His calm authority in dangerous situations, developed over two decades of working with the most challenging megafauna on earth, is legendary among his peers and immediately reassuring to guests. Solomon's tracking ability goes far beyond reading footprints — he tracks by scent disturbance, broken branches, bird alarm calls, dung temperature, and dozens of other subtle environmental cues that tell him exactly where the lions spent last night and where they're heading this morning. He is considered one of the ten finest walking safari guides in all of Africa.",
  },
];

const SPECIALTIES: { id: Specialty; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Guides", icon: <Globe className="w-4 h-4" /> },
  { id: "wildlife", label: "Wildlife", icon: <TreePine className="w-4 h-4" /> },
  { id: "adventure", label: "Adventure", icon: <Mountain className="w-4 h-4" /> },
  { id: "culture", label: "Culture", icon: <Globe className="w-4 h-4" /> },
  { id: "photography", label: "Photography", icon: <Camera className="w-4 h-4" /> },
  { id: "birding", label: "Birding", icon: <Eye className="w-4 h-4" /> },
];

/* ─── Animations ─────────────────────────────────────────────────────── */
const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const cardVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

/* ─── Hero ───────────────────────────────────────────────────────────── */
function Hero({ activeSpec, setActiveSpec }: { activeSpec: Specialty; setActiveSpec: (s: Specialty) => void }) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1800&q=85" alt="Expert tour guide in the African bush" fill priority className="object-cover" sizes="100vw" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 px-6 md:px-16 pb-16 max-w-7xl mx-auto w-full">
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
          <span className="block">The Land</span>
          <span className="block text-amber-400">Through Expert</span>
          <span className="block">Eyes.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
          className="text-white/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          Each of our guides is a licensed expert who was born into this land and carries its stories in their bones. They don&apos;t just show you Africa — they reveal it.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="flex flex-wrap gap-8 mb-12">
          {[{ value: "6", label: "Expert Guides" }, { value: "20+", label: "Years Max Experience" }, { value: "100%", label: "Certified & Licensed" }, { value: "4.9★", label: "Average Rating" }].map((s) => (
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
    addItem({ id: guide.id, name: guide.name, category: "guide", price: guide.price, priceNum: guide.priceNum, image: guide.image, description: guide.role });
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
          <Image src={guide.image} alt={guide.name} fill className="object-cover object-top" sizes="(max-width:768px) 100vw, 33vw" unoptimized />
        </motion.div>
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

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-white/40 text-xs mb-0.5">Guide rate</p>
            <p className="text-white font-bold text-lg">{guide.price}</p>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAdd}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${added || isInCart ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-amber-500 hover:bg-amber-400 text-black"}`}>
            {added || isInCart ? <><Check className="w-4 h-4" /><span>Added</span></> : <><ShoppingBag className="w-4 h-4" /><span>Book Guide</span></>}
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
export default function TourGuidesClient() {
  const [activeSpec, setActiveSpec] = useState<Specialty>("all");
  const filtered = activeSpec === "all" ? GUIDES : GUIDES.filter((g) => g.specialty === activeSpec);

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
      </section>

      <WhyGuide />
      <CtaBanner />
      <div className="h-24" />
    </div>
  );
}
