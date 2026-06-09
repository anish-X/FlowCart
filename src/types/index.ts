export interface Product {
  id: string;
  name: string;
  description: string;
  maker: string;
  makerLocation: string;
  price: number;
  emoji: string;
  badge?: "new" | "sale" | "handmade" | "featured";
  colors: string[];
  category: "accessories" | "home" | "apparel" | "gifts";
  stock: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  body: string;
  productName: string;
  avatarInitials: string;
}

export interface OrderStats {
  totalOrders: number;
  activeMakers: number;
  revenue: number;
  avgRating: number;
}
