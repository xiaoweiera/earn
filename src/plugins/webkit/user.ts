/**
 * @file 与 ios / android 交互
 * @author svon.me@gmail.com
 */

import window from "src/plugins/browser/window";

export const IosLogin = function(): boolean {
  // alert('尝试调用 ios')
  try {
    // @ts-ignore
    window.webkit.messageHandlers.userLogin.postMessage(true);
    return true
  } catch (e) {
    return false
  }
}
export const AndroidLogin = function(): boolean {
  // alert('尝试调用 android')
  try {
    // @ts-ignore
    window.kingdata.userLogin(true);
    return true
  } catch (e) {
    return false
  }
}

export const Login = function() {
  if (IosLogin()) {
    return true
  }
  return AndroidLogin();
}
