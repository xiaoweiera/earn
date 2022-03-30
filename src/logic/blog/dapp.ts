/**
 * @file 博客文章中的 DApp 数据
 * @author svon.me@gmail.com
 */

import I18n from "src/utils/i18n";
import safeGet from "@fengqiaogang/safe-get";
import { dateYMDFormat, toNumberCash } from "src/utils/";
import type { ProjectItem } from "src/types/dapp/";

export const getDAppData = function (data: ProjectItem) {
  const i18n = I18n();
  // 空投
  if (safeGet<boolean>(data, "is_airdrop")) {
    const start = dateYMDFormat(safeGet<number>(data, "airdrop_start_at"));
    const end = dateYMDFormat(safeGet<number>(data, "airdrop_end_at"));
    const count = safeGet<number>(data, "airdrop_winner_count");
    const amount = safeGet<number>(data, "airdrop_amount");
    return {
      ...data,
      total: toNumberCash(count), // 总量
      totalText: i18n.airdrop.content.amount,
      people: toNumberCash(amount), // 名额
      peopleText: i18n.airdrop.content.quota, //
      time: `${start}-${end}`, //时间
      timeText: "Airdrop Time",
    };
  }
  // IDO
  if (safeGet<boolean>(data, "is_ido")) {
    const start = dateYMDFormat(safeGet<number>(data, "ido_start_at"));
    const end = dateYMDFormat(safeGet<number>(data, "ido_end_at"));
    const price = safeGet<number>(data, "ido_price"); // 价格
    const goal = safeGet<number>(data, "ido_fundraising_goal"); // 目标
    return {
      ...data,
      total: toNumberCash(price), // 价格
      totalText: i18n.dapp.project.idoPrice,
      people: toNumberCash(goal), // 目标
      peopleText: i18n.dapp.project.fundraising, // 筹款目标
      time: `${start}-${end}`, //时间
      timeText: "IDO Time",
    };
  }
  // NFT
  if (safeGet<boolean>(data, "is_ido")) {
    const time = dateYMDFormat(safeGet<number>(data, "mint_start_at"));
    const price = safeGet<number>(data, "mint_price"); // 价格
    const goal = safeGet<number>(data, "issue_volume"); // 总量
    return {
      ...data,
      total: toNumberCash(price), // 价格
      totalText: i18n.nft.project.price,
      people: toNumberCash(goal), // 目标
      peopleText: i18n.nft.project.supply, // 总量
      time: time, //时间
      timeText: "Mint Time",
    };
  }
};
