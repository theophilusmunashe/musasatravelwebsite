"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/site";
import kumushaLogoDark from "@/assets/kumusha_logo_dark.png";

const links = [
  { label: "Explore estate", href: "/#the-estate" },
  { label: "Join us", href: "/bookings" },
];

export default function EstateNavbar({ shell = false }: { shell?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "z-50 border-b backdrop-blur-sm",
        shell ? "shrink-0" : "sticky top-0"
      )}
      style={{ borderColor: "#E5E3DF", backgroundColor: "rgba(245, 244, 242, 0.95)" }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-[4.5rem] md:h-20 md:px-8">
        <Link href="/" className="flex min-w-0 items-center" onClick={() => setOpen(false)}>
          <Image
            src={kumushaLogoDark}
            alt={SITE_NAME}
            width={1075}
            height={716}
            className="h-9 w-auto sm:h-12 md:h-16"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-estate-terracotta"
                  : "text-estate-muted hover:text-estate-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/bookings#book"
            className="inline-flex min-h-[44px] items-center rounded-lg bg-estate-amber px-4 py-2.5 text-sm font-medium text-estate-amber-text transition-colors hover:bg-estate-amber-hover"
          >
            Join us
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-estate-border text-estate-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-estate-border bg-estate-ivory px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium",
                    pathname === link.href
                      ? "bg-estate-warm text-estate-terracotta"
                      : "text-estate-ink"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
