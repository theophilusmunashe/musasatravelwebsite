"use client";
import React from "react";
import Link from "next/link";
import { navLinks } from "@/data/data";
import ServicesNav from "../ServicesNav";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { CollapsibleDemo } from "../Faq";
import Logo from "../Logo";

export function Menu({ toggle, components }: any) {
  const pathname = usePathname();

  return (
    <nav className="menu" aria-label="menu">
      <ul>
        {navLinks
          .filter((_, i) => i < 2)
          .map((link) => (
            <li key={link.name}>
              <Link
                href={link.url}
                onClick={toggle}
                className={cn(
                  "capitalize  font-normal text-xl",
                  pathname === link.url ? " font-medium" : "text-[]"
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        <CollapsibleDemo toggle={toggle} components={components} />

        {navLinks
          .filter((_, i) => i > 2)
          .map((link) => (
            <li key={link.name}>
              <Link
                href={link.url}
                onClick={toggle}
                className={cn(
                  "capitalize  font-normal text-xl",
                  pathname === link.url ? " font-medium" : ""
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        {/* {
            navLinks.map((link) => (
              <li key={link.name}>
                 <Link href={link.url} aria-label={`${link.name} Link`}>
                    {link.name}
                 </Link>
              </li>
            ))
            } */}
      </ul>
    </nav>
  );
}
