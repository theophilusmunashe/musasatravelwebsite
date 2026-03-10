"use client";
import Image from "next/image";
import React, { useState } from "react";
import urlFor from "../../../../sanity/lib/urlFor";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { motion } from "framer-motion";

const Card = ({ item }: any) => {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  return (
    <Link href={`/projects/${item?.slug?.current}`} className="w-full md:w-96">
      <div className="aspect-square w-full h-80 relative cursor-pointer overflow-hidden group">
        <Image
          src={urlFor(item?.mainImage).url()}
          alt={item?.title}
          fill
          className={`object-cover w-full h-full group-hover:scale-110 hover:opacity-90  transition rounded-t-md
                    duration-300 ease-in-out group-hover:opacity-75
                    ${
                      isLoading
                        ? "scale-110 blur-2xl grayscale"
                        : "scale-100 blur-0 grayscale-0"
                    })`}
          onLoad={() => setLoading(false)}
          loading="lazy"
        />
        <motion.div
          initial={{ opacity: 0, transform: "translateY(-100%)" }}
          animate={{ opacity: 1, transform: "translateY(0%)" }}
          className="hidden group-hover:flex transition-all duration-75  absolute bg-black/50  text-white w-full h-full top-0 left-0  items-center flex-col justify-center"
        >
          <h4 className="transition-all text-lg sm:text-xl font-medium">
            {item?.title || "Name withheld"}
          </h4>
          <p className="transition-all uppercase text-sm">
            {item?.location || "Australia"}
          </p>
        </motion.div>
      </div>
    </Link>
  );
};

export default Card;
