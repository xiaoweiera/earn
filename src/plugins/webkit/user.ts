/**
 * @file 与 ios / android 交互
 * @author svon.me@gmail.com
 */

import window from "src/plugins/browser/window";

export const IosLogin = function (): boolean {
  // alert('尝试调用 ios')
  try {
    // @ts-ignore
    window.webkit.messageHandlers.userLogin.postMessage(true);
    return true;
  } catch (e) {
    return false;
  }
};
export const AndroidLogin = function (): boolean {
  // alert('尝试调用 android')
  try {
    // @ts-ignore
    window.kingdata.userLogin(true);
    return true;
  } catch (e) {
    return false;
  }
};

export const Login = function () {
  if (IosLogin()) {
    return true;
  }
  return AndroidLogin();
};

// 调用 ios 邮箱修改方法
export const IosUpdateEmail = function (token: string): boolean {
  try {
    // @ts-ignore
    window.webkit.messageHandlers.userUpdateEmail.postMessage(token);
    return true;
  } catch (e) {
    return false;
  }
};
// 调用 android 邮箱修改方法
export const AndroidUpdateEmail = function (token: string): boolean {
  try {
    // @ts-ignore
    window.kingdata.userUpdateEmail(token);
    return true;
  } catch (e) {
    return false;
  }
};

export const UpdateEmail = function (token = "") {
  if (IosUpdateEmail(token)) {
    return true;
  }
  return AndroidUpdateEmail(token);
};
