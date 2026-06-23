"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SITE_NAME } from "@/lib/site";


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

  // Hardcoded service items for easy editing
  const serviceItems = [
    {
      title: "A True Sense of Home",
      description: "Every residence and guest experience at the estate is designed to feel personal, welcoming, and deeply rooted in the meaning of our name — home that belongs to us all.",
    },
    {
      title: "Refined Private Living",
      description: "From secure gated access to beautifully appointed residences, we provide a standard of living that balances privacy with the warmth of community.",
    },
    {
      title: "Curated Estate Experiences",
      description: "Beyond the homes themselves, we offer hospitality, activities, and services tailored to residents and guests — so every moment at the estate feels effortless and exceptional.",
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
            Why Choose {SITE_NAME}
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
                  <Link href="/packages" className="bg-transparent text-[#e6b740] hover:translate-x-2 transition-transform flex items-center">
                    <ArrowRight />
                  </Link>
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
