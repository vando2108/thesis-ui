import { ethers } from "ethers";
import { create } from "zustand";

export interface UserState {
  userId: number;
  address: string | undefined;
  tokenAAmount: string;
  tokenBAmount: string;
  signer: ethers.Signer | undefined;
  nonce: number;

  updateInfo: (amountA: string, amountB: string, nonce: number) => void;
  updateUserId: (userId: number) => void;
  updateState: (
    userId: number,
    signer: ethers.Signer | undefined,
    address: string,
    tokenAAmount: string,
    tokenBAmount: string,
    nonce: number
  ) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  tokenAAmount: "",
  tokenBAmount: "",
  userId: 0,
  address: undefined,
  signer: undefined,
  nonce: 0,

  updateInfo: (amountA: string, amountB: string, nonce: number) => {
    set(() => ({
      tokenAAmount: amountA,
      tokenBAmount: amountB,
      nonce,
    }));
  },

  updateUserId: (userId) => set(() => ({ userId: userId })),

  updateState: (
    userId: number,
    signer: ethers.Signer | undefined,
    address: string,
    tokenAAmount: string,
    tokenBAmount: string,
    nonce: number
  ) =>
    set(() => ({
      userId,
      address,
      tokenAAmount,
      tokenBAmount,
      signer,
      nonce,
    })),
}));
