// All shared types live here alongside the data that uses them.
// Types are introduced at the point of first use — not upfront.

export type YarnColor = "moss" | "teal" | "rose" | "indigo" | "turmeric";
export type BadgeTone =
  | "new"
  | "sale"
  | "best"
  | "eco"
  | "limited"
  | "verified";

export interface ProductStatus {
  tone: BadgeTone;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  maker: string;
  price: number;
  category: string;
  material: string;
  swatches: YarnColor[];
  wash: string; // gradient fallback if image fails
  image: string; // real Unsplash photo URL
  status: ProductStatus | null;
  blurb: string;
}

export interface Category {
  key: string;
  label: string;
}

export interface Maker {
  id: string;
  name: string;
  location: string;
  initials: string;
  tone: string;
  joined: string;
  stats: string;
  quote: string;
}

export interface MakerSpotlight {
  name: string;
  location: string;
  initials: string;
  tone: string;
  portrait: string;
  bio: string;
  quote: string;
  stats: [string, string][];
}

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  rating: number;
  initials: string;
  tone: string;
}

export interface FAQ {
  q: string;
  a: string;
}

// ─── Products ─────────────────────────────────────────────────────────────

export const products: Product[] = [
  {
    id: "p1",
    name: "Market tote",
    maker: "Sita Shrestha",
    price: 2800,
    category: "Bags",
    material: "Organic cotton",
    status: { tone: "new", label: "New" },
    swatches: ["moss", "turmeric"],
    wash: "linear-gradient(155deg, #DCE0B6, #B9C089)",
    image:
      "https://images.unsplash.com/photo-1668072587859-f0f30c8fa938?auto=format&fit=crop&w=500&h=625&q=80",
    blurb:
      "Chunky organic cotton, made to order. Each one is slightly different — that's the point.",
  },
  {
    id: "p2",
    name: "Bouclé sun hat",
    maker: "Kamala Tamang",
    price: 1950,
    category: "Accessories",
    material: "Wool blend",
    status: null,
    swatches: ["turmeric", "rose"],
    wash: "linear-gradient(155deg, #F0D49A, #E2B466)",
    image:
      "https://images.unsplash.com/photo-1648005539099-709d5be525fb?auto=format&fit=crop&w=500&h=625&q=80",
    blurb:
      "A soft bouclé brim for slow summer mornings. Crocheted in a single afternoon, blocked overnight.",
  },
  {
    id: "p3",
    name: "Mini bucket bag",
    maker: "Anita Gurung",
    price: 2200,
    category: "Bags",
    material: "Cotton",
    status: { tone: "sale", label: "Sale" },
    swatches: ["indigo"],
    wash: "linear-gradient(155deg, #B4BCD6, #8B96BE)",
    image:
      "https://images.unsplash.com/photo-1627667539472-75fbc7f4654d?auto=format&fit=crop&w=500&h=625&q=80",
    blurb:
      "A little structured bucket bag with a drawstring top. Holds more than it looks.",
  },
  {
    id: "p4",
    name: "Granny throw",
    maker: "Sita Shrestha",
    price: 5400,
    category: "Home",
    material: "Hand-dyed wool",
    status: { tone: "best", label: "Best seller" },
    swatches: ["rose", "moss", "turmeric"],
    wash: "linear-gradient(155deg, #E6BCC6, #CE93A6)",
    image:
      "https://images.unsplash.com/photo-1632649027900-389e810204e6?auto=format&fit=crop&w=500&h=625&q=80",
    blurb:
      "An heirloom granny-square throw in five hand-dyed yarns. Six weeks of evenings in one blanket.",
  },
  {
    id: "p5",
    name: "Coaster set of 4",
    maker: "Maya Lama",
    price: 900,
    category: "Home",
    material: "Herb-dyed cotton",
    status: { tone: "eco", label: "Eco cotton" },
    swatches: ["teal", "moss"],
    wash: "linear-gradient(155deg, #A9CFC9, #79B0A8)",
    image:
      "https://images.unsplash.com/photo-1700171518313-5dd219beaaa6?auto=format&fit=crop&w=500&h=625&q=80",
    blurb:
      "Four sturdy coasters in undyed and herb-dyed cotton. The everyday kind of handmade.",
  },
  {
    id: "p6",
    name: "Baby booties",
    maker: "Kamala Tamang",
    price: 1200,
    category: "Kids",
    material: "Merino",
    status: null,
    swatches: ["rose"],
    wash: "linear-gradient(155deg, #EFC9D0, #DCA1B0)",
    image:
      "https://images.unsplash.com/photo-1602773974733-b56200c8653f?auto=format&fit=crop&w=500&h=625&q=80",
    blurb:
      "Tiny merino booties with a ribbon tie. A first-thing-they-wear kind of gift.",
  },
  {
    id: "p7",
    name: "Plant hanger",
    maker: "Anita Gurung",
    price: 1600,
    category: "Home",
    material: "Jute",
    status: null,
    swatches: ["moss"],
    wash: "linear-gradient(155deg, #D7DBAF, #AFB87E)",
    image:
      "https://images.unsplash.com/photo-1519412849983-957822373d02?auto=format&fit=crop&w=500&h=625&q=80",
    blurb:
      "A macramé-meets-crochet hanger for your favourite pothos. Holds up to a 6-inch pot.",
  },
  {
    id: "p8",
    name: "Striped beanie",
    maker: "Maya Lama",
    price: 1450,
    category: "Accessories",
    material: "Two-tone wool",
    status: { tone: "limited", label: "Limited" },
    swatches: ["indigo", "turmeric"],
    wash: "linear-gradient(155deg, #B7BFD8, #8E99C0)",
    image:
      "https://images.unsplash.com/photo-1470049384172-927891aad5e9?auto=format&fit=crop&w=500&h=625&q=80",
    blurb:
      "A snug ribbed beanie in two-tone hand-dyed wool. Small batch — twelve made this season.",
  },
  {
    id: "p9",
    name: "Lace doily pair",
    maker: "Sita Shrestha",
    price: 1100,
    category: "Home",
    material: "Fine cotton",
    status: null,
    swatches: ["turmeric", "teal"],
    wash: "linear-gradient(155deg, #EED6A0, #DCBD78)",
    image:
      "https://images.unsplash.com/photo-1589912187345-e6f884f958af?auto=format&fit=crop&w=500&h=625&q=80",
    blurb:
      "Two fine-thread doilies for the table you set when someone special visits.",
  },
];

export const categories: Category[] = [
  { key: "all", label: "All pieces" },
  { key: "Bags", label: "Bags" },
  { key: "Accessories", label: "Accessories" },
  { key: "Home", label: "Home" },
  { key: "Kids", label: "Kids" },
];

export const makers: Maker[] = [
  {
    id: "m1",
    name: "Sita Shrestha",
    location: "Bhaktapur, Bagmati",
    initials: "SS",
    tone: "rust",
    joined: "2023",
    stats: "47 pieces sold · 4.9 ★",
    quote:
      "Crochets at dawn before the kids wake up. Every loop is a meditation.",
  },
  {
    id: "m2",
    name: "Kamala Tamang",
    location: "Lalitpur, Bagmati",
    initials: "KT",
    tone: "teal",
    joined: "2022",
    stats: "31 pieces sold · 5.0 ★",
    quote: "Learned from her grandmother; now teaches six women in her ward.",
  },
  {
    id: "m3",
    name: "Anita Gurung",
    location: "Pokhara, Gandaki",
    initials: "AG",
    tone: "rose",
    joined: "2024",
    stats: "19 pieces sold · 4.8 ★",
    quote: "Dyes her own yarn with marigold and walnut husk from the garden.",
  },
];

// Three maker stories for the MakerSpotlight carousel
export const stories: MakerSpotlight[] = [
  {
    name: "Sita Shrestha",
    location: "Bhaktapur, Bagmati",
    initials: "SS",
    tone: "rust",
    portrait: "/makers_image/maker_yuncho.jpeg",
    bio: "Every time I watched a pair of hands dance with yarn, something deep within me whispered, this is where you belong. With no teacher but curiosity, I taught myself one stitch, one mistake, one quiet victory at a time. Years of practice slowly turned scattered threads into stories, and a simple hobby into a lifelong calling. Today, every piece I create is woven with patience, love, and a little piece of my soul.",
    quote:
      "Crochets in between everyday hassle and way to through the teenage dreams",
    stats: [
      ["47", "pieces sold"],
      ["4.9 ★", "maker rating"],
      ["8", "repeat buyers"],
    ],
  },
  {
    name: "Kamala Tamang",
    location: "Lalitpur, Bagmati",
    initials: "KT",
    tone: "teal",
    portrait:
      "https://images.unsplash.com/photo-1695883447569-80abcd3030c0?auto=format&fit=crop&w=600&h=750&q=80",
    bio: "Learned to crochet from her grandmother at age eleven. Today she teaches six women in her ward — turning an inherited skill into a livelihood for her whole neighbourhood.",
    quote: "My grandmother's hands taught mine. Now mine teach others.",
    stats: [
      ["31", "pieces sold"],
      ["5.0 ★", "maker rating"],
      ["3", "apprentices"],
    ],
  },
  {
    name: "Anita Gurung",
    location: "Pokhara, Gandaki",
    initials: "AG",
    tone: "rose",
    portrait:
      "https://images.unsplash.com/photo-1702534246793-42a5365369bc?auto=format&fit=crop&w=600&h=750&q=80",
    bio: "Dyes her own yarn with marigold and walnut husk from the garden. Every colour she uses is grown, not bought — and the pieces show it in ways synthetic dye never can.",
    quote: "The garden is my palette. I just have to learn to listen to it.",
    stats: [
      ["19", "pieces sold"],
      ["4.8 ★", "maker rating"],
      ["12", "dye plants grown"],
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "The tote is even lovelier in person. Knowing Sita made it makes it special.",
    name: "Priya M.",
    location: "Kathmandu",
    rating: 5,
    initials: "PM",
    tone: "rose",
  },
  {
    quote:
      "Shipped fast and the maker messaged me a little note. You feel the care in every stitch.",
    name: "Daniel R.",
    location: "Berlin",
    rating: 5,
    initials: "DR",
    tone: "teal",
  },
  {
    quote:
      "I bought the throw for my mother. Six weeks of someone's evenings, now on her couch.",
    name: "Aarav S.",
    location: "Pokhara",
    rating: 5,
    initials: "AS",
    tone: "indigo",
  },
];

export const faqs: FAQ[] = [
  {
    q: "How long does each piece take to make?",
    a: "Every item is handmade to order — typically 3 to 7 days. The maker will message you once it's shipped.",
  },
  {
    q: "Can I request a custom colour?",
    a: "Yes — most makers on FlowCart welcome custom orders. Message them directly from the product page, and they'll dye to match.",
  },
  {
    q: "How do makers receive payment?",
    a: "Makers are paid directly after each order is delivered and confirmed. FlowCart never sits between a maker and her earnings — not a factory, not a middleman.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. Orders above NPR 2,000 ship free within Nepal; international rates are calculated at checkout.",
  },
  {
    q: "What if my piece isn't quite right?",
    a: "Message the maker within 14 days and she'll make it right — a repair, a remake, or a refund. Handmade should still feel safe to buy.",
  },
];

// Format NPR price — used everywhere a price renders
export function formatNPR(n: number): string {
  return "NPR " + n.toLocaleString("en-IN");
}
