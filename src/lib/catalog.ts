// All product, craft-line, collection, room and journal content, taken from the
// "the rootSS Catalogue 11.2026". Prices are null until the owner confirms them.
// A null code or size means the catalogue leaves it blank: pages say "confirmed on enquiry".
import { photo } from "./images";

/* ---------------------------------------------------------------- craft lines */

export type LineSlug = "dhokra" | "terracotta" | "tribal-art" | "sculpture";

export type Line = {
  slug: LineSlug;
  name: string;
  collectionName: string;
  status: "live" | "coming-soon";
  origin: string;
  summary: string;
  story: string[];
};

export const lines: Line[] = [
  {
    slug: "dhokra",
    name: "Dhokra",
    collectionName: "The Heritage Collection",
    status: "live",
    origin: "Artisan families of Bengal",
    summary:
      "Tribal metal art, cast by hand in brass, bronze and bell metal using the 4,000-year-old lost-wax method.",
    story: [
      "Dhokra is tribal metal art, cast by hand using the lost-wax method. Each piece is made of brass, bronze and bell metal, poured into a mould of river clay and beeswax.",
      "It is one of the world's oldest metal-casting methods — the Dancing Girl of Mohenjo-daro was made this way. The craft is named after the Dhokra Damar metalsmiths and is still practised in West Bengal, Odisha, Jharkhand and Chhattisgarh.",
      "Dhokra is known for its spirals, braids and dotted textures, all laid by hand in wax. Because the clay mould is broken to release every casting, each piece is one of a kind.",
    ],
  },
  {
    slug: "terracotta",
    name: "Terracotta",
    collectionName: "Coming soon",
    status: "coming-soon",
    origin: "Regional clay traditions",
    summary: "Hand-shaped, fire-baked clay from India's village potters — the next line from the house.",
    story: [],
  },
  {
    slug: "tribal-art",
    name: "Tribal Art",
    collectionName: "Coming soon",
    status: "coming-soon",
    origin: "Indigenous painting traditions",
    summary: "Painted stories of forest, festival and folklore, made by tribal artists.",
    story: [],
  },
  {
    slug: "sculpture",
    name: "Sculpture",
    collectionName: "Coming soon",
    status: "coming-soon",
    origin: "Stone, wood and metal",
    summary: "Carved and cast sculpture from India's living workshops.",
    story: [],
  },
];

export function getLine(slug: string) {
  return lines.find((l) => l.slug === slug);
}

/** The six stages of lost-wax casting, as printed in the catalogue. */
export const dhokraProcess = [
  { n: "01", title: "Clay Core", text: "A clay core is shaped by hand." },
  { n: "02", title: "Wax Detail", text: "Fine wax threads form every detail." },
  { n: "03", title: "Clay Mould", text: "The wax is sealed in layers of clay." },
  { n: "04", title: "Lost Wax", text: "Firing melts the wax away." },
  { n: "05", title: "Pouring", text: "Molten brass fills the hollow." },
  { n: "06", title: "Breaking Free", text: "The mould is broken; the piece is finished by hand." },
];

export const handmadeNotice =
  "Handmade. Your piece will closely match the one pictured, with small variations unique to it. The beauty of Dhokra lies in its imperfections.";

export const careSteps = [
  "Dust with a soft, dry cloth.",
  "Keep away from water and chemical cleaners.",
  "The natural patina is part of its beauty.",
];

/* ---------------------------------------------------------------- collections */

export type CollectionSlug =
  | "deities"
  | "statues-idols"
  | "animal-figures"
  | "lighting-diyas"
  | "wall-decor-tableware"
  | "jewellery"
  | "exclusive";

export type Collection = {
  slug: CollectionSlug;
  line: LineSlug;
  name: string;
  kicker: string;
  description: string;
  banner: string;
};

export const collections: Collection[] = [
  {
    slug: "deities",
    line: "dhokra",
    name: "Deities",
    kicker: "Gods and goddesses",
    description:
      "Durga, Lakshmi, Saraswati, Kali, Ganesha and Krishna, hand-cast in brass for the puja room and the sacred corners of a home.",
    banner: photo("deities-intro"),
  },
  {
    slug: "statues-idols",
    line: "dhokra",
    name: "Statues & Idols",
    kicker: "Tribal and folk figures, hand-cast in brass",
    description:
      "Wedding palanquins, river boats, bullock carts and village life — Bengal's folk memory, held in metal.",
    banner: photo("statues-intro"),
  },
  {
    slug: "animal-figures",
    line: "dhokra",
    name: "Animal Figures",
    kicker: "Animals of forest and village, hand-cast in brass",
    description: "Peacocks, owls, turtles and deer in open Dhokra wirework — each one patterned differently.",
    banner: photo("deer-intro"),
  },
  {
    slug: "lighting-diyas",
    line: "dhokra",
    name: "Lighting & Diyas",
    kicker: "Lamps and diyas hand-cast in brass, for puja",
    description: "Lamp bearers and candle stands that bring the warmth of a flame into ritual and everyday evenings.",
    banner: photo("lighting-intro"),
  },
  {
    slug: "wall-decor-tableware",
    line: "dhokra",
    name: "Wall Décor & Tableware",
    kicker: "Wall frames, bowls and home accents cast in brass",
    description:
      "Door handles, key hooks, cutlery, dashboard idols and desk pieces — Dhokra for the objects you touch every day.",
    banner: photo("wall-frame-dancers"),
  },
  {
    slug: "jewellery",
    line: "dhokra",
    name: "Jewellery",
    kicker: "Necklaces and pendants hand-cast in brass",
    description: "Necklaces, pendants, earrings, bangles and hair sticks, cast by the same lost-wax method as our sculpture.",
    banner: photo("jewellery-intro"),
  },
  {
    slug: "exclusive",
    line: "dhokra",
    name: "Exclusive Collection",
    kicker: "Statement pieces, cast by hand",
    description:
      "Heirlooms of divine grace, painstakingly handcrafted in limited numbers and available by pre-order.",
    banner: photo("exclusive-intro"),
  },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

/* ---------------------------------------------------------------- products */

export type Availability = "pre-order" | "made-to-order" | "on-enquiry";

export const availabilityLabel: Record<Availability, string> = {
  "pre-order": "Pre-order only",
  "made-to-order": "Made to order",
  "on-enquiry": "Availability on enquiry",
};

export type Product = {
  slug: string;
  name: string;
  code: string | null;
  line: LineSlug;
  collection: CollectionSlug;
  size: string | null;
  craft: string;
  material: string;
  description: string;
  images: string[];
  availability: Availability;
  /** Confirmed price in INR; null shows "Enquire for price". */
  price: number | null;
  /** Variations the catalogue confirms, e.g. "Single or as a pair". */
  options?: string;
  moreDesigns?: boolean;
  featured?: boolean;
};

const DHOKRA = { line: "dhokra" as const, craft: "Dhokra lost-wax casting", material: "Brass, bronze and bell metal", price: null };

export const products: Product[] = [
  // Deities
  { ...DHOKRA, slug: "durga-parivar", name: "Durga Parivar", code: "DKR-SI-007", collection: "deities", size: "25 × 22 cm", availability: "on-enquiry", images: [photo("durga-parivar")], featured: true,
    description: "Ten-armed Durga slays Mahishasura with Ganesha, Lakshmi, Saraswati and Kartik, beneath a temple canopy of sunburst finials. A grand Puja centrepiece." },
  { ...DHOKRA, slug: "durga-family-sacred-arch", name: "Durga Family in the Sacred Arch", code: "DKR-SI-011", collection: "deities", size: "22 × 22 cm", availability: "on-enquiry", moreDesigns: true, images: [photo("durga-sacred-arch")],
    description: "Ten-armed Durga and her lion vanquish Mahishasura under a scrolling arch, with her children on either side." },
  { ...DHOKRA, slug: "durga-vijaya", name: "Durga Vijaya – Victory of Shakti", code: "DKR-SI-016", collection: "deities", size: "22 × 14 cm", availability: "on-enquiry", moreDesigns: true, images: [photo("durga-vijaya")],
    description: "Ten-armed Durga stands tall on the horned head of the buffalo demon Mahisha, her trident driven down in victory. Set on a patterned square base, a Dhokra piece celebrating the triumph of good over evil." },
  { ...DHOKRA, slug: "durga-triumph-of-shakti", name: "Durga – Triumph of Shakti", code: "DKR-SI-003", collection: "deities", size: "22 × 14 cm", availability: "on-enquiry", moreDesigns: true, images: [photo("durga-triumph")],
    description: "A graceful depiction of Goddess Durga rising above the buffalo demon, symbolising the victory of good over evil and the divine strength that protects and guides us." },
  { ...DHOKRA, slug: "mahishasuramardini", name: "Mahishasuramardini – The Eternal Shakti", code: "DKR-SI-012", collection: "deities", size: "33 × 14 cm", availability: "on-enquiry", images: [photo("mahishasuramardini")],
    description: "A magnificent depiction of Goddess Durga's triumph over evil, this intricate masterpiece embodies the strength of a mother's love, the courage to overcome adversity and the eternal victory of good over evil. A powerful symbol of divine protection and devotion, crafted to be cherished for generations." },
  { ...DHOKRA, slug: "durga-shankh", name: "Durga Shankh", code: "DKR-DU-011", collection: "deities", size: "H 25 cm", availability: "on-enquiry", images: [photo("durga-shankh")],
    description: "Goddess Durga, astride her lion, is carved in relief across a brass conch. Sounded at the start of every puja, the shankh rests on the altar as a sign of auspicious beginnings." },
  { ...DHOKRA, slug: "lakshmi-saraswati", name: "Divine Duo – Shree Lakshmi & Saraswati", code: "DKR-SI-004 & DKR-SI-005", collection: "deities", size: "18 × 10 cm", availability: "on-enquiry", options: "Available single or as a pair", moreDesigns: true, images: [photo("lakshmi-saraswati")], featured: true,
    description: "An exquisite pair of goddesses seated on ornate conch shells, with Saraswati and her veena alongside Lakshmi and her owl. A celebration of wisdom, prosperity and divine grace, crafted to adorn your sacred space." },
  { ...DHOKRA, slug: "shree-padma-lakshmi", name: "Shree Padma Lakshmi", code: "DKR-SI-008", collection: "deities", size: "24 × 12 cm", availability: "on-enquiry", images: [photo("padma-lakshmi")],
    description: "Depicting Goddess Lakshmi seated on an ornate throne beneath a radiant floral crown, with her sacred owl at her feet. A graceful Dhokra creation symbolising wealth, prosperity and divine blessings for your home." },
  { ...DHOKRA, slug: "uluk-vahini-lakshmi", name: "Uluk Vahini Lakshmi", code: "DKR-SI-014", collection: "deities", size: null, availability: "on-enquiry", images: [photo("uluk-vahini-lakshmi")],
    description: "Goddess Lakshmi sits within the arched body of her sacred owl, its wings spread wide in fine Dhokra wirework. A graceful piece symbolising wealth, prosperity and divine blessings for the home." },
  { ...DHOKRA, slug: "shakti-swarupa-kali", name: "Shakti Swarupa Kali", code: "DKR-SI-013", collection: "deities", size: "30 × 20 cm", availability: "on-enquiry", images: [photo("shakti-kali")],
    description: "An evocative depiction of Goddess Kali standing upon Lord Shiva on a lotus pedestal. Adorned with a traditional crown and skull garland, this striking Dhokra creation celebrates divine feminine power, strength and protection." },
  { ...DHOKRA, slug: "standing-ganesha", name: "Standing Ganesha", code: "DKR-SI-001", collection: "deities", size: "17 × 10 cm", availability: "on-enquiry", moreDesigns: true, images: [photo("standing-ganesha")],
    description: "Depicting the divine presence of Lord Ganesha in intricate Dhokra craftsmanship, this four-armed form with a radiant halo and his faithful mouse embodies wisdom, prosperity and auspicious beginnings. A timeless blessing for every home and workspace." },
  { ...DHOKRA, slug: "ganesha-divine-symphony", name: "Ganesha – The Divine Symphony", code: "DKR-SI-015", collection: "deities", size: "10 × 6.5 cm", availability: "made-to-order", moreDesigns: true, images: [photo("musical-ganesha"), photo("ganesha-single")],
    description: "A delightful ensemble of musical Ganeshas, bringing together the joy of rhythm, melody and divine grace. Each figure plays its own instrument, and each handcrafted brass piece celebrates the playful, artistic spirit of Lord Ganesha." },
  { ...DHOKRA, slug: "takia-ganesh", name: "Takia Ganesh", code: "DKR-SI-009", collection: "deities", size: "11 × 6.5 cm", availability: "on-enquiry", images: [photo("takia-ganesh")],
    description: "Lord Ganesha reclines against a takia, the traditional bolster cushion, in a moment of calm and contentment. A handcrafted Dhokra piece that brings ease and blessing to any corner of the home." },
  { ...DHOKRA, slug: "murli-manohar", name: "Murli Manohar", code: "DKR-SI-017", collection: "deities", size: null, availability: "on-enquiry", images: [photo("murli-manohar")], featured: true,
    description: "Krishna plays his flute beside Radha beneath a spreading kadamba tree, while three cows graze at their feet. A Dhokra piece of devotion and village calm." },

  // Statues & idols
  { ...DHOKRA, slug: "palanquin-bearers", name: "The Palanquin Bearers", code: "DKR-DU-002", collection: "statues-idols", size: "12 × 31 cm", availability: "on-enquiry", images: [photo("palanquin"), photo("palanquin-living")], featured: true,
    description: "Bringing alive the nostalgic charm of a traditional Bengali wedding procession, this intricately crafted palki, carried by two bearers with a couple seated within, evokes the timeless rhythm of 'Palki chole, hun huna' — a melody of love, celebration and cherished traditions." },
  { ...DHOKRA, slug: "mayur-tarini", name: "Mayur Tarini – The Peacock Voyage", code: "DKR-DU-012", collection: "statues-idols", size: "8.5 × 29 cm", availability: "on-enquiry", moreDesigns: true, images: [photo("mayur-tarini")], featured: true,
    description: "Evoking the charm of Bengal's traditional river journeys, this majestic peacock-headed boat carries four oarsmen in graceful rhythm. A poetic celebration of folk traditions, folklore and the timeless spirit of Bengal." },
  { ...DHOKRA, slug: "gorur-gari", name: "Gorur Gari – The Bullock Cart", code: "DKR-DU-001", collection: "statues-idols", size: "8.5 × 29 cm", availability: "on-enquiry", images: [photo("gorur-gari")],
    description: "Two bullocks draw a hooded cart, the driver at the reins and a passenger seated beneath the canopy. A handcrafted Dhokra piece that recalls the slow, unhurried village roads of rural Bengal." },
  { ...DHOKRA, slug: "gramya", name: "Gramya – The Spirit of Village Life", code: "DKR-DU-003", collection: "statues-idols", size: "21 × 11 cm", availability: "on-enquiry", images: [photo("gramya")],
    description: "Capturing the grace of a village woman in her everyday journey, carrying a water pot with effortless poise. A heartwarming tribute to rural life, feminine strength and the simple beauty of everyday traditions." },
  { ...DHOKRA, slug: "tribal-tales", name: "Tribal Tales – Life Cast in Brass", code: "DKR-DU-009", collection: "statues-idols", size: null, availability: "on-enquiry", images: [photo("tribal-tales"), photo("tribal-tales-reader"), photo("tribal-tales-cot")],
    description: "Dancers, musicians and quiet moments of reading: a collection of Dhokra figures drawn from everyday tribal life. Each piece is handcrafted to carry the rhythm and spirit of tribal culture in metal." },

  // Animal figures
  { ...DHOKRA, slug: "mayur-dance-of-elegance", name: "Mayur – The Dance of Elegance", code: "DKR-AF-005", collection: "animal-figures", size: "10 × 15 cm", availability: "on-enquiry", images: [photo("mayur-peacock")],
    description: "A magnificent peacock with its feathers unfurled in all their glory, celebrating beauty, grace and auspiciousness. An elegant Dhokra creation that brings a touch of traditional charm to your sacred or living space." },
  { ...DHOKRA, slug: "pecha-owl-collection", name: "Pecha – The Owl Collection", code: null, collection: "animal-figures", size: "Small and Medium (H 2–3.5 cm)", availability: "on-enquiry", options: "Four designs, in small and medium", images: [photo("owl-profile"), photo("owl-pair"), photo("owl-wirework")],
    description: "Four Dhokra owl designs, from a bird turning in profile to a watchful pair and an owl worked in open wirework. In Bengal the owl carries Goddess Lakshmi, a sign of wealth and good fortune for the home." },
  { ...DHOKRA, slug: "kachhua-turtle-collection", name: "Kachhua – The Turtle Collection", code: null, collection: "animal-figures", size: "Small and Medium (H 2–3.5 cm)", availability: "on-enquiry", options: "Available in small and medium", images: [photo("turtles"), photo("turtle-single")],
    description: "Turtles in open Dhokra wirework, each shell patterned differently with spirals, lattice and coin motifs. A symbol of patience and long life, they sit well on a desk, shelf or puja corner." },
  { ...DHOKRA, slug: "antlered-elegance-deer-pair", name: "Antlered Elegance – The Deer Pair", code: null, collection: "animal-figures", size: "22 × 9 cm", availability: "on-enquiry", moreDesigns: true, images: [photo("deer-pair")], featured: true,
    description: "A charming pair of deer adorned with magnificent branching antlers and intricate Dhokra latticework. Symbolising grace, gentleness and harmony with nature, this handcrafted duo brings the serene beauty of the wild into your home." },

  // Lighting & diyas
  { ...DHOKRA, slug: "dashanan-ravan-candle-stand", name: "Dashanan – The Ravan Candle Stand", code: "DKR-DU-014", collection: "lighting-diyas", size: null, availability: "on-enquiry", images: [photo("ravan-candle-stand")],
    description: "Ravan stands with his ten crowned heads ringed around a single candle cup, arms fanned out on either side holding a sword and a chakra. His robe is worked in fine Dhokra wirework, rising from a lattice base." },
  { ...DHOKRA, slug: "panchdeep-lamp-bearer", name: "Panchdeep – The Lamp Bearer", code: "DKR-DU-013", collection: "lighting-diyas", size: "20 × 9 cm", availability: "on-enquiry", images: [photo("panchdeep")], featured: true,
    description: "An elegant celebration of light and tradition, this exquisite Dhokra creation features a graceful lamp bearer atop an elephant, illuminating the way with five diyas. A beautiful symbol of auspiciousness, abundance and timeless Indian craftsmanship." },

  // Wall décor, tableware & misc.
  { ...DHOKRA, slug: "bhoj-cutlery-set", name: "Bhoj – Dhokra Cutlery Set", code: "DKR-TG-001", collection: "wall-decor-tableware", size: null, material: "Steel with hand-cast brass handles (brass, bronze and bell metal)", availability: "on-enquiry", images: [photo("cutlery")],
    description: "Steel spoons and forks with hand-cast brass handles, each one patterned differently with chevrons, spirals and tiny chariot wheels. Everyday tableware that brings Dhokra craft to the dining table." },
  { ...DHOKRA, slug: "nandi-mayur-gaja-home-fittings", name: "Nandi, Mayur & Gaja – Home Fittings", code: "DKR-TG-002 & DKR-TG-003", collection: "wall-decor-tableware", size: null, availability: "on-enquiry", moreDesigns: true, images: [photo("door-handles"), photo("peacock-key-hook"), photo("elephant-towel-ring")],
    description: "Bull-head door handles with sweeping horns, a winged peacock key hook and an elephant towel ring. Hand-cast Dhokra fittings that bring folk craft to everyday doors and walls." },
  { ...DHOKRA, slug: "yatra-car-dashboard-idols", name: "Yatra – Car Dashboard Idols", code: "DKR-TG-004", collection: "wall-decor-tableware", size: null, availability: "on-enquiry", images: [photo("car-dashboard-idols")],
    description: "Small brass idols for the car dashboard: a dancing Ganesha, Ganesha seated on a lotus, and Kamdhenu the cow with her calf. Each sits on a weighted base to bless every journey." },
  { ...DHOKRA, slug: "shankh-ash-tray-ganesha-pen-stand", name: "Shankh Ash Tray & Ganesha Pen Stand", code: "DKR-DU-015 & DKR-DU-016", collection: "wall-decor-tableware", size: null, availability: "on-enquiry", moreDesigns: true, images: [photo("ashtray-penstand")],
    description: "A round ash tray flanked by two conch shells, with ridged rests above and below, and a pen stand where Ganesha holds open a wirework cup. Dhokra pieces for the study, office or coffee table." },

  // Jewellery
  { ...DHOKRA, slug: "chakra-necklaces-and-sets", name: "Chakra – Necklaces & Sets", code: "DKR-JW-005", collection: "jewellery", size: null, availability: "on-enquiry", moreDesigns: true, images: [photo("chakra-necklace"), photo("jewellery-intro")], featured: true,
    description: "Brass medallions in coiled Dhokra wire on beaded strings with coral-red or black accents, and a jute-and-cotton necklace with a carved brass crescent, paired with matching earrings." },
  { ...DHOKRA, slug: "gohona-pendants-earrings-bangles", name: "Gohona – Pendants, Earrings & Bangles", code: "DKR-JW-001 / DKR-JW-002 / DKR-JW-003", collection: "jewellery", size: null, availability: "on-enquiry", moreDesigns: true, images: [photo("gohona-pendants"), photo("gohona-earrings"), photo("gohona-bangles")],
    description: "A square Durga pendant, an owl pendant and cord pendants in flower and eye designs, with nine pairs of hand-cast earrings and open bangles in Dhokra wirework with fan and lattice patterns." },
  { ...DHOKRA, slug: "khopa-kanta-hair-sticks", name: "Khopa Kanta – Dhokra Hair Sticks", code: "DKR-JW-006", collection: "jewellery", size: null, availability: "on-enquiry", moreDesigns: true, images: [photo("hair-sticks")],
    description: "Brass hair sticks with hand-cast heads: one a flat disc of coiled spiral wire, the other a tribal face crowned with a tall headdress. A finishing touch for a bun or braid." },

  // Exclusive collection — pre-order only
  { ...DHOKRA, slug: "surya-chala-durga", name: "Surya Chala Durga", code: "DKR-EP-001", collection: "exclusive", size: "40 × 38 cm", availability: "pre-order", images: [photo("surya-chala-durga")], featured: true,
    description: "Ten-armed Durga slays Mahishasura with Ganesha, Lakshmi, Saraswati and Kartik on lotus pedestals, framed by a single sunburst arch. A grand Puja centrepiece." },
  { ...DHOKRA, slug: "durga-darbar", name: "Durga Darbar – The Divine Grandeur", code: "DKR-EP-002", collection: "exclusive", size: "33 × 33 cm", availability: "pre-order", images: [photo("durga-darbar")],
    description: "An exquisite Dhokra masterpiece featuring Goddess Durga with her divine family, triumphing over Mahishasura. Adorned with towering sunburst crowns and intricate wirework, this regal creation celebrates divine power, protection and the grandeur of Bengal's festive heritage." },
  { ...DHOKRA, slug: "aagomoni", name: "Aagomoni – The Eternal Matriarch", code: "DKR-EP-003", collection: "exclusive", size: "50 × 43 cm", availability: "pre-order", images: [photo("aagomoni")], featured: true,
    description: "Crafted through the ancient lost-wax technique, this rare Dhokra masterpiece brings Maa Durga and her divine family beneath an intricately hand-spun temple dome. Every delicate strand is shaped by master tribal artisans, making each creation a one-of-a-kind heirloom to treasure for generations." },
  { ...DHOKRA, slug: "shingra-utsav", name: "Shingra Utsav – Song of the Horn", code: "DKR-EP-004", collection: "exclusive", size: null, availability: "pre-order", images: [photo("shingha-utsav")],
    description: "Two drummers and three dancers, arms linked, stand atop a carved ceremonial horn. A Dhokra piece full of the music and joy of a tribal festival." },
];

export const exclusiveFinishNote =
  "Some of our exclusive pieces are unpolished to retain the originality of the product. The polish can be customised based on requirements.";

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCollectionProducts(slug: CollectionSlug) {
  return products.filter((p) => p.collection === slug);
}

export function formatPrice(p: Pick<Product, "price">) {
  return p.price == null ? "Enquire for price" : `₹${p.price.toLocaleString("en-IN")}`;
}

export function searchProducts(list: Product[], q: string) {
  const term = q.trim().toLowerCase();
  if (!term) return list;
  return list.filter((p) =>
    [p.name, p.code ?? "", p.description, getCollection(p.collection)?.name ?? ""]
      .join(" ")
      .toLowerCase()
      .includes(term),
  );
}

/* ---------------------------------------------------------------- rooms (Living with Art) */

export type Room = {
  slug: string;
  name: string;
  kicker: string;
  intro: string;
  tips: string[];
  image: string;
  pieces: string[];
};

/** Room photos are imported by the page; `image` here names which one. */
export const rooms: Omit<Room, "image">[] & { imageKey: string }[] = [] as never;

/* ---------------------------------------------------------------- journal */

export type JournalCategory = "Craft Stories" | "Artisan Stories" | "Heritage & Culture" | "Living with Art" | "Brand News";

export const journalCategories: JournalCategory[] = [
  "Craft Stories",
  "Artisan Stories",
  "Heritage & Culture",
  "Living with Art",
  "Brand News",
];

export type Post = {
  slug: string;
  title: string;
  dek: string;
  category: JournalCategory;
  img: string;
  readTime: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "the-lost-wax-legacy-of-dhokra",
    title: "The lost-wax legacy of Dhokra",
    dek: "Four thousand years of metal art, from the Indus Valley to the artisan villages of Bengal.",
    category: "Craft Stories",
    img: photo("artisans-at-work"),
    readTime: "4 min read",
    body: [
      "Dhokra is one of the world's oldest metal-casting methods. The Dancing Girl of Mohenjo-daro, cast more than four thousand years ago in the Indus Valley, was made the same way our artisans work today.",
      "The craft takes its name from the Dhokra Damar metalsmiths, and it is still practised in West Bengal, Odisha, Jharkhand and Chhattisgarh. Each piece is made of brass, bronze and bell metal, poured into a mould of river clay and beeswax.",
      "It begins with a clay core, shaped by hand. Fine threads of wax are laid over it to form every spiral, braid and dotted texture. The wax is sealed in layers of clay and fired, so the wax melts away and leaves a hollow. Molten brass fills that hollow — and then the mould is broken to set the piece free, before it is finished by hand.",
      "Because the mould is broken every time, no two pieces are ever the same. What you bring home exists only once.",
    ],
  },
  {
    slug: "durga-in-brass",
    title: "Durga in brass: reading the divine family",
    dek: "Ten arms, a lion, a buffalo demon and four children — the iconography behind our Durga pieces.",
    category: "Heritage & Culture",
    img: photo("durga-parivar"),
    readTime: "3 min read",
    body: [
      "In Bengal, Durga rarely arrives alone. In the Durga Parivar she is shown ten-armed, slaying Mahishasura, with Ganesha, Lakshmi, Saraswati and Kartik around her beneath a temple canopy of sunburst finials.",
      "Other pieces in the collection focus on a single moment: Durga Vijaya stands on the horned head of the buffalo demon, her trident driven down in victory; Mahishasuramardini holds the full drama of the battle in one intricate casting.",
      "The Durga Shankh carries her into ritual itself — the conch, carved in relief with Durga astride her lion, is sounded at the start of every puja and rests on the altar as a sign of auspicious beginnings.",
      "Together they speak of the triumph of good over evil, and of a mother's protection — themes that make these pieces natural heirlooms.",
    ],
  },
  {
    slug: "creating-a-sacred-corner",
    title: "Creating a sacred corner at home",
    dek: "How to give a few hand-cast pieces the space and light they deserve.",
    category: "Living with Art",
    img: photo("deities-intro"),
    readTime: "3 min read",
    body: [
      "A sacred corner does not need a whole room. A low console, a wall niche or a quiet shelf is enough, as long as it is kept clear of everyday clutter.",
      "Start with one central figure — a Ganesha for beginnings, Lakshmi for prosperity, or a Durga piece as a centrepiece — and let it sit slightly raised, on a wooden stand or a folded handloom cloth.",
      "Add light. A lamp bearer such as the Panchdeep, with its five diyas, brings warmth and draws the eye. Fresh flowers and a brass shankh complete the arrangement.",
      "Care is simple: dust with a soft, dry cloth, keep the pieces away from water and chemical cleaners, and let the natural patina deepen over time. It is part of their beauty.",
    ],
  },
  {
    slug: "why-no-two-pieces-are-the-same",
    title: "Why no two pieces are the same",
    dek: "On imperfection, patina and the quiet luxury of a one-of-a-kind object.",
    category: "Craft Stories",
    img: photo("owl-wirework"),
    readTime: "2 min read",
    body: [
      "Every Dhokra piece is cast in a mould that must be broken to release it. There is no second casting from the same mould — which is why each piece is one of a kind.",
      "Your piece will closely match the one pictured, with small variations unique to it: a spiral drawn a little tighter, a texture laid a little deeper. The beauty of Dhokra lies in these imperfections.",
      "Some of our Exclusive Collection pieces are left unpolished to retain the originality of the casting. Polish can be customised on request.",
    ],
  },
  {
    slug: "introducing-the-rootss",
    title: "Introducing the rootSS",
    dek: "A house for India's living craft traditions, beginning with Dhokra.",
    category: "Brand News",
    img: photo("cover-durga-family"),
    readTime: "2 min read",
    body: [
      "the rootSS brings authentic Indian craftsmanship into contemporary homes and lifestyles. Our first line, The Heritage Collection, is authentic Dhokra metal craft sourced from the artisans of Bengal.",
      "Dhokra is a slow, skilled craft — one piece can take days or weeks to make. Many master artisans struggle to find buyers, and young people are leaving the craft. We bring their work to new homes, helping artisans earn a dignified living and giving the next generation a reason to carry the art forward.",
      "More craft traditions — terracotta, tribal art and sculpture — will follow. Every purchase supports an artisan family.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
