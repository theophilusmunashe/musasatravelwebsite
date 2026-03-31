import Script from "next/script";

import type { Metadata } from "next";
import "../globals.css";
// import "../globals.scss";

import { Inter as FontSans } from "next/font/google";

import { cn } from "../../lib/utils";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { client } from "../../sanity/lib/client";
import { groq } from "next-sanity";

import { Toaster } from "react-hot-toast";
import Preloader from "../../components/preloader";
import CartDrawer from "../../components/CartDrawer";
import FloatingCart from "../../components/FloatingCart";
import WhatsAppButton from "./bookings/components/WhatsAppButton";
import ConsentBanner from "../../components/ConsentBanner";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.musasatravelandtours.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Musasa Travel & Tours — Rooted in Africa, Reaching the World",
    template: "%s | Musasa Travel & Tours",
  },
  applicationName: "Musasa Travel & Tours",
  description:
    "Musasa Travel & Tours offers world-class African travel experiences — from Victoria Falls safaris and luxury accommodation to custom itineraries, expert tour guides, and seamless transfers. Book your dream African adventure today.",
  keywords: [
    "musasa travel",
    "musasa tours",
    "victoria falls tours",
    "zimbabwe safari",
    "african travel packages",
    "victoria falls accommodation",
    "zambezi safari",
    "hwange national park",
    "african tour guides",
    "custom itinerary africa",
    "shuttle services victoria falls",
    "luxury safari zimbabwe",
    "botswana safari",
    "zambia tours",
    "travel agency zimbabwe",
  ],
  authors: [{ name: "Musasa Travel & Tours" }],
  creator: "Musasa Travel & Tours",
  publisher: "Musasa Travel & Tours",
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  openGraph: {
    type: "website",
    locale: "en_ZW",
    url: BASE_URL,
    siteName: "Musasa Travel & Tours",
    title: "Musasa Travel & Tours — Rooted in Africa, Reaching the World",
    description:
      "Discover Africa's finest experiences with Musasa Travel & Tours. Victoria Falls safaris, luxury lodges, custom itineraries and more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Musasa Travel & Tours — Victoria Falls, Zimbabwe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Musasa Travel & Tours",
    description:
      "World-class African travel experiences — Victoria Falls safaris, luxury lodges, custom itineraries.",
    images: ["/og-image.jpg"],
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

const categoryquery = groq`
  *[_type=="category"] {
    ...,
    "mainImage": mainImage.asset->url,
  } 
`;

const fetchCategory = async () => {
  try {
    const posts = await client.fetch(categoryquery);
    // Handle the fetched posts data
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

export const revalidate = 3600;
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const category = await fetchCategory();

  return (
    <html lang="en">
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Musasa Travel & Tours",
              url: BASE_URL,
              logo: `${BASE_URL}/image/logo.svg`,
              description:
                "World-class African travel experiences — Victoria Falls safaris, luxury lodges, custom itineraries, expert guides and seamless transfers.",
              telephone: "+263776093268",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Victoria Falls",
                addressCountry: "ZW",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -17.9243,
                longitude: 25.8572,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
                ],
                opens: "08:00",
                closes: "18:00",
              },
              sameAs: [
                "https://www.instagram.com/musasatravelandtours/",
                "https://www.facebook.com/profile.php?id=61587802886735",
              ],
              areaServed: [
                { "@type": "Country", name: "Zimbabwe" },
                { "@type": "Country", name: "Botswana" },
                { "@type": "Country", name: "Zambia" },
                { "@type": "Country", name: "South Africa" },
                { "@type": "Country", name: "Namibia" },
                { "@type": "Country", name: "Mozambique" },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "African Travel Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Safari Activities" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Luxury Accommodation" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Customized Itineraries" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Expert Tour Guides" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Shuttle & Transfer Services" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Travel Packages" } },
                ],
              },
            }),
          }}
        />
        <Preloader />
        <Navbar components={category} />

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
