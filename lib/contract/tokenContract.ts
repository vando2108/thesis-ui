import { ethers } from "ethers";
import tokenABI from "./erc20.json";

export const GetTokenContract = (signer: ethers.Signer) => {
  const contractReader = new ethers.Contract(
    "0x687bB6c57915aa2529EfC7D2a26668855e022fAE",
    tokenABI,
    signer
  );

  return contractReader;
};

export const TokenApprove = async (
  contract: ethers.Contract,
  amount: number
) => {
  return await contract.functions
    .approve(
      "0x49149a233de6E4cD6835971506F47EE5862289c1",
      ethers.utils.parseEther(amount.toString())
    )
    .catch((error) => alert(error.message));
};
