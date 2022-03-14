/**
 * @file 解密
 * @author svon.me@gmail.com
 */

import * as zStd from "./zstd";
import CryptoJS from "crypto-js";
import * as base64 from "./base64";
import { key, a as secret } from "./value";
import safeGet from "@fengqiaogang/safe-get";

const Decrypt = async function <T>(value: string): Promise<T> {
  // AES 解密
  const text = CryptoJS.AES.decrypt(value, secret());
  const str = text.toString(CryptoJS.enc.Utf8);
  // 字符串解压
  const zStdText = await zStd.decompress(str);
  // base64 解密
  const base64Text = base64.decompress(zStdText);
  // 字符串转数据
  const json = JSON.parse(base64Text);
  // 返回数据
  return safeGet<T>(json, key);
};

export default Decrypt;
