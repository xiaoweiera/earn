/**
 * @file APY
 * @author svon.me@gmail.com
 */

import { config as configRouter } from "src/router/config";
import { Router as ExpressRouter } from "express";
import * as apy from "src/controller/apy/";
import * as address from "src/controller/address/";

const Router = function () {
  const router = ExpressRouter();
  // apy
  router.get(configRouter.apy, apy.mining);
  router.get(configRouter.apyMining, apy.mining);
  router.get(configRouter.apyLoan, apy.loan);
  router.get(configRouter.apyToken, apy.token);
  router.get(configRouter.apyLp, apy.Lp);
  router.get(configRouter.apyHeco, apy.heco);
  router.get(configRouter.apyProject, apy.project);

  // 大户
  // 投资组合
  router.get(configRouter.portfolio, address.portfolio);
  // 巨鲸追踪
  router.get(configRouter.address, address.alerts);
  router.get(configRouter.addressAlerts, address.alerts);
  router.get(configRouter.addressFind, address.find);

  // topic
  router.get(configRouter.topic, apy.topic);
  return router;
};
export default Router;
