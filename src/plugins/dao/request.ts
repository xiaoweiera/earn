/**
 * @file 构造请求对象
 */
import Axios from "./axios"
import {getEnv} from "src/config/";
import {Lang} from "src/types/language";

// 线上环境专用
const service = function (value: Lang) {
	const env = getEnv();
	return Axios(value, {
		baseURL: env.VITE_productionApi, // 生产环境接口域名
	});
};

export default service
