"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Star,
  Wifi,
  Coffee,
  Utensils,
  Tv,
  Wind,
  Waves,
  Mountain,
  Trees,
  Heart,
  Share2,
  Phone,
  Mail,
} from "lucide-react";

interface AccommodationDetailsProps {
  data: {
    _id: string;
    title: string;
    mainImage: string;
    location: string;
    price: string;
    rating?: number;
    reviews?: number;
    description?: string;
    amenities?: string[];
    highlights?: string[];
  };
  onBookNow: () => void;
}

const amenityIcons: { [key: string]: React.ReactNode } = {
  wifi: <Wifi className="w-5 h-5" />,
  breakfast: <Coffee className="w-5 h-5" />,
  restaurant: <Utensils className="w-5 h-5" />,
  tv: <Tv className="w-5 h-5" />,
  ac: <Wind className="w-5 h-5" />,
  pool: <Waves className="w-5 h-5" />,
  hiking: <Mountain className="w-5 h-5" />,
  garden: <Trees className="w-5 h-5" />,
};

export default function AccommodationDetails({
  data,
  onBookNow,
}: AccommodationDetailsProps) {
  const defaultAmenities = [
    { name: "Free WiFi", icon: "wifi", available: true },
    { name: "Complimentary Breakfast", icon: "breakfast", available: true },
    { name: "Fine Dining Restaurant", icon: "restaurant", available: true },
    { name: "Flat-Screen TV", icon: "tv", available: true },
    { name: "Air Conditioning", icon: "ac", available: true },
    { name: "Swimming Pool", icon: "pool", available: true },
    { name: "Hiking Trails", icon: "hiking", available: true },
    { name: "Garden Views", icon: "garden", available: true },
  ];

  const defaultHighlights = [
    "Stunning panoramic views of natural landscapes",
    "Expert guided tours and outdoor activities",
    "Spa and wellness facilities available",
    "24/7 guest support and concierge service",
    "Airport transfers and shuttle services",
    "Photography packages for your memories",
  ];

  const amenities = data.amenities || defaultAmenities.map(a => a.name);
  const highlights = data.highlights || defaultHighlights;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              {data.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <MapPin className="w-5 h-5 text-amber-500" />
              <span className="text-lg">{data.location}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {data.rating || 4.8} ({data.reviews || 247} reviews)
              </span>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
            <p className="text-sm text-gray-600 mb-2">Starting from</p>
            <p className="text-3xl font-bold text-amber-600 mb-4">
              {data.price || "$150/night"}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBookNow}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg"
            >
              Book Now
            </motion.button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Heart className="w-5 h-5" />
            Save
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Share
          </motion.button>
        </div>
      </div>

      {/* Description */}
      {data.description && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-stone-50 to-slate-50 rounded-xl p-6 border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-3">About This Accommodation</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{data.description}</p>
        </motion.div>
      )}

      {/* Highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Guests Love This Place</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <p className="text-gray-700 font-medium">{highlight}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Amenities */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities & Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-200 text-center"
            >
              <div className="flex justify-center mb-2 text-amber-500">
                {amenityIcons[amenity.toLowerCase()] || <Wifi className="w-6 h-6" />}
              </div>
              <p className="text-sm font-semibold text-gray-900">{amenity}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white"
      >
        <h2 className="text-2xl font-bold mb-6">Questions or Need Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.a
            href="tel:+263776093268"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 p-4 bg-white/10 rounded-lg border border-white/20 hover:bg-white/15 transition-colors"
          >
            <Phone className="w-6 h-6 text-amber-400" />
            <div>
              <p className="text-sm text-gray-300">Call us</p>
              <p className="font-semibold">+263 77 609 3268</p>
            </div>
          </motion.a>
          <motion.a
            href="mailto:bookings@musasatravel.com"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 p-4 bg-white/10 rounded-lg border border-white/20 hover:bg-white/15 transition-colors"
          >
            <Mail className="w-6 h-6 text-amber-400" />
            <div>
              <p className="text-sm text-gray-300">Email us</p>
              <p className="font-semibold">bookings@musasatravel.com</p>
            </div>
          </motion.a>
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl p-8 text-white text-center"
      >
        <h3 className="text-2xl font-bold mb-2">Ready to Book Your Stay?</h3>
        <p className="text-amber-50 mb-6">Secure your reservation now and start planning your African adventure</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBookNow}
          className="bg-white text-amber-600 font-bold py-3 px-8 rounded-lg hover:bg-amber-50 transition-colors shadow-lg inline-block"
        >
          Book Now - {data.price || "$150/night"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
