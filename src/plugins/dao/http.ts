/**
 * @file 构造请求对象
 * @author svon.me@gmail.com
 */

import {Request} from "express";
import I18n from "src/utils/i18n";
import { Lang } from "src/types/language";
import safeSet from "@fengqiaogang/safe-set";
import safeGet from "@fengqiaogang/safe-get";
import { isObject, Equals } from "src/utils/";
import * as webkit from "src/plugins/webkit/";
import { getEnv, languageKey, IsSSR } from "src/config/";
import { Authorization } from "../express/authorization";
import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// 用户信息
const getUserAuth = async function (config: AxiosRequestConfig, lang?: Lang) {
	// 不传用户信息
	const _user = safeGet<string>(config, 'params._user');
	if (Equals(_user, 'none')) {
		return;
	}
	// 从 Request 对象中获取用户信息
	if (IsSSR() && lang && isObject(lang)) {
		const auth = Authorization(lang as Request);
		return auth.token;
	}
	// 从移动端获取用户信息
	const process = await webkit.env.process();
	if (process && process.token) {
		return process.token;
	}
	// 从浏览器 cookie 中获取
	const data = Authorization();
	return data.token;
}

// 判断请求的地址是否和业务域名相同
const isKindDataDomain = function(config: AxiosRequestConfig): boolean {
	return true
}

const Dao = function (lang?: Lang, option?: AxiosRequestConfig): AxiosInstance {
	const env = getEnv();
	const setting = Object.assign(
		{
			timeout: 20 * 1000, // request timeout
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
				const token = await getUserAuth(config, lang);
				if (token) {
					safeSet(config, "headers.Authorization", `Token ${token}`);
				}
				// 设置当前系统语言环境
				safeSet(config, `params.${languageKey}`, current);
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
