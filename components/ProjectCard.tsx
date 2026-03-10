"use client";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProjectCard({ data }: any) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Link
      href={`/packages/${data?.slug?.current}`}
      className="project-card d-block h-96"
    >
      <div className="project-card__image ">
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
      </div>
      <div className="project-card__body">
        <div className="project-card__body-top">
          <div className="project-card__body-texts">
            <h3 className="project-card__title">{data?.title}</h3>
            <span className="project-card__category">{data?.location}</span>
          </div>
          {/* <span className="project-card__date">{data?.size}</span> */}
        </div>
        <div className="project-card__body-bottom">
          <span className="project-card__button  hvr-fill-black">
            view details
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
