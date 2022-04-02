/**
 * @file 博客文章中的 DApp 数据
 * @author svon.me@gmail.com
 */

import type { DAppData, blogDAppData } from "src/types/dapp/data";
import { DataType } from "src/types/dapp/data";
import I18n from "src/utils/i18n";
import safeGet from "@fengqiaogang/safe-get";
import { dateYMDFormat, toNumberCash } from "src/utils/";
import { config as routerConfig } from "src/router/config";

export const getDAppData = function (data?: DAppData): blogDAppData | undefined {
  const i18n = I18n();
  // 空投
  if (data && safeGet<DataType>(data, "anchor") === DataType.airdrop) {
    const start = safeGet<number>(data, "airdrop.airdrop_start_at");
    const end = safeGet<number>(data, "airdrop.airdrop_end_at");
    const count = safeGet<number>(data, "airdrop.airdrop_winner_count");
    const amount = safeGet<number>(data, "airdrop.airdrop_amount");
    const time = start && end ? `${dateYMDFormat(start)}-${dateYMDFormat(end)}` : "";
    return {
      ...data,
      url: `${routerConfig.airdrop}/${data.id}`,
      total: toNumberCash(count), // 总量
      totalText: i18n.airdrop.content.amount,
      people: toNumberCash(amount), // 名额
      peopleText: i18n.airdrop.content.quota, //
      time, //时间
      timeText: "Airdrop Time",
    };
  }
  // IDO
  if (data && safeGet<DataType>(data, "anchor") === DataType.ido) {
    const start = safeGet<number>(data, "ido.ido_start_at");
    const end = safeGet<number>(data, "ido.ido_end_at");
    const price = safeGet<number>(data, "ido.ido_price"); // 价格
    const goal = safeGet<number>(data, "ido.ido_fundraising_goal"); // 目标
    const time = start && end ? `${dateYMDFormat(start)}-${dateYMDFormat(end)}` : "";
    return {
      ...data,
      url: `${routerConfig.dapp}/${data.id}`,
      total: "$" + toNumberCash(price), // 价格
      totalText: i18n.dapp.project.idoPrice,
      people: toNumberCash(goal), // 目标
      peopleText: i18n.dapp.project.fundraising, // 筹款目标
      time, //时间
      timeText: "IDO Time",
    };
  }
  // NFT
  if (data && safeGet<DataType>(data, "anchor") === DataType.nft) {
    const start = safeGet<number>(data, "nft.mint_start_at");
    const price = safeGet<number>(data, "nft.mint_price"); // 价格
    const goal = safeGet<number>(data, "nft.issue_volume"); // 总量
    const unit = safeGet<string>(data, "nft.price_unit"); // 单位
    const time = start ? dateYMDFormat(start) : "";
    return {
      ...data,
      url: `${routerConfig.nft}/${data.id}`,
      total: unit ? `${toNumberCash(price)} ${unit}` : toNumberCash(price), // 价格
      totalText: i18n.nft.project.price,
      people: toNumberCash(goal), // 目标
      peopleText: i18n.nft.project.supply, // 总量
      time, //时间
      timeText: "Mint Time",
    };
  }
};
