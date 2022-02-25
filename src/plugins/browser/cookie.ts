/**
 * @file 操作 cookie
 */

import jsCookie from "js-cookie";
import { Equals } from "src/utils/";
import {Request, Response} from "express";
import safeGet from "@fengqiaogang/safe-get";
import * as webkit from "src/plugins/webkit/";
import { Device } from "src/types/common/device";
import {tokenName, tokenExpires, deviceName, getEnv, IsSSR} from "src/config/";

const tidingName = "last_timestamp";

export default class Cookie {
	private readonly req?: Request;
	private readonly res?: Response;
	constructor(req?: Request, res?: Response) {
		this.req = req;
		this.res = res;
	}
	private static cookieOption(expires: number = 0) {
		const env = getEnv();
		const option = {
			path: '/',
			domain: env.VITE_cookie,
		}
		if (expires && expires > 0) {
			Object.assign(option, {
				expires: new Date(Date.now() + expires)
			});
		}
		return option;
	}
	// 获取
	get(name: string): string | undefined {
		if (this.req) {
			return safeGet<string>(this.req.cookies, name);
		} else {
			return jsCookie.get(name);
		}
	}
	// 设置
	set(name: string, value: string, expires: number = 0) {
		if (this.res) {
			return this.res.cookie(name, value, Cookie.cookieOption(expires));
		} else {
			return jsCookie.set(name, value, Cookie.cookieOption(expires));
		}
	}
	remove(name: string) {
		if (this.res) {
			return this.res.clearCookie(name, Cookie.cookieOption());
		} else {
			return jsCookie.remove(name, Cookie.cookieOption());
		}
	}
	// 获取用户 token
	async getUserToken () {
		if (IsSSR()) {
			if (this.req) {
				return this.get(tokenName);
			}
			return void 0;
		}
		// 从移动端获取用户信息
		const process = await webkit.env.process();
		if (process && process.token) {
			return process.token;
		}
		return this.get(tokenName);
	}
	// 修改用户信息
	setUserToken (value?: string) {
		if (value) {
			return this.set(tokenName, value, tokenExpires);
		} else {
			return this.removeUserToken();
		}
	}
	// 删除用户信息
	removeUserToken() {
		return this.remove(tokenName);
	}
	async getDeviceValue () {
		// 从移动端获取用户信息
		const process = await webkit.env.process();
		if (process && process.device) {
			if (Equals(process.device, Device.app) || Equals(process.device, Device.ios) || Equals(process.device, Device.android)) {
				return Device.app;
			}
		}
		return this.get(deviceName) || Device.web;
	}
	setDeviceValue(value?: string) {
		if (value) {
			return this.set(deviceName, value);
		} else {
			return this.removeDeviceValue();
		}
	}
	removeDeviceValue () {
		return this.remove(deviceName);
	}

	getTidingTime() {
		const value = this.get(tidingName) || '';
		const time = Date.now() / 1000;
		const now = parseInt(time as any);
		const option = Cookie.cookieOption(1000 * 60 * 60 * 24 * 365);
		jsCookie.set(tidingName, `${now}`,option);
		return value;
	}
}

