/**
 * @file 加密
 * @author svon.me@gmail.com
 */

import { key } from "./value";
import * as base64 from "./base64";

/*
import CryptoJS from "crypto-js";

import * as console from "src/plugins/log/index";

export const Crypto = async function <T>(value: T): Promise<string> {
  try {
    // 将数据转换城字符串
    const jsonText = JSON.stringify({ [key]: value });
    // base64 加密
    const base64Text = base64.compress(jsonText);
    // AES 加密
    const data = CryptoJS.AES.encrypt(base64Text, secret());
    // 返回处理后的数据
    return data.toString();
  } catch (e) {
    console.error("Crypto ");
    console.error(value);
    console.info(e);
  }
  return "";
};
*/

export const Crypto = async function <T>(value: T): Promise<string> {
  const jsonText = JSON.stringify({ [key]: value });
  return base64.compress(jsonText);
};

export default Crypto;
