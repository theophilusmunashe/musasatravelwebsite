import React from "react";
import { SITE_NAME } from "@/lib/site";
import LogoMark from "./LogoMark";

const Logo = () => {
  return (
    <div className="flex justify-center items-center md:h-28 h-14">
      <a
        href="/"
        className="flex justify-center items-center h-full"
        aria-label={`${SITE_NAME} home`}
      >
        <LogoMark size="md" className="md:hidden" />
        <LogoMark size="lg" className="hidden md:inline-flex" />
      </a>
    </div>
  );
};

export default Logo;
