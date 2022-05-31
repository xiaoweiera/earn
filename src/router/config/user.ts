/**
 * @file 用户相关路由配置
 * @author svon.me@gmail.com
 */

import { config } from "./option";

export class Router {
  // 个人中心
  account() {
    return config.user.index;
  }

  accountPattern() {
    return this.account();
  }

  // 登录
  login() {
    return config.user.login;
  }

  loginPattern() {
    return this.login();
  }

  // 退出
  logout() {
    return config.user.logout;
  }

  logoutPattern() {
    return this.logout();
  }

  //注册
  register() {
    return config.user.register;
  }

  registerPattern() {
    return this.register();
  }

  // 找回密码
  forget() {
    return config.user.forget;
  }

  forgetPattern() {
    return this.forget();
  }

  // 修改邮箱
  updateEmail() {
    return config.user.updateEmail;
  }

  updateEmailPattern() {
    return this.updateEmail();
  }

  // web hook
  webHook() {
    return `${config.user.index}/webhook`;
  }

  webHookPattern() {
    return this.webHook();
  }
}
