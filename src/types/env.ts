export interface ImportMetaEnv {
	readonly VITE_mode: string;   // 运行模式
	readonly VITE_command: string;
	readonly VITE_api: string;    // 接口域名
	readonly VITE_domain: string; // 网站域名
	readonly VITE_cookie: string; // 设置 cookie 的安全域
	readonly VITE_google: string; // google key
	readonly VITE_oss: string; // oss 资源域名
	readonly VITE_staticPath: string; // 静态资源虚拟路径
	readonly VITE_staticDomain: string; // 静态资源域名或者是域名+路径
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
export const tokenKey = "token";
export const tidingName = "last_timestamp";
export const tokenExpires = 1000 * 60 * 60 * 24 * 3; // 过期时间
export const deviceName = "kd_origin"; // 标记当前设备类型
export const rootData = "__MlaABWNKPrYLzpbU";

export const dashboard = "/";
export const oss = "https://res.kingdata.xyz";
