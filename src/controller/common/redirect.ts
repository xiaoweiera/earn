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

export const redirect = function (req: Request, res: Response, url: string | object, query: object = {}, status = 302) {
  // 重定向到指定 url 中
  if (url) {
    const lang = safeGet<string>(req.query, languageKey) || Language.auto;
    const value: Query = { [languageKey]: lang, ...query };
    return res.redirect(status, createHref(url, value));
  }
  // 默认到首页
  goHome(req, res);
};

export const goHome = function (req: Request, res: Response) {
  return redirect(req, res, routerConfig.earn);
};

export const go404 = function (req: Request, res: Response) {
  return redirect(req, res, routerConfig.E404);
};

export default redirect;
