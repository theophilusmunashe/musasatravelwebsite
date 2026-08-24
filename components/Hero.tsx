"use client";

import "../app/globals.scss";
import HeroBanner from "./HeroBanner";

export default function Hero() {
  const item = {
    title: "Musasa Travel & Tours",
    subtitle: "Curated Journeys",
    subtitle2: "Lifetime Experiences",
  };

  return (
    <div className="hero-section-02">
      <div className="hero-fluid-slider">
        <HeroBanner data={item} />
      </div>
    </div>
  );
}
