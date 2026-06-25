import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import EstateHeroVideo from "./EstateHeroVideo";

export default function LayeredHero({ bookingPage = false }: { bookingPage?: boolean }) {
  return (
    <section className="overflow-hidden bg-estate-ivory">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 md:items-center md:gap-12 md:px-8 md:py-16 lg:py-20">
        {/* Left — portrait video */}
        <div className="relative order-1 mx-auto w-full max-w-sm md:max-w-none md:justify-self-start">
          <div className="relative aspect-[9/16] w-full max-w-[280px] md:max-w-[320px]">
            <div className="absolute inset-0 overflow-hidden rounded-[14px] border border-estate-border bg-estate-warm">
              <EstateHeroVideo />
            </div>

            <div className="absolute left-3 top-3 z-10 rounded-full border border-estate-border bg-estate-ivory/95 px-3 py-1.5 text-xs font-medium text-estate-ink">
              Welcome to Kumusha
            </div>
          </div>
        </div>

        {/* Right — copy */}
        <div className="order-2 md:order-2">
          <h1 className="font-display text-[clamp(1.875rem,5vw,2.75rem)] leading-[1.1] text-estate-ink">
            {SITE_NAME}
          </h1>
          <p className="mb-3 mt-3 text-xs font-medium uppercase tracking-[0.2em] text-estate-terracotta">
            Victoria Falls · Zimbabwe
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-estate-muted md:text-lg">
            On 2.5 hectares near Victoria Falls, our private estate is yours for
            unhurried stays, meaningful celebrations, and evenings of wine and good
            company in the open air — private, welcoming, and close to the river.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {bookingPage ? (
              <>
                <a
                  href="#book"
                  className="inline-flex min-h-[44px] items-center rounded-lg bg-estate-amber px-6 py-3 text-sm font-medium text-estate-amber-text transition-colors hover:bg-estate-amber-hover"
                >
                  Join us
                </a>
                <a
                  href="#about-estate"
                  className="text-sm font-medium text-estate-terracotta underline-offset-4 hover:underline"
                >
                  Explore the estate
                </a>
              </>
            ) : (
              <>
                <Link
                  href="/bookings"
                  className="inline-flex min-h-[44px] items-center rounded-lg bg-estate-amber px-6 py-3 text-sm font-medium text-estate-amber-text transition-colors hover:bg-estate-amber-hover"
                >
                  Join us
                </Link>
                <a
                  href="#the-estate"
                  className="text-sm font-medium text-estate-terracotta underline-offset-4 hover:underline"
                >
                  Explore the estate
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
