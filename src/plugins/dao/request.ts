/**
 * @file 构造请求对象
 */
import Http from "./http"
import {Lang} from "src/types/language";
import { productionAPI } from "src/config/";

// 线上环境专用
const service = function (value: Lang) {
	return Http(value, {
		baseURL: productionAPI,
	})
};

export default service
