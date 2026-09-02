"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { contentImages } from "@/lib/content-images";
import ImageLightbox from "@/components/ImageLightbox";

interface AccommodationGalleryProps {
  mainImage: string;
  title: string;
  images?: string[];
}

export default function AccommodationGallery({ mainImage, title, images = [] }: AccommodationGalleryProps) {
  const galleryImages = contentImages(mainImage, images);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const selectedImage = galleryImages[selectedImageIndex] || mainImage;
  const hasMany = galleryImages.length > 1;

  const goToPrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
      >
        <button
          type="button"
          className="absolute inset-0 z-[1]"
          onClick={() => setLightboxOpen(true)}
          aria-label={`View photos of ${title}`}
        />
        <Image
          src={selectedImage}
          alt={`${title} - Gallery image ${selectedImageIndex + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          unoptimized
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {hasMany && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-black/70 text-white shadow-xl hover:bg-amber-500 hover:text-black"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goToNext();
              }}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-black/70 text-white shadow-xl hover:bg-amber-500 hover:text-black"
              aria-label="Next image"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold pointer-events-none">
              {selectedImageIndex + 1} / {galleryImages.length}
            </div>
          </>
        )}
      </motion.div>

      {hasMany && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {galleryImages.map((image, index) => (
            <motion.button
              key={image}
              onClick={() => setSelectedImageIndex(index)}
              onDoubleClick={() => {
                setSelectedImageIndex(index);
                setLightboxOpen(true);
              }}
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
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 20vw"
                unoptimized
              />
            </motion.button>
          ))}
        </div>
      )}

      <div className="text-center text-sm text-gray-600 pt-2">
        <p>Click the photo to open a larger viewer</p>
      </div>

      <ImageLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={galleryImages}
        title={title}
        startIndex={selectedImageIndex}
      />
    </div>
  );
}
