/**
 * @file 配置信息
 * @author svon.me@gmail.com
 */

import * as process from "./process";
import safeSet from "@fengqiaogang/safe-set";
export { languageKey, production, development } from "./process";
export { IsSSR } from "./ssr";

export const AppId = "app";
export const rootData = "__MlaABWNKPrYLzpbU";

export const domain = "kingdata.com";

export const dashboard = "/";
export const staticPath = "/static";
export const oss = "https://res.kingdata.xyz";
export const productionAPI = "https://kingdata.xyz";
export const developmentAPI = "https://dev.kingdata.work";

export const title = "KingData";

export interface Argv {
	mode: string;
	command: string;
}

export interface Env extends Argv {
	port: number;
	template: string;
	api: string; // 接口地址
	ApiVersion: string;
}

export const getEnv = function (): Env {
	const opt = process.getProcess();
	const env = {
		port: 3333,
		mode: opt.mode,
		ApiVersion: "v1",
		template: "index.html",
		command: opt.command,
	};
	if (opt.mode === process.development) {
		// 开发环境接口
		safeSet(env, "api", developmentAPI);
	} else {
		// 正式环境接口
		safeSet(env, "api", productionAPI);
	}
	return env as Env;
}


