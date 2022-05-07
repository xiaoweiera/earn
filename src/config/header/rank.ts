/**
 * @file 排行榜
 */

import I18n from "src/utils/i18n";
import { MenuItem } from "src/types/menu";
import { config } from "src/router/config";
import { Lang } from "src/types/language";

export const name = {
  dapp: "rank-dapp",
  nft: "rank-nft",
  gamefi: "rank-game",
  defi: "rank-defi",
};

export const Ranks = function (lang?: Lang): MenuItem {
  const i18n = I18n(lang);
  return {
    name: i18n.menu.nft.title, // 排行榜
    href: config.rankDapp,
    expand: "HeaderSubRank",
    children: [
      {
        id: name.dapp,
        name: i18n.menu.dapp.ranking,
        header: true,
        more: true,
        icon: "icon-Dapp",
        href: config.rankDapp,
      },
      {
        id: name.gamefi,
        name: i18n.menu.dapp.game,
        header: true,
        more: true,
        icon: "icon-GameFi",
        href: config.rankGame,
      },
      {
        id: name.defi,
        name: i18n.menu.dapp.defi,
        header: true,
        more: true,
        icon: "icon-DeFi",
        href: config.rankDefi,
      },
      {
        id: name.nft,
        name: i18n.menu.nft.ranking,
        header: true,
        more: true,
        icon: "icon-NFTpaihang",
        href: config.rankNft,
      },
    ],
  };
};
