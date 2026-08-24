import ContactClient from "./components/ContactClient";
import JsonLd from "../../../components/JsonLd";
import { SITE } from "@/lib/site";
import { breadcrumbsJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Musasa Travel in Victoria Falls",
  description:
    "Contact Musasa Travel & Tours in Victoria Falls, Zimbabwe to book tours, lodges and transfers. Call +263 77 609 3268 or email us — we reply within 24 hours.",
  path: "/contact",
  keywords: [
    "contact Musasa Travel",
    "Victoria Falls travel agency contact",
    "book Victoria Falls tour",
    "Musasa Travel phone",
  ],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact Musasa Travel", path: "/contact" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Musasa Travel in Victoria Falls",
          url: `${SITE.url}/contact`,
        }}
      />
      <ContactClient />
    </>
  );
}
