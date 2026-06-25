"use client";

import { ShieldCheck, Clock, MapPin } from "lucide-react";

export default function BookingTrustBadges({ className = "" }: { className?: string }) {
  const items = [
    { icon: Clock, label: "Reply within 24 hours" },
    { icon: ShieldCheck, label: "No payment online" },
    { icon: MapPin, label: "Victoria Falls, Zimbabwe" },
  ];

  return (
    <ul className={`flex flex-wrap gap-1.5 sm:gap-2 ${className}`}>
      {items.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-estate-border bg-estate-ivory px-2.5 py-1.5 text-[11px] text-estate-muted sm:px-3 sm:text-xs"
        >
          <Icon className="h-3.5 w-3.5 shrink-0 text-estate-teal" aria-hidden />
          {label}
        </li>
      ))}
    </ul>
  );
}
