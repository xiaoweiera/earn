/**
 * @file 运营活动
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
import type { Request, Response } from "express";
import { goHome } from "src/controller/common/redirect";
import { Activity } from "src/types/common/activity";

// 活动 - 邀请
export const invite = async function (req: Request, res: Response) {
  return res.send({
    title: "Activity - KingData",
    keywords: "活动规则",
    description: "Bitcoin, Ethereum, blockchain, cryptocurrencies, altcoins, crypto, decentralization, money, DeFi, decentralized finance, derivatives, crypto exchanges, 比特币、以太坊、区块链、加密货币、山寨币、加密、去中心化、货币、DeFi、去中心化金融、衍生品、加密交易所",
  });
};

// 活动入口
export const app = async function (req: Request, res: Response) {
  const type = safeGet<string>(req.params, "type");
  try {
    if (type === Activity.invite) {
      return await invite(req, res);
    }
  } catch (e) {
    return res.send({});
  }
  return goHome(req, res);
};
