import React from "react";

import newlogo from "@/assets/whitelogo.png";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex justify-center items-center  md:h-28 h-14">
      <Link
        href="/"
        className="md:flex justify-center items-center h-full hidden"
      >
        <Image
          src={newlogo}
          width={200}
          height={100}
          alt="logo"
          className="object-contain"
        />
      </Link>
      <Link
        href="/"
        className="flex justify-center items-center h-full md:hidden"
      >
        <Image
          src={newlogo}
          width={150}
          height={50}
          alt="logo"
          className="object-contain"
        />
      </Link>
    </div>
  );
};

export default Logo;
