/**
 * @file 构造请求对象
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import Cookie from "js-cookie";
import {Request} from "express";
import I18n from "src/utils/i18n";
import { getEnv, tokenName } from "src/config/";
import { Lang } from "src/types/language";
import safeSet from "@fengqiaogang/safe-set";
import safeGet from "@fengqiaogang/safe-get";
import { Authorization } from "../express/authorization";
import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// 用户信息
const getUserAuth = function (config: AxiosRequestConfig, lang?: Lang) {
	const tokenKey = "token";
	const paramKey = "params";
	const dataKey = "data";
	let token: string = '';
	if (lang && _.isObject(lang)) {
		const value = Authorization(lang as Request);
		token = safeGet<string>(value, tokenKey);
	}else {
		const value = Cookie.get(tokenName);
		if (value) {
			token = value;
		}
	}
	if (token) {
		return token;
	}

	// 从 Get 参数中获取 token
	token = safeGet<string>(config, `${paramKey}.${tokenKey}`);
	if (token) {
		const value = _.omit(safeGet<object>(config, paramKey), [tokenKey]);
		safeSet(config, paramKey, value);
		return token;
	}
	// 从 Post 参数中获取 token
	token = safeGet<string>(config, `${dataKey}.${tokenKey}`);
	if (token) {
		const value = _.omit(safeGet<object>(config, dataKey), [tokenKey]);
		safeSet(config, dataKey, value);
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

const Dao = function (lang?: Lang, option?: AxiosRequestConfig): AxiosInstance {
	const env = getEnv();
	const setting = Object.assign(
		{
			timeout: 100 * 1000, // request timeout
			baseURL: env.api, // 根据当前环境配置接口域名
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
				// 设置 token
				const token = getUserAuth(config, lang);
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
			// 	config.url = i18n.template(config.url, parameter)
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
				console.log(res);
				return Promise.reject("error");
			}
		},
		(error) => Promise.reject(error),
	)
	return service;
}

export default Dao;
