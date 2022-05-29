/**
 * @file 补丁，旧路由兼容
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import { AnyEquals } from "src/utils/";
import safeGet from "@fengqiaogang/safe-get";
import redirect from "src/controller/common/redirect";
import { routerConfig } from "src/router/config";
import type { Request, Response } from "express";
import { Router as ExpressRouter } from "express";
import { createHref } from "src/plugins/router/pack";
import { TabTypes as AirdropType } from "src/types/dapp/airdrop";

const Router = function () {
  const patch = ExpressRouter();

  // 旧快讯列表
  patch.get("/news", (req: Request, res: Response) => {
    // 跳转到新路由
    redirect(req, res, routerConfig.quota.signalsList());
  });

  //兼容博客详情页老路由
  patch.get("/blog/detail", (req: Request, res: Response) => {
    const query = req.query;
    const id = safeGet<string>(query, "id");
    if (id) {
      const value = _.omit<object>(query, ["id"]);
      const url = routerConfig.blog.detail(id, value);
      const link = createHref(url as any);
      redirect(req, res, link, {});
    } else {
      redirect(req, res, routerConfig.blog.list());
    }
  });

  patch.get("/dapp", (req: Request, res: Response) => {
    redirect(req, res, routerConfig.dapp.idoList());
  });
  patch.get("/dapp/discover", (req: Request, res: Response) => {
    const igo = safeGet<boolean>(req.query, "igo");
    if (igo) {
      redirect(req, res, routerConfig.dapp.igoList());
    } else {
      redirect(req, res, routerConfig.dapp.idoList());
    }
  });
  patch.get("/nft/discover", (req: Request, res: Response) => {
    redirect(req, res, routerConfig.dapp.nftList());
  });

  const airdrop = function (req: Request, res: Response, type?: AirdropType) {
    if (type && AnyEquals(type, AirdropType.hot)) {
      redirect(req, res, routerConfig.dapp.airdropList(), { activity_stage: AirdropType.hot });
    } else if (type && AnyEquals(type, AirdropType.ongoing)) {
      redirect(req, res, routerConfig.dapp.airdropList(), { activity_stage: AirdropType.ongoing });
    } else if (type && AnyEquals(type, AirdropType.upcoming)) {
      redirect(req, res, routerConfig.dapp.airdropList(), { activity_stage: AirdropType.upcoming });
    } else if (type && AnyEquals(type, AirdropType.ended)) {
      redirect(req, res, routerConfig.dapp.airdropList(), { activity_stage: AirdropType.ended });
    } else if (type && AnyEquals(type, AirdropType.potential)) {
      redirect(req, res, routerConfig.dapp.airdropList(), { activity_stage: AirdropType.potential });
    } else {
      redirect(req, res, routerConfig.dapp.airdropList(), { activity_stage: AirdropType.all });
    }
  };
  patch.get("/airdrops/list/:type", (req: Request, res: Response) => {
    const type = safeGet<AirdropType>(req.params, "type");
    return airdrop(req, res, type);
  });
  patch.get("/airdrops/discover", (req: Request, res: Response) => airdrop(req, res));
  patch.get("/airdrops/list", (req: Request, res: Response) => airdrop(req, res));
  patch.get("/airdrops", (req: Request, res: Response) => airdrop(req, res));

  return patch;
};

export default Router;
