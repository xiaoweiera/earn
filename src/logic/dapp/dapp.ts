import I18n from "src/utils/i18n";
import { routerConfig } from "src/router/config";
import { getValue } from "src/utils/root/data";
import { getParam } from "src/utils/router";
import { SiteConfig } from "src/types/common/chain";
import * as alias from "src/utils/root/alias";
import * as R from "ramda";
import safeGet from "@fengqiaogang/safe-get";

// tab 切换
export enum TabTypes {
  upcoming = "upcoming", // 即将开始
  ongoing = "ongoing", // 进行中
  ended = "ended", // 已结束
}

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

export const getTabList = function (name: string) {
  return function () {
    const i18n = I18n();
    const query = getParam<object>();
    return [
      {
        activity_stage: TabTypes.upcoming,
        name: i18n.airdrop.tabs.upcoming,
        href: {
          path: name === "ido" ? routerConfig.dapp.idoList() : routerConfig.dapp.igoList(),
          query: {
            ...query,
            activity_stage: TabTypes.upcoming,
          },
        },
      },
      {
        activity_stage: TabTypes.ongoing,
        icon: "",
        name: i18n.airdrop.tabs.ongoing,
        href: {
          path: name === "ido" ? routerConfig.dapp.idoList() : routerConfig.dapp.igoList(),
          query: {
            ...query,
            activity_stage: TabTypes.ongoing,
          },
        },
      },
      {
        activity_stage: TabTypes.ended,
        icon: "",
        name: i18n.growthpad.status.closure,
        href: {
          path: name === "ido" ? routerConfig.dapp.idoList() : routerConfig.dapp.igoList(),
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
