/**
 * @file
 * @author zhangkun@163.com
 */

import API from "src/api";
import type { DAppProject, DataQuery, TokenDataQuery, TokenQuery } from "src/types/dapp/data";
import { DAppData, Progress, ProjectType, TabName } from "src/types/dapp/data";
import I18n from "src/utils/i18n";

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
  //项目信息
  getProjectInfo(query: object) {
    return this.dApp.getProjectInfo(query);
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

export const getTabList = function (project: DAppProject, data: DAppData) {
  const i18n = I18n();
  const list: object[] = [
    {
      tab: TabName.dashboard,
      label: i18n.dapp.project.dashboard,
      href: makeUrl(project, TabName.dashboard),
    },
    // {
    //   tab: TabName.project,
    //   label: i18n.dapp.project.projectInfo,
    //   href: makeUrl(project, TabName.project),
    // },
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
  if (data.preferred_module === ProjectType.airdrops && data.airdrop.airdrop_status !== Progress.no) {
    list.push({
      tab: TabName.airdrop,
      label: i18n.dapp.project.airdrop,
      href: makeUrl(project, TabName.airdrop),
    });
  } else if (data.preferred_module === ProjectType.mint && data.nft.mint_status !== Progress.no) {
    list.push({
      tab: TabName.nft,
      label: "Mint",
      href: makeUrl(project, TabName.nft),
    });
  } else if ((project.type === ProjectType.dapp || project.rank) && (data.preferred_module === ProjectType.ido || data.preferred_module === ProjectType.igo) && data.ido.ido_status !== Progress.no) {
    list.push({
      tab: project.type,
      label: "IDO",
      href: makeUrl(project, project.type as any),
    });
  } else if ((project.type === ProjectType.igo || project.rank) && (data.preferred_module === ProjectType.ido || data.preferred_module === ProjectType.igo) && data.ido.ido_status !== Progress.no) {
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
