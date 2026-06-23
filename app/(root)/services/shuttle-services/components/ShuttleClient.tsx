"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
  Car,
  Check,
  ShoppingBag,
  ChevronDown,
  ArrowRight,
  Shield,
  Clock,
  Users,
  MapPin,
  Plane,
  Star,
  Wifi,
  Wind,
  Filter,
  Phone,
} from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import toast from "react-hot-toast";

/* ─── Types ──────────────────────────────────────────────────────────── */
type ServiceType = "all" | "airport" | "cross-border" | "private" | "group";

interface TransferService {
  id: string;
  name: string;
  tagline: string;
  type: Exclude<ServiceType, "all">;
  image: string;
  price: string;
  priceNum: number;
  duration: string;
  capacity: string;
  badge?: string;
  amenities: string[];
  routes: string[];
  highlights: string[];
  description: string;
}

/* ─── Data ───────────────────────────────────────────────────────────── */
const SERVICES: TransferService[] = [
  {
    id: "airport-transfer",
    name: "Victoria Falls Airport Transfer",
    tagline: "Seamless Arrival & Departure",
    type: "airport",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&q=80",
    price: "From $45/transfer",
    priceNum: 45,
    duration: "15–25 min",
    capacity: "1–8 passengers",
    badge: "Most Booked",
    amenities: ["Air-conditioned", "Meet & greet", "Luggage assistance", "Wi-Fi on request", "Flight tracking", "24/7 availability"],
    routes: ["VFA Airport → Victoria Falls Town", "VFA Airport → Hotels & Lodges", "Cross-town transfers"],
    highlights: ["Flight-tracked pickups", "Professional uniformed driver", "Real-time WhatsApp updates", "Available 24/7, 365 days"],
    description: "Your journey through Africa begins the moment you step off the plane — and our airport transfer service ensures that first impression is of seamless, professional luxury. Our drivers monitor your flight in real time, adjusting pickup times automatically for delays so you're never kept waiting. Each vehicle is air-conditioned, immaculately maintained, and equipped with chilled water for your arrival. Your driver carries a personalised name board and assists with all luggage from arrivals hall to vehicle. We serve all hotels, lodges, and private residences in the Victoria Falls area and can arrange onward cross-border connections to Livingstone, Botswana, or beyond.",
  },
  {
    id: "livingstone-shuttle",
    name: "Victoria Falls ↔ Livingstone Shuttle",
    tagline: "Cross the Border Effortlessly",
    type: "cross-border",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=80",
    price: "From $35/person",
    priceNum: 35,
    duration: "30–45 min",
    capacity: "1–14 passengers",
    badge: "Daily Departures",
    amenities: ["Border crossing assistance", "Document handling", "Air-conditioned", "Scenic route", "Group friendly", "Return trips"],
    routes: ["Victoria Falls → Livingstone (Zambia)", "Livingstone → Victoria Falls", "Return day trips"],
    highlights: ["Twice-daily scheduled departures", "Border paperwork assistance", "Victoria Falls Bridge crossing", "Day trip & multi-day options"],
    description: "The Victoria Falls Bridge is one of the world's most spectacularly located border crossings — a steel arch spanning the dramatic Batoka Gorge 111 metres above the churning Zambezi, with Victoria Falls visible just upstream. Our Livingstone shuttle crosses this bridge twice daily, with our experienced drivers handling all border crossing formalities and paperwork to make the process completely stress-free. The journey takes 30–45 minutes depending on border activity and offers excellent views of the gorge from the bridge itself. We offer single journeys, return day trips (ideal for Livingstone's museum and the Zambian side of the falls), and multi-day connections.",
  },
  {
    id: "kasane-transfer",
    name: "Victoria Falls ↔ Kasane Transfer",
    tagline: "Gateway to Chobe National Park",
    type: "cross-border",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80",
    price: "From $85/person",
    priceNum: 85,
    duration: "1.5–2 hours",
    capacity: "1–10 passengers",
    amenities: ["Border crossing assistance", "Air-conditioned 4x4", "Scenic Botswana route", "Game spotting en route", "Luggage capacity", "Private options"],
    routes: ["Victoria Falls → Kasane, Botswana", "Kasane → Chobe Safari Lodges", "Return day trip to Chobe"],
    highlights: ["Cross into Botswana", "Chobe National Park access", "Wildlife spotting en route", "All border fees managed"],
    description: "Kasane, the gateway to Chobe National Park, is just 70 kilometres from Victoria Falls across the Botswana border — but the journey feels like crossing into another world as the landscape opens into the vast Chobe floodplains. Our cross-border transfer service handles all the paperwork at the Kazungula border post, which also crosses the Zambezi River by pontoon ferry — itself a memorable experience as hippo pods surface around the vessel. The route to Kasane passes through wildlife-rich bush and our drivers are trained to spot and stop for game along the way. We can also arrange direct connections to individual Chobe safari lodges, boat cruise embarkation points, and Kasane Airport.",
  },
  {
    id: "private-safari-transfer",
    name: "Private Safari Vehicle Transfer",
    tagline: "Your Exclusive Road Through Africa",
    type: "private",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80",
    price: "From $120/day",
    priceNum: 120,
    duration: "As required",
    capacity: "1–6 passengers",
    badge: "Premium",
    amenities: ["Dedicated vehicle & driver", "Open-sided game vehicle option", "Full day availability", "Cooler with drinks", "Guided commentary", "Flexible routing"],
    routes: ["Custom routes throughout Zimbabwe", "Cross-border to Zambia & Botswana", "Multi-day safari circuits"],
    highlights: ["Dedicated vehicle all day", "Professional driver-guide", "Flexible, go-anywhere routing", "Stop anywhere, anytime"],
    description: "When standard transfers won't do, our private safari vehicle service puts a dedicated, professionally driven vehicle at your complete disposal for the duration you need — half day, full day, or multi-day. Unlike shared shuttles, a private vehicle waits while you linger at a viewpoint, stops wherever you ask to photograph wildlife, and operates entirely on your schedule. Our vehicles range from comfortable minibuses to purpose-built open-sided game viewing vehicles with elevated seating and full communications equipment. All drivers hold professional driver's licences and many double as trained guides who provide running commentary on the landscapes, wildlife, and history you pass through. Ideal for couples, families, and small groups who value flexibility and privacy above all.",
  },
  {
    id: "group-shuttle",
    name: "Group Charter Shuttle",
    tagline: "Corporate & Group Travel Made Easy",
    type: "group",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&q=80",
    price: "From $180/trip",
    priceNum: 180,
    duration: "As required",
    capacity: "10–40 passengers",
    amenities: ["Air-conditioned coach", "PA system", "Luggage capacity", "Scheduled or charter", "Corporate billing", "Event coordination"],
    routes: ["Conference & event transfers", "Wedding party shuttles", "School & educational groups", "Corporate safari circuits"],
    highlights: ["10 to 40 passengers", "Corporate billing available", "Event-day coordination", "Licensed coach drivers"],
    description: "Moving a group of 10 to 40 people smoothly through Victoria Falls — across borders, between lodges, and to event venues — requires precision logistics and reliable vehicles. Our group charter service specialises in exactly this: scheduled multi-vehicle convoys for large safari groups, dedicated conference shuttles for corporate events at Victoria Falls hotels, wedding party transportation, and educational group tours. Each coach is air-conditioned, equipped with a PA system for group briefings, and driven by a licensed professional. Our operations team coordinates loading, timing, and border crossings with military precision so your group moves as one seamless unit. Corporate invoicing and detailed itinerary management are available for all group bookings.",
  },
];

const FILTERS: { id: ServiceType; label: string }[] = [
  { id: "all", label: "All Services" },
  { id: "airport", label: "Airport" },
  { id: "cross-border", label: "Cross-Border" },
  { id: "private", label: "Private" },
  { id: "group", label: "Group" },
];

/* ─── Animations ─────────────────────────────────────────────────────── */
const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const cardVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

/* ─── Hero ───────────────────────────────────────────────────────────── */
function Hero({ activeFilter, setActiveFilter }: { activeFilter: ServiceType; setActiveFilter: (f: ServiceType) => void }) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1800&q=85" alt="Transfer vehicle on an African road" fill priority className="object-cover" sizes="100vw" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 px-6 md:px-16 pb-16 max-w-7xl mx-auto w-full">
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
          <span className="block">Move Through</span>
          <span className="block text-amber-400">Africa</span>
          <span className="block">With Ease.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
          className="text-white/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          From airport pickups to cross-border adventures, our professional transfer network covers every kilometre of your southern African journey.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="flex flex-wrap gap-8 mb-12">
          {[{ value: "3", label: "Countries Covered" }, { value: "24/7", label: "Service Availability" }, { value: "100%", label: "On-Time Record" }, { value: "5★", label: "Passenger Rating" }].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-black text-amber-400">{s.value}</div>
              <div className="text-white/50 text-xs uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }} className="flex flex-wrap gap-2 items-center">
          <Filter className="w-4 h-4 text-white/40 mr-1" />
          {FILTERS.map((f) => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === f.id ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30" : "bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm border border-white/10"}`}>
              {f.label}
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

/* ─── Service Card ───────────────────────────────────────────────────── */
function ServiceCard({ service }: { service: TransferService }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem, items } = useCartStore();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isInCart = items.some((i) => i.id === service.id);

  const handleAdd = () => {
    addItem({ id: service.id, name: service.name, category: "transfer", price: service.price, priceNum: service.priceNum, image: service.image, duration: service.duration, description: service.tagline });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
    toast.success(`${service.name} added to your trip!`, { icon: "🚗", style: { background: "#1a1a1a", color: "#fff", border: "1px solid #F59E0B", borderRadius: "12px" } });
  };

  return (
    <motion.div ref={ref} variants={cardVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="group bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-500">
      <div className="relative h-56 overflow-hidden">
        <motion.div animate={{ scale: hovered ? 1.07 : 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
          <Image src={service.image} alt={service.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" unoptimized />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/10 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {service.badge && <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">{service.badge}</span>}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="bg-black/60 backdrop-blur-sm text-white/60 text-xs px-2.5 py-1 rounded-full border border-white/10 capitalize">{service.type.replace("-", " ")}</span>
          <span className="bg-black/60 backdrop-blur-sm text-white/60 text-xs px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1"><Clock className="w-3 h-3" />{service.duration}</span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-amber-400/70 text-xs uppercase tracking-widest mb-1">{service.tagline}</p>
        <h3 className="text-white text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors duration-300 leading-tight">{service.name}</h3>

        <div className="flex items-center gap-3 text-white/50 text-xs mb-4">
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{service.capacity}</span>
          <span className="flex items-center gap-1"><Plane className="w-3.5 h-3.5" />{service.routes.length} routes</span>
        </div>

        <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-4">{service.description}</p>

        <div className="grid grid-cols-2 gap-1.5 mb-4">
          {service.highlights.map((h) => (
            <div key={h} className="flex items-center gap-1.5 text-white/60 text-xs">
              <Check className="w-3 h-3 text-amber-400 flex-shrink-0" /><span className="line-clamp-1">{h}</span>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Routes covered</p>
          <div className="space-y-1">
            {service.routes.map((r) => (
              <div key={r} className="flex items-center gap-1.5 text-white/50 text-xs">
                <MapPin className="w-3 h-3 text-amber-400/50 flex-shrink-0" />{r}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {service.amenities.slice(0, 4).map((a) => (
            <span key={a} className="bg-white/5 border border-white/10 text-white/40 text-xs px-2 py-1 rounded-full">{a}</span>
          ))}
          {service.amenities.length > 4 && <span className="bg-white/5 border border-white/10 text-white/40 text-xs px-2 py-1 rounded-full">+{service.amenities.length - 4} more</span>}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-white/40 text-xs mb-0.5">Starting from</p>
            <p className="text-white font-bold text-lg">{service.price}</p>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAdd}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${added || isInCart ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-amber-500 hover:bg-amber-400 text-black"}`}>
            {added || isInCart ? <><Check className="w-4 h-4" /><span>Added</span></> : <><ShoppingBag className="w-4 h-4" /><span>Add Transfer</span></>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Why Choose Us ──────────────────────────────────────────────────── */
function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const points = [
    { icon: <Shield className="w-6 h-6" />, title: "Fully Insured Fleet", body: "Every vehicle in our fleet carries full commercial passenger liability insurance and is maintained to international safety standards." },
    { icon: <Clock className="w-6 h-6" />, title: "100% On-Time Record", body: "We have never missed an airport pickup. Our flight tracking system and contingency protocols guarantee you will always be collected on time." },
    { icon: <Star className="w-6 h-6" />, title: "Vetted Professional Drivers", body: "Every driver is background-checked, professionally licensed, and trained in customer service, first aid, and border crossing procedures." },
    { icon: <Phone className="w-6 h-6" />, title: "Real-Time Communication", body: "From the moment you book to the moment you arrive, our operations team provides real-time WhatsApp updates on your driver's status." },
  ];
  return (
    <section ref={ref} className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
        <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-3">Our Promise</p>
        <h2 className="text-3xl md:text-5xl font-black text-white">Why Travel With Our Fleet</h2>
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
        <Image src="https://images.unsplash.com/photo-1534759926276-df9cac7c7b34?w=1600&q=85" alt="Road through African landscape" fill className="object-cover" sizes="100vw" unoptimized />
        <div className="absolute inset-0 bg-black/75" />
      </div>
      <div className="relative z-10 py-24 px-6 md:px-16 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">Every Kilometre, Covered.</h2>
        <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">Add the transfers you need, then bundle with activities, accommodation, and a guide for the full Kumusha Ekhayalethu experience.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {count > 0 ? (
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={openCart}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 justify-center">
              <ShoppingBag className="w-5 h-5" />View Your Trip ({count})
            </motion.button>
          ) : (
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} href="/bookings"
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 py-4 rounded-xl text-lg transition-colors">
              Book a Transfer
            </motion.a>
          )}
          <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} href="/services/activities"
            className="border border-white/30 hover:border-amber-400 text-white hover:text-amber-400 font-semibold px-10 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 justify-center">
            Add Activities<ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Export ────────────────────────────────────────────────────── */
export default function ShuttleClient() {
  const [activeFilter, setActiveFilter] = useState<ServiceType>("all");
  const filtered = activeFilter === "all" ? SERVICES : SERVICES.filter((s) => s.type === activeFilter);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Hero activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="mb-12">
          <motion.div key={activeFilter} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-2">Transfer Services</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">Our Fleet & Routes</h2>
            </div>
            <p className="text-white/40 text-sm max-w-sm md:text-right">Add any transfer to your trip — combine with activities and accommodation for one seamless booking.</p>
          </motion.div>
          <div className="mt-6 h-px bg-gradient-to-r from-amber-500/50 via-amber-500/10 to-transparent" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeFilter} variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => <ServiceCard key={service.id} service={service} />)}
          </motion.div>
        </AnimatePresence>
      </section>

      <WhyUs />
      <CtaBanner />
      <div className="h-24" />
    </div>
  );
}
