/**
 * @file 从页面缓存中读取数据
 * @author svon.me@gmail.com
 */
import _ from "lodash";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";

const cache = {};

export const set = function (data: object) {
	_.each(data, function (value: any, key: string) {
		safeSet(cache, key, value);
	});
}

const get = function <T>(name?: string): T {
	if (name) {
		return safeGet<T>(cache, name);
	}
	return { ...cache } as T;
}

export default get;
