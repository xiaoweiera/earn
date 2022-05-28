import I18n from "src/utils/i18n";
import { routerConfig } from "src/router/config";
import { getValue } from "src/utils/root/data";
import { getParam } from "src/utils/router";

// tab 切换
export enum TabTypes {
  upcoming = "upcoming", // 即将开始
  ongoing = "ongoing", // 进行中
  ended = "ended", // 已结束
}

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

export const getUiTabList = (list: string[], key: string) => {
  return function () {
    const query = getParam<object>();
    const array: object[] = [
      {
        name: "All",
        [key]: "all",
        href: {
          path: getValue("url"),
          query: {
            ...query,
            [key]: "all",
          },
        },
      },
    ];
    for (const value of list) {
      array.push({
        name: value,
        [key]: value,
        href: {
          path: getValue("url"),
          query: {
            ...query,
            [key]: value,
          },
        },
      });
    }
    return array;
  };
};
