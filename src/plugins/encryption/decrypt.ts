/**
 * @file 解密
 * @author svon.me@gmail.com
 */

import { key } from "./value";
import * as aes from "./aes";
import * as base64 from "./base64";
import safeGet from "@fengqiaogang/safe-get";
import * as console from "src/plugins/log/index";

const decompress = function <T>(value: string) {
  // AES 解密
  const text = aes.decompress(value);
  if (text) {
    // base64 解密
    const base64Text = base64.decompress(text);
    // 字符串转数据
    const json = JSON.parse(base64Text);
    // 返回数据
    return safeGet<T>(json, key);
  }
};

const Decrypt = async function <T>(value: string): Promise<T | undefined> {
  try {
    if (value) {
      return decompress(value);
    }
  } catch (e) {
    console.info("Decrypt Error");
    console.info(value);
    console.info(e);
  }
};

export default Decrypt;
