/**
 * @file 扩展 http 功能
 * @author svon.me@gmail.com
 * @description 根据某些场景做一些处理
 */

import request from "src/plugins/dao/request";
import service from "src/plugins/dao/service";

export * from "src/utils/decorate";

/**
 * @file 是否对 token 做判断
 * @param status = true / false
 * @description 等于 true 时如果当前环境为未登录状态则会不进行 http 请求, 等于 false 当前请求则不会携带 token
 */
export const userToken = function (status: boolean = false) {
	return function(target: any, methodName: string, descriptor: PropertyDescriptor) {
		const app = descriptor.value;
		descriptor.value = async function (...args: any[]) {
			const self = this;
			args.push({
				_user: status ? "required" : "none"
			});
			return app.apply(self, args);
		}
	};
};

const http = function (target: any, methodName: string, descriptor: PropertyDescriptor) {
	const app = descriptor.value;
	descriptor.value = async function (data: object) {
		const self = this;
		const [query, callback]:[object, (value?: any) => void] = await Promise.resolve(app.apply(self, args));

	}
}

/**
 * @file get 请求
 * @param url 请求地址
 * @param production 是否强制调用线上环境接口
 */
export const get = function (url: string, production?: boolean) {
	return function() {

	};
}
/**
 * @file post 请求
 * @param url 请求地址
 * @param production 是否强制调用线上环境接口
 */
export const post = function (url: string, production?: boolean) {

}
