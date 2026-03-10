"use client";
import Image from "next/image";
import React from "react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { ArrowRight } from "lucide-react";


const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemList = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Smart = () => {
  const router = useRouter();

  // Hardcoded service items for easy editing
  const serviceItems = [
    {
      title: "The Home-Ground Advantage",
      description: "Headquartered in the heart of Victoria Falls, we don't just study the map—we live the destination. Our at the source presence grants you exclusive insider access, real-time local support, and a level of logistical precision that only a true local expert can provide.",
    },
    {
      title: "A Shield of Seamless Excellence",
      description: "Just as the Musasa canopy protects the traveler, we provide a total covering of safety and sophistication. From complex cross-border transfers to 24/7 on-ground assistance, we proactively manage every detail so you can explore with absolute peace of mind.",
    },
    {
      title: "Deeply Rooted Global Reach",
      description: "Our name reflects our nature: we possess the stability of deep roots and the reach of an expansive canopy. We transcend generic travel by leveraging a vast international network of elite partners to craft bespoke, high-end journeys that are as unique as the travelers we serve.",
    },
  ];

  return (
    <div className="bg-[#111] text-[#fff] min-h-screen flex justify-center flex-col py-32 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, transform: "translateY(100%)" }}
        whileInView={{ opacity: 1, transform: "translateY(0%)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, easing: "ease" }}
        className="max-w-6xl mx-auto grid  md:gap-8 gap-4 p-4"
      >
        <div className="space-y-4">
          <h4 className="text-2xl md:text-4xl  font-medium leading-7">
            Why Choose Musasa Travel
          </h4>
          <motion.ul
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4 p-2"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {serviceItems.map((item, index) => (
              <motion.li
                key={index}
                variants={itemList}
                className="border p-4 border-white cursor-pointer  hover:scale-90 hover:bg-black/30 hover:text-[#f5f5f5] transition-transform space-y-4"
              >
                <h4 className="text-xl md:text-3xl lg:text-5xl text-[#e6b740]">
                  0{index + 1}
                </h4>
                <h4 className="font-medium text-xl md:text-2xl">
                  {item.title}
                </h4>
                <p>{item.description}</p>
                <br />
                <div className="flex justify-between">
                  <div></div>
                  <Button className="bg-transparent text-[#e6b740] hover:translate-x-2 transition-transform">
                    <ArrowRight />
                  </Button>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Smart;
