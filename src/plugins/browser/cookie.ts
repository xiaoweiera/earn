/**
 * @file 操作 cookie
 */
import jsCookie from "js-cookie";
import getDomain from "./domain";
import { tokenName, tokenExpires, deviceName, getEnv } from "src/config/";

const tidingName = "last_timestamp";

// 删除凭证
export const removeUserToken = function() {
	const env = getEnv();
	jsCookie.remove(tokenName, {
		domain: env.VITE_cookie,
		path: '/',
	})
}

// 添加凭证
export const addUserToken = function(value: string) {
	const env = getEnv();
	jsCookie.set(tokenName, value, {
		domain: env.VITE_cookie,
		path: '/',
		expires: new Date(Date.now() + tokenExpires)
	});
}


// 修改设备类型
export const setDeviceValue = function(value: string = "") {
	const env = getEnv();
	jsCookie.set(deviceName, value, {
		domain: env.VITE_cookie,
		path: '/',
	})
}


export const setUserToken = function(value?: string) {
	if (value) {
		return addUserToken(value)
	} else {
		return removeUserToken()
	}
}

// 获取消息时间
export const getTidingTime = function () {
	const domain = getDomain();
	const value = jsCookie.get(tidingName) || '';
	const time = Date.now() / 1000;
	const now = parseInt(time as any);
	jsCookie.set(tidingName, `${now}`,{
		domain,
		path: '/',
		expires: 365
	});
	return value;
}
