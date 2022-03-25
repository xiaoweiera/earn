import { config } from "src/router/config";
import * as rank from "src/controller/rank";
import { Router as ExpressRouter } from "express";

const Router = function () {
  const router = ExpressRouter();
  router.get(config.rankDapp, rank.dapp); // home.begin
  return router;
};

export default Router;
