import Decimal from "decimal.js-light";

export function ConvertToUiAmount(amount: string, decimal: number): Decimal {
  const exp = new Decimal(10).pow(decimal);
  return new Decimal(amount).div(exp);
}
