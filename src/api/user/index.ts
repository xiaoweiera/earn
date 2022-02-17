/**
 * @file 项目库
 */
import ApiTemplate from "../template";
import * as api from "src/config/api";
import getLang  from "src/utils/url/lang";
import request from "src/plugins/dao/service";
import { User } from "src/types/common/user";
import { asyncCheck } from "src/plugins/dao/response";


export default class extends ApiTemplate{
	// 获取用户详情
	getInfo () {
		return asyncCheck<User>(request(this.lang).get(api.user.info))
	}
	// 邮箱重置密码
	resetEmailPassword(query: object) {
		const lang = getLang(this.lang);
		const value = { ...query, lang };
		return asyncCheck(request(this.lang).post(api.user.resetEmailPassword, value));
	}
	// 获取邮箱验证码
	getEmailCaptcha(params: any, type: string) {
		const lang = getLang(this.lang);
		const data = { ...params, forget_type: type, lang };
		return asyncCheck(request(this.lang).post(api.user.getEmailCaptcha, data));
	}
	// 邮箱注册
	registerEmail (data: object) {
		const lang = getLang(this.lang);
		const value = { ...data, lang }
		return asyncCheck(request(this.lang).post(api.user.registerEmail, value))
	}
}
