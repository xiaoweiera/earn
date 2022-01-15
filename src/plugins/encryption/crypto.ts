/**
 * @file 加密
 * @author svon.me@gmail.com
 */

import CryptoJS from "crypto-js";
import { key, secret } from "./secret";

export const Crypto = function (value: string | object): string {
	const text = JSON.stringify({ [key]: value });
	const data = CryptoJS.AES.encrypt(text, secret);
	return data.toString();
}

export default Crypto;
