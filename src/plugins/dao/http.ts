/**
 * @file 构造请求对象
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import { getEnv } from "src/config/";
import safeSet from "@fengqiaogang/safe-set";
import safeGet from "@fengqiaogang/safe-get";
import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// 用户信息
const getUserAuth = function (config: AxiosRequestConfig) {
	const tokenName = "token";
	const paramName = "params";
	const dataName = "data";
	// 从 Get 参数中获取 token
	let token = safeGet<string>(config, `${paramName}.${tokenName}`);
	if (token) {
		const value = _.omit(safeGet<object>(config, paramName), [tokenName]);
		safeSet(config, paramName, value);
		return token;
	}
	// 从 Post 参数中获取 token
	token = safeGet<string>(config, `${dataName}.${tokenName}`);
	if (token) {
		const value = _.omit(safeGet<object>(config, dataName), [tokenName]);
		safeSet(config, dataName, value);
		return token;
	}
}

// 判断请求的地址是否和业务域名相同
const isKindDataDomain = function(config: AxiosRequestConfig): boolean {
	return true
}

// 判断是否需要缓存
const getCacheStatus = function(config: AxiosRequestConfig): boolean {
	return !!safeGet<any>(config, "params.cache");
}

const Dao = function (option?: AxiosRequestConfig): AxiosInstance {
	const env = getEnv();
	const setting = Object.assign(
		{
			timeout: 5 * 1000, // request timeout
			baseURL: env.api,
			withCredentials: false,
			maxRedirects: 3, // 支持三次重定向
		},
		option || {},
	);
	const service = Axios.create(setting);

	service.interceptors.request.use(
		async (config: AxiosRequestConfig) => {
			const current = env.lang;
			const status = isKindDataDomain(config);
			if (status) {
				// 设置 token
				const token = getUserAuth(config);
				if (token) {
					safeSet(config, "headers.Authorization", `Token ${token}`);
				}
				// 设置当前系统语言环境
				safeSet(config, "params.lang", current);
				safeSet(config, "headers.accept-language", current);
			}
			// 处理 url 中的变量
			const parameter: any = {
				language: current, // 当前环境语言类型
				version: env.ApiVersion,  // API 版本
			};
			if (config.params) {
				Object.assign(parameter, config.params);
			}
			if (config.data) {
				Object.assign(parameter, config.data);
			}
			// if (config.url) {
			// 	/**
			// 	 * 借助 i18n 模块中的 template 可以对字符串中的变量进行替换
			// 	 * const url = "xxx/{id}/{name}/xxx"
			// 	 * const params = { id: "1", name: "aaa" }
			// 	 * 替换后为 "xxx/1/aaa/xxx"
			// 	 */
			// 	config.url = I18n.template(config.url, parameter)
			// }
			return config;
		},
		(error) => Promise.reject(error),
	)
	service.interceptors.response.use(
		(res) => {
			const status = parseInt(res.status as any, 10);
			if (status >= 200 && status < 300) {
				return res;
			} else {
				return Promise.reject("error");
			}
		},
		(error) => Promise.reject(error),
	)
	return service;
}

export default Dao;
