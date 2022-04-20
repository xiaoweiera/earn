/**
 * @file 导航菜单配置
 * @author svon.me@gmail.com
 */
import { Lang, Language } from "src/types/language";
import getLang from "src/utils/url/lang";
import { Address, name as AddressName, Portfolio } from "./address";

import { APY, name as ApyName } from "./apy";
import { Blog, name as BlogName } from "./blog";
import { DApp, name as DAppName } from "./dapp";
import { name as QuotaName, Quota } from "./quota";
import { name as RankName, Ranks } from "./rank";
import { name as TopicName, TopicList } from "./topic";

export const names = {
  dapp: DAppName,
  rank: RankName,
  apy: ApyName,
  quota: QuotaName,
  blog: BlogName,
  address: AddressName,
  topic: TopicName,
};

export const headers = function (lang?: Lang) {
  const value = getLang(lang);

  const list = [DApp(lang), Ranks(lang), APY(lang), Address(lang)];
  // 只在中文状态下显示此导航
  if (value === Language.cn) {
    list.push(Portfolio(lang), TopicList(lang));
  }
  list.push(Quota(lang), Blog(lang));

  return list;
};
