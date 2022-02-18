export interface ImportMetaEnv {
	readonly VITE_mode: string;   // 运行模式
	readonly VITE_api: string;    // 接口域名
	readonly VITE_domain: string; // 网站域名
	readonly VITE_cookie: string; // 设置 cookie 的安全域
	readonly VITE_google: string; // google key
}

export interface ImportMeta {
	readonly env: ImportMetaEnv
}

export const production = "production";
export const development = "development";
export const test = "test";

export enum Command {
	build = "build",
	serve = "serve"
}

export const AppId = "app";
export const languageKey = "lang";
export const tokenName = "auth_token";
export const tokenExpires = 1000 * 60 * 60 * 2;
export const deviceName = "kd_origin"; // 标记当前设备类型
export const rootData = "__MlaABWNKPrYLzpbU";

export const dashboard = "/";
export const staticPath = "/v4_sources";
export const oss = "https://res.kingdata.xyz";
