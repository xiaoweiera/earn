/**
 * @file 操作 cookie
 */
import jsCookie from "js-cookie";
import { tokenName, tokenExpires, deviceName } from "src/config/";
import getDomain from "./domain";

const tidingName = 'last_timestamp';

// 删除凭证
export const removeUserToken = function() {
	const domain = getDomain();
	jsCookie.remove(tokenName, {
		domain,
		path: '/',
	})
}

// 添加凭证
export const addUserToken = function(value: string) {
	const domain = getDomain();
	jsCookie.set(tokenName, value, {
		domain,
		path: '/',
		expires: new Date(Date.now() + tokenExpires)
	});
}


// 修改设备类型
export const setDeviceValue = function(value: string = "") {
	const domain = getDomain()
	jsCookie.set(deviceName, value, {
		domain,
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
