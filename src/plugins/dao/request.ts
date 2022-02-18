/**
 * @file 构造请求对象
 */
import Http from "./http"
import {Lang} from "src/types/language";

// 线上环境专用
const service = function (value: Lang) {
	return Http(value, {
		baseURL: "https://kingdata.xyz", // 生产环境接口域名
	})
};

export default service
