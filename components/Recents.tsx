"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

import "../app/globals.scss";
import { ArrowUpRight } from "lucide-react";

const Recents = () => {
  const projects = [
    {
      _id: "1",
      title: "Wedding Weekends",
      mainImage: "/image/victoria-falls.jpg",
      slug: { current: "wedding-weekends" },
    },
    {
      _id: "2",
      title: "Wine Tasting Evenings",
      mainImage: "/image/south-africa.jpg",
      slug: { current: "wine-tasting" },
    },
    {
      _id: "3",
      title: "Sip & Paint at Sunset",
      mainImage: "/image/namibia.jpg",
      slug: { current: "sip-and-paint" },
    },
  ];

  return (
    <div id="featured" className="scroll-mt-24 bg-[#212121] text-white p-4 sm:p-6 md:p-8 py-12">
      <h4 className="md:mx-24 mx-4 font-medium text-xl sm:text-3xl lg:text-4xl capitalize py-4">
        Featured Experiences
      </h4>
      <div className="row navigation-active isotope-navigation portfolio-v1 gutter-y-default">
        <AnimatePresence>
          {projects.map((item: any, i: number) => (
            <motion.div
              key={i}
              className="col-lg-4 col-md-6 col-sm-11"
              layout
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <ProjectCard data={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 space-y-4">
        <div className="mx-auto max-w-7xl flex justify-center items-center">
          <Link href="/bookings" className="btn btn-primary hvr-fill-black">
            Join Us
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Recents;
