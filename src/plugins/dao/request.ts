/**
 * @file 构造请求对象
 */
import Http from "./http"
import {getEnv} from "src/config/";
import {isRequest} from "src/utils/";
import {Lang} from "src/types/language";

// 线上环境专用
const service = function (value: Lang) {
	const env = getEnv();
	if (isRequest(value)) {
		return Http(value, {
			baseURL: env.VITE_LanApi, // 生产环境接口域名
		});
	}
	return Http(value, {
		baseURL: env.VITE_api, // 生产环境接口域名
	});
};

export default service
