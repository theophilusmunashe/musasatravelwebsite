"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
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
const ACCOMMODATIONS: Accommodation[] = [
  /* ── Musasa Exclusive Properties ───────────────────────────────────── */
  {
    id: "musasa-mist-pavilion",
    name: "The Mist Pavilion",
    tagline: "Where the Smoke That Thunders Meets You at Dawn",
    category: "musasa",
    image: "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774989724/WhatsApp_Image_2026-03-25_at_12.18.44_eaucfj.jpg",
    location: "Victoria Falls Town",
    country: "Zimbabwe",
    price: "From $120/night",
    priceNum: 120,
    rating: 4.9,
    reviews: 87,
    nights: "Min. 1 night",
    guests: "2 guests",
    badge: "Musasa Exclusive",
    amenities: ["Garden terrace", "Daily breakfast", "Falls transfers", "Wi-Fi", "Concierge", "Sundowner deck"],
    highlights: [
      "10 min walk to Victoria Falls",
      "Private mist-garden setting",
      "Musasa-curated daily itinerary",
      "Breakfast & sunset drinks included",
    ],
    description:
      "A hand-picked Musasa Travel exclusive — a serene pavilion-style chalet tucked within a lush indigenous garden just ten minutes on foot from the entrance to Victoria Falls. Each morning you wake to the distant roar of the falls and the garden fills with the fine mist that gives the property its name. Our team personally curates a daily activity schedule for every guest, and complimentary falls transfers, daily breakfast, and sunset sundowners on the garden deck are all included. This is Victoria Falls the way the early explorers experienced it — intimate, beautiful, and completely unhurried.",
  },
  {
    id: "musasa-zambezi-sundown-suites",
    name: "Zambezi Sundown Suites",
    tagline: "Golden Hour on Africa's Greatest River",
    category: "musasa",
    image: "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774989723/WhatsApp_Image_2026-03-25_at_12.18.44_1_mpd5oh.jpg",
    location: "Upper Zambezi",
    country: "Zimbabwe",
    price: "From $145/night",
    priceNum: 145,
    rating: 4.9,
    reviews: 63,
    nights: "Min. 2 nights",
    guests: "2 guests",
    badge: "Musasa Exclusive",
    amenities: ["West-facing deck", "River views", "Breakfast", "Guided walks", "Wi-Fi", "Falls transfers"],
    highlights: [
      "West-facing sundowner decks",
      "Zambezi River frontage",
      "Guided morning bird walks",
      "Complimentary airport pickup",
    ],
    description:
      "Musasa Travel's most romantic address — a collection of intimate suites built on the banks of the upper Zambezi, each facing west so that your private deck becomes a front-row seat for the extraordinary African sunset that repaints the river in copper and gold every evening without fail. Accommodation is in beautifully appointed stone-and-thatch suites with en-suite bathrooms, handcrafted local furniture, and private decks where breakfast is served as the sun climbs above the mopane woodland on the opposite bank. Our guides lead optional morning bird walks along the river's edge before activities begin — this is the Zambezi at its most peaceful and most beautiful.",
  },
  {
    id: "musasa-baobab-house",
    name: "The Baobab House",
    tagline: "A Century of Stories, All Your Own",
    category: "musasa",
    image: "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774989724/WhatsApp_Image_2026-03-25_at_12.18.43_3_r0vpel.jpg",
    location: "Victoria Falls Town",
    country: "Zimbabwe",
    price: "From $135/night",
    priceNum: 135,
    rating: 4.8,
    reviews: 54,
    nights: "Min. 1 night",
    guests: "Up to 4 guests",
    badge: "Musasa Exclusive",
    amenities: ["Private boma", "Full kitchen", "Garden pool", "Wi-Fi", "Braai area", "Family rooms"],
    highlights: [
      "Centred around a 400-year-old baobab",
      "Private pool & boma",
      "Ideal for families & groups",
      "Fully self-contained option",
    ],
    description:
      "Named for the ancient baobab tree that stands at the heart of its garden — estimated at over 400 years old, its hollow trunk wide enough to shelter a family — The Baobab House is Musasa Travel's most characterful property and the perfect base for families or small groups exploring Victoria Falls. Four individually styled rooms open onto the garden and pool terrace, and a fully equipped kitchen, private boma, and braai area give guests complete independence. Our concierge team is available throughout your stay to arrange activities, transfers, and surprises — but many guests find The Baobab House so enchanting they simply spend their mornings at the pool beneath the ancient tree.",
  },
  /* ── Partner Properties ──────────────────────────────────────────── */
  {
    id: "matetsi-water-lodge",
    name: "Matetsi Water Lodge",
    tagline: "The Most Exclusive Address in Southern Africa",
    category: "luxury",
    // Cantilevered deck/pool over river — Zambezi, Zimbabwe
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774990051/lodge-lap-pool_bjhcwb.jpg",
    location: "Matetsi Private Reserve",
    country: "Zimbabwe",
    price: "From $890/night",
    priceNum: 890,
    rating: 5.0,
    reviews: 412,
    nights: "Min. 3 nights",
    guests: "2 guests",
    badge: "Editor's Pick",
    amenities: ["Private pool", "All-inclusive", "Game drives", "River suite", "Spa", "Butler"],
    highlights: [
      "136,000ha private reserve",
      "Cantilevered river suites",
      "Big Five territory",
      "All meals & drinks included",
    ],
    description:
      "Set within the 136,000-hectare Matetsi Private Game Reserve on the south bank of the Zambezi River — arguably the most exclusive address in southern Africa — this internationally acclaimed lodge represents the pinnacle of African safari accommodation. The 18 suites are architectural masterpieces in teak, stone, and glass, each with its own private pool cantilevered over the riverbank so that you wake to the sight of elephants drinking just metres below. The reserve is traversed exclusively by Matetsi's own guests, ensuring sightings of exceptional rarity and intimacy; big cats, wild dogs, and enormous elephant herds are regular visitors to the suites' private decks. Fully all-inclusive — game drives, boat cruises, all meals, and premium beverages are covered.",
  },
  {
    id: "chobe-bush-lodge",
    name: "Chobe Bush Lodge",
    tagline: "Life on the Legendary Chobe River",
    category: "safari-lodge",
    // Chobe River / Botswana savannah river landscape
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774990158/kasane-accommodation-chobe-bush-lodge_xuz6xj.jpg",
    location: "Chobe National Park",
    country: "Botswana",
    price: "From $650/night",
    priceNum: 650,
    rating: 4.9,
    reviews: 687,
    nights: "Min. 2 nights",
    guests: "2 guests",
    badge: "All-Inclusive",
    amenities: ["Private plunge pool", "All-inclusive", "Boat cruises", "Walking safaris", "Game drives", "Star beds"],
    highlights: [
      "Private river concession",
      "120,000+ elephants nearby",
      "Outdoor star-bed sleeping",
      "Boat cruises on Chobe River",
    ],
    description:
      "Positioned on the banks of the legendary Chobe River within its own private concession adjacent to Chobe National Park — home to the world's highest concentration of African elephants — this all-inclusive safari lodge delivers pure, unpretentious African wilderness luxury. The 15 river suites are suspended above the floodplain on raised decks, each with a private plunge pool, outdoor sala for sleeping under the stars, and floor-to-ceiling glass walls that dissolve the boundary between interior and the wilderness beyond. All-inclusive pricing covers game drives, boat cruises, walking safaris, all meals, and premium beverages — every moment of your stay is expertly curated to deliver the very best of the Chobe ecosystem.",
  },
  {
    id: "victoria-falls-safari-lodge",
    name: "Victoria Falls Safari Lodge",
    tagline: "Perched Above the Zambezi Floodplains",
    category: "safari-lodge",
    // Thatched safari lodge overlooking African floodplain — Victoria Falls, Zimbabwe
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774990387/image_1774990372076_hy0wam.jpg",
    location: "Victoria Falls",
    country: "Zimbabwe",
    price: "From $380/night",
    priceNum: 380,
    rating: 4.8,
    reviews: 1203,
    nights: "Min. 1 night",
    guests: "2 guests",
    badge: "Most Popular",
    amenities: ["Plunge pool", "Game drives", "Fine dining", "Spa", "Sundeck", "Waterhole viewing"],
    highlights: [
      "Overlooks Zambezi Floodplains",
      "White rhino & buffalo",
      "Open-air waterhole deck",
      "Award-winning restaurant",
    ],
    description:
      "Perched on a rocky ridge overlooking the Zambezi National Park, this award-winning lodge offers panoramic views from your private plunge pool while white rhino and buffalo graze on the floodplains below. The lodge's 72 thatched chalets are architecturally stunning — organic shapes inspired by termite mounds, open to the African sky with outdoor showers and handcrafted Ndebele furnishings. Mornings begin with the thunderous chorus of the African bush and the haunting call of fish eagles; evenings are spent watching herds of elephant silhouetted against extraordinary Zimbabwean sunsets from the elevated deck — a ritual that guests return to year after year.",
  },
  {
    id: "gorges-lodge",
    name: "Gorges Lodge",
    tagline: "On the Rim of the Batoka Gorge",
    category: "boutique",
    // Dramatic gorge cliff edge — Batoka Gorge, Zimbabwe
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774990479/image_1774990465698_kho475.jpg",
    location: "Batoka Gorge",
    country: "Zimbabwe",
    price: "From $320/night",
    priceNum: 320,
    rating: 4.8,
    reviews: 334,
    nights: "Min. 2 nights",
    guests: "2 guests",
    amenities: ["Infinity pool", "Gorge views", "Private swimming holes", "Birdwatching", "Sundowners", "Gourmet dining"],
    highlights: [
      "Cliff-edge infinity pool",
      "200m gorge views",
      "Private gorge swimming",
      "8km from Victoria Falls",
    ],
    description:
      "Dramatically situated on the rim of the Batoka Gorge just 8 kilometres downstream from Victoria Falls, Gorges Lodge offers one of the most spectacularly positioned accommodations in all of Africa — where the mighty Zambezi has carved a series of ancient volcanic gorges of vertiginous beauty over millions of years. The lodge's chalets and main areas are built to the very edge of the cliff, offering heart-stopping views straight down into the gorge and the churning rapids 200 metres below, while the infinity pool appears to hover above the abyss. Exclusive access to the gorge for private swimming, fly-fishing, and birdwatching is available only to lodge guests.",
  },
  {
    id: "palm-river-hotel",
    name: "The Palm River Hotel",
    tagline: "Colonial Elegance Meets African Soul",
    category: "boutique",
    // Boutique tropical garden hotel pool — Victoria Falls Town
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774990572/image_1774990561284_pevd4s.jpg",
    location: "Victoria Falls Town",
    country: "Zimbabwe",
    price: "From $220/night",
    priceNum: 220,
    rating: 4.7,
    reviews: 891,
    nights: "Min. 1 night",
    guests: "2 guests",
    amenities: ["Pool terrace", "Restaurant", "Garden rooms", "Concierge", "Wi-Fi", "Airport transfers"],
    highlights: [
      "Minutes from the falls",
      "Celebrated restaurant",
      "Tropical garden setting",
      "10 individually designed rooms",
    ],
    description:
      "This intimate boutique hotel sits within lush tropical gardens just minutes from the entrance to Victoria Falls, blending colonial elegance with contemporary African luxury in a way that larger properties simply cannot replicate. The 10 individually designed rooms each feature hand-woven textiles, locally crafted furniture, and private garden terraces where the sound of birdsong replaces alarm clocks each morning. The property's celebrated restaurant — The Palms — serves innovative fusion cuisine combining Southern African ingredients with international techniques, while the pool terrace is widely regarded as the best sundowner spot in all of Victoria Falls town.",
  },
  {
    id: "livingstone-royal",
    name: "Livingstone Royal Suites",
    tagline: "Five-Star Grace in the Heart of Livingstone",
    category: "luxury",
    // Five-star hotel suite with private balcony — Livingstone, Zambia
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774990666/image_1774990646804_hxnby7.jpg",
    location: "Livingstone",
    country: "Zambia",
    price: "From $295/night",
    priceNum: 295,
    rating: 4.7,
    reviews: 567,
    nights: "Min. 1 night",
    guests: "2 guests",
    amenities: ["Spa", "Pool", "Fine dining", "Concierge", "Airport shuttle", "Wellness centre"],
    highlights: [
      "Named after Dr Livingstone",
      "Award-winning spa",
      "Zambia side of the falls",
      "42 private-balcony suites",
    ],
    description:
      "Named in honour of the great explorer who first documented Victoria Falls, this five-star hotel in Livingstone offers the perfect base for experiencing the Zambian side of the falls with an atmosphere of timeless, gracious luxury that echoes the great African lodges of the colonial golden age — updated entirely for contemporary comfort and sustainability. The 42 suites each have private balconies overlooking the hotel's verdant gardens and pool terrace, and the property's spa — The Mosi-oa-Tunya Wellness Centre — is consistently rated among Zambia's finest, offering treatments inspired by traditional African healing practices using local botanicals and minerals.",
  },
  {
    id: "gwango-elephant-camp",
    name: "Gwango Elephant Camp",
    tagline: "Wilderness Conservation Done Right",
    category: "eco-lodge",
    // Canvas-walled eco-lodge in African wilderness — Hwange, Zimbabwe
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774990780/image_1774990759900_nuphy9.jpg",
    location: "Hwange District",
    country: "Zimbabwe",
    price: "From $180/night",
    priceNum: 180,
    rating: 4.8,
    reviews: 423,
    nights: "Min. 2 nights",
    guests: "2 guests",
    badge: "Eco Certified",
    amenities: ["Solar-powered", "Wildlife corridor", "Organic kitchen", "Research walks", "Star gazing", "Community tours"],
    highlights: [
      "Multi-award winning eco-lodge",
      "Adjacent to Hwange NP",
      "Conservation researcher stays",
      "Zero carbon footprint",
    ],
    description:
      "This pioneering eco-lodge sits within a private wildlife corridor adjacent to Hwange National Park, where the property's philosophy of minimal environmental footprint and maximum wildlife immersion has earned it multiple sustainable tourism awards. Nine canvas-walled chalets on raised wooden platforms allow you to hear every sound of the African night — lions coughing in the distance, hyenas whooping, and the deep rumble of elephants passing in the darkness — while remaining in extraordinary comfort with en-suite bathrooms, solar-heated water, and chef-prepared cuisine using produce from the lodge's organic garden. Morning walks with resident researchers offer an unparalleled insight into one of Africa's richest ecosystems.",
  },
  {
    id: "elephant-hills-resort",
    name: "Elephant Hills Resort",
    tagline: "Victoria Falls' Complete Safari Resort",
    category: "resort",
    // Large resort with golf course & Zambezi River frontage — Victoria Falls, Zimbabwe
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774990868/image_1774990854673_swxyzr.jpg",
    location: "Victoria Falls",
    country: "Zimbabwe",
    price: "From $165/night",
    priceNum: 165,
    rating: 4.5,
    reviews: 2103,
    nights: "Min. 1 night",
    guests: "Up to 4 guests",
    amenities: ["Championship golf", "Tennis", "Waterpark", "Spa", "Multiple restaurants", "Zambezi water sports"],
    highlights: [
      "18-hole championship golf",
      "Zambezi River frontage",
      "276 rooms & suites",
      "37 hectares of grounds",
    ],
    description:
      "Situated on the banks of the upper Zambezi River and spread across 37 hectares of indigenous bush and manicured golf fairways, Elephant Hills is Victoria Falls's largest and most comprehensive resort — offering an all-encompassing experience for travellers who want multiple world-class facilities on-site. The 276 rooms range from comfortable standard rooms to opulent suites with direct river frontage, and the property features Zimbabwe's only 18-hole championship golf course, a tennis academy, water sports centre on the Zambezi, and Victoria Falls's most extensive spa and wellness facility — all on a single, stunning property.",
  },
  {
    id: "lokuthula-lodges",
    name: "Lokuthula Lodges",
    tagline: "Privacy, Space & African Garden Living",
    category: "boutique",
    // Private self-catering lodge with tropical garden — Victoria Falls, Zimbabwe
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774990959/image_1774990948820_aeqo0k.jpg",
    location: "Victoria Falls",
    country: "Zimbabwe",
    price: "From $145/night",
    priceNum: 145,
    rating: 4.6,
    reviews: 678,
    nights: "Min. 1 night",
    guests: "Up to 6 guests",
    amenities: ["Private pool", "Fully equipped kitchen", "Private boma", "Garden", "Wildlife access", "Self-catering"],
    highlights: [
      "1.2km from the falls",
      "Perfect for families & groups",
      "Private pools & boma",
      "Indigenous wildlife garden",
    ],
    description:
      "These exceptionally well-appointed self-catering lodges in the heart of Victoria Falls town offer the ideal combination of privacy, space, and quality for families, groups, and travellers who prefer flexibility over a standard hotel room. Each of the 18 three-bedroom lodges is fully equipped with a fitted kitchen, private pool, boma for outdoor braais, and a shaded garden area surrounded by indigenous trees that attract abundant wildlife including vervet monkeys, bushbuck, and scores of bird species. At just 1.2 kilometres from the entrance to Victoria Falls, these lodges combine the convenience of a central location with the independence and privacy of a private home.",
  },
];

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
      <div className="relative h-64 md:h-72 overflow-hidden">
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
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <p className="text-amber-400/70 text-xs uppercase tracking-widest mb-1">
            {property.tagline}
          </p>
          <h3 className="text-white text-xl font-bold leading-tight group-hover:text-amber-400 transition-colors duration-300">
            {property.name}
          </h3>
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
export default function AccommodationClient() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered =
    activeCategory === "all"
      ? ACCOMMODATIONS
      : ACCOMMODATIONS.filter((a) => a.category === activeCategory);

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
