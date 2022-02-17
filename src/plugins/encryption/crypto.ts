/**
 * @file 加密
 * @author svon.me@gmail.com
 */

import CryptoJS from "crypto-js";
import { key, a as secret } from "./value";

export const Crypto = function (value: string | object): string {
	try {
		const text = JSON.stringify({ [key]: value });
		const data = CryptoJS.AES.encrypt(text, secret);
		return data.toString();
	} catch (e) {
		// todo
	}
	return "";
}

export default Crypto;
