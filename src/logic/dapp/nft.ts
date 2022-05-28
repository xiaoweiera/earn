/**
 * @file
 * @author zhangkun@163.com
 */

import I18n from "src/utils/i18n";
import { getParam } from "src/utils/router";
import { routerConfig } from "src/router/config";
import { getValue } from "src/utils/root/data";
import { TabTypes } from "./dapp";

export { TabTypes } from "./dapp";

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

export const getOptionList = (list: string[], key: string) => {
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
