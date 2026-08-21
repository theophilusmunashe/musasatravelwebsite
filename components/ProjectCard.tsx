"use client";
import { useState } from "react";

import { resolveImageSrc } from "@/lib/resolve-image-src";

export default function ProjectCard({ data }: any) {
  const [isLoading, setLoading] = useState(true);
  const src = resolveImageSrc(data.mainImage);
  const loadCls = isLoading
    ? "scale-110 blur-2xl grayscale"
    : "scale-100 blur-0 grayscale-0";
  const alt = data?.title ?? "card";

  return (
    <div className="project-card d-block h-96">
      <div className="project-card__image ">
        <img
          height={331}
          width={402}
          src={src}
          alt={alt}
          className={`object-image h-full ${loadCls}`}
          onLoad={() => setLoading(false)}
        />
      </div>
      <div className="project-card__body">
        <div className="project-card__body-top">
          <div className="project-card__body-texts">
            <h3 className="project-card__title">{data?.title}</h3>
            <span className="project-card__category">{data?.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
