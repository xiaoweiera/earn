/**
 * @file 项目库
 */
import _ from "lodash";
import ApiTemplate from "../template";
import * as api from "src/config/api";
import getLang  from "src/utils/url/lang";
import request from "src/plugins/dao/service";
import { User } from "src/types/common/user";
import safeGet from "@fengqiaogang/safe-get";
import Cookie from "src/plugins/browser/cookie";
import { asyncCheck } from "src/plugins/dao/response";


export default class extends ApiTemplate{
	// 获取用户详情
	getInfo () {
		return asyncCheck<User>(request(this.lang).get(api.user.info));
	}
	// 手机号重置密码
	resetMobilePassword(data: object) {
		const lang = getLang(this.lang);
		const value = { ...data, lang };
		return asyncCheck(request(this.lang).post(api.user.resetMobilePassword, value));
	}
	// 邮箱重置密码
	resetEmailPassword(data: object) {
		const lang = getLang(this.lang);
		const value = { ...data, lang };
		return asyncCheck(request(this.lang).post(api.user.resetEmailPassword, value));
	}
	// 获取邮箱验证码
	getEmailCaptcha(params: any, type: string) {
		const lang = getLang(this.lang);
		const data = { ...params, forget_type: type, lang };
		return asyncCheck(request(this.lang).post(api.user.getEmailCaptcha, data));
	}

	// 获取手机验证码
	getMobileCaptcha(params: any, type: string): Promise<any> {
		const lang = getLang(this.lang);
		const value = Object.assign({ area_code: '+86' }, params, { type, lang });
		return asyncCheck(request(this.lang).post(api.user.getMobileCaptcha, value));
	}

	// 邮箱注册
	registerEmail (data: object) {
		const lang = getLang(this.lang);
		const value = { ...data, lang };
		return asyncCheck(request(this.lang).post(api.user.registerEmail, value));
	}
	// 邮箱登录
	async emailLogin (data: object): Promise<User | undefined> {
		const lang = getLang(this.lang);
		const value = Object.assign({ lang }, _.pick(data, ["email", "password"]));
		try {
			const result: User = await asyncCheck(request(this.lang).post(api.user.emailLogin, value));
			const token = safeGet<string>(result, "token");
			if (token) {
				const cookie = new Cookie();
				cookie.setUserToken(token);
				return result;
			} else {
				return Promise.reject(result);
			}
		} catch (e) {
			return Promise.reject(e);
		}
	}
	// 手机号登录
	async mobileLogin (data: object): Promise<User | undefined> {
		const lang = getLang(this.lang);
		const value = Object.assign({ lang }, _.pick(data, ["mobile", "password", "area_code"]));
		try {
			const result: User = await asyncCheck(request(this.lang).post(api.user.mobileLogin, value));
			const token = safeGet<string>(result, "token");
			if (token) {
				const cookie = new Cookie();
				cookie.setUserToken(token);
				return result;
			} else {
				return Promise.reject(result);
			}
		} catch (e) {
			return Promise.reject(e);
		}
	}
}
