/**
 * @file 解密
 * @author svon.me@gmail.com
 */

import CryptoJS from "crypto-js";
import { key, a as secret } from "./value";
import safeGet from "@fengqiaogang/safe-get";


const Decrypt = function<T>(value: string): T {
	const text = CryptoJS.AES.decrypt(value, secret);
	const str = text.toString(CryptoJS.enc.Utf8);
	const data = JSON.parse(str);
	return safeGet<T>(data, key);
}

export default Decrypt;
