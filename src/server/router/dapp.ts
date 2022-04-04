import _ from "lodash";
import safeGet from "@fengqiaogang/safe-get";
import { config } from "src/router/config";
import * as dApp from "src/controller/dapp";
import { redirect } from "src/controller/common/redirect";
import type { Request, Response, NextFunction } from "express";
import { Router as ExpressRouter } from "express";
import { TabTypes } from "src/types/dapp/airdrop";

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
      return dApp.list(req, res);
    }
  });
  router.get(config.nftList, dApp.nftList);
  router.get(config.invest, dApp.investList);
  router.get(config.investDetail, dApp.investDetail);

  // const airdropAllValue = Object.values(TabTypes);
  // // 判断 value 是否存在
  // const airdropHas = function (value?: string) {
  //   return !!(value && _.includes(airdropAllValue, _.toLower(value)));
  // };
  // // 兼容旧空投路由
  // const compatible = function (req: Request, res: Response) {
  //   const type = safeGet<string>(req.query, "type");
  //   const query = _.omit<object>(req.query, ["type"]);
  //   let name: TabTypes = TabTypes.all;
  //   // 判断 type 的值是否符合规则
  //   if (airdropHas(type)) {
  //     name = _.toLower(type) as TabTypes;
  //   }
  //   const url = `${config.airdrop}/list/${name}`;
  //   return redirect(req, res, url, query);
  // };
  // router.get(config.airdrop, compatible);
  // router.get(`${config.airdrop}/list`, compatible);
  // router.get(
  //   `${config.airdrop}/list/:name`,
  //   function (req: Request, res: Response, next: NextFunction) {
  //     const name = safeGet<string>(req.params, "name");
  //     // 判断 type 的值是否符合规则
  //     if (airdropHas(name)) {
  //       next();
  //     } else {
  //       // 如果 name 是未知的值，则按默认逻辑处理
  //       compatible(req, res);
  //     }
  //   },
  //   dApp.airdropList,
  // );

  return router;
};
export default Router;
