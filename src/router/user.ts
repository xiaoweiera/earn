/**
 * @file 用户相关
 */

import { routerConfig } from "src/router/config";

const routes = [
  {
    // 找回密码
    // path: router.user.forget,
    path: routerConfig.user.forgetPattern(),
    component: () => import("src/pages/account/forget.vue"),
  },
  {
    // 邮箱注册
    // path: router.user.register,
    path: routerConfig.user.registerPattern(),
    component: () => import("src/pages/account/register.vue"),
  },
  {
    // 邮箱登录
    // path: router.user.login,
    path: routerConfig.user.loginPattern(),
    component: () => import("src/pages/account/login.vue"),
  },
  {
    // 修改邮箱
    // path: router.user.updateEmail,
    path: routerConfig.user.updateEmail(),
    component: () => import("src/pages/account/update/email.vue"),
  },
  {
    // web hook
    path: routerConfig.user.webHookPattern(),
    component: () => import("src/pages/account/webhook/index.vue"),
  },
  {
    // 个人设置
    path: routerConfig.user.accountPattern(),
    component: () => import("src/pages/account/index/index.vue"),
  },
];

export default routes;
