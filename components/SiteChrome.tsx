"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EstateNavbar from "./estate/EstateNavbar";
import CartDrawer from "./CartDrawer";
import FloatingCart from "./FloatingCart";
import WhatsAppButton from "@/app/(root)/bookings/components/WhatsAppButton";

export default function SiteChrome({
  children,
  category,
}: {
  children: React.ReactNode;
  category: unknown;
}) {
  const pathname = usePathname();
  const isBooking = pathname.startsWith("/bookings");

  if (isBooking) {
    return (
      <div className="flex h-[100dvh] flex-col overflow-hidden">
        <EstateNavbar shell />
        <main className="min-h-0 flex-1 overflow-hidden">{children}</main>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <CartDrawer />
      <FloatingCart />
      <WhatsAppButton />
    </>
  );
}
