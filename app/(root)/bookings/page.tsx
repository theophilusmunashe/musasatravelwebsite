"use client";
import React, { useState } from "react";
import BookingBanner from "./components/BookingBanner";
import BookingForm from "./components/BookingForm";
import BookingCart from "./components/BookingCart";
export default function BookingsPage() {
  const [formData, setFormData] = useState({});

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <BookingBanner />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 pb-32">
        {/* Section label */}
        <div className="mb-10">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.3em] mb-2">Step by Step</p>
          <h2 className="text-2xl md:text-3xl font-black text-white">Complete Your Booking</h2>
          <div className="mt-4 h-px bg-gradient-to-r from-amber-500/50 via-amber-500/10 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form — takes 2/3 */}
          <div className="lg:col-span-2">
            <BookingForm onDataChange={setFormData} />
          </div>

          {/* Cart summary — sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingCart formData={formData} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
