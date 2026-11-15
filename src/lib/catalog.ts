import heroDokra from "@/assets/hero-dokra.jpg";
import terracotta from "@/assets/craft-terracotta.jpg";
import jewellery from "@/assets/craft-jewellery.jpg";
import tribalArt from "@/assets/craft-tribal-art.jpg";
import sculpture from "@/assets/craft-sculpture.jpg";
import artisanHands from "@/assets/artisan-hands.jpg";
import interior from "@/assets/interior-styled.jpg";
import elephant from "@/assets/product-dokra-elephant.jpg";
import warli from "@/assets/product-warli.jpg";
import lamp from "@/assets/product-terracotta-lamp.jpg";
import cuff from "@/assets/product-brass-cuff.jpg";

export type CraftSlug = "dokra" | "terracotta" | "tribal-art" | "sculpture" | "jewellery";

export const crafts: {
  slug: CraftSlug;
  name: string;
  origin: string;
  blurb: string;
  img: string;
}[] = [
  {
    slug: "dokra",
    name: "Dokra Metal Art",
    origin: "Bastar · Chhattisgarh",
    blurb: "Brass figures cast by the 4,000-year-old lost-wax method — no two ever alike.",
    img: heroDokra,
  },
  {
    slug: "terracotta",
    name: "Terracotta",
    origin: "Bankura · West Bengal",
    blurb: "River clay, shaped by hand and fired in open kilns. Earthy, honest, alive.",
    img: terracotta,
  },
  {
    slug: "tribal-art",
    name: "Tribal Art",
    origin: "Gond · Warli",
    blurb: "Paintings that record forests, festivals and folklore in natural pigment.",
    img: tribalArt,
  },
  {
    slug: "sculpture",
    name: "Sculpture & Artefacts",
    origin: "Across India",
    blurb: "Carved stone and wood — indigenous artefacts that anchor a room.",
    img: sculpture,
  },
  {
    slug: "jewellery",
    name: "Handcrafted Jewellery",
    origin: "Oxidised · Brass · Beaded",
    blurb: "Statement junk jewellery with tribal roots and contemporary edge.",
    img: jewellery,
  },
];

export type Product = {
  slug: string;
  name: string;
  craft: CraftSlug;
  region: string;
  price: number;
  img: string;
  material: string;
  size: string;
  story: string;
};

export const products: Product[] = [
  {
    slug: "dokra-rider-and-horse",
    name: "The Rider & His Horse",
    craft: "dokra",
    region: "Kondagaon, Bastar",
    price: 12800,
    img: heroDokra,
    material: "Recycled brass, lost-wax cast",
    size: "H 32 cm · W 30 cm",
    story:
      "A Bastar village guardian leading his horse home — a motif Dokra artisans have cast for centuries as a symbol of protection and journey.",
  },
  {
    slug: "dokra-elephant",
    name: "Gaja, the Dokra Elephant",
    craft: "dokra",
    region: "Kondagaon, Bastar",
    price: 6400,
    img: elephant,
    material: "Brass, wax-thread detailing",
    size: "H 18 cm · W 24 cm",
    story:
      "Every coiled line on Gaja is a single thread of beeswax, laid by hand before the casting — the elephant's lattice saddle alone takes two days.",
  },
  {
    slug: "bankura-terracotta-set",
    name: "Bankura Vessel Collection",
    craft: "terracotta",
    region: "Panchmura, West Bengal",
    price: 4200,
    img: terracotta,
    material: "Hand-thrown river clay",
    size: "Set of 4 · H 14–30 cm",
    story:
      "Made in Panchmura, home of the iconic Bankura horse. The incised bands are drawn freehand with a bamboo stylus while the clay is still soft.",
  },
  {
    slug: "terracotta-jaali-lantern",
    name: "Jaali Terracotta Lantern",
    craft: "terracotta",
    region: "Molela, Rajasthan",
    price: 3600,
    img: lamp,
    material: "Terracotta, hand-pierced",
    size: "H 28 cm · Ø 20 cm",
    story:
      "Each petal is pierced by hand, so the light it throws is never quite the same twice — a quiet ritual for evenings.",
  },
  {
    slug: "gond-tree-of-life",
    name: "Gond Tree of Life",
    craft: "tribal-art",
    region: "Patangarh, Madhya Pradesh",
    price: 14500,
    img: tribalArt,
    material: "Natural pigments on handmade paper, framed",
    size: "90 × 60 cm",
    story:
      "In Gond belief, trees hold the spirits of the forest. Thousands of dots and dashes build the canopy — a meditation in pattern.",
  },
  {
    slug: "warli-tarpa-dance",
    name: "Warli Tarpa Dance",
    craft: "tribal-art",
    region: "Dahanu, Maharashtra",
    price: 7900,
    img: warli,
    material: "Rice paste on cow-dung mud base, framed",
    size: "60 × 60 cm",
    story:
      "The Tarpa dance circle celebrates harvest and the cycle of life, painted in rice-paste white as Warli women have done for generations.",
  },
  {
    slug: "carved-stone-panel",
    name: "Carved Stone Devata Panel",
    craft: "sculpture",
    region: "Puri, Odisha",
    price: 16000,
    img: sculpture,
    material: "Hand-carved sandstone",
    size: "H 40 cm · W 24 cm",
    story:
      "Carved by a family of temple sculptors in Puri, using chisels passed from father to son — a piece of living temple tradition.",
  },
  {
    slug: "oxidised-tribal-necklace",
    name: "Banjara Bead Necklace Set",
    craft: "jewellery",
    region: "Handcrafted, Rajasthan",
    price: 3200,
    img: jewellery,
    material: "Oxidised alloy, glass beads",
    size: "Necklace + earrings",
    story:
      "Inspired by Banjara adornment — bold, joyous and built to be worn with handloom or denim alike.",
  },
  {
    slug: "dokra-brass-cuff",
    name: "Dokra Brass Cuff & Earrings",
    craft: "jewellery",
    region: "Bankura, West Bengal",
    price: 2400,
    img: cuff,
    material: "Lost-wax cast brass",
    size: "Adjustable cuff + drop earrings",
    story:
      "The same ancient casting as our sculptures, scaled down to the wrist — tiny wax-thread spirals in warm brass.",
  },
];

export function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCraft(slug: CraftSlug) {
  return crafts.find((c) => c.slug === slug)!;
}

export type Post = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  img: string;
  readTime: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "the-lost-wax-legacy-of-dokra",
    title: "The lost-wax legacy of Dokra",
    dek: "How a 4,000-year-old casting technique survives in the villages of Bastar.",
    category: "Craft",
    img: artisanHands,
    readTime: "5 min read",
    body: [
      "Dokra is among the oldest known metal-casting traditions in the world. The famous Dancing Girl of Mohenjo-daro was made using the same lost-wax method that artisans in Bastar, Bengal and Odisha still practise today.",
      "Each piece begins as a clay core. Over it, the artisan lays fine threads of beeswax and resin — every line, spiral and pattern you see is drawn in wax first. The model is coated in clay again, then heated so the wax melts away, leaving a mould into which molten brass is poured.",
      "Because the mould is broken to release the piece, no two Dokra objects can ever be identical. That is the quiet luxury of the craft: what you own exists only once.",
      "At Rootss, we work directly with artisan families so that more of the value of each piece returns to the hands that made it.",
    ],
  },
  {
    slug: "styling-heritage-in-a-modern-home",
    title: "Styling heritage in a modern home",
    dek: "Five ways to let handmade pieces bring character to contemporary spaces.",
    category: "Spaces",
    img: interior,
    readTime: "4 min read",
    body: [
      "Start with one anchor. A single Dokra figure or a large Gond canvas can set the tone of an entire room — let it breathe on a clean wall or a quiet console.",
      "Pair textures, not just colours. Raw terracotta beside linen, brass against lime plaster, carved wood on jute: craft looks richest when its surfaces are allowed to speak.",
      "Group in odd numbers. Three terracotta vessels of varying heights feel collected, not arranged.",
      "Light matters. Warm, low light — or a pierced terracotta lantern — brings out the hand-worked detail that overhead light flattens.",
      "Finally, buy what moves you. A home filled with stories you love will always feel more like you than one styled from a catalogue.",
    ],
  },
  {
    slug: "reading-a-gond-painting",
    title: "How to read a Gond painting",
    dek: "Dots, dashes and spirits of the forest — a short guide to the symbols.",
    category: "Art",
    img: tribalArt,
    readTime: "3 min read",
    body: [
      "Gond art comes from one of India's largest tribal communities, in the forests of central India. Traditionally painted on village walls during festivals, it moved onto paper and canvas in the late twentieth century.",
      "Look closely and you'll see that shapes are filled with patterns — dots, dashes, fish-scales and fine lines. Each artist develops a signature pattern, almost like handwriting.",
      "Trees, birds, deer and the mahua flower recur often. Trees in particular are sacred, believed to shelter spirits and ancestors.",
      "When you hang a Gond painting, you are hanging a piece of an oral tradition — a story told in pigment rather than words.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
