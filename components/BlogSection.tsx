"use client";

import { BlogContainer } from "../app/(root)/blogs/components/BlogContainer";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Reveal from "./Reveal";

const BlogSection = ({ data }: any) => {
  const router = useRouter();

  return (
    <div className="blog-section bg-[#f5f5f5]">
      <Reveal width="100%">
        <div className="max-w-6xl mx-auto space-y-6 py-16 px-2">
          <div className="section-heading text-center">
            <span className="subtitle">Latest Articles</span>
            <h2 className="section-heading__title">
              Our Recent News &amp; Articles
            </h2>
          </div>
          <BlogContainer data={data} />

          <div className="mx-auto max-w-7xl flex justify-center items-center">
            <Link
              href={"/blogs"}
              className="btn btn-black hvr-black-white border border-black"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default BlogSection;
