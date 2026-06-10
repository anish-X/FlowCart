// All shared types live here alongside the data that uses them.
// Types are introduced at the point of first use — not upfront.

export type YarnColor = "moss" | "teal" | "rose" | "indigo" | "turmeric";
export type BadgeTone = "new" | "sale" | "best" | "eco" | "limited" | "verified";

export interface ProductStatus {
  tone: BadgeTone;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  maker: string;
  price: number;           // raw NPR value — format at render time
  category: string;
  material: string;
  swatches: YarnColor[];   // yarn colours this product comes in
  wash: string;            // CSS gradient — placeholder for product photography
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
    id: "p1", name: "Market tote", maker: "Sita Shrestha", price: 2800,
    category: "Bags", material: "Organic cotton",
    status: { tone: "new", label: "New" }, swatches: ["moss", "turmeric"],
    wash: "linear-gradient(155deg, #DCE0B6, #B9C089)",
    blurb: "Chunky organic cotton, made to order. Each one is slightly different — that's the point.",
  },
  {
    id: "p2", name: "Bouclé sun hat", maker: "Kamala Tamang", price: 1950,
    category: "Accessories", material: "Wool blend",
    status: null, swatches: ["turmeric", "rose"],
    wash: "linear-gradient(155deg, #F0D49A, #E2B466)",
    blurb: "A soft bouclé brim for slow summer mornings. Crocheted in a single afternoon, blocked overnight.",
  },
  {
    id: "p3", name: "Mini bucket bag", maker: "Anita Gurung", price: 2200,
    category: "Bags", material: "Cotton",
    status: { tone: "sale", label: "Sale" }, swatches: ["indigo"],
    wash: "linear-gradient(155deg, #B4BCD6, #8B96BE)",
    blurb: "A little structured bucket bag with a drawstring top. Holds more than it looks.",
  },
  {
    id: "p4", name: "Granny throw", maker: "Sita Shrestha", price: 5400,
    category: "Home", material: "Hand-dyed wool",
    status: { tone: "best", label: "Best seller" }, swatches: ["rose", "moss", "turmeric"],
    wash: "linear-gradient(155deg, #E6BCC6, #CE93A6)",
    blurb: "An heirloom granny-square throw in five hand-dyed yarns. Six weeks of evenings in one blanket.",
  },
  {
    id: "p5", name: "Coaster set of 4", maker: "Maya Lama", price: 900,
    category: "Home", material: "Herb-dyed cotton",
    status: { tone: "eco", label: "Eco cotton" }, swatches: ["teal", "moss"],
    wash: "linear-gradient(155deg, #A9CFC9, #79B0A8)",
    blurb: "Four sturdy coasters in undyed and herb-dyed cotton. The everyday kind of handmade.",
  },
  {
    id: "p6", name: "Baby booties", maker: "Kamala Tamang", price: 1200,
    category: "Kids", material: "Merino",
    status: null, swatches: ["rose"],
    wash: "linear-gradient(155deg, #EFC9D0, #DCA1B0)",
    blurb: "Tiny merino booties with a ribbon tie. A first-thing-they-wear kind of gift.",
  },
  {
    id: "p7", name: "Plant hanger", maker: "Anita Gurung", price: 1600,
    category: "Home", material: "Jute",
    status: null, swatches: ["moss"],
    wash: "linear-gradient(155deg, #D7DBAF, #AFB87E)",
    blurb: "A macramé-meets-crochet hanger for your favourite pothos. Holds up to a 6-inch pot.",
  },
  {
    id: "p8", name: "Striped beanie", maker: "Maya Lama", price: 1450,
    category: "Accessories", material: "Two-tone wool",
    status: { tone: "limited", label: "Limited" }, swatches: ["indigo", "turmeric"],
    wash: "linear-gradient(155deg, #B7BFD8, #8E99C0)",
    blurb: "A snug ribbed beanie in two-tone hand-dyed wool. Small batch — twelve made this season.",
  },
  {
    id: "p9", name: "Lace doily pair", maker: "Sita Shrestha", price: 1100,
    category: "Home", material: "Fine cotton",
    status: null, swatches: ["turmeric", "teal"],
    wash: "linear-gradient(155deg, #EED6A0, #DCBD78)",
    blurb: "Two fine-thread doilies for the table you set when someone special visits.",
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
  { id: "m1", name: "Sita Shrestha", location: "Bhaktapur, Bagmati", initials: "SS", tone: "rust",
    joined: "2023", stats: "47 pieces sold · 4.9 ★",
    quote: "Crochets at dawn before the kids wake up. Every loop is a meditation." },
  { id: "m2", name: "Kamala Tamang", location: "Lalitpur, Bagmati", initials: "KT", tone: "teal",
    joined: "2022", stats: "31 pieces sold · 5.0 ★",
    quote: "Learned from her grandmother; now teaches six women in her ward." },
  { id: "m3", name: "Anita Gurung", location: "Pokhara, Gandaki", initials: "AG", tone: "rose",
    joined: "2024", stats: "19 pieces sold · 4.8 ★",
    quote: "Dyes her own yarn with marigold and walnut husk from the garden." },
];

export const spotlight: MakerSpotlight = {
  name: "Sita Shrestha", location: "Bhaktapur, Bagmati", initials: "SS", tone: "rust",
  bio: "A mother of two who taught herself to crochet from a borrowed library book. Today she makes the Market tote and Granny throw — and mentors three younger makers on her street.",
  quote: "Crochets at dawn before the kids wake up. Every loop is a meditation.",
  stats: [["47", "pieces sold"], ["4.9 ★", "maker rating"], ["8", "repeat buyers"]],
};

export const testimonials: Testimonial[] = [
  { quote: "The tote is even lovelier in person. Knowing Sita made it makes it special.",
    name: "Priya M.", location: "Kathmandu", rating: 5, initials: "PM", tone: "rose" },
  { quote: "Shipped fast and the maker messaged me a little note. You feel the care in every stitch.",
    name: "Daniel R.", location: "Berlin", rating: 5, initials: "DR", tone: "teal" },
  { quote: "I bought the throw for my mother. Six weeks of someone's evenings, now on her couch.",
    name: "Aarav S.", location: "Pokhara", rating: 5, initials: "AS", tone: "indigo" },
];

export const faqs: FAQ[] = [
  { q: "How long does each piece take to make?",
    a: "Every item is handmade to order — typically 3 to 7 days. The maker will message you once it's shipped." },
  { q: "Can I request a custom colour?",
    a: "Yes — most makers on FlowCart welcome custom orders. Message them directly from the product page, and they'll dye to match." },
  { q: "How do makers receive payment?",
    a: "Makers are paid directly after each order is delivered and confirmed. FlowCart never sits between a maker and her earnings — not a factory, not a middleman." },
  { q: "Do you ship internationally?",
    a: "Yes. Orders above NPR 2,000 ship free within Nepal; international rates are calculated at checkout." },
  { q: "What if my piece isn't quite right?",
    a: "Message the maker within 14 days and she'll make it right — a repair, a remake, or a refund. Handmade should still feel safe to buy." },
];

// Format NPR price — used everywhere a price renders
export function formatNPR(n: number): string {
  return "NPR " + n.toLocaleString("en-IN");
}
