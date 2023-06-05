import { ethers } from "ethers";

export class Transaction {
  private static nonce = 0;
  accountIndex: number;
  isBuy: boolean;
  nativeAmount: number;
  tokenAmount: number;
  message: string;
  signer: ethers.Signer;
  txId: string;

  constructor(
    accountIndex: number,
    isBuy: boolean,
    nativeAmount: number,
    tokenAmount: number,
    signer: ethers.Signer
  ) {
    this.message = "0x";

    Transaction.nonce += 1;
    this.message += Transaction.nonce.toString(16).padStart(6, "0");

    this.accountIndex = accountIndex;
    this.message += accountIndex.toString(16).padStart(8, "0");

    this.isBuy = isBuy;
    if (this.isBuy) {
      this.message += "01";
    } else {
      this.message += "00";
    }

    this.nativeAmount = nativeAmount;
    this.message += convertAmount(this.nativeAmount);

    this.tokenAmount = tokenAmount;
    this.message += convertAmount(this.tokenAmount);
    this.txId = ethers.utils.keccak256(this.message);

    this.signer = signer;
  }

  async sign() {
    await this.signer
      .signMessage(ethers.utils.arrayify(this.txId))
      .then((signed) => {
        this.message += signed.substring(2);
      })
      .catch((error) => {
        if (error.code == "ACTION_REJECTED") {
          alert("Action rejected");
        } else {
          alert(error);
        }
      });

    if (this.message.length == 164) {
      return this.message;
    } else {
      return undefined;
    }
  }
}

function convertAmount(amount: number) {
  let temp = ethers.utils.parseEther(amount.toString()).toString();

  let cnt = 0;
  while (true) {
    if (temp[temp.length - 1] == "0") {
      cnt += 1;
      temp = temp.slice(0, -1);
    } else {
      break;
    }
  }

  return (
    parseInt(temp).toString(16).padStart(6, "0") +
    cnt.toString(16).padStart(2, "0")
  );
}
