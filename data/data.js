import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import serviceItem1 from "@/assets/5.png";
import icon9 from "@/assets/shuttle-icon.png";
import icon8 from "@/assets/tourguide-icon.png";
import icon7 from "@/assets/itenarary-icon.png";
import icon6 from "@/assets/handover.svg";
import icon5 from "@/assets/activities-icon.png";
import icon1 from "@/assets/accomodation-icon.png";

import partner from "@/assets/partner-50.png";
import design from "@/assets/design-thinking.png";
export const footerItems = [
  {
    title: "About Us",
    links: [
      { name: "Our Story", url: "/about" },
      { name: "Blogs", url: "/blogs" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { name: "About us", url: "/about" },
      { name: "Packages", url: "/packages" },
      { name: "Services", url: "/services" },
      { name: "Contact Us", url: "/contact" },
    ],
  },
];

export const foot = [
  {
    name: <FaFacebook color="blue" size={22} />,
    url: "https://www.facebook.com/",
  },
  { name: <FaTwitter color="#0084ff" size={22} />, url: "https://twitter.com" },
  {
    name: <FaInstagram color="red" size={22} />,
    url: "https://www.instagram.com",
  },
];

export const navLinks = [
  { name: "The Estate", url: "/#the-estate" },
  { name: "Services", url: "/#services" },
  { name: "Experiences", url: "/#experiences" },
  { name: "Join Us", url: "/bookings" },
];

export const navigationServices = [
  { title: "Accommodation", slug: { current: "accommodation" }, url: "/services/accommodation" },
  { title: "Activities", slug: { current: "activities" }, url: "/services/activities" },
  { title: "Customized Itinerary", slug: { current: "customized-itinerary" }, url: "/services/customized-itinerary" },
  { title: "Tour Guides", slug: { current: "tour-guides" }, url: "/services/tour-guides" },
  { title: "Shuttle Services & Transfers", slug: { current: "shuttle-services" }, url: "/services/shuttle-services" },
];

export const industries = [
  {
    image: "",
    name: "Retails",
    background: "",
  },
  {
    image: "",
    name: "Office",
    background: "",
  },
  {
    image: "",
    name: "Hospitality",
    background: "",
  },
  {
    image: "",
    name: "de-fits",
    background: "",
  },
  {
    image: "",
    name: "fitness",
    background: "",
  },
  {
    image: "",
    name: "childcare",
    background: "",
  },
];

export const serviceItems = [
  {
   
    Service: "The Home-Ground Advantage",
    Description:
      "Headquartered in the heart of Victoria Falls, we don’t just study the map—we live the destination. Our at the source presence grants you exclusive insider access, real-time local support, and a level of logistical precision that only a true local expert can provide.",
  },
  {
  
    Service: "A Shield of Seamless Excellence",
    Description:
      "From secure estate access to attentive on-site support, we provide a standard of care and sophistication that lets you live and unwind with complete peace of mind.",
  },
  {
  
    Service: "Deeply Rooted Global Reach",
    Description:
      "Our name reflects our nature: we possess the stability of deep roots and the reach of an expansive canopy. We transcend generic travel by leveraging a vast international network of elite partners to craft bespoke, high-end journeys that are as unique as the travelers we serve.",
  },
];

export const serviceItems2 = [
  {
    image: icon1,
    Service: "Accommodation",
    animation: 500,
    Description:
      "From luxury safari lodges to boutique coastal retreats, we hand-pick your sanctuary for every night of your journey.Rest easy under our canopy of carefully vetted stays that prioritize comfort, style, and authentic local charm.",
  },
  {
    image: icon5,
    Service: "Activities",
    animation: 650,
    Description:
      "Dive into heart-pounding adventures or tranquil cultural immersions curated by those who know the land best.We connect you to the pulse of every destination, from the spray of the Falls to the silence of the savannah.",

  },
  {
    image: icon7,
    Service: "Customized Itineraries",
    animation: 800,
    Description:
      "No two travelers are alike, so we craft bespoke journeys tailored specifically to your unique pace and passions.Your dream itinerary is designed with precision, ensuring every detail is rooted in excellence and personal touch."
,
  },
  {
    image: icon8,
    Service: "Tour Guides",
    animation: 950,
    Description:
      "Explore through the eyes of passionate experts who breathe life into every landmark and hidden trail.Our guides offer deep local insights and a protective presence, making every story of the land come alive for you.",

  },
  {
    image: icon9,
    Service: "Shuttle Service & Transfers",
    animation: 1250,
    Description:
      "Navigate the region with ease through our reliable network of air-conditioned, professional transfers and cross-border shuttles.",
  },
];

export const faqItems = [
  {
    Question: "What does the name \"Kumusha Ekhayalethu\" mean?",
    Answer: "Kumusha means home in Shona. Ekhayalethu combines ekhaya — home in Ndebele and Zulu — with lethu, meaning ours. Together, the name expresses our vision of a private estate where home truly belongs to us all."
  },
  {
    Question: "Where is Kumusha Ekhayalethu located?",
    Answer: "We are a private estate on 2.5 hectares of serene land near Victoria Falls, Zimbabwe — with the Falls visible in the far distance. Contact us for directions and estate visits."
  },
  {
    Question: "How many guests can the estate accommodate?",
    Answer: "The estate features 6 beautifully designed en-suite bedrooms, along with versatile entertainment spaces suitable for weddings, conferences, intimate celebrations, and peaceful getaways."
  },
  {
    Question: "What events can I host at Kumusha?",
    Answer: "Kumusha is the perfect setting for weddings, conferences, intimate celebrations, and private retreats. We also host wine tasting evenings and sip and paint events on the estate."
  },
  {
    Question: "Do you offer wine tasting and sip and paint events?",
    Answer: "Yes. We host curated wine tasting evenings and sip and paint events on the estate — relaxed, creative experiences with Victoria Falls shimmering in the far distance."
  },
  {
    Question: "Can I see Victoria Falls from the estate?",
    Answer: "Yes. The estate overlooks Victoria Falls in the far distance — a serene backdrop for stays, celebrations, and evening events."
  },
  {
    Question: "How do I enquire or book?",
    Answer: "Use our online enquiry form or contact us directly by email or phone. Our team will respond within 24 hours on business days to confirm availability and next steps."
  },
  {
    Question: "Is the estate suitable for conferences and corporate retreats?",
    Answer: "Absolutely. Versatile entertainment spaces and en-suite accommodation make Kumusha ideal for conferences, team retreats, and corporate gatherings in a private, elegant setting."
  },
  {
    Question: "Can I book the entire estate for a wedding?",
    Answer: "Yes. Many couples choose Kumusha for wedding weekends — with room for ceremony, reception, and overnight guests across our 6 en-suite bedrooms."
  },
  {
    Question: "What payment methods do you accept?",
    Answer: "We accept major credit cards, secure bank transfers, and verified online payment platforms. All transactions are processed through secure, encrypted systems."
  },
  {
    Question: "How long does it take to get a quote?",
    Answer: "Submit an enquiry through our website with your dates and event type. Our team typically responds within 24 to 48 hours on business days."
  },
  {
    Question: "Is Kumusha suitable for a peaceful private escape?",
    Answer: "Yes. Beyond events, the estate is a sanctuary for quiet getaways — 2.5 hectares of serene land where nature, elegance, and privacy come together."
  },
];

export const swiperITems = [
  {
    name: "Matroco Ltd.",
    review:
      "I recently had solar panels installed on my roof by this company and I couldn't be happier with the results. The whole process was smooth and the installation was completed in a timely manner. My energy bills have already decreased significantly and I'm excited to see the long-term savings.",
  },
  {
    name: "Obinna Ude",
    review:
      "I was hesitant to switch to solar energy, but this company made the transition so easy. They walked me through the process and answered all of my questions. The installation was seamless and their team was professional and courteous. I'm already seeing a difference in my energy bills and I'm so glad I made the switch.",
  },
  {
    name: "Anonymous",
    review:
      "I can't say enough good things about this company. From start to finish, they were professional, knowledgeable, and efficient. They took care of everything, from the initial consultation to the final installation. My solar panels look great and my energy bills have never been lower. I highly recommend this company to anyone considering solar energy.",
  },
  {
    name: "Collins",
    review:
      "I can't say enough good things about this company. From start to finish, they were professional, knowledgeable, and efficient. They took care of everything, from the initial consultation to the final installation. My solar panels look great and my energy bills have never been lower. I highly recommend this company to anyone considering solar energy.",
  },
];

// export const brands = [
//   {
//     image: Brand1
//   },
//   {
//     image: Brand2
//   },
//   {
//     image: Brand3
//   },
//   {
//     image: Brand4
//   },
//   {
//     image: Brand5
//   },
//   {
//     image: Brand6
//   },
// ]

// export const aboutData = [
//   {
//     title: 'Vision',
//     description: "Our vision is to be a leading provider of solar products, leveraging cutting-edge technology and innovative solutions to drive the adoption of renewable energy worldwide. We strive to create a future where clean energy is accessible to everyone, reducing our carbon footprint and preserving the planet for future generations.",
//     image: Vision
//   },
//   {
//     title: "Mission",
//     description: "Mission Statement: Our mission is to provide high-quality, reliable, and cost-effective solar products to our customers while promoting sustainable and environmentally friendly practices.",
//     image: Mission
//   }
// ]
