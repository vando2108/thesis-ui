import { FC } from "react";
import Image, { StaticImageData } from "next/image";
import css from "./swapCurrencyInput.module.css";

const styles = {
  transferPropContainer: `bg-[#131A2A] w-full rounded-2xl p-4 text-3xl border border-[#131A2A] hover:border-[#41444F] flex flex-col justify-between`,
  transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none  w-full text-2xl`,
  currencySelector: `flex`,
  currencySelectorContent: ` h-min flex justify-between items-center bg-[#293249] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-1 mt-[-0.2rem]`,
  currencySelectorIcon: `flex items-center`,
  currencySelectorArrow: `text-lg`,
};

interface SwapCurrencyInputProps {
  currency: string;
  currencyLogo: StaticImageData;
  amount: string;
  onClick: Function;
  onChange: Function;
  value: number | undefined;
}

const SwapCurrencyInput: FC<SwapCurrencyInputProps> = (props: {
  currency: string;
  currencyLogo: StaticImageData;
  amount: string;
  onClick: Function;
  onChange: Function;
  value: number | undefined;
}) => {
  return (
    <div className={styles.transferPropContainer}>
      <div className={css.input_line}>
        <input
          type="number"
          className={styles.transferPropInput}
          placeholder="0"
          pattern="^[0-9]*[.,]?[0-9]*$"
          onChange={(x) =>
            props.onChange(x.target.value == "" ? undefined : x.target.value)
          }
          value={props.value || ""}
        />
        <div
          className={styles.currencySelector}
          onClick={() => props.onClick()}
        >
          <div className={styles.currencySelectorContent} unselectable="on">
            <div className={css.currencySelectorContent__left}>
              <div className={css.currencySelectorContent__icon}>
                <Image
                  className={css.icon}
                  src={props.currencyLogo}
                  alt="logo"
                  height={24}
                  width={24}
                />
              </div>
              <div className={css.currencySelectorTicker} unselectable="on">
                {props.currency}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={css.balance_line}>
        <div></div>
        <div className={css.balance_line__content}>
          <div className={css.balance}>Balance: {props.amount}</div>
        </div>
      </div>
    </div>
  );
};

export default SwapCurrencyInput;
