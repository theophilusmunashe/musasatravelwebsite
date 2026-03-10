"use client";
import { navLinks } from "@/data/data";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import ServicesNav from "./ServicesNav";
import NavMenu from "./Navigation";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Navigation from "./Navigation/NavigationMain";

const Navbar = ({ components }: any) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrolledx, setScrolledx] = useState(false);
  const pathname = usePathname();

  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition >= 550) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    if (scrollPosition > 150 && scrollPosition < 500) {
      setScrolledx(true);
    } else {
      setScrolledx(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (latest > previous! && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`flex items-center h-20 fixed top-0 w-full z-50 bg-neutral-800/50 shadow-lg font-medium ${
          scrolled ? "bg-neutral-800/70 text-white pt-4" : "text-white pt-6"
        } transition-all`}
      aria-label="Navigation"
    >
      <div className="flex justify-between items-center w-full px-4">
        <div className="flex items-center h-20">
          <Logo />
        </div>
        <div className="hidden lg:block">
          <Navigation components={components} />
        </div>
        <div className="lg:hidden">
          <NavMenu components={components} />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
