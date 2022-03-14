/**
 * @file 指标
 * @author svon.me@gmail.com
 */
import * as quota from "src/controller/quota/";
import type { Request, Response } from "express";
import { Router as ExpressRouter } from "express";
import redirect from "src/controller/common/redirect";
import { config as routerConfig } from "src/router/config";

const Router = function () {
  const router = ExpressRouter();
  // 指标详情
  router.get(`${routerConfig.news}/:id`, quota.detail);

  // 指标监控
  // 旧路由，兼容处理
  router.get("/news", function (req: Request, res: Response) {
    // 跳转到新路由
    redirect(req, res, routerConfig.news);
  });
  router.get(routerConfig.news, quota.signals);
  return router;
};

export default Router;
