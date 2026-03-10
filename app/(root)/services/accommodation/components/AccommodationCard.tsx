"use client";
import { ArrowUpRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AccommodationCard({ data }: any) {
  const [isLoading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="project-card d-block h-96 relative">
      <Link
        href={`/packages/${data?.slug?.current}`}
        className="block h-full"
      >
        <div className="project-card__image relative">
          <Image
            height={331}
            width={402}
            src={data.mainImage}
            alt="card"
            className={`object-image h-full  ${
              isLoading
                ? "scale-110 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            }`}
            onLoad={() => setLoading(false)}
          />
          <button
            onClick={handleWishlistClick}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart 
              className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
        </div>
        <div className="project-card__body">
          <div className="project-card__body-top">
            <div className="project-card__body-texts">
              <h3 className="project-card__title">{data?.title}</h3>
              <span className="project-card__category">{data?.location || 'Various Locations'}</span>
              <br />
              <span className="project-card__price text-lg text-white font-bold">
                {data?.price || 'From $150/night'}
              </span>
            </div>
          </div>
          <div className="project-card__body-bottom">
            <span className="project-card__button  hvr-fill-black">
              view details
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
