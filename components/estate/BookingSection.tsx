"use client";

import { Suspense } from "react";
import BookingExperience from "./booking/BookingExperience";

export default function BookingSection() {
  return (
    <Suspense fallback={<p className="text-estate-muted">Loading…</p>}>
      <BookingExperience />
    </Suspense>
  );
}
