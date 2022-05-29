/**
 * @file 指标、快讯
 * @author svon.me@gmail.com
 */
import * as quota from "src/controller/quota/";
import { Router as ExpressRouter } from "express";
import { routerConfig } from "src/router/config";

const Router = function () {
  const router = ExpressRouter();
  // 推荐指标
  router.get(routerConfig.quota.indicatorsPattern(), quota.indicators);
  // 指标详情
  router.get(routerConfig.quota.indicatorsDetailPattern(), quota.indicatorsDetail);

  // 指标异动
  router.get(routerConfig.quota.signalsPattern(), quota.signals);
  // 快讯 - 详情
  router.get(routerConfig.quota.signalsDetailPattern(), quota.detail);

  return router;
};

export default Router;
