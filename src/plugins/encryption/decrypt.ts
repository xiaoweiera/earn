/**
 * @file 解密
 * @author svon.me@gmail.com
 */

import { trim } from "lodash";
// import CryptoJS from "crypto-js";
import * as base64 from "./base64";
import { key } from "./value";
import safeGet from "@fengqiaogang/safe-get";
import * as console from "src/plugins/log/index";
/*
const decompress = async function <T>(value: string): Promise<T | undefined> {
  // AES 解密
  const text = CryptoJS.AES.decrypt(value, secret());
  const str = text.toString(CryptoJS.enc.Utf8);
  // base64 解密
  const base64Text = base64.decompress(str);
  // 字符串转数据
  const json = JSON.parse(base64Text);
  // 返回数据
  return safeGet<T>(json, key);
};

const Decrypt = async function <T>(value: string): Promise<T | undefined> {
  try {
    const text = trim(value ? value : "");
    if (text) {
      return await decompress(text);
    }
  } catch (e) {
    console.info("Decrypt Error");
    console.info(e);
  }
};
*/

const Decrypt = async function <T>(value: string): Promise<T | undefined> {
  try {
    const text = trim(value ? value : "");
    if (text) {
      // base64 解密
      const base64Text = base64.decompress(text);
      // 字符串转数据
      const json = JSON.parse(base64Text);
      // 返回数据
      return safeGet<T>(json, key);
    }
  } catch (e) {
    console.info("Decrypt Error");
    console.info(e);
  }
};

export default Decrypt;
