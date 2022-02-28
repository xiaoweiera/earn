/**
 * @file 构造请求对象
 */

import Axios from "./axios";
import {getEnv} from "src/config/";
import {Lang} from "src/types/language";

// 根据环境变量设置接口地址
const service = function (value?: Lang, production?: boolean) {
	if (production) {
		const env = getEnv();
		return Axios(value, {
			baseURL: env.VITE_productionApi, // 生产环境接口域名
		});
	}
	return Axios(value);
};

export default service;
