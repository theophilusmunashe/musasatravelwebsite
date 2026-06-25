"use client";

import { useEffect } from "react";

export default function HomeScrollToHash() {
  useEffect(() => {
    const scroll = () => {
      const hash = window.location.hash;
      if (!hash) return;
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    scroll();
    window.addEventListener("hashchange", scroll);
    return () => window.removeEventListener("hashchange", scroll);
  }, []);

  return null;
}
