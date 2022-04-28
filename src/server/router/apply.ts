/**
 * @file
 * @author zhangkun@163.com
 */

import { config } from "src/router/config";
import * as dApp from "src/controller/dapp/apply";
import { Router as ExpressRouter } from "express";

const Router = function () {
  const router = ExpressRouter();
  router.get(config.dappApply, dApp.applyList);
  return router;
};
export default Router;
