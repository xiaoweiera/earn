/**
 * @file 登录框
 */

import { ref } from "vue";
import {getValue} from "src/utils/ssr/ref";
import {User} from "src/types/common/user";

export enum FlagStatus {
	none = 0, // 空状态
	emailLogin = 1, // 邮箱登录
	emailRegister = 2, // 邮箱注册
	mobileLogin = 3, // 手机号登录
	emailForget = 4, // 通过邮箱找回密码
	mobileForget = 5, // 通过手机找回密码
}

// 是否已登录
export const switchStatus = ref<number>(FlagStatus.none); // 不做任何展示
// 展示弹窗
export const visible = ref<boolean>(false);

export const isLogin = function (): boolean {
	const user = getValue<User>("common.user", {} as User);
	return !!(user && user.id);
}

// 显示登录框
export const showLogin = function () {
	switchStatus.value = FlagStatus.emailLogin; // 登录
	visible.value = true;
}
// 关闭登录框
export const hiddenLogin = function () {
	switchStatus.value = FlagStatus.none; // 登录
	visible.value = false;
}

// 显示注册框
export const showRegister = function () {
	switchStatus.value = FlagStatus.emailRegister; // 注册
	visible.value = true;
}

// 通过邮箱找回密码
export const emailForget = function () {
	switchStatus.value = FlagStatus.emailForget;
	visible.value = true;
}
export const mobileForget = function () {
	switchStatus.value = FlagStatus.mobileForget;
	visible.value = true;
}
