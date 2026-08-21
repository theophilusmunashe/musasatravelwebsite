import type { AccommodationDef, ActivityDef, GuestTier } from "./bookings-data";
import { priceForTier } from "./bookings-data";
import { VF_BOOKING_ACCOMMODATIONS, VF_BOOKING_ACTIVITIES } from "./vf-booking-data";

export type BookingDestinationId =
  | "victoria-falls"
  | "cape-town"
  | "windhoek"
  | "botswana"
  | "zambia"
  | "mauritius";

export interface BookingDestination {
  id: BookingDestinationId;
  label: string;
  region: string;
  pickerTeaser: string;
  plannerTitle: string;
  plannerSubtitle: string;
  bannerImage: string;
  bannerTitleAccent: string;
  bannerSubtitle: string;
  emailSubjectName: string;
  emailHtmlTitle: string;
  cartPlanTitle: string;
  listPageKicker: string;
  activities: ActivityDef[];
  accommodations: AccommodationDef[];
  serviceChips: readonly string[];
  searchPlaceholder: string;
  guestTierOptions: ReadonlyArray<{ id: GuestTier; title: string; sub: string }>;
  contactResponseLine: string;
  pickerCardClass: string;
}

const CT_ACTIVITIES: ActivityDef[] = [
  { id: "ct-cable-car", name: "Table Mountain cable car & summit walk", short: "Rotate up Table Bay’s icon — sunrise slots book fast in season.", category: "aerial", zimUsd: 12, sadcUsd: 22, intlUsd: 28 },
  { id: "ct-peninsula", name: "Cape Peninsula full day — Cape of Good Hope & Boulders Beach", short: "Penguins, dramatic cliffs, and the south-western tip of Africa.", category: "daytrip", zimUsd: 45, sadcUsd: 55, intlUsd: 65 },
  { id: "ct-robben", name: "Robben Island ferry & guided prison tour", short: "UNESCO site — allow half a day including security queues.", category: "cultural", zimUsd: 8, sadcUsd: 18, intlUsd: 28 },
  { id: "ct-winelands", name: "Winelands day — Stellenbosch & Franschhoek tastings", short: "Cellar doors, mountain passes, and chef-led lunch options.", category: "wine", zimUsd: 55, sadcUsd: 75, intlUsd: 95 },
  { id: "ct-waterfront-cruise", name: "Harbour & Atlantic sunset cruise (V&A Waterfront)", short: "Golden hour past the working harbour toward the Atlantic.", category: "cruise", zimUsd: 22, sadcUsd: 28, intlUsd: 35 },
  { id: "ct-shark", name: "Great white shark cage diving (Gansbaai day)", short: "Early start from Cape Town — weather-dependent marine adventure.", category: "adventure", zimUsd: 95, sadcUsd: 115, intlUsd: 135 },
  { id: "ct-bokaap", name: "City walk — Bo-Kaap, Company’s Garden & museums", short: "Cape Malay heritage, street art, and curated gallery stops.", category: "city", zimUsd: 25, sadcUsd: 35, intlUsd: 45 },
  { id: "ct-kirstenbosch", name: "Kirstenbosch National Botanical Garden", short: "Indigenous fynbos, canopy walkway, and summer sunset concerts.", category: "cultural", zimUsd: 4, sadcUsd: 8, intlUsd: 12 },
  { id: "ct-chapman", name: "Chapman’s Peak drive, Hout Bay & Noordhoek beach", short: "One of the world’s great coastal roads — photographer’s dream.", category: "daytrip", zimUsd: 35, sadcUsd: 45, intlUsd: 55 },
  { id: "ct-constantia", name: "Constantia wine estates & heritage lunch", short: "South Africa’s oldest wine route — elegant half-day pacing.", category: "wine", zimUsd: 40, sadcUsd: 55, intlUsd: 70 },
  { id: "ct-kayak", name: "Sea kayaking — Simon’s Town & African penguin colony views", short: "Calm-bay paddling with marine guide — beginner friendly.", category: "adventure", zimUsd: 28, sadcUsd: 35, intlUsd: 42 },
  { id: "ct-township", name: "Langa & Gugulethu cultural & food experience", short: "Community-led tours — Musasa pairs ethical hosts only.", category: "cultural", zimUsd: 30, sadcUsd: 40, intlUsd: 50 },
];

const CT_ACC: AccommodationDef[] = [
  { id: "ct-one-only", name: "One&Only Cape Town", area: "V&A Waterfront", tier: "iconic", fromUsd: 620, blurb: "Marina-side resort with spa and Table Mountain views." },
  { id: "ct-mount-nelson", name: "Mount Nelson, A Belmond Hotel", area: "Gardens", tier: "iconic", fromUsd: 480, blurb: "Pink-lady legend — afternoon tea and palm-lined pools." },
  { id: "ct-cadogan", name: "Cape Cadogan Boutique Hotel", area: "Gardens", tier: "hotel", fromUsd: 195, blurb: "Elegant Victorian house — walkable to Kloof Street dining." },
  { id: "ct-waterfront-comm", name: "Victoria & Alfred Hotel", area: "V&A Waterfront", tier: "hotel", fromUsd: 220, blurb: "Working-harbour setting with easy boat departures." },
  { id: "ct-tintswalo", name: "Tintswalo Atlantic", area: "Chapman’s Peak", tier: "lodge", fromUsd: 520, blurb: "Boutique lodge literally on the rocks above the Atlantic." },
  { id: "ct-cellars", name: "Cellars-Hohenort", area: "Constantia", tier: "lodge", fromUsd: 340, blurb: "Garden estate, fine dining, and Constantia wine route access." },
  { id: "ct-mojo", name: "Mojo Hotel", area: "Sea Point", tier: "hotel", fromUsd: 95, blurb: "Design-led, sea-facing rooms — strong value near promenade." },
  { id: "ct-more", name: "More Quarters Hotel", area: "Gardens", tier: "guesthouse", fromUsd: 165, blurb: "Apartment-style suites — ideal for longer stays." },
];

const WH_ACTIVITIES: ActivityDef[] = [
  { id: "wh-city", name: "Windhoek city orientation & Independence Museum", short: "German colonial architecture blended with modern Namibia.", category: "city", zimUsd: 18, sadcUsd: 28, intlUsd: 38 },
  { id: "wh-katutura", name: "Katutura market, craft centres & street-food tasting", short: "Community-led insight — vibrant shebeens and local makers.", category: "cultural", zimUsd: 22, sadcUsd: 32, intlUsd: 42 },
  { id: "wh-daan", name: "Daan Viljoen Game Reserve half-day safari", short: "Close to the capital — giraffe, kudu, and walking trails.", category: "wildlife", zimUsd: 25, sadcUsd: 35, intlUsd: 45 },
  { id: "wh-sossus-fly", name: "Sossusvlei fly-in safari (2 days from Windhoek)", short: "Dunes, Deadvlei, and desert lodge — Musasa handles routing.", category: "desert", zimUsd: 420, sadcUsd: 450, intlUsd: 490 },
  { id: "wh-swakop", name: "Swakopmund & Walvis Bay coastal day flight excursion", short: "Dunes meeting ocean — optional kayaking with seals add-on.", category: "daytrip", zimUsd: 180, sadcUsd: 210, intlUsd: 240 },
  { id: "wh-cheetah", name: "Cheetah conservation & rehabilitation visit", short: "Ethical encounters — education-first programmes near Windhoek.", category: "wildlife", zimUsd: 28, sadcUsd: 38, intlUsd: 48 },
  { id: "wh-scenic-flight", name: "Scenic flight — NamibRand / dune sea aerial", short: "Light aircraft over the world’s oldest desert.", category: "aerial", zimUsd: 220, sadcUsd: 250, intlUsd: 280 },
  { id: "wh-etosha", name: "Etosha National Park circuit (3–4 nights)", short: "Classic self-drive or guided — white salt pans and waterholes.", category: "safari", zimUsd: 380, sadcUsd: 420, intlUsd: 480 },
  { id: "wh-sundowner", name: "Private sundowner dune drive (Namib section)", short: "Champagne stop atop red dunes — photographer timing.", category: "desert", zimUsd: 55, sadcUsd: 70, intlUsd: 85 },
  { id: "wh-craft", name: "Ostrich farm, craft market & Joe’s Beerhouse evening", short: "Light-hearted Windhoek classics in one relaxed pacing.", category: "cultural", zimUsd: 35, sadcUsd: 45, intlUsd: 55 },
];

const WH_ACC: AccommodationDef[] = [
  { id: "wh-hilton", name: "Hilton Windhoek", area: "CBD", tier: "hotel", fromUsd: 140, blurb: "High-rise views — reliable international standard." },
  { id: "wh-galaxy", name: "Galaxy Hotel & Conference Centre", area: "Windhoek", tier: "hotel", fromUsd: 95, blurb: "Central meetings hub with pool." },
  { id: "wh-olive", name: "The Olive Exclusive All-Suite Hotel", area: "Windhoek", tier: "lodge", fromUsd: 260, blurb: "Boutique all-suite — quiet suburb, designer interiors." },
  { id: "wh-heinitzburg", name: "Hotel Heinitzburg", area: "Windhoek", tier: "hotel", fromUsd: 175, blurb: "Castle-on-the-kopie views over the capital." },
  { id: "wh-amusha", name: "Amusha Guesthouse", area: "Windhoek", tier: "guesthouse", fromUsd: 75, blurb: "Garden pool, friendly hosts — ideal pre/post desert." },
  { id: "wh-villa", name: "Villa Moringa Guesthouse", area: "Windhoek", tier: "guesthouse", fromUsd: 88, blurb: "Small-scale luxury with gourmet breakfast." },
];

const BW_ACTIVITIES: ActivityDef[] = [
  { id: "bw-mokoro", name: "Okavango Delta mokoro & motorboat safari", short: "Water-level exploration of channels and islands.", category: "safari", zimUsd: 85, sadcUsd: 95, intlUsd: 110 },
  { id: "bw-moremi", name: "Moremi Game Reserve full-day game drive", short: "Big cats, wild dogs, and lagoon edges — open 4x4.", category: "wildlife", zimUsd: 95, sadcUsd: 110, intlUsd: 125 },
  { id: "bw-chobe-boat", name: "Chobe River photographic boat safari", short: "Elephant corridors from the water — golden light sessions.", category: "cruise", zimUsd: 45, sadcUsd: 55, intlUsd: 65 },
  { id: "bw-chobe-drive", name: "Chobe full-day 4x4 safari (Botswana)", short: "Densest elephant herds on earth — includes park fees template.", category: "wildlife", zimUsd: 75, sadcUsd: 85, intlUsd: 95 },
  { id: "bw-makgadikgadi", name: "Makgadikgadi Pans meerkat encounter morning", short: "Seasonal habituation walks — unforgettable sunrise.", category: "wildlife", zimUsd: 55, sadcUsd: 65, intlUsd: 75 },
  { id: "bw-kalahari", name: "Central Kalahari cultural walk with San guides", short: "Ancient knowledge of desert survival — respectful small groups.", category: "cultural", zimUsd: 40, sadcUsd: 50, intlUsd: 60 },
  { id: "bw-horse", name: "Okavango horse safari (experienced riders)", short: "Ride among big game — strict weight & skill checks.", category: "adventure", zimUsd: 220, sadcUsd: 240, intlUsd: 260 },
  { id: "bw-sleepout", name: "Star bed / sleep-out deck experience", short: "Sleep under the Milky Way on raised platforms — lodge-linked.", category: "safari", zimUsd: 180, sadcUsd: 200, intlUsd: 220 },
  { id: "bw-mobile", name: "Mobile tented safari (private guide circuit)", short: "Follow migration and water — fully serviced wilderness camps.", category: "safari", zimUsd: 320, sadcUsd: 350, intlUsd: 390 },
  { id: "bw-maun", name: "Maun to delta light aircraft transfer package", short: "Scenic hop into the Okavango — Musasa bundles with lodges.", category: "aerial", zimUsd: 95, sadcUsd: 105, intlUsd: 115 },
  { id: "bw-mokolodi", name: "Mokolodi Nature Reserve rhino tracking", short: "Near Gaborone — conservation education and short game drive.", category: "wildlife", zimUsd: 22, sadcUsd: 28, intlUsd: 35 },
  { id: "bw-savute", name: "Savuti / Linyanti multi-day predator focus", short: "Remote northern Botswana — lion & wild dog territories.", category: "safari", zimUsd: 280, sadcUsd: 310, intlUsd: 340 },
];

const BW_ACC: AccommodationDef[] = [
  { id: "bw-jao", name: "Jao Camp", area: "Okavango Delta", tier: "iconic", fromUsd: 2200, blurb: "Ultra-luxury island camp — water & land year-round." },
  { id: "bw-chobe-game", name: "Chobe Game Lodge", area: "Chobe National Park", tier: "lodge", fromUsd: 480, blurb: "Only permanent lodge inside Chobe — riverfront rooms." },
  { id: "bw-sanctuary", name: "Sanctuary Chief’s Camp", area: "Moremi", tier: "lodge", fromUsd: 1650, blurb: "Premier predator viewing on Chief’s Island." },
  { id: "bw-ker-downey", name: "Ker & Downey Boteti Tented Camp", area: "Makgadikgadi", tier: "lodge", fromUsd: 620, blurb: "Zebra migration season highlight on the Boteti." },
  { id: "bw-lodge5", name: "Elephant Valley Lodge", area: "Kasane", tier: "lodge", fromUsd: 210, blurb: "Waterhole-facing decks — great Chobe add-on." },
  { id: "bw-hotel-maun", name: "Cresta Maun", area: "Maun", tier: "hotel", fromUsd: 110, blurb: "Safari gateway hotel — practical pre-delta nights." },
  { id: "bw-guest-kasane", name: "Chobe Safari Lodge", area: "Kasane", tier: "hotel", fromUsd: 165, blurb: "Large resort-style base with boat jetty." },
];

const ZM_ACTIVITIES: ActivityDef[] = [
  { id: "zm-devils-pool", name: "Livingstone Island & Devil’s Pool (seasonal)", short: "Edge-of-Falls swim — strict water-level windows.", category: "falls", zimUsd: 35, sadcUsd: 85, intlUsd: 110 },
  { id: "zm-heli", name: "Helicopter or microlight — Zambian side aerial", short: "Batoka Gorge and Falls perspectives from Livingstone.", category: "aerial", zimUsd: 150, sadcUsd: 165, intlUsd: 175 },
  { id: "zm-raft", name: "White-water rafting — Batoka Gorge (Zambia put-in)", short: "Full-day rapids — one of the world’s great river days.", category: "adventure", zimUsd: 110, sadcUsd: 120, intlUsd: 130 },
  { id: "zm-cruise", name: "Sunset cruise — Upper Zambezi (Zambia)", short: "Hippos, crocs, and G&T tradition upstream of the Falls.", category: "cruise", zimUsd: 42, sadcUsd: 52, intlUsd: 62 },
  { id: "zm-rhino", name: "Rhino walking safari — Mosi-oa-Tunya NP", short: "Endangered white rhino tracking on foot with scouts.", category: "wildlife", zimUsd: 55, sadcUsd: 70, intlUsd: 85 },
  { id: "zm-luangwa", name: "South Luangwa walking safari & night drive", short: "Valley of the leopard — remote bush camps.", category: "safari", zimUsd: 240, sadcUsd: 270, intlUsd: 300 },
  { id: "zm-lower-zam", name: "Lower Zambezi canoe & boat combo", short: "Elephants in the river channels — classic Zambia.", category: "wildlife", zimUsd: 180, sadcUsd: 200, intlUsd: 220 },
  { id: "zm-kafue", name: "Kafue National Park fly-in safari", short: "Vast wilderness — cheetah and roan strongholds.", category: "safari", zimUsd: 260, sadcUsd: 290, intlUsd: 320 },
  { id: "zm-liuwa", name: "Liuwa Plain wildebeest migration (seasonal)", short: "Africa’s second great migration — remote western Zambia.", category: "safari", zimUsd: 310, sadcUsd: 340, intlUsd: 370 },
  { id: "zm-blue-lagoon", name: "Blue Lagoon / Lochinvar birding expedition", short: "Serious twitchers — seasonal water levels.", category: "wildlife", zimUsd: 85, sadcUsd: 95, intlUsd: 105 },
  { id: "zm-cultural", name: "Livingstone museum & village cultural afternoon", short: "Livingstone legacy and local craft cooperatives.", category: "cultural", zimUsd: 18, sadcUsd: 28, intlUsd: 38 },
  { id: "zm-bungee", name: "Bridge adrenaline — swing / slide from Victoria Falls Bridge", short: "Zambia/Zimbabwe border — passport in pocket.", category: "adventure", zimUsd: 155, sadcUsd: 165, intlUsd: 175 },
];

const ZM_ACC: AccommodationDef[] = [
  { id: "zm-royal", name: "The Royal Livingstone Hotel", area: "Livingstone", tier: "iconic", fromUsd: 520, blurb: "Zebras on the lawn — Zambezi riverfront beside the Falls." },
  { id: "zm-avani", name: "Avani Victoria Falls Resort", area: "Livingstone", tier: "hotel", fromUsd: 185, blurb: "Family-friendly resort near the park entrance." },
  { id: "zm-tongabezi", name: "Tongabezi Lodge", area: "Zambezi River upstream", tier: "lodge", fromUsd: 780, blurb: "Romantic houses on the river — boat transfers to activities." },
  { id: "zm-sindabezi", name: "Sindabezi Island Camp", area: "Kafue River channels", tier: "lodge", fromUsd: 620, blurb: "Off-grid luxury island chalets." },
  { id: "zm-chundu", name: "Chundukwa River Lodge", area: "Zambezi", tier: "lodge", fromUsd: 240, blurb: "Owner-run hospitality — sunset views upstream." },
  { id: "zm-protea", name: "Protea Hotel Livingstone", area: "Livingstone", tier: "hotel", fromUsd: 115, blurb: "Central town base for Vic Falls Zambia side." },
  { id: "zm-maramba", name: "Maramba River Lodge", area: "Livingstone", tier: "guesthouse", fromUsd: 95, blurb: "Raised chalets near a seasonal riverbed." },
];

const MU_ACTIVITIES: ActivityDef[] = [
  { id: "mu-le-morne", name: "Le Morne Brabant & UNESCO lagoon viewpoints", short: "Dramatic peak, kite-surf beaches, and history interpretation.", category: "beach", zimUsd: 15, sadcUsd: 25, intlUsd: 35 },
  { id: "mu-catamaran", name: "Catamaran day — Île aux Cerfs & east coast lagoons", short: "BBQ lunch, snorkel stops, and powder-white sandbars.", category: "cruise", zimUsd: 48, sadcUsd: 58, intlUsd: 68 },
  { id: "mu-chamarel", name: "Chamarel Seven Coloured Earth & Rhumerie", short: "Volcanic dunes, waterfall lookout, and artisanal rum tasting.", category: "cultural", zimUsd: 22, sadcUsd: 32, intlUsd: 42 },
  { id: "mu-pamplemousses", name: "Pamplemousses Botanical Garden & north coast", short: "Giant water lilies and colonial garden architecture.", category: "cultural", zimUsd: 8, sadcUsd: 15, intlUsd: 22 },
  { id: "mu-dolphin", name: "West coast dolphin swim & snorkel cruise", short: "Spinner dolphins — early-morning calm seas preferred.", category: "wildlife", zimUsd: 38, sadcUsd: 48, intlUsd: 58 },
  { id: "mu-south-drive", name: "Wild south coast — Gris Gris, Rochester Falls, tea route", short: "Rugged cliffs, local lunch, and away-from-resort Mauritius.", category: "island", zimUsd: 35, sadcUsd: 45, intlUsd: 55 },
  { id: "mu-heli", name: "Underwater waterfall scenic helicopter flight", short: "Short doors-off style optics — sand patterns from the air.", category: "aerial", zimUsd: 120, sadcUsd: 135, intlUsd: 150 },
  { id: "mu-port-louis", name: "Port Louis — market, citadel & street-food walk", short: "Capital pulse, dhal puri stalls, and harbour photo stops.", category: "city", zimUsd: 25, sadcUsd: 35, intlUsd: 45 },
  { id: "mu-casela", name: "Casela adventure — zipline, quad & big-cat safari drive", short: "Family adrenaline park with controlled animal encounters.", category: "adventure", zimUsd: 42, sadcUsd: 52, intlUsd: 62 },
  { id: "mu-golf", name: "Championship golf — Ile aux Cerfs or east coast resort courses", short: "Bernhard Langer design and ocean-side fairways.", category: "cultural", zimUsd: 95, sadcUsd: 110, intlUsd: 125 },
  { id: "mu-spa", name: "Luxury spa day — resort thermal & ocean spa circuit", short: "Combine with late checkout — Musasa books preferred slots.", category: "beach", zimUsd: 65, sadcUsd: 85, intlUsd: 105 },
];

const MU_ACC: AccommodationDef[] = [
  { id: "mu-one-only", name: "One&Only Le Saint Géran", area: "Poste de Flacq", tier: "iconic", fromUsd: 890, blurb: "Grande dame private peninsula — butler service." },
  { id: "mu-four-seasons", name: "Four Seasons Resort Mauritius at Anahita", area: "east coast", tier: "iconic", fromUsd: 720, blurb: "Ernie Els golf, lagoon villas, and calm bathing." },
  { id: "mu-lux", name: "LUX* Belle Mare", area: "Belle Mare", tier: "lodge", fromUsd: 380, blurb: "Longest east-coast beach — lively LUX service." },
  { id: "mu-paradis", name: "Paradis Beachcomber Golf Resort & Spa", area: "Le Morne", tier: "lodge", fromUsd: 310, blurb: "Le Morne peninsula — golf and kite beach access." },
  { id: "mu-maradiva", name: "Maradiva Villas Resort & Spa", area: "Flic en Flac", tier: "lodge", fromUsd: 450, blurb: "Private pool villas — west coast sunsets." },
  { id: "mu-veranda", name: "Veranda Paul et Virginie", area: "Grand Gaube", tier: "hotel", fromUsd: 165, blurb: "Adults-oriented boutique — north coast coves." },
  { id: "mu-coin", name: "Coin de Mire Attitude", area: "Cap Malheureux", tier: "hotel", fromUsd: 125, blurb: "View of Coin de Mire islet — friendly Attitude brand." },
];

const tierZimSadcIntl = [
  { id: "zimbabwe" as const, title: "Zimbabwe resident", sub: "Resident / citizen style rates where published" },
  { id: "sadc" as const, title: "SADC visitor", sub: "Regional passport rates where applicable" },
  { id: "international" as const, title: "International visitor", sub: "Standard visitor rates" },
] as const;

const tierLocalRegionalIntl = [
  { id: "zimbabwe" as const, title: "Local resident rates", sub: "Citizen / resident published tariffs" },
  { id: "sadc" as const, title: "SADC & regional", sub: "Southern African passport holders" },
  { id: "international" as const, title: "International visitor", sub: "Standard visitor / overseas rates" },
] as const;

const tierSARRegionalIntl = [
  { id: "zimbabwe" as const, title: "South African resident", sub: "SA ID / citizen rate bands where applicable" },
  { id: "sadc" as const, title: "SADC passport holder", sub: "Regional visitor published tiers" },
  { id: "international" as const, title: "International visitor", sub: "Overseas guest standard rates" },
] as const;

export const BOOKING_DESTINATIONS: Record<BookingDestinationId, BookingDestination> = {
  "victoria-falls": {
    id: "victoria-falls",
    label: "Victoria Falls",
    region: "Zimbabwe / Zambia",
    pickerTeaser: "Spray, Zambezi cruises & adrenalin in the adventure capital.",
    plannerTitle: "Design your Victoria Falls moment",
    plannerSubtitle: "Tap what excites you — pricing updates by your passport tier.",
    bannerImage: "https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711417/victoria-falls_kzd1kp.jpg",
    bannerTitleAccent: "African Adventure",
    bannerSubtitle: "Mighty Falls, Zambezi sunsets, and world-class lodges — Musasa stitches every detail.",
    emailSubjectName: "Victoria Falls",
    emailHtmlTitle: "Victoria Falls trip planner",
    cartPlanTitle: "Your Victoria Falls plan",
    listPageKicker: "Victoria Falls planner",
    activities: VF_BOOKING_ACTIVITIES,
    accommodations: VF_BOOKING_ACCOMMODATIONS,
    serviceChips: [
      "Victoria Falls itinerary",
      "Accommodation only",
      "Activities only",
      "Honeymoon / celebration",
      "Corporate / group",
      "Custom request",
    ],
    searchPlaceholder: "Search e.g. raft, cruise, helicopter…",
    guestTierOptions: tierZimSadcIntl,
    contactResponseLine: "We respond fast — usually within minutes in Victoria Falls time.",
    pickerCardClass: "from-emerald-900/50 via-zinc-900/80 to-zinc-950",
  },
  "cape-town": {
    id: "cape-town",
    label: "Cape Town",
    region: "South Africa",
    pickerTeaser: "Table Mountain, Cape Peninsula, Winelands & Atlantic drama.",
    plannerTitle: "Design your Cape Town escape",
    plannerSubtitle: "City, mountains, and ocean in one elegant Musasa flow — tiers are indicative for planning.",
    bannerImage:
      "https://images.unsplash.com/photo-1770553129485-99739edb534f?auto=format&fit=crop&w=2000&q=80",
    bannerTitleAccent: "Cape Town Escape",
    bannerSubtitle: "From the cable car to the Winelands — curated stays, ethical tours, and seamless transfers.",
    emailSubjectName: "Cape Town",
    emailHtmlTitle: "Cape Town trip planner",
    cartPlanTitle: "Your Cape Town plan",
    listPageKicker: "Cape Town planner",
    activities: CT_ACTIVITIES,
    accommodations: CT_ACC,
    serviceChips: [
      "Cape Town itinerary",
      "Accommodation only",
      "Activities only",
      "Honeymoon / celebration",
      "Corporate / group",
      "Custom request",
    ],
    searchPlaceholder: "Search e.g. wine, cable car, penguins…",
    guestTierOptions: tierSARRegionalIntl,
    contactResponseLine: "We respond fast — usually within minutes during Southern Africa business hours.",
    pickerCardClass: "from-sky-900/45 via-slate-900/85 to-zinc-950",
  },
  windhoek: {
    id: "windhoek",
    label: "Windhoek & Namibia",
    region: "Namibia",
    pickerTeaser: "Capital gateway to dunes, Skeleton Coast & Etosha circuits.",
    plannerTitle: "Shape your Namibia journey from Windhoek",
    plannerSubtitle: "Desert fly-ins, ethical wildlife, and wide-open roads — Musasa plans the pacing.",
    bannerImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2000&q=80",
    bannerTitleAccent: "Namibia Horizons",
    bannerSubtitle: "Windhoek sophistication meets ancient deserts — bespoke routing and trusted lodges.",
    emailSubjectName: "Namibia / Windhoek",
    emailHtmlTitle: "Namibia trip planner",
    cartPlanTitle: "Your Namibia plan",
    listPageKicker: "Namibia planner",
    activities: WH_ACTIVITIES,
    accommodations: WH_ACC,
    serviceChips: [
      "Namibia circuit",
      "Windhoek stopover only",
      "Sossusvlei & desert focus",
      "Etosha safari focus",
      "Honeymoon / celebration",
      "Custom request",
    ],
    searchPlaceholder: "Search e.g. Etosha, Sossusvlei, flight…",
    guestTierOptions: tierLocalRegionalIntl,
    contactResponseLine: "We respond fast — Namibia & Victoria Falls teams coordinate on your enquiry.",
    pickerCardClass: "from-orange-950/55 via-amber-950/40 to-zinc-950",
  },
  botswana: {
    id: "botswana",
    label: "Botswana",
    region: "Okavango & beyond",
    pickerTeaser: "Okavango water camps, Chobe elephants & Kalahari silence.",
    plannerTitle: "Craft your Botswana safari story",
    plannerSubtitle: "Water camps, mobile safaris, and Chobe river light — indicative tiers for planning.",
    bannerImage: "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=2000&q=80",
    bannerTitleAccent: "Botswana Safari",
    bannerSubtitle: "Low-volume tourism model — Musasa matches camps to season and budget with care.",
    emailSubjectName: "Botswana",
    emailHtmlTitle: "Botswana trip planner",
    cartPlanTitle: "Your Botswana plan",
    listPageKicker: "Botswana planner",
    activities: BW_ACTIVITIES,
    accommodations: BW_ACC,
    serviceChips: [
      "Okavango Delta focus",
      "Chobe & Kasane circuit",
      "Mobile tented safari",
      "Makgadikgadi / desert mix",
      "Honeymoon / celebration",
      "Custom request",
    ],
    searchPlaceholder: "Search e.g. mokoro, Chobe, mobile…",
    guestTierOptions: tierLocalRegionalIntl,
    contactResponseLine: "We respond fast — safari desk hours across Southern Africa.",
    pickerCardClass: "from-teal-950/50 via-emerald-950/35 to-zinc-950",
  },
  zambia: {
    id: "zambia",
    label: "Zambia",
    region: "Livingstone & bush",
    pickerTeaser: "Livingstone adrenaline, Lower Zambezi canoeing & Luangwa walking.",
    plannerTitle: "Build your Zambia adventure",
    plannerSubtitle: "Falls edge swims, river safaris, and remote parks — tiers help you estimate spend.",
    bannerImage: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=2000&q=80",
    bannerTitleAccent: "Zambia Adventure",
    bannerSubtitle: "The quieter Falls shore and some of Africa’s finest walking safaris — all in one enquiry.",
    emailSubjectName: "Zambia",
    emailHtmlTitle: "Zambia trip planner",
    cartPlanTitle: "Your Zambia plan",
    listPageKicker: "Zambia planner",
    activities: ZM_ACTIVITIES,
    accommodations: ZM_ACC,
    serviceChips: [
      "Livingstone & Falls focus",
      "South Luangwa safari",
      "Lower Zambezi canoe safari",
      "Multi-park combination",
      "Honeymoon / celebration",
      "Custom request",
    ],
    searchPlaceholder: "Search e.g. Devil’s Pool, Luangwa, canoe…",
    guestTierOptions: tierLocalRegionalIntl,
    contactResponseLine: "We respond fast — Zambia & Musasa Victoria Falls desks collaborate.",
    pickerCardClass: "from-lime-950/35 via-emerald-950/45 to-zinc-950",
  },
  mauritius: {
    id: "mauritius",
    label: "Mauritius",
    region: "Indian Ocean",
    pickerTeaser: "Lagoon blues, mountain hikes, rum & refined coastal resorts.",
    plannerTitle: "Curate your Mauritius island chapter",
    plannerSubtitle: "Reef, culture, and resort spa rhythm — indicative resort and tour tiers.",
    bannerImage: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=2000&q=80",
    bannerTitleAccent: "Island Luxury",
    bannerSubtitle: "Honeymoons, families, and golf escapes — Musasa balances beach time with real island depth.",
    emailSubjectName: "Mauritius",
    emailHtmlTitle: "Mauritius trip planner",
    cartPlanTitle: "Your Mauritius plan",
    listPageKicker: "Mauritius planner",
    activities: MU_ACTIVITIES,
    accommodations: MU_ACC,
    serviceChips: [
      "Mauritius beach holiday",
      "Resort & spa focus",
      "Golf & leisure",
      "Discovery & culture mix",
      "Honeymoon / celebration",
      "Custom request",
    ],
    searchPlaceholder: "Search e.g. catamaran, Le Morne, rum…",
    guestTierOptions: tierLocalRegionalIntl,
    contactResponseLine: "We respond fast — Indian Ocean desk with Southern Africa backup.",
    pickerCardClass: "from-cyan-900/40 via-blue-950/50 to-zinc-950",
  },
};

export const BOOKING_DESTINATION_ORDER: BookingDestinationId[] = [
  "victoria-falls",
  "cape-town",
  "windhoek",
  "botswana",
  "zambia",
  "mauritius",
];

export function getBookingDestination(id: BookingDestinationId | string | undefined): BookingDestination | undefined {
  if (!id) return undefined;
  return BOOKING_DESTINATIONS[id as BookingDestinationId];
}

export function guestTierTitleForDestination(dest: BookingDestination, tier: GuestTier): string {
  const hit = dest.guestTierOptions.find((o) => o.id === tier);
  return hit?.title ?? (tier === "zimbabwe" ? "Resident-style" : tier === "sadc" ? "Regional visitor" : "International visitor");
}

export function formatGuestPriceForDestination(a: ActivityDef, tier: GuestTier, dest: BookingDestination): string {
  const label = guestTierTitleForDestination(dest, tier);
  return `${label}: ~$${priceForTier(a, tier)}`;
}
