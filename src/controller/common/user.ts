/**
 * @file 用户数据
 * @author svon.me@gmail.com
 */

import { isObject } from "src/utils/";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import { routerConfig } from "src/router/config";
import { redirect } from "src/controller/common/redirect";
import type { NextFunction, Request, Response } from "express";
import API from "src/api/index";
import Cookie from "src/plugins/browser/cookie";
import type { User } from "src/types/common/user";
import I18n from "src/utils/i18n";
import * as alias from "src/utils/root/alias";

// 用户详情
export const userInfo = async function (req: Request, res: Response) {
  const result = {};
  const cookie = new Cookie(req, res);
  // 判断用户 uuid 是否存在，不存在则创建
  const uuid = cookie.getUuid();
  if (!uuid) {
    cookie.setUuid();
  }
  const token = await cookie.getUserToken();
  if (token) {
    const api = new API(req);
    const data = await api.user.getInfo<User>();
    if (data) {
      // @ts-ignore
      req.user = data;
      safeSet(result, alias.common.user, data);
    }
  }
  return result;
};

// 处理用户退出
export const userLogout = function (req: Request, res: Response) {
  const cookie = new Cookie(req, res);
  cookie.removeUserToken();
  res.redirect("back");
};

// 前置，如果用户未登录，则跳转走
export const prepend = function (req: Request, res: Response, next: NextFunction) {
  // 判断是否已登录
  const user = safeGet<object>(res.locals, alias.common.user);
  if (isObject(user)) {
    return next();
  }
  // 跳转到登录
  const url = req.originalUrl;
  redirect(req, res, routerConfig.user.login(), {
    redirect: url,
  });
};

// 用户找回密码
export const userForget = function (req: Request, res: Response) {
  const i18n = I18n(req);
  res.send({
    title: i18n.common.resetPassword,
  });
};
// 邮箱注册
export const register = function (req: Request, res: Response) {
  const i18n = I18n(req);
  res.send({
    title: i18n.common.register,
  });
};
// 用户登录
export const login = function (req: Request, res: Response) {
  const i18n = I18n(req);
  res.send({
    title: i18n.common.login,
  });
};

// 修改用户邮箱
export const updateEmail = function (req: Request, res: Response) {
  const i18n = I18n(req);
  res.send({
    title: i18n.common.emailUpdate,
  });
};

export const webHook = function (req: Request, res: Response) {
  res.send({
    title: "Web Hook",
  });
};

export const account = function (req: Request, res: Response) {
  res.send({
    title: "个人设置",
  });
};
