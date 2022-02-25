/**
 * @file 扩展 http 功能
 * @author svon.me@gmail.com
 * @description 根据某些场景做一些处理
 */

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
