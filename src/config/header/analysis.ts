/**
 * @file 机会分析
 * @author svon.me@gmail.com
 */
import _ from "lodash";
import I18n from "src/utils/i18n";
import DB from "@fengqiaogang/dblist";
import { MenuItem } from "src/types/menu";
import { Lang } from "src/types/language";
import { name as RankName, Ranks } from "./rank";
import { config as routerConfig } from "src/router/config";
import { Address } from "./address";
import { TopicList } from "./topic";
import { Blog } from "./blog";
import { DApp } from "./dapp";

export const name = {
  token: "token",
};

const getItem = function (list?: MenuItem[], id?: string) {
  if (id) {
    const db = new DB(list || [], "id");
    const data = db.selectOne<MenuItem>({ id });
    return _.omit(data, ["dbIndex"]);
  }
};

export const Analysis = function (lang?: Lang): MenuItem {
  const i18n = I18n(lang);
  const dAppList = DApp(lang);
  const ranks = Ranks(lang);
  const address = Address(lang);
  const topic = TopicList(lang);
  const blog = Blog(lang);

  const nft = getItem(ranks.children, RankName.nft);
  const rankDApp = getItem(ranks.children, RankName.dapp);
  const gameFi = getItem(ranks.children, RankName.gamefi);
  const db = new DB();
  db.insert({
    name: i18n.menu.group.analytic,
    header: false,
    group: true,
  });
  if (nft) {
    db.insert(nft);
  }
  if (rankDApp) {
    db.insert(rankDApp);
  }
  if (gameFi) {
    db.insert(gameFi);
  }
  db.insert({
    id: name.token,
    icon: "icon-Token",
    name: i18n.menu.token,
    href: routerConfig.token,
    blank: false,
    header: true,
  });
  db.insert({
    name: "Free Mint NFT",
    header: false,
    group: true,
  });
  db.insert({
    id: "freeMint",
    icon: "icon-Token",
    name: "freeMint",
    href: routerConfig.freemintNFT,
    header: true,
    children: [
      {
        id: "nftasdasdasd",
        name: "freeMintasdad",
        href: routerConfig.freemintNFT,
        header: true,
      },
    ],
  });
  db.insert(dAppList);
  db.insert({
    name: i18n.menu.group.tool,
    header: false,
    group: true,
  });
  db.insert(address);
  db.insert({
    name: i18n.menu.group.data,
    header: false,
    group: true,
  });
  db.insert(topic);
  db.insert(blog);

  return {
    name: i18n.menu.analytic, // dApp
    href: nft ? nft.href : "/",
    newTip: false,
    layout: true,
    children: db.clone<MenuItem>(),
  };
};
