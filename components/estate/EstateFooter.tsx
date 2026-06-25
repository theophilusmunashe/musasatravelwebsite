import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import LogoMarkLight from "./LogoMarkLight";

export default function EstateFooter() {
  return (
    <footer className="border-t border-estate-border bg-estate-warm">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:items-start md:justify-between md:px-8">
        <div className="max-w-sm space-y-3">
          <div className="flex items-center gap-3">
            <LogoMarkLight size="sm" />
            <span className="font-display text-lg text-estate-ink">{SITE_NAME}</span>
          </div>
          <p className="text-sm leading-relaxed text-estate-muted">
            A private estate where the river meets home — Victoria Falls, Zimbabwe.
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-medium text-estate-ink">Visit</p>
          <Link href="/#the-estate" className="block text-estate-terracotta hover:underline">
            Explore the estate
          </Link>
          <Link href="/bookings" className="block text-estate-terracotta hover:underline">
            Join us
          </Link>
        </div>
      </div>
      <div className="border-t border-estate-border px-4 py-4 text-center text-xs text-estate-muted md:px-8">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
