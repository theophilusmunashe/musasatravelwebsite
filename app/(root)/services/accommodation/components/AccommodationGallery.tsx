"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AccommodationGalleryProps {
  mainImage: string;
  title: string;
  images?: string[];
}

export default function AccommodationGallery({ mainImage, title, images = [] }: AccommodationGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Create gallery with main image and additional images
  const galleryImages = images.length > 0 ? [mainImage, ...images] : [mainImage];

  const selectedImage = galleryImages[selectedImageIndex];

  const goToPrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    setIsLoading(true);
  };

  const goToNext = () => {
    setSelectedImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    setIsLoading(true);
  };

  const goToImage = (index: number) => {
    setSelectedImageIndex(index);
    setIsLoading(true);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
      >
        <Image
          src={selectedImage}
          alt={`${title} - Gallery image ${selectedImageIndex + 1}`}
          fill
          className={`object-cover transition-all duration-500 ${isLoading ? "blur-sm" : "blur-0"}`}
          onLoad={() => setIsLoading(false)}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold">
          {selectedImageIndex + 1} / {galleryImages.length}
        </div>
      </motion.div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {galleryImages.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => goToImage(index)}
            className={`relative h-24 md:h-28 rounded-lg overflow-hidden shadow-md transition-all duration-200 border-2 ${
              selectedImageIndex === index
                ? "border-amber-500 ring-2 ring-amber-500 shadow-lg"
                : "border-transparent hover:border-amber-300 hover:shadow-lg"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={image}
              alt={`${title} thumbnail ${index + 1}`}
              fill
              className="object-cover transition-all duration-200 hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {selectedImageIndex === index && (
              <div className="absolute inset-0 bg-amber-500 opacity-20 pointer-events-none" />
            )}
          </motion.button>
        ))}
      </div>

      {/* Image Info */}
      <div className="text-center text-sm text-gray-600 pt-2">
        <p>Click thumbnails to view or use arrow buttons to navigate</p>
      </div>
    </div>
  );
}
