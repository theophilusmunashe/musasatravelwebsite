import Link from "next/link";

export default function EstateCtaBand() {
  return (
    <section className="border-y border-estate-border bg-estate-warm py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
        <h2 className="font-display text-2xl text-estate-ink md:text-[1.625rem]">
          Ready to step through the doorway?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-base text-estate-muted">
          Tell us how you&apos;d like to visit — stay, host, or attend — and we&apos;ll
          confirm availability within one business day.
        </p>
        <Link
          href="/bookings"
          className="mt-8 inline-flex min-h-[44px] items-center rounded-lg bg-estate-amber px-8 py-3 text-sm font-medium text-estate-amber-text transition-colors hover:bg-estate-amber-hover"
        >
          Plan your visit
        </Link>
      </div>
    </section>
  );
}
