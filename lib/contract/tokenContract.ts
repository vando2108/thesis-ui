import { ethers } from "ethers";
import tokenABI from "./erc20.json";

export const GetTokenContract = (signer: ethers.Signer) => {
  const contractReader = new ethers.Contract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
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
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      ethers.utils.parseEther(amount.toString())
    )
    .catch((error) => alert(error.message));
};
