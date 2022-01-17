/**
 * @file 从页面缓存中读取数据
 * @author svon.me@gmail.com
 */
import _ from "lodash";

const cache = new Map<string, any>();

export const set = function (data: object) {
	_.each(data, function (value: any, key: string) {
		cache.set(key, value);
	});
}

const get = function <T>(name?: string): T {
	if (name) {
		return cache.get(name) as any;
	}
	return Object.fromEntries(cache) as any
}

export default get;
