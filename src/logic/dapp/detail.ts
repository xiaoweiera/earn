/**
 * @file
 * @author zhangkun@163.com
 */

import API from "src/api";
import type { DataQuery } from "src/types/dapp/data";
import I18n from "src/utils/i18n";
import { upperFirst } from "src/utils/";
import { TabName, ProjectType } from "src/types/dapp/data";
import type { DAppProject } from "src/types/dapp/data";
import { config as routerConfig } from "src/router/config";

export class Model extends API {
  // 用户资产图表
  getUserData(query: DataQuery) {
    return this.dApp.getUserData(query);
  }
  // 用户资产图表
  getMarketCapData(query: DataQuery) {
    return this.dApp.getMarketCapData(query);
  }
  // 用户资产图表
  getTVLData(query: DataQuery) {
    return this.dApp.getTVLData(query);
  }
  // 用户资产图表
  getFloorData(query: DataQuery) {
    return this.dApp.getFloorData(query);
  }
}

const makeUrl = function (project: DAppProject, tab: TabName): string {
  if (project.rank) {
    return `/rank/${project.type}/${project.id}`;
  }
  if (project.type === ProjectType.igo) {
    return `${routerConfig.dapp}/${project.id}/${tab}?${ProjectType.igo}=true`;
  }
  return `${routerConfig.dapp}/${project.id}/${tab}`;
};

export const getTabList = function (project: DAppProject) {
  const i18n = I18n();
  const list: object[] = [
    {
      tab: TabName.dashboard,
      label: i18n.dapp.project.dashboard,
      href: makeUrl(project, TabName.dashboard),
    },
    {
      tab: TabName.reviews,
      label: i18n.dapp.project.reviews,
      href: makeUrl(project, TabName.reviews),
    },
    {
      tab: TabName.twitter,
      label: "Twitter",
      href: makeUrl(project, TabName.twitter),
    },
  ];
  // 空投
  if (project.type === ProjectType.airdrop) {
    list.push({
      tab: TabName.airdrop,
      label: i18n.dapp.project.airdrop,
      href: makeUrl(project, TabName.airdrop),
    });
  } else if (project.type === ProjectType.nft) {
    list.push({
      tab: TabName.nft,
      label: "Mint",
      href: makeUrl(project, TabName.nft),
    });
  } else {
    list.push({
      tab: project.type,
      label: upperFirst(project.type),
      href: makeUrl(project, project.type as any),
    });
  }
  return list;
};
