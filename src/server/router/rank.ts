import { config } from "src/router/config";
import * as rank from "src/controller/rank";
import { Router as ExpressRouter } from "express";

const Router = function () {
  const router = ExpressRouter();
  router.get(config.rankDapp, rank.dapp); // dapp
  router.get(config.rankGame, rank.game); // game
  router.get(config.rankDefi, rank.defi); // defi
  return router;
};

export default Router;
