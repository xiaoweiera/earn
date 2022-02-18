export interface ImportMetaEnv {
	readonly VITE_mode: string;
	readonly VITE_api: string;
	readonly VITE_domain: string;
	readonly VITE_google: string;
}

export interface ImportMeta {
	readonly env: ImportMetaEnv
}

export const production = "production";
export const development = "development";

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
