import "@/styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThirdwebProvider
        activeChain={{
          chainId: 31337,
          rpc: ["http://103.179.188.226:8545"],
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
