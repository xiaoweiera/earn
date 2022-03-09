/**
 * @file 重定向
 * @author svon.me@gmail.com
 */

import { languageKey } from "src/config";
import type { Request, Response } from "express";
import { Language } from "src/types/language";
import safeGet from "@fengqiaogang/safe-get";
import type { Query } from "src/types/browser/location";
import { createHref } from "src/plugins/router/pack";
import { config as routerConfig } from "src/router/config";

const redirect = function(req: Request, res: Response, url: string, query: Query = {}) {
  // 重定向到指定 url 中
  if (url) {
    const lang = safeGet<string>(req.query, languageKey) || Language.auto;
    const value: Query = { [languageKey]: lang, ...query };
    res.redirect(302, createHref(url, value));
  } else {
    // 默认到首页
    goHome(req, res);
  }
};

export const goHome = function(req: Request, res: Response) {
  redirect(req, res, routerConfig.home);
};

export default redirect;
