/**
 * @file 首页
 * weier
 */

import type { Request, Response } from "express";
import { Model } from "src/logic/rank";
import { chainPage } from "src/logic/rank/config";
import * as alias from "src/utils/root/alias";
// home页面
export const dapp = async function (req: Request, res: Response) {
  const api = new Model(req);
  const [chains] = await Promise.all([api.rank.getChains(chainPage.dapp_rank)]);
  const result = {
    [alias.rank.chains]: chains, // 链
  };
  res.send(result);
};
