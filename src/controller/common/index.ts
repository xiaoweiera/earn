/**
 * @file 公共逻辑
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import { Equals } from "src/utils/";
import I18n from "src/utils/i18n";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import { Language } from "src/types/language/";
import { languageKey, title } from "src/config/";
import { config as routerConfig } from "src/router/config";
import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { userInfo, userLogout } from "./user";
import { chainSiteConfig } from "./chain";
import { getTidings } from "./tiding";
import redirect from "./redirect";

const common = Router();

const getQueryLang = function(query: object) {
  const value = safeGet<Language>(query, languageKey);
  if (value && _.isArray(value)) {
    const data = _.last<Language>(value);
    if (data) {
      return data;
    }
  }
  if (value) {
    return value;
  }
  return Language.auto;
};

// 处理中英文参数问题
common.use(async(req: Request, res: Response, next: NextFunction) => {
  const query = req.query || {};
  const value = getQueryLang(query);
  const lang = safeGet<string | string[]>(query, languageKey);
  if (lang && _.isArray(lang)) {
    redirect(req, res, req.url, { ...query, [languageKey]: value });
  } else {
    safeSet(req.query, languageKey, value);
    try {
      await next();
    } catch (e) {
      redirect(req, res, routerConfig.E404, { [languageKey]: value });
    }
  }
});

// 处理用户退出逻辑
common.all(routerConfig.user.logout, userLogout);

// 处理公共数据
common.use(async(req: Request, res: Response, next: NextFunction) => {
  const promises: Array<any> = [
    userInfo(req, res),
    getTidings(req, res),
  ];
  if (!Equals(req.url, routerConfig.E404)) {
    promises.push(chainSiteConfig(req));
  }
  const i18n = I18n();
  const array = await Promise.all(promises);
  const data = {
    title,
    keywords: i18n.menu.seo.key,
    description: i18n.menu.seo.des,
  };
  for (const value of array) {
    _.merge(data, value);
  }
  Object.assign(res.locals, data);
  next();
});

export default common;
