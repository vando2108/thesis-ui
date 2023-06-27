import axios from "axios";
import { ethers } from "ethers";

export class Operator {
  static host = "http://103.179.188.226:8000/";

  public static async GetUserInfo(userId: number) {
    const response = await axios.get(
      `https://api.capyex.space/api/account/${userId}`
    );
    if (response.data.success == true) {
      const data = response.data.data;
      if (data != null) {
        return [
          ethers.utils.formatEther(data.tokenBalance),
          ethers.utils.formatEther(data.nativeBalance),
          data.nonce,
        ];
      }
    }

    return undefined;
  }
}
