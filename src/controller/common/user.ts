/**
 * @file 用户数据
 * @author svon.me@gmail.com
 */

import API from "src/api/index";
import I18n from "src/utils/i18n";
import { dashboard } from "src/config";
import safeSet from "@fengqiaogang/safe-set";
import * as alias from "src/utils/root/alias";
import Cookie from "src/plugins/browser/cookie";
import redirect from "src/controller/common/redirect";
import type { NextFunction, Request, Response } from "express";
import * as redis from "src/plugins/redis/";
import { expire } from "src/plugins/dao/http";
// 用户详情
export const userInfo = async function (req: Request, res: Response) {
  const result = {};
  const cookie = new Cookie(req, res);
  const token = await cookie.getUserToken();
  // 根据 token 生成对应的 redis key
  const uKey = redis.makeKey(token);
  if (uKey) {
    // 获取 redis 中是否有用户数据
    const cache = await redis.get(uKey);
    // 如果用户数据存在
    if (cache) {
      safeSet(result, alias.common.user, cache);
    } else {
      const api = new API(req);
      const data = await api.user.getInfo();
      if (data) {
        safeSet(result, alias.common.user, data);
        // 刷新 token 数据
        cookie.setUserToken(token);
        await redis.set(uKey, data, expire.day1);
      } else {
        // 如果有 token 并且获取用户信息失败，则删除用户 token, 提示用户重新登录
        cookie.removeUserToken();
      }
    }
  }
  return result;
};

// 处理用户退出
export const userLogout = function (req: Request, res: Response) {
  const cookie = new Cookie(req, res);
  cookie.removeUserToken();
  redirect(req, res, dashboard);
};

// 前置，如果用户已登录，则跳转走
export const prepend = function (req: Request, res: Response, next: NextFunction) {
  // const cache = safeGet(res.locals, alias.common.user);
  // if (cache) {
  //   redirect(req, res, dashboard); // 已登录，跳转到首页
  // } else {
  //   next();
  // }
  next();
};

// 用户找回密码
export const userForget = function (req: Request, res: Response) {
  const i18n = I18n();
  res.send({
    title: i18n.common.resetPassword,
  });
};
// 邮箱注册
export const register = function (req: Request, res: Response) {
  const i18n = I18n();
  res.send({
    title: i18n.common.register,
  });
};
// 用户登录
export const login = function (req: Request, res: Response) {
  const i18n = I18n();
  res.send({
    title: i18n.common.login,
  });
};
