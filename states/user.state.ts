import { ethers } from "ethers";
import { create } from "zustand";

export interface UserState {
  userId: number;
  address: string | undefined;
  tokenAAmount: string;
  tokenBAmount: string;
  signer: ethers.Signer | undefined;

  updateBalance: (amountA: string, amountB: string) => void;
  updateUserId: (userId: number) => void;
  updateState: (
    userId: number,
    signer: ethers.Signer | undefined,
    address: string,
    tokenAAmount: string,
    tokenBAmount: string
  ) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  tokenAAmount: "",
  tokenBAmount: "",
  userId: 0,
  address: undefined,
  signer: undefined,

  updateBalance: (amountA: string, amountB: string) => {
    set(() => ({
      tokenAAmount: amountA,
      tokenBAmount: amountB,
    }));
  },

  updateUserId: (userId) => set(() => ({ userId: userId })),

  updateState: (
    userId: number,
    signer: ethers.Signer | undefined,
    address: string,
    tokenAAmount: string,
    tokenBAmount: string
  ) =>
    set(() => ({
      userId,
      address,
      tokenAAmount,
      tokenBAmount,
      signer,
    })),
}));
