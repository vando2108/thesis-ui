import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import { useNavStore } from "@/states/navbar.state";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { useUserStore } from "@/states/user.state";
import { GetAccountIndex, GetCapyContract } from "@/lib/contract/contract";
import { useEffect } from "react";
import SwapBox from "@/components/swapBox/swapBox";
import OperatorBox from "@/components/deposit/deposit";
import { Operator } from "@/lib/operator/operator";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const tabIndex = useNavStore((state) => state.tab);
  const [address, signer] = [useAddress(), useSigner()];
  const userState = useUserStore((state) => state);
  const contract = GetCapyContract(signer!);

  useEffect(() => {
    if (userState.address != address) {
      GetAccountIndex(contract)
        .then((result) => {
          if (result != undefined) {
            userState.updateState(result, signer, address!, "", "");
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (userState.userId > 0) {
        const amount = await Operator.GetUserBalance(userState.userId);

        if (amount != undefined) {
          if (
            userState.tokenAAmount != amount[0] ||
            userState.tokenBAmount != amount[1]
          ) {
            userState.updateBalance(amount[0], amount[1]);
          }
        } else {
          userState.updateBalance("...", "...");
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [userState.userId]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center ${inter.className}`}
    >
      <Navbar />
      {tabIndex == 0 ? <SwapBox /> : <OperatorBox />}
    </main>
  );
}
