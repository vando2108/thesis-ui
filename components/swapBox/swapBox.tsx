import { FC } from "react";
import SwapCurrencyInput from "../swapCurrencyInput/swapCurrencyInput";
import css from "./swapBox.module.css";
import { usePoolStore } from "@/states/pool.state";
import { useUserStore } from "@/states/user.state";
import { GetCapyContract, UserRegister } from "@/lib/contract/contract";
import { useSwapBoxStore } from "@/states/swapBox.state";
import { Transaction } from "@/model/transaction";
import axios from "axios";

const styles = {
  wrapper: `px-8 pt-68 pb-0 w-full max-w-lg flex items-center justify-center mt-14`,
  content: `bg-[#0D111C] border border-gray-300 border-opacity-25 w-[40rem] rounded-2xl p-4`,
  formHeader: `px-2 py-2 flex items-center justify-between font-semibold text-xl`,
  transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-6 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
  transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl`,
  currencySelector: `flex w-1/4`,
  currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
  currencySelectorIcon: `flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,
};

interface SwapBoxProps {}

const SwapBox: FC<SwapBoxProps> = () => {
  const state = useSwapBoxStore((state) => state);
  const poolState = usePoolStore((state) => state);
  const userState = useUserStore((state) => state);
  const contract = GetCapyContract(userState.signer!);

  const Register = async () => {
    UserRegister(contract)
      .then((result) => {
        console.log(result.wait);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SendTx = async () => {
    const transaction = new Transaction(
      userState.userId,
      poolState.isBuy,
      poolState.isBuy ? state.amountB! : state.amountA!,
      poolState.isBuy ? state.amountA! : state.amountB!,
      userState.signer!
    );

    const signedMsg = await transaction.sign();
    if (signedMsg != undefined) {
      axios
        .post("https://api.capyex.space/api/tx", { tx: signedMsg })
        .then((response) => {
          if (response.status == 201) {
            alert(response.data.message);
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  const disabled = (): boolean => {
    if (userState.address == undefined) {
      return true;
    } else {
      if (userState.userId == 0) return false;
      else {
        if (state.amountA != undefined && state.amountB != undefined) {
          return false;
        }
      }
    }
    return true;
  };

  const buttonText = (): string => {
    if (userState.address == undefined || userState.userId == 0) {
      return "Register";
    }
    return "Confirm";
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.formHeader}>
          <div className={css.header_text}>Swap</div>
        </div>
        <SwapCurrencyInput
          currency={
            poolState.isBuy
              ? poolState.pool.tokenA.symbol
              : poolState.pool.tokenB.symbol
          }
          currencyLogo={
            poolState.isBuy
              ? poolState.pool.tokenA.logo
              : poolState.pool.tokenB.logo
          }
          amount={
            poolState.isBuy
              ? userState.tokenAAmount.toString()
              : userState.tokenBAmount.toString()
          }
          onClick={() => {}}
          onChange={poolState.isBuy ? state.updateAmountA : state.updateAmountB}
          value={poolState.isBuy ? state.amountA : state.amountB}
        />
        <div className={css.swap_currency_button_wrapper}>
          <button
            onClick={() => {
              // state.changeDirection();
              poolState.changeDirection();
            }}
            className={css.swap_currency_button}
            color="#FFFFFF"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5D6785"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </button>
        </div>
        <SwapCurrencyInput
          currency={
            poolState.isBuy
              ? poolState.pool.tokenB.symbol
              : poolState.pool.tokenA.symbol
          }
          currencyLogo={
            poolState.isBuy
              ? poolState.pool.tokenB.logo
              : poolState.pool.tokenA.logo
          }
          amount={
            poolState.isBuy
              ? userState.tokenBAmount.toString()
              : userState.tokenAAmount.toString()
          }
          onClick={() => {}}
          onChange={
            !poolState.isBuy ? state.updateAmountA : state.updateAmountB
          }
          value={!poolState.isBuy ? state.amountA : state.amountB}
        />
        <button
          className={css.confirm}
          disabled={disabled()}
          onClick={() => {
            if (buttonText() == "Confirm") {
              SendTx();
            } else {
              Register();
            }
          }}
        >
          <div className={css.confirm_text}>{buttonText()}</div>
        </button>
      </div>
    </div>
  );
};

export default SwapBox;
