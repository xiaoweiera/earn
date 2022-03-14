/**
 * @file Base64
 * @author svon.me@gmail.com
 */

import CryptoJS from "crypto-js";

// 加密
export const compress = function (value: string) {
  const text = CryptoJS.enc.Utf8.parse(value);
  return CryptoJS.enc.Base64.stringify(text);
};

// 解密
export const decompress = function (value: string) {
  const text = CryptoJS.enc.Base64.parse(value);
  console.log(text);
  return text.toString(CryptoJS.enc.Utf8);
};
