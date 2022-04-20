/**
 * @file 项目库导航
 */

import I18n from "src/utils/i18n";
import { MenuItem } from "src/types/menu";
import { config } from "src/router/config";
import { Lang } from "src/types/language";
import { TabTypes } from "src/types/dapp/airdrop";

export const name = {
  dapp: "new_dapp",
  nft: "new_nft",
  igo: "new_gamefi",
  airdrop: "airdrop",
  invest: "invest",
};

export const DApp = function (lang?: Lang): MenuItem {
  const i18n = I18n(lang);
  return {
    name: i18n.menu.dapp.title, // dApp
    href: `${config.dapp}/discover`,
    expand: "HeaderSubDApp", // 二级导航末尾自定义组件名称
    newTip: true,
    children: [
      {
        id: name.dapp, // id
        name: i18n.menu.dapp.discover,
        href: `${config.dapp}/discover`,
        header: true,
        more: true,
        icon: "icon-defi",
      },
      {
        id: name.igo,
        name: i18n.menu.dapp.gamefi,
        header: true,
        more: true,
        icon: "icon-defi",
        href: `${config.dapp}/discover?igo=true`,
      },
      {
        id: name.nft,
        name: i18n.menu.nft.discover,
        icon: "icon-a-NFTxinxiangmu",
        more: true,
        header: true,
        href: `${config.nft}/discover`,
      },
      {
        id: name.airdrop,
        name: i18n.menu.airdrop.title, // 最新空投
        icon: "icon-a-NFTxinxiangmu",
        more: true,
        header: true,
        href: `${config.airdrop}/list/${TabTypes.all}`,
      },
      {
        id: name.invest,
        name: i18n.menu.dapp.invest, // 投融资
        icon: "icon-a-NFTxinxiangmu",
        more: true,
        header: true,
        href: config.invest,
      },
    ],
  };
};
