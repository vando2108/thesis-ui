import "@/styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThirdwebProvider
        activeChain={{
          chainId: 31337,
          rpc: [
            "https://rpc.vnet.tenderly.co/devnet/my-first-devnet/76d4fead-dd10-4738-beb0-6018778674fb",
          ],
          nativeCurrency: {
            decimals: 18,
            name: "BNB",
            symbol: "tBNT",
          },
          shortName: "BNB",
          slug: "BNB",
          testnet: true,
          chain: "Binance Smart Chain",
          name: "Binance Smart Chain Testnet",
        }}
      >
        <Component {...pageProps} />
      </ThirdwebProvider>
    </>
  );
}
