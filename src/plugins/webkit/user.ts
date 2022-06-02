/**
 * @file 与 ios / android 交互
 * @author svon.me@gmail.com
 */

import window from "src/plugins/browser/window";

// ios 登录
export const IosLogin = function (): boolean {
  try {
    // @ts-ignore
    window.webkit.messageHandlers.userLogin.postMessage(true);
    return true;
  } catch (e) {
    return false;
  }
};
// android 登录
export const AndroidLogin = function (): boolean {
  try {
    // @ts-ignore
    window.kingdata.userLogin(true);
    return true;
  } catch (e) {
    return false;
  }
};
// 调用 app 登录
export const Login = function () {
  if (IosLogin()) {
    return true;
  }
  return AndroidLogin();
};

// ios 返回
export const IosGoBack = function (): boolean {
  try {
    // @ts-ignore
    window.webkit.messageHandlers.goBack.postMessage(true);
    return true;
  } catch (e) {
    return false;
  }
};
// android 返回
export const AndroidGoBack = function (): boolean {
  try {
    // @ts-ignore
    window.kingdata.goBack(true);
    return true;
  } catch (e) {
    return false;
  }
};
// 调用 app 返回功能
export const goBack = function () {
  if (IosGoBack()) {
    return true;
  }
  return AndroidGoBack();
};

// 调用 ios 邮箱修改方法
export const IosUpdateEmail = function (): boolean {
  try {
    // @ts-ignore
    window.webkit.messageHandlers.userUpdateEmail.postMessage(true);
    return true;
  } catch (e) {
    return false;
  }
};
// 调用 android 邮箱修改方法
export const AndroidUpdateEmail = function (): boolean {
  try {
    // @ts-ignore
    window.kingdata.userUpdateEmail(true);
    return true;
  } catch (e) {
    return false;
  }
};
// 修改用户邮箱
export const UpdateEmail = function () {
  if (IosUpdateEmail()) {
    return true;
  }
  return AndroidUpdateEmail();
};
