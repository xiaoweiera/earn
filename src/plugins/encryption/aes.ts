/**
 * @file 加密/解密
 * @author svon.me@gmail.com
 */

import { trim } from "lodash";

import CryptoJS from "crypto-js";
import { a as secret } from "./value";

// 加密
export const compress = function (value: string): string | undefined {
  const text = trim(value ? value : "");
  if (text) {
    const data = CryptoJS.AES.encrypt(text, secret(), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    // 返回处理后的数据
    return data.toString();
  }
};

// 解密
export const decompress = function (value: string): string | undefined {
  const text = trim(value ? value : "");
  if (text) {
    // AES 解密
    const data = CryptoJS.AES.decrypt(text, secret(), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return data.toString(CryptoJS.enc.Utf8);
  }
};
