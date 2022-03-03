/**
 * @file 扩展 http 功能
 * @author svon.me@gmail.com
 * @description 根据某些场景做一些处理
 */

import service from "./service";
import {isFunction, isObject} from "src/utils/";
import safeGet from "@fengqiaogang/safe-get";
import {makeKey, getClient} from "src/plugins/redis/";
import { asyncCheck } from "src/plugins/dao/response";

export * from "src/utils/decorate";

/**
 * @file 是否对 token 做判断
 * @param status = true / false
 * @description 等于 true 时如果当前环境为未登录状态则会不进行 http 请求, 等于 false 当前请求则不会携带 token
 */
export const userToken = function (status: boolean = false) {
	return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
		const app = descriptor.value;
		descriptor.value = async function (...args: any[]) {
			const self = this;
			const _user = status ? "required" : "none";
			const [query, callback] = await app.apply(self, args);
			if (query && isObject(query)) {
				return [{ ...query, _user }, callback];
			}
			return [{ _user }, callback];
		}
	};
};
// 缓存时间
export enum cache {
	min1 = 1000 * 60,
	min2 = 1000 * 60 * 2,
	min5 = 1000 * 60 * 5,
	min10 = 1000 * 60 * 10,
	min30 = 1000 * 60 * 30,
	hour1 = 1000 * 60 * 60,
	hour2 = 1000 * 60 * 60 * 2,
	hour12 = 1000 * 60 * 60 * 12,
	day1 = 1000 * 60 * 60 * 24,
	day2 = 1000 * 60 * 60 * 24 * 2,
}

/**
 * @file get 请求
 * @param url 请求地址
 * @param cacheTime 缓存时间
 * @param production 是否强制调用线上环境接口
 */
export const get = function (url: string, cacheTime = 0, production?: boolean) {
	return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
		const app = descriptor.value;
		descriptor.value = async function (...args: any[]) {
			const self: any = this;
			const [ params = {}, callback ]: [ object, (value?: any) => any ] = await Promise.resolve(app.apply(self, args));

			const key = makeKey("get", url, params);
			const redis = getClient();
			if (redis) {
				const value = await redis.get(key);
				if (value) {
					const d = JSON.parse(value);
					return safeGet<any>(d, "v");
				}
			}
			const http = service(self.lang, production);
			let result = await asyncCheck(http.get(url, { params }));
			if (callback && isFunction(callback)) {
				result = await callback(result);
			}
			if (result && redis && cacheTime > 0) {
				await redis.set(key, JSON.stringify({ v: result }));
				await redis.expire(key, cacheTime);
			}
			return result;
		}
	};
}
/**
 * @file post 请求
 * @param url 请求地址
 * @param cache 缓存时间
 * @param production 是否强制调用线上环境接口
 */
export const post = function (url: string, cache = 0, production?: boolean) {
	return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
		const app = descriptor.value;
		descriptor.value = async function (...args: any[]) {
			const self: any = this;
			const [ data = {}, callback ]: [ object, (value?: any) => void ] = await Promise.resolve(app.apply(self, args));
			const _user = safeGet<string>(data, "_user");

			const http = service(self.lang, production);
			const result = await asyncCheck(http.post(url, data, {
				params: { _user }
			}));
			if (callback && isFunction(callback)) {
				return callback(result);
			}
			return result;
		}
	};
}
