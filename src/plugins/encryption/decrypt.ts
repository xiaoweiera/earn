/**
 * @file 解密
 * @author svon.me@gmail.com
 */

import CryptoJS from "crypto-js";
import safeGet from "@fengqiaogang/safe-get";
import { decompress, key, a as secret } from "./value";

const Decrypt = async function <T>(value: string): Promise<T> {
  const text = CryptoJS.AES.decrypt(value, secret());
  const str = await decompress(text.toString(CryptoJS.enc.Utf8));
  const data = JSON.parse(str);
  return safeGet<T>(data, key);
};

export default Decrypt;
