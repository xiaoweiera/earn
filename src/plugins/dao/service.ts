/**
 * @file 构造请求对象
 */

import Axios from "./axios";
import {Lang} from "src/types/language";

// 根据环境变量设置接口地址
const service = function (value?: Lang) {
	return Axios(value);
};

export default service;
