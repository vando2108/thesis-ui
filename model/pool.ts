import { StaticImageData } from "next/image";

export class Token {
  name: string;
  symbol: string;
  logo: StaticImageData;
  contractAddress: string;

  constructor(
    name: string,
    symbol: string,
    image: StaticImageData,
    contractAddress: string
  ) {
    this.name = name;
    this.symbol = symbol;
    this.logo = image;
    this.contractAddress = contractAddress;
  }
}

export class Pool {
  tokenA: Token;
  tokenB: Token;

  constructor(tokenA: Token, tokenB: Token) {
    this.tokenA = tokenA;
    this.tokenB = tokenB;
  }
}
