/**
 * @file 构造请求对象
 */

import Http from "./http";
import {Lang} from "src/types/language";

// 根据环境变量设置接口地址
const service = function (value?: Lang) {
	return Http(value);
};

export default service;
