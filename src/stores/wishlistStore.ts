import { create } from "zustand";

interface WishlistStore {
  savedIds: Record<string, boolean>;
  toggle: (id: string) => void;
  isSaved: (id: string) => boolean;
  count: () => number;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  savedIds: {},

  toggle: (id) =>
    set((state) => {
      const next = { ...state.savedIds };
      if (next[id]) delete next[id];
      else next[id] = true;
      return { savedIds: next };
    }),

  isSaved: (id) => !!get().savedIds[id],

  count: () => Object.keys(get().savedIds).length,
}));
