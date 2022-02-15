/**
 * @file 配置信息
 * @author svon.me@gmail.com
 */

export { IsSSR } from "./ssr";
import * as process from "./process";
import safeSet from "@fengqiaogang/safe-set";
export { languageKey, production, development, home, domain } from "./process";

export const AppId = "app";
export const rootData = "__MlaABWNKPrYLzpbU";

export const dashboard = "/";
export const staticPath = "/v4_sources";
export const oss = "https://res.kingdata.xyz";

export const productionAPI = "https://kingdata.xyz";
// export const developmentAPI = "https://dev.kingdata.work";
export const developmentAPI = "https://kingdata.xyz";

export const title = "KingData";

export const appDownload = "/download/";

export interface Argv extends process.Process{
}

export interface Env extends Argv{
	template: string;
	api: string; // 接口地址
	ApiVersion: string;
}

export const getEnv = function (): Env {
	const opt = process.getProcess();
	const env = {
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


