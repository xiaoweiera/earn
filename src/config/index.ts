/**
 * @file 配置信息
 * @author svon.me@gmail.com
 */

export { IsSSR } from "./ssr";
import { getProcess, Process } from "./process";
export { home, domain, appDownload } from "./process";
export * from "src/types/env";

export const title = "KingData";

export interface Google {
	captcha: string;
}

export interface Env extends Process{
	template: string;
	api: string; // 接口地址
	ApiVersion: string;
	google: Google,
}

export const getEnv = function (): Env {
	const opt = getProcess();
	const env = {
		mode: opt.mode,
		ApiVersion: "v1",
		template: "index.html",
		command: opt.command,
		api: opt.VITE_api, // api 接口域名
		google: {
			captcha: opt.VITE_google // 谷歌人机校验 key
		}
	};
	return env as Env;
}


