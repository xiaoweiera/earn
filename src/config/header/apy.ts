/**
 * @file APY
 * @author svon.me@gmail.com
 */

import { config } from "src/router/config";
import { Lang } from "src/types/language";
import { MenuItem } from "src/types/menu";
import I18n from "src/utils/i18n";

export const name = {
  mining: "apy-mining",
  loan: "apy-loan",
  project: "apy-project",
  token: "apy-token",
  heco: "apy-heco",
};

export const APY = function (lang?: Lang): MenuItem {
  const i18n = I18n(lang);
  return {
    // apy // DeFi & APY
    name: "投资理财",
    href: `${config.apy}/mining`,
    expand: "HeaderSubApy",
    children: [
      {
        id: name.mining,
        name: i18n.menu.apy.mining, // '挖矿 APY',
        href: `${config.apy}/mining`,
        icon: "icon-wakuang",
        more: true,
        header: true,
      },
      {
        id: name.loan,
        name: i18n.menu.apy.loan, // '借贷 APR',
        href: `${config.apy}/loan`,
        icon: "icon-jiedai",
        more: true,
        header: true,
      },
      {
        id: name.project,
        name: i18n.menu.apy.project, // '项目 APY 分析'
        href: `${config.apy}/project`,
        icon: "icon-xiangmu1",
        more: true,
        header: true,
      },
      {
        id: name.token,
        name: i18n.menu.apy.token, // '币种 APY 分析'
        href: `${config.apy}/token`,
        icon: "icon-bizhong1",
        more: true,
        header: true,
      },
      {
        id: name.heco,
        name: i18n.menu.apy.heco, // 'HECO 节点 APY'
        href: `${config.apy}/heco`,
        icon: "icon-heco2",
        more: true,
        header: true,
      },
    ],
  };
};
