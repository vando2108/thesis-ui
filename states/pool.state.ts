import { Pool, Token } from "@/model/pool";
import { create } from "zustand";
import ETHlogo from "@/public/eth.png";
import CAPYlogo from "@/public/capybara.svg";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/react";

const tokenA = new Token(
  "CAPY",
  "CAPY",
  CAPYlogo,
  "0xB602278e346741b26B71d8ADfACa08D07977Ca46"
);
const tokenB = new Token("Ethereum", "ETH", ETHlogo, NATIVE_TOKEN_ADDRESS);

export interface PoolState {
  isBuy: boolean;
  pool: Pool;

  changeDirection: () => void;
}

export const usePoolStore = create<PoolState>()((set) => ({
  isBuy: true,
  pool: new Pool(tokenA, tokenB),

  changeDirection: () => set((state) => ({ isBuy: !state.isBuy })),
}));
