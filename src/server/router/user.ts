/**
 * @file 用户信息
 * @author svon.me@gmail.com
 */

import { Router as ExpressRouter } from "express";
import * as user from "src/controller/common/user";
import { config as routerConfig } from "src/router/config";

const User = function() {
  const router = ExpressRouter();

  // 找回密码
  router.all(routerConfig.user.forget, user.prepend, user.userForget);

  // 邮箱注册
  router.all(routerConfig.user.register, user.prepend, user.register);

  // 邮箱登录
  router.all(routerConfig.user.login, user.prepend, user.login);

  return router;
};

export default User;
