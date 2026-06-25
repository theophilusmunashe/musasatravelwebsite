import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarHeart, Home, Ticket, type LucideIcon } from "lucide-react";
import type { BookingIntent } from "@/lib/estate-tokens";
import victoriaFalls from "@/assets/victoria_falls.jpg";

const intents: {
  intent: BookingIntent;
  title: string;
  description: string;
  icon: LucideIcon;
  chipClass: string;
}[] = [
  {
    intent: "stay",
    title: "Stay with us",
    description: "Rooms, cottages, or the whole estate — six en-suite bedrooms.",
    icon: Home,
    chipClass: "bg-estate-chip-green text-estate-green",
  },
  {
    intent: "host",
    title: "Host an event",
    description: "Weddings, retreats, conferences, and private celebrations.",
    icon: CalendarHeart,
    chipClass: "bg-estate-chip-amber text-estate-amber-text",
  },
  {
    intent: "attend",
    title: "Attend an event",
    description: "Wine tastings, sip & paint evenings, and ticketed gatherings.",
    icon: Ticket,
    chipClass: "bg-estate-chip-teal text-estate-teal",
  },
];

export default function IntentCards() {
  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <Image
        src={victoriaFalls}
        alt=""
        fill
        className="object-cover object-center opacity-[0.22]"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-estate-warm/88" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-estate-terracotta">
          Three ways in
        </p>
        <h2 className="mt-2 font-display text-2xl text-estate-ink md:text-[1.625rem]">
          How would you like to visit?
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {intents.map((item) => (
            <Link
              key={item.intent}
              href={`/bookings?intent=${item.intent}&mode=chat#book`}
              className="group flex flex-col rounded-[14px] border border-estate-border bg-estate-ivory p-6 transition-colors hover:border-estate-terracotta/40"
            >
              <span
                className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${item.chipClass}`}
              >
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-medium text-estate-ink">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-estate-muted">
                {item.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-estate-terracotta">
                Get started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
