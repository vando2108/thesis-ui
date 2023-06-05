import { create } from "zustand";

export interface NavState {
  tab: number;

  changeTab: (index: number) => void;
}

export const useNavStore = create<NavState>()((set) => ({
  tab: 0,

  changeTab: (index) => set((state) => ({ tab: index })),
}));
