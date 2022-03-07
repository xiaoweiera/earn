/**
 * @file 构造请求对象
 * @author svon.me@gmail.com
 */
import { omit } from "lodash";
import I18n from "src/utils/i18n";
import {Request} from "express";
import {asyncCheck} from "./response";
import {Lang} from "src/types/language";
import * as redis from "src/plugins/redis";
import safeSet from "@fengqiaogang/safe-set";
import safeGet from "@fengqiaogang/safe-get";
import Cookie from "src/plugins/browser/cookie";
import {getEnv, languageKey} from "src/config/";
import * as console from "src/plugins/log/";
import {Equals, isObject, isRequest, toInteger} from "src/utils/";
import AxiosHttp, {Axios, AxiosRequestConfig, AxiosResponse} from "axios";

const timeoutValue = 3 * 1000;

// 用户信息
const getUserAuth = async function (config: AxiosRequestConfig, lang?: Lang) {
	// 从 Request 对象中获取用户信息
	if (lang && isObject(lang)) {
		const cookie = new Cookie(lang as Request);
		return cookie.getUserToken();
	} else {
		// 从浏览器中获取数据
		const cookie = new Cookie();
		return cookie.getUserToken();
	}
}

// 判断请求的地址是否和业务域名相同
const isKindDataDomain = function (config: AxiosRequestConfig): boolean {
	return true
}

class Dao {
	protected lang: Lang | undefined;

	constructor(lang?: Lang) {
		this.lang = lang;
		this.CallbackError = this.CallbackError.bind(this);
		this.responseCallback = this.responseCallback.bind(this);
		this.requestCallback = this.requestCallback.bind(this);
	}

	log(res: AxiosResponse, error?: boolean) {
		const url = this.getUri(res.config);
		const method = safeGet<string>(res, "config.method");
		const status = safeGet<number | string>(res, "status") || "error";
		const message = status === "error" ? safeGet<string>(res, "message") : "";
		if (Equals(method, "get")) {
			if (error || message) {
				console.warn("API", status, method, url, message);
			} else {
				console.log("API", status, method, url);
			}
		} else {
			const data = safeGet<string>(res, "config.data");
			if (error || message) {
				console.warn("API", status, method, url, data, message);
			} else {
				console.log("API", status, method, url, data);
			}
		}
	}
	private redisKey (config: AxiosRequestConfig) {
		if (config) {
			const expire = toInteger(safeGet<number>(config, "params.expire"));
			if (expire && expire > 0) {
				const method = safeGet<string>(config, "method");
				const url = this.getUri(config);
				const token = safeGet(config, "headers.Authorization");
				let key: string | undefined;
				if (token) {
					key = redis.makeKey(method, url, token);
				} else {
					key = redis.makeKey(method, url);
				}
				return { key, expire };
			}
		}
		return {};
	}
	// 响应前拦截
	async requestCallback(req: AxiosRequestConfig) {
		const env = getEnv();
		const i18n = I18n(this.lang);
		// 判断当前请求域名是否为 KingData 域名
		if (isKindDataDomain(req)) {
			let token: string | undefined;
			// 判断是否需要传用户信息
			const userStatus = safeGet<string>(req, "params._user");
			if (userStatus && Equals(userStatus, "none")) {
				token = "";
			} else {
				// 获取 token
				token = await getUserAuth(req, this.lang);
			}
			// 如果当前请求必须携带 token, 并且当前用户未登录
			if (userStatus && Equals(userStatus, "required") && !token) {
				// 抛异常
				throw {
					code: 0,
					data: null
				}
			}
			if (token) {
				safeSet(req, "headers.Authorization", `Token ${token}`);
			}
			// 设置当前系统语言环境
			safeSet(req, `params.${languageKey}`, i18n.getLang());
			safeSet(req, "headers.accept-language", i18n.getLang());
			safeSet(req, "params", omit(req.params, [ "_user" ]));
		}
		// 处理 url 中的变量
		const parameter: any = {
			...env,
			language: i18n.getLang(), // 当前环境语言类型
			version: env.ApiVersion,  // API 版本
		};
		if (req.params) {
			Object.assign(parameter, req.params);
		}
		if (req.data) {
			Object.assign(parameter, req.data);
		}
		if (req.url) {
			req.url = i18n.template(req.url, parameter);
		}
		const { key } = this.redisKey(req);
		if (key) {
			// 判断 Key 是否存在
			const status = await redis.has(key);
			if (status) {
				// 读取缓存数据
				const data = await redis.get(key);
				// 如果数据不为空，则中断请求逻辑
				// @ts-ignore
				if (data) {
					throw { code: 0, data };
				}
			}
		}
		// 继续执行请求逻辑
		return req;
	}

	async responseCallback(res: AxiosResponse) {
		const status = parseInt(res.status as any, 10);
		if (status >= 200 && status < 300) {
			this.log(res);
			const { key, expire } = this.redisKey(res.config);
			// 如果缓存时间大于 0
			if (key && expire && expire > 0) {
				const data = await asyncCheck(res);
				// 写入缓存
				await redis.set(key, data, expire);
				return data;
			} else {
				return asyncCheck(res);
			}
		} else {
			this.log(res, true);
			return Promise.reject(res);
		}
	}

	async CallbackError(error: any) {
		let code = safeGet<number>(error, "code");
		if (code === 0) {
			return asyncCheck({ data: error });
		}
		this.log(error, true);
		return Promise.reject(error);
	}

	get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
		const axios = this.getAxios();
		return axios.get<T, R>(url, config);
	}

	delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
		const axios = this.getAxios();
		return axios.delete(url, config);
	}

	getUri(config?: AxiosRequestConfig): string {
		const axios = this.getAxios();
		return axios.getUri(config);
	}

	head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
		const axios = this.getAxios();
		return axios.head(url, config);
	}

	options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
		const axios = this.getAxios();
		return axios.options(url, config);
	}

	patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
		const axios = this.getAxios();
		return axios.patch(url, data, config);
	}

	post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
		const axios = this.getAxios();
		return axios.post(url, data, config);
	}

	put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
		const axios = this.getAxios();
		return axios.put(url, data, config);
	}

	request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> {
		const axios = this.getAxios();
		return axios.request(config);
	}

	protected getAxios(): Axios {
		const env = getEnv();
		const config = {
			timeout: timeoutValue, // 超时时间
			baseURL: isRequest(this.lang) ? env.VITE_LanApi : env.api, // 根据当前环境配置接口域名
			withCredentials: false,
			maxRedirects: 3, // 支持三次重定向
		};
		const axios = AxiosHttp.create(config);
		// 响应前拦截
		axios.interceptors.request.use(this.requestCallback, this.CallbackError)
		// 响应好拦截
		axios.interceptors.response.use(this.responseCallback, this.CallbackError);
		return axios;
	}

	protected getRequest(): Request | undefined {
		if (isRequest(this.lang)) {
			return this.lang as Request;
		}
	}
}

export default Dao;
