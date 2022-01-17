/**
 * @file 域名处理
 * @author svon.me@gmail.com
 */

import window from "./window";
import safeGet from "@fengqiaogang/safe-get";
import Decrypt from "src/plugins/encryption/decrypt";
import {getEnv, production, development, domain, rootData} from "src/config";

const getDomain = function (): string {
	const env = process.env;
	const location = safeGet<string>(env, "location");
	if (location) {
		return location;
	}
	const config = getEnv();
	if (config.mode === production) {
		return `https://${domain}`;
	}
	// 客户端从缓存中获取
	const text = safeGet<string>(window, rootData);
	if (text) {
		const data = Decrypt<object>(text);
		const value = safeGet<string>(data, "location");
		if (value) {
			return value;
		}
	}
	if (config.mode === development) {
		return "https://dev.kingdata.work";
	}
	return `https://${domain}`;
}


export default getDomain;
