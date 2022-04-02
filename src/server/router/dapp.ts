import _ from "lodash";
import safeGet from "@fengqiaogang/safe-get";
import { config } from "src/router/config";
import * as dApp from "src/controller/dapp";
import redirect from "src/controller/common/redirect";
import type { Request, Response } from "express";
import { Router as ExpressRouter } from "express";

const Router = function () {
  const router = ExpressRouter();
  router.get(config.dapp, function (req: Request, res: Response) {
    redirect(req, res, config.dappList);
  });
  router.get(config.nft, function (req: Request, res: Response) {
    redirect(req, res, config.nftList);
  });

  // 列表
  router.get(config.dappList, (req: Request, res: Response) => {
    const igo = safeGet<string>(req, "query.isIgo");
    if (igo) {
      // 兼容老项目，修正错误参数
      const query: object = _.omit(req.query, "isIgo");
      redirect(req, res, req.path, { ...query, igo });
    } else {
      dApp.list(req, res);
    }
  });
  router.get(config.nftList, dApp.nftList);
  router.get(config.invest, dApp.investList);
  router.get(config.investDetail, dApp.investDetail);
  return router;
};
export default Router;
