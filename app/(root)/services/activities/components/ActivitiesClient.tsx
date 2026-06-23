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
const ACTIVITIES: Activity[] = [
  {
    id: "victoria-falls-tour",
    name: "Victoria Falls Rainforest Tour",
    tagline: "The Smoke That Thunders",
    category: "adventure",
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774991992/image_1774991979373_pvrvtp.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=400&q=80",
    ],
    duration: "3 hours",
    groupSize: "2–16",
    price: "From $85/person",
    priceNum: 85,
    rating: 4.9,
    reviews: 1247,
    difficulty: { label: "Easy", color: "text-green-400" },
    highlights: [
      "12+ viewpoints",
      "Rainforest paths",
      "Expert local guide",
      "Small groups only",
    ],
    badge: "Most Popular",
    description:
      "Stand face-to-face with one of the world's greatest natural wonders on a guided walk through the permanent rainforest created by the falls' eternal spray. Over 500 million litres of water plunge 108 metres into the Batoka Gorge every minute during peak flood, generating a roar heard 40 kilometres away and mist that rises 400 metres into the sky. Your knowledgeable guide leads you through more than a dozen viewpoints, each revealing a different perspective — from the thundering Main Falls and the aptly named Devil's Cataract to the tranquil Eastern Cataract and the dramatic Boiling Pot below the Victoria Falls Bridge. A perpetual rainbow arcs through the mist, soaking you in a fine spray and creating an atmosphere of raw, primal wonder that simply cannot be replicated anywhere else on earth.",
  },
  {
    id: "white-water-rafting",
    name: "Zambezi White Water Rafting",
    tagline: "Grade 5 Adrenaline",
    category: "adventure",
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774992071/image_1774992059545_mpalwz.jpg",
    gallery: [],
    duration: "Full day",
    groupSize: "6–12",
    price: "From $125/person",
    priceNum: 125,
    rating: 4.8,
    reviews: 893,
    difficulty: { label: "Extreme", color: "text-red-400" },
    highlights: [
      "23 legendary rapids",
      "Safety briefing included",
      "Lunch on the riverbank",
      "Professional photos",
    ],
    badge: "Adrenaline Rush",
    description:
      "Tackle the legendary rapids of the Zambezi River, consistently ranked among the world's top five white water rafting destinations. Below Victoria Falls, the Batoka Gorge channels the mighty river through 23 rapid sections, with many graded Class 4 and 5. You'll navigate through towering basalt cliffs that rise 250 metres, deep emerald pools of calm, and thundering rapids with names like 'The Devil's Toilet Bowl', 'The Washing Machine', and 'Oblivion'. Our expert guides — trained to the highest international safety standards — ensure your safety while delivering a maximum adrenaline experience. A riverside lunch of fresh salads, sandwiches, and cold drinks is served mid-river before you tackle the afternoon's legendary rapids in the dramatic Lower Zambezi gorge.",
  },
  {
    id: "helicopter-flight",
    name: "Flight of Angels Helicopter",
    tagline: "Aerial Masterpiece",
    category: "aerial",
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774992136/image_1774992128033_prvubv.jpg",
    gallery: [],
    duration: "13 minutes",
    groupSize: "1–6",
    price: "From $185/person",
    priceNum: 185,
    rating: 4.9,
    reviews: 2103,
    difficulty: { label: "Easy", color: "text-green-400" },
    highlights: [
      "360° panoramic views",
      "Full falls visible",
      "Named by Livingstone",
      "Photography heaven",
    ],
    badge: "Bucket List",
    description:
      "Experience Victoria Falls from the perspective that inspired Dr David Livingstone to write 'scenes so lovely must have been gazed upon by angels in their flight' in 1855. As your helicopter ascends above the rising mist column, the full magnitude of the falls reveals itself across the Zambia–Zimbabwe border — a curtain of white water stretching 1,708 metres wide, the largest waterfall on earth by combined width and flow. The aircraft banks and turns above the Devil's Cataract, the Main Falls, the Horseshoe Falls, the Rainbow Falls, and the Eastern Cataract, giving you multiple angles impossible to appreciate from ground level. The Batoka Gorge snakes dramatically below, and on clear days the Zambezi River is visible for 30 kilometres. Morning flights offer crystal clarity; afternoon flights bathe everything in liquid gold.",
  },
  {
    id: "bungee-jump",
    name: "Victoria Falls Bridge Bungee",
    tagline: "111 Metres of Pure Fear",
    category: "adventure",
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774992219/image_1774992209601_tiqsqy.jpg",
    gallery: [],
    duration: "2 hours",
    groupSize: "1–1",
    price: "From $160/person",
    priceNum: 160,
    rating: 4.7,
    reviews: 678,
    difficulty: { label: "Extreme", color: "text-red-400" },
    highlights: [
      "111m freefall",
      "Zambezi River below",
      "Historic 1905 bridge",
      "Video package included",
    ],
    description:
      "Take the ultimate leap of faith from the historic Victoria Falls Bridge, 111 metres above the churning, emerald Zambezi River with the roaring falls barely 150 metres to your side. Built in 1905, this iconic bridge spanning the border between Zimbabwe and Zambia is the world's most spectacularly located bungee jump — consistently ranked in the top ten globally. As you stand at the edge, the gorge plunges dramatically below your feet while the thunder of the falls fills your ears and the mist cools your skin. The moment of launch transforms into a moment of pure liberation — a 3.5-second freefall before the cord catches you in a series of exhilarating bounces, each one giving you an upside-down view of one of Africa's greatest landmarks. A complete video package captures every second of your bravery.",
  },
  {
    id: "elephant-safari",
    name: "Elephant-Back Safari",
    tagline: "Giants of the African Bush",
    category: "wildlife",
    image:
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=900&q=80",
    gallery: [],
    duration: "2 hours",
    groupSize: "2–8",
    price: "From $145/person",
    priceNum: 145,
    rating: 4.8,
    reviews: 1089,
    difficulty: { label: "Easy", color: "text-green-400" },
    highlights: [
      "Ride rescued elephants",
      "Conservation education",
      "Hands-on interaction",
      "Bush breakfast included",
    ],
    badge: "Family Favourite",
    description:
      "Forge an intimate bond with Africa's most iconic and intelligent creatures on a magical elephant-back safari through the mopane and thorn-bush of the Zimbabwe wilderness. Riding high on the back of these magnificent pachyderms, you traverse the African savannah at their gentle pace, experiencing the bush from a perspective that no other safari vehicle can match — at the same eye level as giraffes and within reaching distance of the treetops. Your mahout guides share the fascinating life stories of each elephant, revealing their distinct personalities, family histories, and the conservation programme that rescued and rehabilitated them. The experience concludes with a hands-on interaction session where you can feed the elephants acacia pods, assist in their daily bathing, and sit quietly as they lean their enormous, warm heads against you — an unforgettable connection with one of nature's most extraordinary beings.",
  },
  {
    id: "chobe-safari",
    name: "Chobe National Park Day Safari",
    tagline: "World's Greatest Elephant Sanctuary",
    category: "wildlife",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80",
    gallery: [],
    duration: "Full day",
    groupSize: "2–10",
    price: "From $195/person",
    priceNum: 195,
    rating: 4.9,
    reviews: 1562,
    difficulty: { label: "Easy", color: "text-green-400" },
    highlights: [
      "120,000+ elephants",
      "Big Five territory",
      "River cruise included",
      "All meals & park fees",
    ],
    badge: "Premium Experience",
    description:
      "Cross into Botswana for an extraordinary full-day immersion in Chobe National Park — home to the world's highest concentration of African elephants, with an estimated 120,000 individuals roaming these extraordinary wetlands and floodplains. Morning game drives in specialist open 4×4 vehicles take you deep into habitats teeming with buffalo herds numbering in the thousands, stately giraffe browsing in acacia forests, massive zebra migrations, and an astonishing array of predators including lions, leopards, cheetah, and the rare African wild dog. A gourmet riverside lunch sets the scene for the afternoon boat cruise along the Chobe River, where the experience transforms entirely — floating past enormous hippo pods, massive Nile crocodiles on sandy banks, and literally hundreds of elephants coming to drink, bathe, and play at the river's edge as the sun turns everything amber and gold.",
  },
  {
    id: "lion-encounter",
    name: "Lion Encounter & Walk",
    tagline: "Walk with Africa's Apex Predators",
    category: "wildlife",
    image:
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=900&q=80",
    gallery: [],
    duration: "90 minutes",
    groupSize: "2–8",
    price: "From $110/person",
    priceNum: 110,
    rating: 4.7,
    reviews: 734,
    difficulty: { label: "Moderate", color: "text-yellow-400" },
    highlights: [
      "Walk with young lions",
      "Conservation programme",
      "Expert handlers",
      "Exceptional photography",
    ],
    description:
      "Walk alongside magnificent African lions through their natural bush habitat in one of the most extraordinary and thought-provoking wildlife encounters available anywhere on the continent. Accompanied by highly trained handlers and your own guide, you walk through the African bush alongside young lions participating in a phased conservation programme designed to support the eventual reintroduction of lions into protected wilderness areas. As you walk at the lions' pace — sometimes slow and contemplative, sometimes a brisk saunter — you observe their natural behaviours at breathtakingly close range: how they investigate scents, read the bush for prey and rivals, and interact socially with each other and with their human carers. Your guide delivers a masterclass in lion ecology, conservation challenges, and the urgent work being done to protect these iconic apex predators whose populations have declined by 43% in the past two decades.",
  },
  {
    id: "zambezi-cruise",
    name: "Zambezi Sunset Cruise",
    tagline: "Africa's Golden Hour on the River",
    category: "water",
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774992316/image_1774992304643_y5jdze.jpg",
    gallery: [],
    duration: "2 hours",
    groupSize: "4–40",
    price: "From $75/person",
    priceNum: 75,
    rating: 4.8,
    reviews: 2341,
    difficulty: { label: "Easy", color: "text-green-400" },
    highlights: [
      "Sundowner drinks included",
      "Hippo & croc sightings",
      "African fish eagle calls",
      "Canapes & catering",
    ],
    badge: "Most Romantic",
    description:
      "Glide along the upper Zambezi River as the African sun transforms the sky into a canvas of fire — golds, crimsons, violets, and deep purples — on this enchanting two-hour sunset cruise through one of Africa's most biodiverse waterways. The upper Zambezi above the falls is a tranquil paradise of islands, channels, and riverine forest inhabited by enormous hippo pods that surface with characteristic snorts just metres from the boat, Nile crocodiles measuring up to five metres basking on sandy banks, and a kaleidoscope of 350+ bird species including the iconic African fish eagle whose haunting cry is the unmistakable voice of the African wilderness. Complimentary sundowner drinks — gin and tonic, wine, cold beer, or soft drinks — and freshly prepared canapés of smoked salmon, bruschetta, and cheese are served as your boat drifts through channels that have remained unchanged for thousands of years.",
  },
  {
    id: "cultural-village",
    name: "Cultural Village Experience",
    tagline: "Living Stories of Zimbabwe",
    category: "culture",
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774992501/image_1774992393481_kdmmsp.jpg",
    gallery: [],
    duration: "3 hours",
    groupSize: "2–20",
    price: "From $65/person",
    priceNum: 65,
    rating: 4.6,
    reviews: 456,
    difficulty: { label: "Easy", color: "text-green-400" },
    highlights: [
      "Traditional cooking class",
      "Drumming & dancing",
      "Craft demonstrations",
      "Community-owned",
    ],
    description:
      "Immerse yourself in the rich, layered cultural heritage of the Tonga, Ndebele, and Shona peoples through this authentic, community-owned village experience that goes far beyond a typical tourist encounter. You'll learn the ancient art of fire-making by hand, try your skill at traditional clay pot creation, and watch master craftspeople weave intricate Ilala palm baskets using patterns that carry genealogical significance and community stories told across generations. Village women cook a traditional meal using fresh ingredients ground by hand on flat stones — sadza, nyama, and fresh vegetables prepared with recipes unchanged for centuries — which you share with the community in the shade of an ancient fig tree. As the afternoon deepens, the air fills with the resonant heartbeat of traditional drums as the village dancers perform the powerful, athletically demanding Ndebele war dances and the joyful Shona mbira music, before inviting you to join in — a cultural exchange of pure warmth and genuine connection.",
  },
  {
    id: "microlight-flight",
    name: "Microlight Flight Over the Falls",
    tagline: "Open-Air Aerial Adventure",
    category: "aerial",
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774992500/image_1774992419689_zquz9r.jpg",
    gallery: [],
    duration: "15–30 minutes",
    groupSize: "1–2",
    price: "From $140/person",
    priceNum: 140,
    rating: 4.8,
    reviews: 389,
    difficulty: { label: "Easy", color: "text-green-400" },
    highlights: [
      "Open-air cockpit",
      "Unlimited photography",
      "Dawn & dusk flights",
      "Tandem with pilot",
    ],
    description:
      "Soar above Victoria Falls in an open-air microlight aircraft for an exhilarating, wind-in-your-face aerial experience that surpasses even a helicopter in pure freedom and intimacy. Flying tandem with a highly experienced pilot, you bank and turn at low speed above the falls, giving you unlimited time to photograph in any direction without the vibration, noise restrictions, or enclosed cockpit of a helicopter. The microlight's slow airspeed — typically around 100km/h — means you can linger above each section of the falls as long as you wish, while the open cockpit puts you in complete sensory contact with the environment: the cool updrafts from the gorge, the growing roar of the falls, and the extraordinary smell of millions of tonnes of water cascading through the ancient basalt. Dawn flights, when the gorge is filled with morning mist and lit by slanting golden light, are widely considered the single most spectacular natural aerial experience available anywhere in Africa.",
  },
  {
    id: "zambezi-kayaking",
    name: "Upper Zambezi Kayaking",
    tagline: "Paddle Through Untouched Wilderness",
    category: "water",
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774992500/image_1774992451212_owlcf5.jpg",
    gallery: [],
    duration: "3 hours",
    groupSize: "2–12",
    price: "From $95/person",
    priceNum: 95,
    rating: 4.7,
    reviews: 312,
    difficulty: { label: "Moderate", color: "text-yellow-400" },
    highlights: [
      "Beginner-friendly",
      "Close hippo encounters",
      "180+ bird species",
      "Expert guide included",
    ],
    description:
      "Paddle through the pristine upper Zambezi River waterways on a guided kayaking adventure through one of Africa's most biodiverse and least-disturbed river ecosystems, exploring a network of islands, channels, and backwaters that very few visitors ever experience. Threading silently between papyrus-fringed islands and braided channels, you'll encounter hippo pods of 20–30 individuals lounging in the shallows, raising their massive heads to regard you with mild curiosity before subsiding again, and enormous Nile crocodiles on sun-baked sandbanks. The birdlife is extraordinary — over 180 species have been recorded along this stretch, including African fish eagle, African skimmer, rock pratincole, giant kingfisher, and the tiny, jewel-brilliant malachite kingfisher darting through the reeds like a streak of sapphire and fire. The calm, braided channels of the upper Zambezi make this experience suitable for beginners and experienced paddlers alike.",
  },
  {
    id: "hwange-safari",
    name: "Hwange National Park Safari",
    tagline: "Zimbabwe's Untouched Wilderness",
    category: "wildlife",
    image:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1774992499/image_1774992481223_j3z7jl.jpg",
    gallery: [],
    duration: "Full day",
    groupSize: "2–8",
    price: "From $175/person",
    priceNum: 175,
    rating: 4.8,
    reviews: 891,
    difficulty: { label: "Easy", color: "text-green-400" },
    highlights: [
      "Big Five territory",
      "Expert tracker guides",
      "Artificial waterholes",
      "Teak forest ecosystem",
    ],
    description:
      "Journey to Zimbabwe's largest and oldest national park — 14,651 square kilometres of pristine wilderness ranging from ancient teak forests and golden grasslands to enigmatic Kalahari sandveld and dramatic baobab woodlands — for an unforgettable full-day safari through one of Africa's most underrated wildlife destinations. Hwange harbours Zimbabwe's largest elephant population alongside all members of the Big Five: lion, leopard, rhinoceros, buffalo, and elephant, plus wild dog, cheetah, giraffe, zebra, wildebeest, and over 400 bird species. The park's famous artificial waterholes — some created by the legendary researcher and conservationist WW \'Oom\' Barry — attract extraordinary concentrations of wildlife during the dry season. Watching hundreds of elephants, zebra, giraffe, and buffalo gather simultaneously at a single waterhole while lions wait patiently in the shade is a wildlife spectacle that rivals anything Africa has to offer. Expert trackers interpret the landscape's hidden stories with extraordinary skill.",
  },
];

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
          <span className="block">Extraordinary</span>
          <span className="block text-amber-400">African</span>
          <span className="block">Adventures</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-white/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
        >
          Choose from 12 world-class experiences curated by those who know this
          land intimately. Build your perfect itinerary — add as many as you
          like and checkout in one seamless flow.
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
          The Kumusha Difference
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
export default function ActivitiesClient() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered =
    activeCategory === "all"
      ? ACTIVITIES
      : ACTIVITIES.filter((a) => a.category === activeCategory);

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
