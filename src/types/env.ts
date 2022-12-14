export interface ImportMetaEnv {
  readonly VITE_name?: string; // 环境名称
  readonly VITE_mode: string; // 运行模式
  readonly VITE_command: string;
  readonly VITE_api: string; // 接口域名
  VITE_productionApi: string; // 线上环境接口地址
  VITE_LanApi: string; // 局域网接口地址
  readonly VITE_domain: string; // 网站域名
  readonly VITE_cookie: string; // 设置 cookie 的安全域
  readonly VITE_baiduTag?: string; // baidu 收录
  readonly VITE_gio?: string; // google io
  readonly VITE_googleTag?: string; // google 收录
  readonly VITE_googleCaptcha: string; // google Captcha key
  readonly VITE_oss: string; // oss 资源域名
  readonly VITE_REDIS_URL?: string; // redis 配置
  readonly VITE_secret: string; // 加密签名
  VITE_staticPath: string; // 静态资源虚拟路径
  VITE_staticDomain: string; // 静态资源域名或者是域名+路径
}

export const EnvKeys = ["VITE_name", "VITE_mode", "VITE_command", "VITE_api", "VITE_productionApi", "VITE_LanApi", "VITE_domain", "VITE_cookie", "VITE_baiduTag", "VITE_googleTag", "VITE_googleCaptcha", "VITE_staticPath", "VITE_staticDomain", "VITE_secret", "VITE_gio"];

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export const production = "production";
export const development = "development";
export const test = "test";

export enum Command {
  // eslint-disable-next-line no-unused-vars
  build = "build",
  // eslint-disable-next-line no-unused-vars
  serve = "serve",
}

export const title = "KingData";
export const AppId = "kd-app";
export const languageKey = "lang";
export const userLogin = "u_l_at"; // 用户登录时间
export const uuIdName = "u_pux5rd6hm8"; // 用户 uuid
export const tokenName = "auth_token";
export const tokenKey = "token";
export const tidingName = "last_timestamp";
export const tokenExpires = 1000 * 60 * 60 * 24 * 3; // 过期时间
export const deviceName = "kd_origin"; // 标记当前设备类型
export const rootData = "__MlaABWNKPrYLzpbU";

export const dashboard = "/";
export const oss = "https://res.kingdata.xyz";
