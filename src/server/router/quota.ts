/**
 * @file 指标、快讯
 * @author svon.me@gmail.com
 */
import * as quota from "src/controller/quota/";
import type { Request, Response } from "express";
import { Router as ExpressRouter } from "express";
import redirect from "src/controller/common/redirect";
import { config as routerConfig } from "src/router/config";

const Router = function () {
  const router = ExpressRouter();
  // 推荐指标
  router.get(routerConfig.quota, quota.indicators);
  // 指标详情
  router.get(`${routerConfig.quota}/:id`, quota.indicatorsDetail);

  // 指标异动
  // 旧路由，兼容处理
  router.get("/news", function (req: Request, res: Response) {
    // 跳转到新路由
    redirect(req, res, routerConfig.news);
  });
  router.get(routerConfig.news, quota.signals);
  // 快讯 - 详情
  router.get(`${routerConfig.news}/:id`, quota.detail);

  return router;
};

export default Router;
