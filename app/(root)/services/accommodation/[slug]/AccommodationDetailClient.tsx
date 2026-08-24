"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import AccommodationGallery from "../components/AccommodationGallery";
import AccommodationDetails from "../components/AccommodationDetails";
import AccommodationQuickBook from "../components/AccommodationQuickBook";
import { motion } from "framer-motion";

export type AccommodationDetailData = {
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

export default function AccommodationDetailClient({
  accommodation,
}: {
  accommodation: AccommodationDetailData;
}) {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-stone-50 to-slate-50"
    >
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

      <div className="h-20" />

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
