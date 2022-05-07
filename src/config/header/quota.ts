/**
 * @file 指标监控
 */

import { config } from "src/router/config";
import { Lang } from "src/types/language";
import { MenuItem } from "src/types/menu";
import I18n from "src/utils/i18n";

export const name = {
  indicators: "quota-indicators",
  signals: "quota-signals",
};

export const Quota = function (lang?: Lang): MenuItem {
  const i18n = I18n(lang);
  return {
    name: i18n.menu.quota.title, // 指标监控
    href: config.quota,
    newTip: false,
    children: [
      {
        id: name.indicators,
        name: i18n.menu.data.quota, // 推荐指标
        icon: "icon-zhibiao",
        href: config.quota,
        more: true,
        header: true,
      },
      {
        id: name.signals,
        name: i18n.menu.data.news, // 指标异动
        icon: "icon-yidong1",
        href: config.news,
        more: true,
        header: true,
      },
    ],
  };
};
