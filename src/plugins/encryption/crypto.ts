/**
 * @file 加密
 * @author svon.me@gmail.com
 */

import CryptoJS from "crypto-js";
import { compress, key, a as secret } from "./value";

export const Crypto = async function <T>(value: T): Promise<string> {
  try {
    const text = JSON.stringify({ [key]: value });
    const str = await compress(text);
    const data = CryptoJS.AES.encrypt(str, secret());
    return data.toString();
  } catch (e) {
    console.log(e);
  }
  return "";
};

export default Crypto;
