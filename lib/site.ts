export const SITE = {
  name: "Musasa Travel & Tours",
  shortName: "Musasa Travel",
  legalName: "Musasa Travel & Tours",
  tagline: "Victoria Falls tours, safaris and bookings",
  url:
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.musasatravelandtours.com",
  email: "info@musasatravel.com",
  bookingsEmail: "bookings@musasatravel.com",
  phoneDisplay: "+263 77 609 3268",
  phoneE164: "+263776093268",
  address: {
    street: "Victoria Falls",
    locality: "Victoria Falls",
    region: "Matabeleland North",
    country: "ZW",
    countryName: "Zimbabwe",
  },
  geo: { latitude: -17.9243, longitude: 25.8572 },
  ogImage:
    "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711417/victoria-falls_kzd1kp.jpg",
  logoPath: "/image/logo.svg",
  social: {
    instagram: "https://www.instagram.com/musasatravelandtours/",
    facebook: "https://www.facebook.com/profile.php?id=61587802886735",
    tiktok: "https://www.tiktok.com/@musasatravel",
  },
} as const;

export const PRIMARY_KEYWORDS = [
  "Victoria Falls tours",
  "Victoria Falls safari",
  "book Victoria Falls",
  "Victoria Falls travel agency",
  "Musasa Travel",
  "Victoria Falls activities",
  "Victoria Falls accommodation",
  "Victoria Falls airport transfer",
  "Zimbabwe safari packages",
  "Zambezi tours",
];

export const SEO_FAQS = [
  {
    question: "Where is Musasa Travel & Tours based?",
    answer:
      "Musasa Travel & Tours is based in Victoria Falls, Zimbabwe — the adventure capital of Africa. Our local team handles tours, safari bookings, lodges and transfers on the ground.",
  },
  {
    question: "Can I book Victoria Falls tours and activities with Musasa?",
    answer:
      "Yes. You can book Victoria Falls activities, safari packages, accommodation, licensed tour guides and airport transfers in one place, then confirm by email or WhatsApp.",
  },
  {
    question: "Do you arrange Victoria Falls airport transfers?",
    answer:
      "Yes. We provide Victoria Falls Airport (VFA) transfers, cross-border shuttles to Livingstone and Kasane, and private safari vehicles across Zimbabwe, Zambia and Botswana.",
  },
  {
    question: "Can you customise a Victoria Falls itinerary?",
    answer:
      "Yes. We build bespoke Victoria Falls and Southern Africa itineraries around your dates, budget and interests, with a quote typically within 24 to 48 hours.",
  },
  {
    question: "Are Musasa tour guides licensed?",
    answer:
      "Yes. Our Victoria Falls guides are licensed local experts specialising in wildlife, adventure and cultural experiences around the Falls, Zambezi and Hwange.",
  },
];
