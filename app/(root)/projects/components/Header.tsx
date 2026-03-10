"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Header = ({ title }: { title: string }) => {
  const pathname = usePathname();
  return (
    <div className="bg-[#212121]  h-72 md:h-96 flex items-center flex-col justify-center text-[#fff] p-4 sm:p-8 lg:p-12 py-20 relative">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold  uppercase relative mx-2">
        {title}
      </h1>
    </div>
  );
};

export default Header;
