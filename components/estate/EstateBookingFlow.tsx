"use client";

import { Suspense } from "react";
import BookingExperience from "./booking/BookingExperience";

export default function EstateBookingFlow({ embedded = false }: { embedded?: boolean }) {
  return (
    <Suspense fallback={<BookingFlowFallback embedded={embedded} />}>
      <BookingExperience manualOnly={!embedded} />
    </Suspense>
  );
}

function BookingFlowFallback({ embedded }: { embedded: boolean }) {
  return (
    <p className={embedded ? "p-4 text-[15px] text-[#A8A59F]" : "p-6 text-sm text-estate-muted"}>
      Loading booking…
    </p>
  );
}
