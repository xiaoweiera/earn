/**
 * @file 加密
 * @author svon.me@gmail.com
 */

import { key } from "./value";
import * as aes from "./aes";
import * as base64 from "./base64";
import * as console from "src/plugins/log/index";

const Crypto = function <T>(value: T) {
  try {
    // 将数据转换城字符串
    const jsonText = JSON.stringify({ [key]: value });
    // base64 加密
    const base64Text = base64.compress(jsonText);
    // AES 加密
    return aes.compress(base64Text);
  } catch (e) {
    console.error("Crypto");
    console.error(value);
    console.info(e);
  }
  return "";
};

export default Crypto;
