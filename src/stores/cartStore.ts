import { create } from "zustand";

// --- Types: defined here because only the cart needs them right now ---

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  emoji: string;
  maker: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
  selectedColor: string;
}

// --- The store shape ---

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;

  // Derived value — total in NPR
  total: () => number;

  addItem: (product: CartProduct, color: string) => void;
  removeItem: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isDrawerOpen: false,

  total: () =>
    get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),

  addItem: (product, color) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { product, quantity: 1, selectedColor: color }],
      };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    })),

  setQty: (productId, qty) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.product.id === productId ? { ...i, quantity: qty } : i
      ),
    })),

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
}));
