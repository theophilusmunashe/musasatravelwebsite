"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { foot, navLinks } from "@/data/data";
import { cn } from "../lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VscMenu } from "react-icons/vsc";
import Logo from "./Logo";
import ServicesNav from "./ServicesNav";
import { useState } from "react";

export function Mobile({ components }: any) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="relative rounded-full p-6 md:p-8 focus:outline-none flex items-center  justify-center"
          aria-label="Menu toggle"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span
            className={`block absolute  left-1/2  transform -translate-x-1/2 -translate-y-1/2 w-6 md:w-10 h-0.5 bg-black transition-all duration-200 ${
              isOpen ? "rotate-45 top-1/2" : "top-2/3"
            }`}
          />
          <span
            className={`block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 md:w-10 h-0.5 bg-black transition-all duration-200 ${
              isOpen ? "opacity-0" : "opacity-"
            }`}
          />
          <span
            className={`block absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 md:w-10 h-0.5 bg-black transition-all duration-200 ${
              isOpen ? "-rotate-45 top-1/2" : "top-1/3"
            }`}
          />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-6">
          <ul className="flex flex-col gap-6">
            {navLinks
              .filter((_, i) => i < 2)
              .map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className={cn(
                      "capitalize  font-normal text-xl",
                      pathname === link.url ? " font-medium" : "text-[#24246B]"
                    )}
                  >
                    <SheetClose>{link.name}</SheetClose>
                  </Link>
                </li>
              ))}
            <ServicesNav components={components} />

            {navLinks
              .filter((_, i) => i > 2)
              .map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className={cn(
                      "capitalize  font-normal text-xl",
                      pathname === link.url ? " font-medium" : "text-[#24246B]"
                    )}
                  >
                    <SheetClose>{link.name}</SheetClose>
                  </Link>
                </li>
              ))}
            <li>
              <SheetClose>
                <Link
                  href={"/contact"}
                  className="bg-[#24246B] text-white rounded-2xl p-2 px-4"
                >
                  Contact Us
                </Link>
              </SheetClose>
            </li>
          </ul>
        </div>
        <SheetFooter>
          <div className="flex gap-2 items-center  mt-12">
            {/* {
                foot.map((item, i) => (
                  <div key={i} className='bg-white p-1 rounded-md cursor-pointer transition-all hover:scale-95'>
                    {item.name}
                  </div>
                ))
              } */}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
