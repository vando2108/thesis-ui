import { FC } from "react";
import SwapCurrencyInput from "../swapCurrencyInput/swapCurrencyInput";
import css from "./deposit.module.css";
import { usePoolStore } from "@/states/pool.state";
import {
  GetCapyContract,
  OperatorDepositCoin,
  OperatorDepositToken,
  UserRegister,
} from "@/lib/contract/contract";
import { useUserStore } from "@/states/user.state";
import { GetTokenContract, TokenApprove } from "@/lib/contract/tokenContract";
import { useDepositState } from "@/states/deposit.state";

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

const OperatorBox: FC<SwapBoxProps> = () => {
  const state = useDepositState((state) => state);
  const poolState = usePoolStore((state) => state);
  const userState = useUserStore((state) => state);
  const contract = GetCapyContract(userState.signer!);
  const tokenContract = GetTokenContract(userState.signer!);

  const Register = async () => {
    UserRegister(contract)
      .then((result) => {
        console.log(result.wait);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const Deposit = async () => {
    if (poolState.isBuy) {
      const temp = await TokenApprove(tokenContract, state.amount!);
      if (temp != undefined) {
        await temp.wait();
        await OperatorDepositToken(contract, userState.userId, state.amount!);
      }
    } else {
      await OperatorDepositCoin(contract, userState.userId, state.amount!);
    }
  };

  const disabled = (): boolean => {
    if (userState.address == undefined) {
      return true;
    } else {
      if (userState.userId == 0) return false;
      else {
        if (state.amount != undefined) {
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
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.formHeader}>
            <div className={css.header_text}>Deposit</div>
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
            onClick={() => poolState.changeDirection()}
            onChange={state.updateAmount}
            value={state.amount}
          />
          <button
            className={css.confirm}
            disabled={disabled()}
            onClick={() => {
              if (buttonText() == "Confirm") {
                Deposit();
              } else {
                Register();
              }
            }}
          >
            <div className={css.confirm_text}>{buttonText()}</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default OperatorBox;
