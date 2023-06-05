import { create } from "zustand";

export interface DepositState {
  amount: number | undefined;

  updateAmount: (amount: number | undefined) => void;
}

export const useDepositState = create<DepositState>()((set) => ({
  amount: undefined,

  updateAmount: (amount: number | undefined) => set(() => ({ amount: amount })),
}));
