/**
 * @file 构造请求对象
 */

import service from "./service";
import {Lang} from "src/types/language";

// 线上环境专用
const request = function (value: Lang) {
	return service(value, true);
};

export default request
