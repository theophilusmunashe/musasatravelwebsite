"use client";

import "../app/globals.scss";
import HeroBanner from "./HeroBanner";

export default function Hero() {
  const item = {
    title: "Victoria Falls Tours & Safari Bookings",
    subtitle: "Local experts in Victoria Falls, Zimbabwe",
    subtitle2: "Tours, lodges, guides and airport transfers — book with Musasa Travel",
  };

  return (
    <div className="hero-section-02">
      <div className="hero-fluid-slider">
        <HeroBanner data={item} />
      </div>
    </div>
  );
}
