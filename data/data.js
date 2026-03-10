import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

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
  { name: <FaWhatsapp color="green" size={22} />, url: "/" },
];

export const navLinks = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Services", url: "/services" },
  { name: "Packages", url: "/packages" },
  { name: "Bookings", url: "/bookings" },
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
      "Just as the Musasa canopy protects the traveler, we provide a total covering of safety and sophistication. From complex cross-border transfers to 24/7 on-ground assistance, we proactively manage every detail so you can explore with absolute peace of mind.",
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
    Question: "What does the name \"Musasa\" represent?",
    Answer: "It refers to the indigenous Musasa tree, known for its vast protective canopy and deep roots. We provide that same \"covering\" and stability for our travelers worldwide."
  },
  {
    Question: "Where is Musasa Travel & Tours headquartered?",
    Answer: "We are proudly based in the \"Adventure Capital\" of Victoria Falls, Zimbabwe. This local presence allows us to offer authentic, on-the-ground expertise to all our clients."
  },
  {
    Question: "Is Musasa Travel & Tours a registered company?",
    Answer: "Yes, we are a fully registered and licensed travel management company operating under the laws of Zimbabwe. We maintain the highest international standards of professionalism and safety."
  },
  {
    Question: "What makes your travel services unique?",
    Answer: "Our \"home-ground\" advantage in Victoria Falls combined with our global reach sets us apart. We don't just book trips; we provide a protective canopy of local insight and 24/7 support."
  },
  {
    Question: "Which destinations do you specialize in?",
    Answer: "Our roots run deep across Victoria Falls, Cape Town, Namibia, Zambia, Mozambique, and Mauritius. We also curate bespoke journeys to many other sought-after global destinations."
  },
  {
    Question: "Can you customize my travel itinerary?",
    Answer: "Absolutely, we specialize in bespoke itineraries tailored to your specific interests, budget, and pace. Every journey we create is as unique as the traveler we serve."
  },
  {
    Question: "Do you provide airport transfers and shuttle services?",
    Answer: "Yes, we offer seamless, air-conditioned transfers and cross-border shuttles for individuals and groups. Our professional drivers ensure you arrive safely, comfortably, and on time."
  },
  {
    Question: "What kind of accommodation do you offer?",
    Answer: "We partner with a range of vetted properties, from luxury safari lodges to boutique coastal retreats. Every stay is hand-picked to ensure it meets our strict standards for comfort and excellence."
  },
  {
    Question: "Are your tour guides professionally licensed?",
    Answer: "Yes, all our guides are licensed experts with deep knowledge of local history, culture, and wildlife. They provide both safety and storytelling to enrich your overall experience."
  },
  {
    Question: "Do you handle international travel outside of Africa?",
    Answer: "Yes, while our heart is in Africa, our roots reach destinations all over the world. We offer a global \"canopy\" of service for any destination you choose to explore."
  },
  {
    Question: "How do I book a tour with Musasa?",
    Answer: "You can request a quote through our website or contact our team directly via email or phone. We will guide you through the process from the initial inquiry to the final booking."
  },
  {
    Question: "Do you provide 24/7 support during my trip?",
    Answer: "Yes, our dedicated team is available around the clock to assist with any urgent needs or changes. You are always under our protective canopy, regardless of your time zone."
  },
  {
    Question: "Do you facilitate cross-border travel in the Southern African region?",
    Answer: "Yes, we specialize in seamless transfers between Zimbabwe, Zambia, and Botswana. We manage all the logistics and paperwork so you can focus entirely on the scenery."
  },
  {
    Question: "What payment methods do you accept?",
    Answer: "We accept major credit cards, secure bank transfers, and verified online payment platforms. All transactions are processed through highly secure, encrypted systems for your protection."
  },
  {
    Question: "Do I need travel insurance for my journey?",
    Answer: "While we do not provide insurance directly, we highly recommend it for every traveler. It serves as an essential extra layer of protection under your travel canopy."
  },
  {
    Question: "Do you cater to solo travelers?",
    Answer: "Yes, we design safe and engaging itineraries specifically for independent explorers. Our constant on-ground support ensures you are never truly alone during your adventure."
  },
  {
    Question: "Can you organize large group or corporate travel?",
    Answer: "Definitely, we have the logistical capacity to manage everything from family reunions to large-scale corporate retreats. We ensure every member of the group receives consistent, high-quality care."
  },
  {
    Question: "Are activities like safaris or cruises included in the package price?",
    Answer: "Activities can be bundled into your custom package based on your specific preferences. We handle all the bookings and scheduling so your transitions are completely seamless."
  },
  {
    Question: "Can you assist with visa requirements for different countries?",
    Answer: "We provide up-to-date information and guidance on visa requirements for our primary destinations. However, the final application and approval remain the responsibility of the traveler."
  },
  {
    Question: "How long does it take to get a custom quote?",
    Answer: "Simply click the \"Request a Quote\" button on our site and share your vision with us. Our team will plant the seeds for your perfect itinerary within 24 to 48 hours."
  }
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
