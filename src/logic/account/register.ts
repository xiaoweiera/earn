/**
 * @file 邮箱注册
 * @author svon.me@gmail.com
 */


// 平台标识
import I18n from "src/utils/i18n";
import { toBoolean } from "src/utils";
import getLang  from "src/utils/url/lang";
import {toRaw, Ref, reactive} from "vue";
import * as webkit from "src/plugins/webkit/user";
import window  from "src/plugins/browser/window";
import { dashboard, languageKey } from "src/config/";
import { createHref } from "src/plugins/router/pack";

export const PlatformWeb = "web";

export interface FormData {
	checked: boolean; // 是否同意注册协议
	code: string; // 验证码
	invitation_code?: string; // 邀请码
	email: string; // 邮箱账号
	password: string; // 密码
	new_password?: string; // 密码
	platform?: string; // 平台标识
	token?: string; // 人机校验签名
}

export const createFormData = function (value?: FormData) {
	const data = {
		checked: false, // 注册协议
		code: "", // 验证码
		invitation_code: "", // 邀请码
		email: "", // 邮箱账号
		password: "", // 密码
		platform: void 0, // 平台标识
		token: "", // 人机校验签名
	};
	if (value) {
		return reactive<FormData>({ ...data, ...value });
	}
	return reactive<FormData>(data);
}

export const rules = function () {
	const i18n = I18n();
	return {
		checked: [
			{
				required: true,
				type: 'boolean',
				trigger: ['blur', 'change'],
				message: i18n.common.message.checked
			},
			{
				type: 'boolean',
				trigger: ['blur', 'change'],
				message: i18n.common.message.checked,
			}, {
				trigger: ['blur', 'change'],
				validator(rule: any, value: boolean, callback: any) {
					if (toBoolean(value)) {
						callback();
					} else {
						callback(i18n.common.message.checked);
					}
				},
			}
		],
		// 邮箱
		email: [
			{
				required: true,
				type: 'string',
				trigger: ['blur', 'change'],
				message: i18n.common.placeholder.email
			},
			{
				required: true,
				type: 'email',
				trigger: ['blur', 'change'],
				message: i18n.common.message.mailError
			}
		],
		// 验证码
		code: [
			{
				required: true,
				type: 'string',
				trigger: ['blur', 'change'],
				message: i18n.common.placeholder.verification
			}, {
				trigger: ['blur'],
				type: 'string',
				pattern: /^[0-9]{6}$/i,
				message: i18n.common.message.verificationError
			},
		],
		// 密码校验
		password: [
			{
				required: true,
				type: 'string',
				trigger: ['blur', 'change'],
				message: i18n.common.placeholder.password,
			},
			{
				type: 'string',
				trigger: ['blur', 'change'],
				pattern: /^.{6,24}$/,
				message: i18n.common.message.passwordError,
			},
		],
		invitation_code: [
			{
				type: 'string',
				trigger: ['blur'],
				pattern: /^[\w-+]{4,}$/,
				message: i18n.common.user.invite,
			}
		]
	};
}

export const checkedNewPassword = function (data: FormData) {
	const i18n = I18n();
	return [
		{
			required: true,
			type: 'string',
			trigger: ['blur', 'change'],
			message: i18n.common.placeholder.new_password
		},
		{
			type: 'string',
			trigger: ['blur', 'change'],
			pattern: /^.{6,24}$/,
			message: i18n.common.message.passwordError,
		}, {
			trigger: ['blur', 'change'],
			validator(rule: any, value: string, callback: any) {
				if (data.password === value) {
					callback();
				} else {
					callback(i18n.common.message.new_password);
				}
			}
		}
	]
};


// 验证整个表单的值
export const checkValidate = function (form: Ref) {
	const dom = toRaw(form).value
	if (dom) {
		return dom.validate();
	}
	return false;
}
// 单独验证邮箱
export const checkValidateEmail = function (form: Ref) {
	const dom = toRaw(form).value;
	if (dom) {
		return new Promise((resolve, reject) => {
			dom.validateField(['email'], (error: Error) => {
				if (error) {
					reject(error);
				} else {
					// @ts-ignore
					resolve();
				}
			});
		});
	}
	return false;
}

export const resetFields = function (form?:any) {
	if(form){
		try {
			const dom = toRaw(form).value;
			if (dom && dom.resetFields) {
				dom.resetFields();
			}
		} catch (e) {
			console.log(e);
			// todo
		}
	}
}

// 登录
export const onGoBack = function (form?:any) {
	resetFields(form);
	// 唤起移动端登录功能
	if (webkit.Login()) {
		return true;
	} else {
		const query = {
			[languageKey]: getLang()
		};
		// 进入站点首页
		window.location.href = createHref(dashboard, query);
	}
}
