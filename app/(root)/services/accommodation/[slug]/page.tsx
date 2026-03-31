"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import AccommodationGallery from "../components/AccommodationGallery";
import AccommodationDetails from "../components/AccommodationDetails";
import AccommodationQuickBook from "../components/AccommodationQuickBook";
import { motion } from "framer-motion";

// Mock data - In production, this would come from Sanity CMS
const accommodationDataMap: { [key: string]: any } = {
  "luxury-safari-lodge": {
    _id: "1",
    title: "Luxury Safari Lodge",
    slug: { current: "luxury-safari-lodge" },
    mainImage:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711417/victoria-falls_kzd1kp.jpg",
    location: "Victoria Falls, Zimbabwe",
    price: "$450/night",
    rating: 4.9,
    reviews: 328,
    description:
      "Experience the ultimate African safari in our exclusive luxury lodge, nestled on the banks of the Zambezi River with stunning views of the iconic Victoria Falls. Each suite features floor-to-ceiling windows, private infinity pools, and personalized service from our dedicated concierge team. Wake up to the sounds of the African bush and spend your days on thrilling wildlife safaris led by expert guides.",
    amenities: [
      "Free WiFi",
      "Complimentary Breakfast",
      "Fine Dining Restaurant",
      "Flat-Screen TV",
      "Air Conditioning",
      "Swimming Pool",
      "Hiking Trails",
      "Garden Views",
    ],
    highlights: [
      "Private game reserve access with expert guides",
      "Luxury spa and wellness center",
      "Fine dining with African-inspired cuisine",
      "24/7 concierge service",
      "Private helicopter tours available",
      "Photography packages and wildlife training",
    ],
  },
  "boutique-coastal-retreat": {
    _id: "2",
    title: "Boutique Coastal Retreat",
    slug: { current: "boutique-coastal-retreat" },
    mainImage:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711419/south-africa_fv8tky.jpg",
    location: "Cape Town, South Africa",
    price: "$350/night",
    rating: 4.8,
    reviews: 287,
    description:
      "Discover the epitome of coastal elegance at our boutique retreat, perched on the cliffs overlooking the Atlantic Ocean. Our intimate 12-suite property offers unmatched privacy and personalized experiences, from sunset yoga sessions to gourmet dining experiences prepared by our renowned chef.",
    amenities: [
      "Free WiFi",
      "Complimentary Breakfast",
      "Fine Dining Restaurant",
      "Flat-Screen TV",
      "Air Conditioning",
      "Swimming Pool",
      "Hiking Trails",
      "Garden Views",
    ],
    highlights: [
      "Oceanfront infinity pool",
      "Private beach access",
      "World-class spa treatments",
      "Sunset wine tastings",
      "Gourmet breakfast included",
      "Personal beach concierge",
    ],
  },
  "mountain-view-cabin": {
    _id: "3",
    title: "Mountain View Cabin",
    slug: { current: "mountain-view-cabin" },
    mainImage:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711385/bernd-dittrich-F4IdzUgXwa4-unsplash_qidgzk.jpg",
    location: "Drakensberg Mountains, South Africa",
    price: "$250/night",
    rating: 4.7,
    reviews: 156,
    description:
      "Retreat to our rustic yet luxurious mountain cabin, where nature meets comfort. Surrounded by the majestic Drakensberg Mountains, this intimate hideaway offers stunning vistas, peaceful solitude, and access to world-class hiking trails.",
    amenities: [
      "Free WiFi",
      "Complimentary Breakfast",
      "Fine Dining Restaurant",
      "Flat-Screen TV",
      "Air Conditioning",
      "Swimming Pool",
      "Hiking Trails",
      "Garden Views",
    ],
    highlights: [
      "Mountain hiking trails",
      "Fireplace and warm ambiance",
      "Panoramic valley views",
      "Bird watching opportunities",
      "Local guide services",
      "Mountain biking access",
    ],
  },
  "safari-tent-camp": {
    _id: "4",
    title: "Safari Tent Camp",
    slug: { current: "safari-tent-camp" },
    mainImage:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711417/victoria-falls_kzd1kp.jpg",
    location: "Okavango Delta, Botswana",
    price: "$280/night",
    rating: 4.8,
    reviews: 201,
    description:
      "Experience authentic African safari in our luxury tent camp, offering the thrill of close-to-nature experiences combined with high-end comfort. Each tent features en-suite bathrooms, comfortable beds, and authentic safari atmosphere.",
    amenities: [
      "Free WiFi",
      "Complimentary Breakfast",
      "Fine Dining Restaurant",
      "Flat-Screen TV",
      "Air Conditioning",
      "Swimming Pool",
      "Hiking Trails",
      "Garden Views",
    ],
    highlights: [
      "Twice-daily game drives",
      "Guided bush walks",
      "Authentic safari experience",
      "Night safari adventures",
      "Traditional African meals",
      "Elephant and lion encounters",
    ],
  },
  "beachfront-villa": {
    _id: "5",
    title: "Beachfront Villa",
    slug: { current: "beachfront-villa" },
    mainImage:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711419/south-africa_fv8tky.jpg",
    location: "Langebaan, South Africa",
    price: "$320/night",
    rating: 4.6,
    reviews: 189,
    description:
      "Your private beachfront paradise awaits at our exclusive villa, complete with direct beach access, infinity pool, and sunset views over the Atlantic. Perfect for families or groups seeking ultimate privacy and luxury.",
    amenities: [
      "Free WiFi",
      "Complimentary Breakfast",
      "Fine Dining Restaurant",
      "Flat-Screen TV",
      "Air Conditioning",
      "Swimming Pool",
      "Hiking Trails",
      "Garden Views",
    ],
    highlights: [
      "Private beach access",
      "Infinity pool with ocean views",
      "Full kitchen facilities",
      "Spacious living areas",
      "Water sports available",
      "Sunset beach walks",
    ],
  },
  "eco-lodge": {
    _id: "6",
    title: "Eco Lodge",
    slug: { current: "eco-lodge" },
    mainImage:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711385/bernd-dittrich-F4IdzUgXwa4-unsplash_qidgzk.jpg",
    location: "Greater Limpopo, Mozambique",
    price: "$180/night",
    rating: 4.7,
    reviews: 234,
    description:
      "Embrace sustainable luxury at our award-winning eco lodge, committed to environmental conservation and community development. Experience pristine nature while supporting conservation efforts.",
    amenities: [
      "Free WiFi",
      "Complimentary Breakfast",
      "Fine Dining Restaurant",
      "Flat-Screen TV",
      "Air Conditioning",
      "Swimming Pool",
      "Hiking Trails",
      "Garden Views",
    ],
    highlights: [
      "Eco-friendly facilities",
      "Conservation programs",
      "Community tourism",
      "Natural hot springs",
      "Organic farm produce",
      "Wildlife sanctuary access",
    ],
  },
  "river-view-cottage": {
    _id: "7",
    title: "River View Cottage",
    slug: { current: "river-view-cottage" },
    mainImage:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711417/victoria-falls_kzd1kp.jpg",
    location: "Livingstone, Zambia",
    price: "$200/night",
    rating: 4.5,
    reviews: 142,
    description:
      "Charming riverside cottage offering serene views of the Zambezi River and proximity to adventure activities. The perfect blend of comfort and adventure, ideal for thrill-seekers.",
    amenities: [
      "Free WiFi",
      "Complimentary Breakfast",
      "Fine Dining Restaurant",
      "Flat-Screen TV",
      "Air Conditioning",
      "Swimming Pool",
      "Hiking Trails",
      "Garden Views",
    ],
    highlights: [
      "River adventure activities",
      "Bungee jumping nearby",
      "White water rafting access",
      "Local fishing tours",
      "Adventure packages",
      "Night activity tours",
    ],
  },
  "desert-camp": {
    _id: "8",
    title: "Desert Camp",
    slug: { current: "desert-camp" },
    mainImage:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711419/south-africa_fv8tky.jpg",
    location: "Namib Desert, Namibia",
    price: "$220/night",
    rating: 4.8,
    reviews: 267,
    description:
      "Venture into the otherworldly landscape of the Namib Desert at our exclusive camp. Watch stunning sunrises and sunsets over endless sand dunes while enjoying world-class amenities.",
    amenities: [
      "Free WiFi",
      "Complimentary Breakfast",
      "Fine Dining Restaurant",
      "Flat-Screen TV",
      "Air Conditioning",
      "Swimming Pool",
      "Hiking Trails",
      "Garden Views",
    ],
    highlights: [
      "Dune safari expeditions",
      "Sunset viewing platforms",
      "Stargazing experiences",
      "Sand boarding",
      "Desert photography",
      "Cultural villages tours",
    ],
  },
  "forest-retreat": {
    _id: "9",
    title: "Forest Retreat",
    slug: { current: "forest-retreat" },
    mainImage:
      "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711385/bernd-dittrich-F4IdzUgXwa4-unsplash_qidgzk.jpg",
    location: "Eastern Cape, South Africa",
    price: "$240/night",
    rating: 4.6,
    reviews: 178,
    description:
      "Immerse yourself in the tranquility of the Tsitsikamma Forest at our secluded retreat. Ancient trees, scenic trails, and the soothing sounds of nature create the perfect escape.",
    amenities: [
      "Free WiFi",
      "Complimentary Breakfast",
      "Fine Dining Restaurant",
      "Flat-Screen TV",
      "Air Conditioning",
      "Swimming Pool",
      "Hiking Trails",
      "Garden Views",
    ],
    highlights: [
      "Ancient forest trails",
      "Waterfall hikes",
      "Bird watching paradise",
      "Canopy walks",
      "Forest bathing experiences",
      "Nature photography tours",
    ],
  },
};

interface PageProps {
  params: {
    slug: string;
  };
}

export default function AccommodationDetailPage({ params }: PageProps) {
  const [showBooking, setShowBooking] = useState(false);
  const accommodation =
    accommodationDataMap[params.slug] || accommodationDataMap["luxury-safari-lodge"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-stone-50 to-slate-50"
    >
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200"
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/services/accommodation" className="inline-flex">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Accommodations</span>
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Gallery Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-6xl mx-auto px-4 py-8"
      >
        <AccommodationGallery
          mainImage={accommodation.mainImage}
          title={accommodation.title}
        />
      </motion.div>

      {/* Details Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-6xl mx-auto px-4 py-8"
      >
        <AccommodationDetails
          data={accommodation}
          onBookNow={() => setShowBooking(true)}
        />
      </motion.div>

      {/* Footer spacing */}
      <div className="h-20" />

      {/* Quick Book Modal */}
      {showBooking && (
        <AccommodationQuickBook
          accommodationName={accommodation.title}
          price={accommodation.price}
          onClose={() => setShowBooking(false)}
        />
      )}
    </motion.div>
  );
}
