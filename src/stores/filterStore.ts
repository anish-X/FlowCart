import { create } from "zustand";

interface FilterStore {
  makerFilter: string;
  setMakerFilter: (maker: string) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  makerFilter: "all",
  setMakerFilter: (maker) => set({ makerFilter: maker }),
}));
