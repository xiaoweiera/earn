/**
 * @file 配置信息
 * @author svon.me@gmail.com
 */

import * as process from "./env";
import safeSet from "@fengqiaogang/safe-set";

export const AppId = "app";
export const rootData = "__MlaABWNKPrYLzpbU";

export const domain = "kingdata.com";

export const languageKey = "lang";

export const production = process.production;
export const development = process.development;

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
	const mode = process.mode();
	const env = {
		mode,
		port: 3333,
		ApiVersion: "v1",
		template: "index.html",
		command: process.command(),
	};
	if (mode === development) {
		// 开发环境接口
		safeSet(env, "api", developmentAPI);
	} else {
		// 正式环境接口
		safeSet(env, "mode", production);
	}
	return env as Env;
}

export const IsSSR = function (): boolean {
	try {
		if (typeof window === "undefined") {
			return true;
		}
	} catch (e) {
		// todo
	}
	// try {
	// 	if (import.meta.env.SSR) {
	// 		return true;
	// 	}
	// } catch (e) {
	// 	// todo
	// }
	return false;
}
