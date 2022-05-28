import _ from "lodash";
import safeGet from "@fengqiaogang/safe-get";
import { routerConfig } from "src/router/config";
import * as dApp from "src/controller/dapp";
import { redirect } from "src/controller/common/redirect";
import type { Request, Response, NextFunction } from "express";
import { Router as ExpressRouter } from "express";
import { TabTypes } from "src/types/dapp/airdrop";
import { ProjectType } from "src/types/dapp/data";

import { DAppType } from "src/types/dapp/dapp";
import { list as DAppList } from "src/controller/dapp/dapp";

/*
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
      redirect(req, res, req.path, {
        ...query,
        igo,
      });
    } else {
      return dApp.list(req, res);
    }
  });
  router.get(config.nftList, dApp.nftList);
  router.get(config.invest, dApp.investList);

  const airdropAllValue = Object.values(TabTypes);
  // 判断 value 是否存在
  const airdropHas = function (value?: string) {
    return !!(value && _.includes(airdropAllValue, _.toLower(value)));
  };
  // 兼容旧空投路由
  const compatible = function (req: Request, res: Response) {
    const type = safeGet<string>(req.query, "type");
    const query = _.omit<object>(req.query, ["type"]);
    let name: TabTypes = TabTypes.all;
    // 判断 type 的值是否符合规则
    if (airdropHas(type)) {
      name = _.toLower(type) as TabTypes;
    }
    const url = `${config.airdrop}/list/${name}`;
    return redirect(req, res, url, query);
  };
  router.get(config.airdrop, compatible);
  router.get(`${config.airdrop}/discover`, compatible);
  router.get(`${config.airdrop}/list`, compatible);
  router.get(
    `${config.airdrop}/list/:name`,
    function (req: Request, res: Response, next: NextFunction) {
      const name = safeGet<string>(req.params, "name");
      // 判断 type 的值是否符合规则
      if (airdropHas(name)) {
        next();
      } else {
        // 如果 name 是未知的值，则按默认逻辑处理
        compatible(req, res);
      }
    },
    dApp.airdropList,
  );

  // DApp 详情
  dApp.dAppDetail(router, config.dapp, ProjectType.dapp);
  dApp.dAppDetail(router, config.nft, ProjectType.nft);
  dApp.dAppDetail(router, config.airdrop, ProjectType.airdrop);
  dApp.dAppDetail(router, config.funds, ProjectType.funds);
  return router;
};
 */

const Router = function () {
  const router = ExpressRouter();
  // ido 列表
  router.get(routerConfig.dapp.idoListPattern(), function (req: Request, res: Response) {
    return DAppList(DAppType.ido, req, res);
  });
  // igo 列表
  router.get(routerConfig.dapp.igoListPattern(), function (req: Request, res: Response) {
    return DAppList(DAppType.igo, req, res);
  });
  // nft 列表
  router.get(routerConfig.dapp.nftListPattern(), function (req: Request, res: Response) {
    return DAppList(DAppType.mint, req, res);
  });
  // airdrop 列表
  router.get(routerConfig.dapp.airdropListPattern(), function (req: Request, res: Response) {
    return DAppList(DAppType.airdrop, req, res);
  });
  // 投融资 列表
  router.get(routerConfig.dapp.investListPattern(), function (req: Request, res: Response) {
    return DAppList(DAppType.invest, req, res);
  });
  // ido 详情
  dApp.dAppDetail(router, routerConfig.dapp.idoDetailPattern(), ProjectType.ido);
  // igo 详情
  dApp.dAppDetail(router, routerConfig.dapp.igoDetailPattern(), ProjectType.igo);
  // nft 详情
  dApp.dAppDetail(router, routerConfig.dapp.nftDetailPattern(), ProjectType.mint);
  // airdrop 详情
  dApp.dAppDetail(router, routerConfig.dapp.airdropDetailPattern(), ProjectType.airdrop);
  return router;
};
export default Router;
