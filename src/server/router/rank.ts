import _ from "lodash";
import * as dApp from "src/controller/dapp";
import { config } from "src/router/config";
import * as rank from "src/controller/rank";
import type { Request, Response } from "express";
import { Router as ExpressRouter } from "express";
import { redirect } from "src/controller/common/redirect";
import safeGet from "@fengqiaogang/safe-get";

const Router = function () {
  const router = ExpressRouter();
  const toUrl = (type: string) => {
    return function (req: Request, res: Response) {
      const query = req.query;
      const category = safeGet(query, "category");
      const data: any = _.omit(query, ["category"]);
      if (type === "dapp") {
        if (!category) {
          redirect(req, res, config.rankDapp, data);
        } else if (category === "game") {
          redirect(req, res, config.rankGame, data);
        } else if (category === "defi") {
          redirect(req, res, config.rankDefi, data);
        }
      } else {
        redirect(req, res, config.rankNft, data);
      }
    };
  };
  router.get("/dapp/rank", toUrl("dapp"));
  router.get("/nft/rank", toUrl("nft"));

  router.get(config.rankDapp, rank.dapp); // dapp
  router.get(config.rankGame, rank.game); // game
  router.get(config.rankDefi, rank.defi); // defi
  router.get(config.rankNft, rank.nft); // defi

  router.get(`${config.rankDapp}/:id`, dApp.dAppDetail("dapp", true));
  router.get(`${config.rankGame}/:id`, dApp.dAppDetail("game", true));
  router.get(`${config.rankDefi}/:id`, dApp.dAppDetail("defi", true));
  router.get(`${config.rankNft}/:id`, dApp.dAppDetail("nft", true));
  return router;
};

export default Router;
