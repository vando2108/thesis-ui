import { create } from "zustand";

export interface SwapBoxState {
  amountA: number | undefined;
  amountB: number | undefined;

  updateAmountA: (amount: number | undefined) => void;
  updateAmountB: (amount: number | undefined) => void;
  changeDirection: () => void;
}

export const useSwapBoxStore = create<SwapBoxState>()((set) => ({
  amountA: undefined,
  amountB: undefined,

  updateAmountA: (amount: number | undefined) =>
    set(() => ({ amountA: amount })),

  updateAmountB: (amount: number | undefined) =>
    set(() => ({ amountB: amount })),

  changeDirection: () =>
    set((state) => ({ amountA: state.amountB, amountB: state.amountA })),
}));
