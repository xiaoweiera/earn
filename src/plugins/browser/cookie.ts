/**
 * @file 操作 cookie
 */

import jsCookie from "js-cookie";
import { Equals } from "src/utils/";
import * as webkit from "src/plugins/webkit/";
import { Device } from "src/types/common/device";
import { tokenName, tokenExpires, deviceName, getEnv } from "src/config/";
import { removeAuthInfo as removeUserToken } from "src/plugins/express/authorization";

const tidingName = "last_timestamp";

// 添加凭证
export const addUserToken = function(value: string) {
	const env = getEnv();
	jsCookie.set(tokenName, value, {
		domain: env.VITE_cookie,
		path: '/',
		expires: new Date(Date.now() + tokenExpires)
	});
}
// 获取当前设备类型
export const getDeviceValue = async function (): Promise<Device> {
	// 尝试获取 native(ios, android) 设备类型
	const process = await webkit.env.process();
	if (process && process.device) {
		return process.device;
	}
	// 从 cookie 获取
	const value = jsCookie.get(deviceName);
	if (value) {
		if (Equals(value, Device.app) || Equals(value, Device.ios) || Equals(value, Device.android)) {
			return Device.app;
		}
	}
	// 默认 web
	return Device.web;
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
	const env = getEnv();
	const value = jsCookie.get(tidingName) || '';
	const time = Date.now() / 1000;
	const now = parseInt(time as any);
	jsCookie.set(tidingName, `${now}`,{
		domain: env.VITE_cookie,
		path: '/',
		expires: 365
	});
	return value;
}
