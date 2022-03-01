/**
 * @file 配置信息
 * @author svon.me@gmail.com
 */

export { IsSSR } from "./ssr";
import { getProcess, Process } from "./process";
export * from "src/types/env";

export const title = "KingData";

export interface Baidu {
	tag?: string;
}

export interface Google extends Baidu{
	captcha: string;
}

export interface Env extends Process{
	template: string;
	api: string; // 接口地址
	ApiVersion: string;
	home: string;
	appDownload: string;
	domain: string;
	google: Google,
	baidu: Baidu,
}

export const getEnv = function (): Env {
	const opt = getProcess();
	const env = {
		...opt,
		ApiVersion: "v1",
		template: "index.html",
		api: opt.VITE_api, // api 接口域名
		baidu: {
			tag: opt.VITE_baiduTag
		},
		google: {
			tag: opt.VITE_googleTag,
			captcha: opt.VITE_googleCaptcha // 谷歌人机校验 key
		},
		domain: opt.VITE_domain,
		home: `${opt.VITE_domain ? opt.VITE_domain : ""}/`, // 默认首页
		appDownload: `${opt.VITE_domain ? opt.VITE_domain : ""}/download/`, // 下载页
	};
	return env as Env;
}


