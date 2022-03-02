/**
 * @file 构造请求对象
 * @author svon.me@gmail.com
 */

import {omit} from "lodash";
import {Request} from "express";
import I18n from "src/utils/i18n";
import {Lang} from "src/types/language";
import safeSet from "@fengqiaogang/safe-set";
import safeGet from "@fengqiaogang/safe-get";
import Cookie from "src/plugins/browser/cookie";
import {getEnv, languageKey} from "src/config/";
import {Equals, isObject, isRequest} from "src/utils/";
import Axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

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

const Dao = function (lang?: Lang, option?: AxiosRequestConfig): AxiosInstance {
	const env = getEnv();
	const setting = Object.assign(
		{
			timeout: 20 * 1000, // request timeout
			baseURL: isRequest(lang) ? env.VITE_LanApi : env.api, // 根据当前环境配置接口域名
			withCredentials: false,
			maxRedirects: 3, // 支持三次重定向
		},
		option || {},
	);
	const service = Axios.create(setting);

	service.interceptors.request.use(
		async (config: AxiosRequestConfig) => {
			const i18n = I18n(lang);
			const current: string = i18n.getLang();
			const status = isKindDataDomain(config);
			if (status) {
				let token: string | undefined;
				// 判断是否需要传用户信息
				const userStatus = safeGet<string>(config, "params._user");
				if (userStatus && Equals(userStatus, "none")) {
					token = "";
				} else {
					// 获取 token
					token = await getUserAuth(config, lang);
				}
				if (userStatus && Equals(userStatus, "required") && !token) {
					throw {
						code: 0,
						data: null
					}
				}
				if (token) {
					safeSet(config, "headers.Authorization", `Token ${token}`);
				}
				// 设置当前系统语言环境
				safeSet(config, `params.${languageKey}`, current);
				safeSet(config, "headers.accept-language", current);
				safeSet(config, 'params', omit(config.params, [ "_user" ]));
			}
			// 处理 url 中的变量
			const parameter: any = {
				...env,
				language: current, // 当前环境语言类型
				version: env.ApiVersion,  // API 版本
			};
			if (config.params) {
				Object.assign(parameter, config.params);
			}
			if (config.data) {
				Object.assign(parameter, config.data);
			}
			if (config.url) {
				/**
				 * 借助 i18n 模块中的 template 可以对字符串中的变量进行替换
				 * const url = "xxx/{id}/{name}/xxx"
				 * const params = { id: "1", name: "aaa" }
				 * 替换后为 "xxx/1/aaa/xxx"
				 */
				config.url = i18n.template(config.url, parameter)
			}
			return config;
		},
		(error) => Promise.reject(error),
	)
	service.interceptors.response.use(
		(res: AxiosResponse) => {
			const url = safeGet<string>(res, "request.res.responseUrl") || safeGet<string>(res, "request.responseURL") || safeGet<string>(res, "config.url");
			const status = parseInt(res.status as any, 10);
			if (status >= 200 && status < 300) {
				console.log('API Success %s, %s, %s', res.status, res.config.method, url, res.config.params);
				return res;
			} else {
				console.log('API Error %s, %s, %s', res.status, res.config.method, url, res.config.params);
				return Promise.reject(res);
			}
		},
		(error) => {
			let code = safeGet<number>(error, "code");
			if (code === 0) {
				return Promise.resolve(error);
			}
			const method = safeGet<string>(error, "config.method");
			const url = safeGet<string>(error, "config.url");
			const params = safeGet<string>(error, "config.params") || {};
			const data = safeGet<string>(error, "config.data") || {};
			console.log('API Error %s, %s', method, url, { ...params, ...data });
			return Promise.reject(error)
		},
	)
	return service;
}

export default Dao;
