"use client";
import Image from "next/image";
import Link from "next/link";

import noimage from "@/assets/noimage.png";
import { useState } from "react";

import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";

export default function ArticleCard({ post }: any) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="blog-card h-100 cursor-pointer transition-all hover:scale-95">
      <div className="blog-card__image ">
        <Image
          height={340}
          width={352}
          src={post.mainImage || noimage}
          alt="blog"
          className={` object-cover w-full h-full group-hover:scale-110 hover:opacity-90  transition 
              duration-300 ease-in-out group-hover:opacity-75
              ${
                isLoading
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              })`}
          onLoad={() => setLoading(false)}
          loading="lazy"
        />
        <div className="blog-card__date">
          <span className="day">{format(new Date(post._createdAt), "dd")}</span>
          <span className="month">
            {format(new Date(post._createdAt), "MMM")}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="blog-card__title">{post.title}</h4>
        <Link className="btn-link" href={`/blogs/${post?.slug?.current}`}>
          Read More
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
