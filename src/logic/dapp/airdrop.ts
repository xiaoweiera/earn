/**
 * @file 空投逻辑
 * @author zhangkun@163.com
 */

import { TabTypes } from "src/types/dapp/airdrop";
import I18n from "src/utils/i18n";
import { config, routerConfig } from "src/router/config";
import { toLower, toUpper } from "ramda";
import { isString } from "src/utils/check/is";
import { AnyEquals } from "src/utils";
import safeGet from "@fengqiaogang/safe-get";
import { RouteLocationNormalizedLoaded } from "vue-router";
import { getValue } from "src/utils/root/data";
import { getParam } from "src/utils/router";

export const tabs = function () {
  return function () {
    const i18n = I18n();
    const query = getParam<object>();
    return [
      {
        activity_stage: TabTypes.all,
        name: i18n.common.button.all,
        href: {
          path: routerConfig.dapp.airdropList(),
          query: {
            ...query,
            activity_stage: TabTypes.all,
          },
        },
      },
      {
        activity_stage: TabTypes.hot,
        name: i18n.airdrop.tabs.hot,
        href: {
          path: routerConfig.dapp.airdropList(),
          query: {
            ...query,
            activity_stage: TabTypes.hot,
          },
        },
      },
      {
        activity_stage: TabTypes.ongoing,
        name: i18n.airdrop.tabs.ongoing,
        href: {
          path: routerConfig.dapp.airdropList(),
          query: {
            ...query,
            activity_stage: TabTypes.ongoing,
          },
        },
      },
      {
        activity_stage: TabTypes.potential,
        name: i18n.airdrop.tabs.potential,
        logo: "icon-hot",
        href: {
          path: routerConfig.dapp.airdropList(),
          query: {
            ...query,
            activity_stage: TabTypes.potential,
          },
        },
      },
      {
        activity_stage: TabTypes.upcoming,
        name: i18n.airdrop.tabs.upcoming,
        href: {
          path: routerConfig.dapp.airdropList(),
          query: {
            ...query,
            activity_stage: TabTypes.upcoming,
          },
        },
      },
      {
        activity_stage: TabTypes.ended,
        name: i18n.growthpad.status.closure,
        href: {
          path: routerConfig.dapp.airdropList(),
          query: {
            ...query,
            activity_stage: TabTypes.ended,
          },
        },
      },
    ];
  };
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

// logo 左上角图标 (new, ad, top)
export const decorate = function (value: string | object, size: number | string = 40): string {
  let name = "";
  if (value && isString(value)) {
    name = value as string;
  } else {
    name = safeGet<string>(value, "peg");
  }
  if (name && AnyEquals(name, "new")) {
    return `new-${size}`;
  }
  if (name && AnyEquals(name, "ad")) {
    return `ad-${size}`;
  }
  if (name && AnyEquals(name, "top")) {
    return `sticky-${size}`;
  }
  if (name && AnyEquals(name, "recommend")) {
    return `hot-${size}`;
  }
  return "";
};
// 获取缓存列表
export const getCacheList = function <T>($route: RouteLocationNormalizedLoaded, key: string): T[] {
  // 当前 url 参数
  const $params = { ...$route.params };
  const name: TabTypes = $params.name as any;
  // 加载时 url 参数
  const oldName = getValue<TabTypes>("query.name", TabTypes.all);
  // 如果相同，则返回缓存数据
  if (name === oldName) {
    return getValue<T[]>(key, []);
  }
  return [];
};
