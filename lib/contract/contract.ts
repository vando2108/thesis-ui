import { ethers } from "ethers";
import capyABI from "./Capy.json";

export const GetCapyContract = (signer: ethers.Signer) => {
  const contractReader = new ethers.Contract(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    capyABI.abi,
    signer
  );

  return contractReader;
};

export const UserRegister = async (contract: ethers.Contract) => {
  if (contract.signer == undefined) {
    return undefined;
  }

  const address = await contract.signer.getAddress();
  const result = await contract.functions.register(address);

  return result;
};

export const GetAccountIndex = async (contract: ethers.Contract) => {
  if (contract.signer == undefined) {
    return undefined;
  }

  const address = await contract.signer.getAddress();
  const result = await contract.functions.getAccountIndex(address);

  return result[0];
};

export const OperatorDepositToken = async (
  contract: ethers.Contract,
  accountId: number,
  amount: number
) => {
  return await contract.functions
    .deposit(accountId, ethers.utils.parseEther(amount.toString()))
    .catch((error) => alert(error.message));
};

export const OperatorDepositCoin = async (
  contract: ethers.Contract,
  accountId: number,
  amount: number
) => {
  return await contract.functions
    .deposit(accountId, 0, {
      value: ethers.utils.parseEther(amount.toString()),
    })
    .catch((error) => alert(error.message));
};
