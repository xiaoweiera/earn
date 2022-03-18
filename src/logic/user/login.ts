/**
 * @file 登录框
 */

import API from "src/api/index";
import Cookie from "src/plugins/browser/cookie";
import * as console from "src/plugins/log";
import { userLogin } from "src/config/";
import { ref } from "vue";
import { getValue } from "src/utils/root/data";
import * as alias from "src/utils/root/alias";
import type { User } from "src/types/common/user";

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
  const user = getValue<User>(alias.common.user, {} as User);
  return !!(user && user.id);
};

// 显示登录框
export const showLogin = function () {
  switchStatus.value = FlagStatus.emailLogin; // 登录
  visible.value = true;
};
// 关闭登录框
export const hiddenLogin = function () {
  switchStatus.value = FlagStatus.none; // 登录
  visible.value = false;
};

// 显示注册框
export const showRegister = function () {
  switchStatus.value = FlagStatus.emailRegister; // 注册
  visible.value = true;
};

// 通过邮箱找回密码
export const emailForget = function () {
  switchStatus.value = FlagStatus.emailForget;
  visible.value = true;
};
export const mobileForget = function () {
  switchStatus.value = FlagStatus.mobileForget;
  visible.value = true;
};

// 刷新用户凭证
export const refresh = async function () {
  const cookie = new Cookie();
  const token = await cookie.getUserToken();
  // 如果 token 不存在，则用户为未登录状态
  if (!token) {
    return false;
  }
  const userAt = cookie.get(userLogin);
  // 记录的登录时间还存在
  if (userAt) {
    return true;
  }
  // 使用现有的 token 换新的 token
  const api = new API();
  const value = await api.user.refreshToken();
  console.info("old : ", token);
  console.info("new : ", value);
  if (value) {
    // 重新设置用户信息
    cookie.setUserToken(value);
  }
};
