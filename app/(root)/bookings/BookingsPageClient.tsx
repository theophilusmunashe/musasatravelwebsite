"use client";

import { useEffect } from "react";
import BookingHeroSection from "@/components/estate/BookingHeroSection";

export default function BookingsPageClient() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.classList.add("overflow-hidden", "h-[100dvh]");
    body.classList.add("overflow-hidden", "h-[100dvh]");
    return () => {
      html.classList.remove("overflow-hidden", "h-[100dvh]");
      body.classList.remove("overflow-hidden", "h-[100dvh]");
    };
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <BookingHeroSection />
    </div>
  );
}
