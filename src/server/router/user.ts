/**
 * @file 用户信息
 * @author svon.me@gmail.com
 */

import { Router as ExpressRouter } from "express";
import * as user from "src/controller/common/user";
import { routerConfig } from "src/router/config";

const User = function () {
  const router = ExpressRouter();

  // 找回密码
  router.get(routerConfig.user.forgetPattern(), user.userForget);

  // 邮箱注册
  router.get(routerConfig.user.registerPattern(), user.register);

  // 邮箱登录
  router.get(routerConfig.user.loginPattern(), user.login);

  // 邮箱登录
  router.get(routerConfig.user.updateEmailPattern(), user.updateEmail);

  // web hook
  router.get(routerConfig.user.webHookPattern(), user.prepend, user.webHook);

  // 个人设置
  router.get(routerConfig.user.accountPattern(), user.prepend, user.account);

  return router;
};

export default User;
