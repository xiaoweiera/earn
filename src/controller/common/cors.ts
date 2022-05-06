/**
 * @file 处理跨域
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import safeGet from "@fengqiaogang/safe-get";
import { AnyEquals } from "src/utils";
import { Router } from "express";
import useragent from "express-useragent";
import parse from "src/utils/url/parse";
import type { NextFunction, Request, Response } from "express";

// 客户端判断
const client = function (req: Request, res: Response, next: NextFunction) {
  const source = req.headers["user-agent"];
  if (source) {
    // 桌面客户端（爬虫类工具）
    const keys = ["isElectron"]; // "isPhantomJS", "isCurl"
    const ua = useragent.parse(source);
    let status = false;
    for (const name of keys) {
      const value = safeGet<boolean>(ua, name);
      if (value) {
        status = true;
        break;
      }
    }
    if (!status) {
      // 判断是否是网页监控宝软件
      const text = _.toLower(ua.source);
      const name = _.toLower("OpenWebMonitor");
      if (text.includes(name)) {
        status = true;
      }
    }
    if (status) {
      res.status(403);
      return res.send("");
    }
  }
  next();
};

const corsOrigin = function (req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin;
  if (origin) {
    res.set({
      // * 为允许任何域访问
      // 如果只允许某个域名 请设置单独的域名
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Content-Length, Token, Accept,X-Requested-With",
    });
  }
  if (AnyEquals(req.method, "OPTIONS")) {
    return res.send(200);
  }
  next();
};

const cors = function () {
  const router = Router();

  router.use(function (req: Request, res: Response, next: NextFunction) {
    const www = "www.kingdata.com";
    const host = safeGet<string>(req.headers, "host");
    if (host && host.includes(www)) {
      res.redirect(302, `//kingdata.com${req.originalUrl}`);
      return;
    }
    const referer = safeGet<string>(req.headers, "referer");
    if (referer && referer.includes(www)) {
      const url = parse(referer);
      if (url && url.host && url.host.includes(www)) {
        res.redirect(302, `//kingdata.com${req.originalUrl}`);
        return;
      }
    }
    next();
  });

  router.use(client, corsOrigin);
  return router;
};

export default cors;
