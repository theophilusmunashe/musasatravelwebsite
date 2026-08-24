import Script from "next/script";

import type { Metadata } from "next";
import "../globals.css";

import { Inter as FontSans } from "next/font/google";

import { cn } from "../../lib/utils";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { Toaster } from "react-hot-toast";
import Preloader from "../../components/preloader";
import CartDrawer from "../../components/CartDrawer";
import FloatingCart from "../../components/FloatingCart";
import WhatsAppButton from "./bookings/components/WhatsAppButton";
import ConsentBanner from "../../components/ConsentBanner";
import JsonLd from "../../components/JsonLd";
import { SITE } from "../../lib/site";
import { organizationJsonLd } from "../../lib/seo";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Victoria Falls Tours & Safari Bookings | Musasa Travel & Tours",
    template: "%s | Musasa Travel & Tours",
  },
  applicationName: SITE.name,
  description:
    "Book Victoria Falls tours, safari packages, lodges and airport transfers with Musasa Travel — a local travel agency based in Victoria Falls, Zimbabwe.",
  keywords: [
    "Victoria Falls tours",
    "book Victoria Falls",
    "Victoria Falls safari",
    "Musasa Travel",
    "Victoria Falls travel agency",
    "Victoria Falls activities",
    "Victoria Falls accommodation",
    "Victoria Falls airport transfer",
    "Zimbabwe safari packages",
    "Zambezi tours",
    "Hwange National Park safari",
    "Livingstone tours",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  referrer: "origin-when-cross-origin",
  category: "travel",
  openGraph: {
    type: "website",
    locale: "en_ZW",
    url: SITE.url,
    siteName: SITE.name,
    title: "Victoria Falls Tours & Safari Bookings | Musasa Travel",
    description:
      "Local Victoria Falls travel agency for tours, safaris, lodges, guides and airport transfers. Book with Musasa Travel & Tours.",
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "Victoria Falls, Zimbabwe — Musasa Travel tours and safari bookings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Victoria Falls Tours & Safari Bookings | Musasa Travel",
    description:
      "Book Victoria Falls tours, safaris, lodges and transfers with a local Zimbabwe travel agency.",
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/image/favicon.png",
    shortcut: "/image/favicon.png",
    apple: "/image/favicon.png",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZW">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ZTSVLST629"
        ></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ZTSVLST629');`}
        </Script>
      </head>
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.className)}
      >
        <JsonLd data={organizationJsonLd()} />
        <Preloader />
        <Navbar />

        {children}
        <Footer />
        <CartDrawer />
        <FloatingCart />
        <WhatsAppButton />
        <ConsentBanner />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
