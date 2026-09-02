"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";
import { contentImages } from "@/lib/content-images";

type CardPhotoProps = {
  src: string;
  gallery?: string[];
  alt: string;
  title: string;
  subtitle?: string;
  sizes: string;
  objectClass?: string;
  children?: ReactNode;
};

export default function CardPhoto({
  src,
  gallery,
  alt,
  title,
  subtitle,
  sizes,
  objectClass = "object-cover",
  children,
}: CardPhotoProps) {
  const images = contentImages(src, gallery);
  const cover = images[0] || src;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Image src={cover} alt={alt} fill className={objectClass} sizes={sizes} unoptimized />
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute inset-0 z-[1]"
        aria-label={`View photos of ${title}`}
      />
      <div className="pointer-events-none absolute inset-0 z-[2]">{children}</div>
      {images.length > 1 && (
        <span className="pointer-events-none absolute bottom-3 right-3 z-[3] flex items-center gap-1.5 rounded-full border border-white/10 bg-black/65 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <Camera className="h-3.5 w-3.5" />
          {images.length} photos
        </span>
      )}
      <ImageLightbox
        open={open}
        onClose={() => setOpen(false)}
        images={images}
        title={title}
        subtitle={subtitle}
      />
    </>
  );
}
