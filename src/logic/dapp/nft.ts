/**
 * @file
 * @author zhangkun@163.com
 */

import I18n from "src/utils/i18n";
import { getParam } from "src/utils/router";
import { routerConfig } from "src/router/config";
import { getValue } from "src/utils/root/data";
import { TabTypes } from "./dapp";
import * as R from "ramda";
import safeGet from "@fengqiaogang/safe-get";
import { SiteConfig } from "src/types/common/chain";
import * as alias from "src/utils/root/alias";

export { TabTypes } from "./dapp";

const configs = getValue<SiteConfig>(alias.common.chain.site, {} as SiteConfig);
export const tabAll = "All";

export const getAll = function () {
  return {
    id: tabAll,
    name: "All",
    slug: "All",
    logo: "icon-quanbu",
  };
};

export const getTabList = function () {
  return function () {
    const i18n = I18n();
    const query = getParam<object>();
    return [
      {
        activity_stage: TabTypes.upcoming,
        name: i18n.airdrop.tabs.upcoming,
        href: {
          path: routerConfig.dapp.nftList(),
          query: {
            ...query,
            activity_stage: TabTypes.upcoming,
          },
        },
      },
      {
        activity_stage: TabTypes.ended,
        icon: "",
        name: i18n.dapp.sort.history,
        href: {
          path: routerConfig.dapp.nftList(),
          query: {
            ...query,
            activity_stage: TabTypes.ended,
          },
        },
      },
    ];
  };
};

export const getUiTabList = (list: string[], key: string, name: string) => {
  return function () {
    const arr: any = [getAll()];
    R.forEach((item: any) => {
      const value = safeGet(configs, `${name}.${item}`);
      if (value) {
        arr.push(value);
      }
    }, list);
    const query = getParam<object>();
    return R.map((item: any) => {
      return {
        ...item,
        [key]: item.slug,
        href: {
          path: getValue("url"),
          query: {
            ...query,
            [key]: item.slug,
          },
        },
      };
    }, arr);
  };
};
