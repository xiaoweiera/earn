/**
 * @file 导航菜单配置
 * @author svon.me@gmail.com
 */
import { Lang } from "src/types/language";
import { MenuItem } from "src/types/menu";
import { name as AddressName, Portfolio } from "./address";

import { APY, name as ApyName } from "./apy";
import { name as BlogName } from "./blog";
import { name as DAppName } from "./dapp";
import { name as QuotaName } from "./quota";
import { name as RankName } from "./rank";
import { name as TopicName } from "./topic";

import { name as AnalysisName, Analysis } from "./analysis";

const apiName = {
  api: "api",
};

export const names = {
  dapp: DAppName,
  rank: RankName,
  apy: ApyName,
  quota: QuotaName,
  blog: BlogName,
  address: AddressName,
  topic: TopicName,
  analysis: AnalysisName,
  api: apiName,
};

export const headers = function (lang?: Lang) {
  return [
    APY(lang),
    Portfolio(lang),
    Analysis(lang),
    {
      name: "API", // dApp
      href: "/api",
    },
  ];

  // DApp(lang), Ranks(lang), APY(lang), Address(lang)
  // list.push(Portfolio(lang), TopicList(lang));
  // list.push(Quota(lang), Blog(lang));
};
