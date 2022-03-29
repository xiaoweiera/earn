/**
 * @file 空投逻辑
 * @author zhangkun@163.com
 */

import { TabItem, TabTypes } from "src/types/dapp/airdrop";
import I18n from "src/utils/i18n";
import { config } from "src/router/config";
import { toLower, toUpper } from "ramda";

export const tabs = function (): TabItem[] {
  const i18n = I18n();
  return [
    {
      id: TabTypes.all,
      name: i18n.common.button.all,
      href: `${config.airdrop}/list/${TabTypes.all}`,
    },
    {
      id: TabTypes.hot,
      logo: "",
      name: i18n.airdrop.tabs.hot,
      href: `${config.airdrop}/list/${TabTypes.hot}`,
    },
    {
      id: TabTypes.ongoing,
      logo: "",
      name: i18n.airdrop.tabs.ongoing,
      href: `${config.airdrop}/list/${TabTypes.ongoing}`,
    },
    {
      id: TabTypes.potential,
      logo: "icon-hot",
      name: i18n.airdrop.tabs.potential,
      href: `${config.airdrop}/list/${TabTypes.potential}`,
    },
    {
      id: TabTypes.upcoming,
      logo: "",
      name: i18n.airdrop.tabs.upcoming,
      href: `${config.airdrop}/list/${TabTypes.upcoming}`,
    },
    {
      id: TabTypes.ended,
      logo: "",
      name: i18n.growthpad.status.closure,
      href: `${config.airdrop}/list/${TabTypes.ended}`,
    },
  ];
};

// 首字母大写
export const upperFirst = function (value: string): string {
  // 将字符串转换为小写
  const str = toLower(value || "");
  const first = toUpper(str[0] || "");
  const last = str.slice(1);
  return `${first}${last}`;
};

export const setScrollTop = function (top = 0) {
  // @ts-ignore
  document.scrollingElement.scrollTop = top;
};
