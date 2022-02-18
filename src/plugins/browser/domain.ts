/**
 * @file 域名处理
 * @author svon.me@gmail.com
 */

import window from "./window";
import {getEnv} from "src/config";

const getDomain = function (): string {
	const config = getEnv();
	if (config.VITE_domain) {
		return config.VITE_domain;
	}
	return window.location.origin;
}


export default getDomain;
