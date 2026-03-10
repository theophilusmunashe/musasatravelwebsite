import React from "react";

import Image from "next/image";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "../../../../components/ui/card";
import urlFor from "../../../../sanity/lib/urlFor";

import noimage from "@/assets/noimage.png";
import Reveal from "../../../../components/Reveal";
import { MotionDiv } from "../../../../lib/framer";
import ArticleCard from "../../../../components/Blogcard";

export const BlogContainer = ({ data }: any) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, transform: "translateY(100%)" }}
      animate={{ opacity: 1, transform: "translateY(0%)" }}
      transition={{ duration: 0.5, easing: "ease" }}
      className="max-w-6xl mx-auto overflow-hidden p-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 place-items-center">
        {data.map((post: any) => (
          <Reveal width="100%" key={post?.slug?.current}>
            <ArticleCard post={post} />
          </Reveal>
        ))}
      </div>
    </MotionDiv>
  );
};
