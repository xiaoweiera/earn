/**
 * @file 机会分析
 * @author svon.me@gmail.com
 */
import _ from "lodash";
import DB from "@fengqiaogang/dblist";
import { MenuItem } from "src/types/menu";
import { Lang } from "src/types/language";
import { name as RankName, Ranks } from "./rank";
import { Address } from "./address";
import { TopicList } from "./topic";
import { Blog } from "./blog";
import { Quota } from "./quota";
import { DApp } from "./dapp";

const getItem = function (list?: MenuItem[], id?: string) {
  if (id) {
    const db = new DB(list || [], "id");
    const data = db.selectOne<MenuItem>({ id });
    return _.omit(data, ["dbIndex"]);
  }
};

export const Analysis = function (lang?: Lang): MenuItem {
  const dAppList = DApp(lang);
  const ranks = Ranks(lang);
  const address = Address(lang);
  const topic = TopicList(lang);
  const blog = Blog(lang);
  const quota = Quota(lang);

  const nft = getItem(ranks.children, RankName.nft);
  const rankDApp = getItem(ranks.children, RankName.dapp);
  const gameFi = getItem(ranks.children, RankName.gamefi);
  const db = new DB();
  if (nft) {
    db.insert(nft);
  }
  if (rankDApp) {
    db.insert(rankDApp);
  }
  if (gameFi) {
    db.insert(gameFi);
  }
  db.insert(dAppList);
  db.insert(address);
  db.insert(quota);
  db.insert(topic);
  db.insert(blog);

  return {
    name: "机会分析", // dApp
    href: nft ? nft.href : "/",
    newTip: true,
    layout: true,
    children: db.clone<MenuItem>(),
  };
};
