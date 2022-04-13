/**
 * @file
 * @author zhangkun@163.com
 */

import API from "src/api";
import type { DataQuery, TokenQuery, TokenDataQuery } from "src/types/dapp/data";
import I18n from "src/utils/i18n";
import { TabName, ProjectType } from "src/types/dapp/data";
import type { DAppProject } from "src/types/dapp/data";

export class Model extends API {
  // 用户资产图表
  getUserData(query: DataQuery) {
    return this.dApp.getUserData(query);
  }

  // 市值交易量
  getMarketCapData(query: DataQuery) {
    return this.dApp.getMarketCapData(query);
  }

  // TVL
  getTVLData(query: DataQuery) {
    return this.dApp.getTVLData(query);
  }

  // 地板价
  getFloorData(query: DataQuery) {
    return this.dApp.getFloorData(query);
  }

  // 代币图表
  getTokenData(query: TokenDataQuery) {
    return this.dApp.getTokenData(query);
  }

  // 代币列表
  getTokenList(query: TokenQuery) {
    return this.dApp.getTokenList(query);
  }
}

const makeUrl = function (project: DAppProject, tab: TabName): string {
  const app = function (prefix = "") {
    if (project.type === ProjectType.igo) {
      return `${prefix}/${ProjectType.dapp}/${project.id}/${tab}?${ProjectType.igo}=true`;
    }
    return `${prefix}/${project.type}/${project.id}/${tab}`;
  };

  if (project.rank) {
    return app("/rank");
  }
  return app();
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
  if (project.type === ProjectType.airdrop && !project.rank) {
    list.push({
      tab: TabName.airdrop,
      label: i18n.dapp.project.airdrop,
      href: makeUrl(project, TabName.airdrop),
    });
  } else if (project.type === ProjectType.nft && !project.rank) {
    list.push({
      tab: TabName.nft,
      label: "Mint",
      href: makeUrl(project, TabName.nft),
    });
  } else if (project.type === ProjectType.dapp && !project.rank) {
    list.push({
      tab: project.type,
      label: "IDO",
      href: makeUrl(project, project.type as any),
    });
  } else if (project.type === ProjectType.igo && !project.rank) {
    list.push({
      tab: project.type,
      label: "IGO",
      href: makeUrl(project, project.type as any),
    });
  }
  return list;
};

export const dateList = function () {
  const i18n = I18n();
  return [
    {
      id: "30d",
      name: "30D",
    },
    {
      id: "all",
      name: i18n.address.all,
    },
  ];
};
export const tokenUrl = "https://forms.gle/tC6umJmLDJ5ouTiW6";