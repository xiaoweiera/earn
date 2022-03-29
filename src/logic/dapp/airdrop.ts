/**
 * @file 空投逻辑
 * @author zhangkun@163.com
 */

import { TabTypes } from "src/types/dapp/airdrop";
import I18n from "src/utils/i18n";
import { config } from "src/router/config";
import { toLower, toUpper } from "ramda";

export const tabs = function () {
  const i18n = I18n();
  return [
    {
      name: TabTypes.all,
      label: i18n.common.button.all,
      href: `${config.airdrop}/list/${TabTypes.all}`,
    },
    {
      name: TabTypes.hot,
      logo: "",
      label: i18n.airdrop.tabs.hot,
      href: `${config.airdrop}/list/${TabTypes.hot}`,
    },
    {
      name: TabTypes.ongoing,
      logo: "",
      label: i18n.airdrop.tabs.ongoing,
      href: `${config.airdrop}/list/${TabTypes.ongoing}`,
    },
    {
      name: TabTypes.potential,
      logo: "icon-hot",
      label: i18n.airdrop.tabs.potential,
      href: `${config.airdrop}/list/${TabTypes.potential}`,
    },
    {
      name: TabTypes.upcoming,
      logo: "",
      label: i18n.airdrop.tabs.upcoming,
      href: `${config.airdrop}/list/${TabTypes.upcoming}`,
    },
    {
      name: TabTypes.ended,
      logo: "",
      label: i18n.growthpad.status.closure,
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
