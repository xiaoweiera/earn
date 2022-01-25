/**
 * @file 解析 url 参数
 * @author svon.me@gmail.com
 */

import parse from "./parse";
import safeGet from "@fengqiaogang/safe-get";

export const getQuery = function (url: string, key?: string) {
	if (url) {
		const data = parse(url);
		if (data && data.query) {
			if (key) {
				return safeGet<string>(data.query, key);
			}
			return data.query;
		}
	}
}
