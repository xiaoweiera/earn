import { config } from "src/router/config";
import * as dApp from "src/controller/invest";
import { Router as ExpressRouter } from "express";

const Router = function () {
  const router = ExpressRouter();
  router.get(`${config.invest}/:id`, dApp.investDetail);
  return router;
};
export default Router;
