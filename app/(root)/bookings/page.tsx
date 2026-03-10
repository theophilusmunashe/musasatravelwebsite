"use client";
import React, { useState } from "react";
import BookingBanner from "./components/BookingBanner";
import BookingForm from "./components/BookingForm";
import BookingCart from "./components/BookingCart";
import WhatsAppButton from "./components/WhatsAppButton";

import type { Metadata } from "next";

export default function BookingsPage() {
  const [formData, setFormData] = useState({});

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      <BookingBanner />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BookingForm onDataChange={setFormData} />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <BookingCart formData={formData} />
            </div>
          </div>
        </div>
      </div>
      <WhatsAppButton />
    </div>
  );
}
