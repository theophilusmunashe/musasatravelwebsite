import Script from "next/script";

import type { Metadata } from "next";
import "../globals.css";
// import "../globals.scss";

import { Inter as FontSans, Cormorant_Garamond as FontDisplay } from "next/font/google";

import { cn } from "../../lib/utils";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { client } from "../../sanity/lib/client";
import { groq } from "next-sanity";

import { Toaster } from "react-hot-toast";
import PreLandingExperience from "../../components/pre-landing/PreLandingExperience";
import CartDrawer from "../../components/CartDrawer";
import FloatingCart from "../../components/FloatingCart";
import WhatsAppButton from "./bookings/components/WhatsAppButton";
import ConsentBanner from "../../components/ConsentBanner";
import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_FULL_NAME,
  SITE_NAME,
  SITE_URL,
} from "../../lib/site";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontDisplay = FontDisplay({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_FULL_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  description: SITE_DESCRIPTION,
  keywords: [
    "kumusha ekhayalethu",
    "private estate",
    "luxury estate living",
    "estate accommodation",
    "private estate zimbabwe",
    "estate hospitality",
    "curated estate experiences",
    "kumusha estate",
    "ekhayalethu",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  openGraph: {
    type: "website",
    locale: "en_ZW",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_FULL_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_FULL_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
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
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.className,
          fontDisplay.variable
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/image/logo.svg`,
              description: SITE_DESCRIPTION,
              email: SITE_EMAIL,
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
              sameAs: [],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Estate Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Estate Accommodation" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Curated Experiences" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Estate Hospitality" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Private Transfers" } },
                ],
              },
            }),
          }}
        />
        <PreLandingExperience />
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
