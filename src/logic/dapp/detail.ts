/**
 * @file
 * @author zhangkun@163.com
 */

import API from "src/api";
import { routerConfig } from "src/router/config";
import type { DAppProject, DataQuery, TokenDataQuery, TokenQuery } from "src/types/dapp/data";
import { ProjectItem, Progress, ProjectType, TabName } from "src/types/dapp/detail";
import { dateTime } from "src/utils";
import dayjs from "dayjs";
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
  let value: any;
  // 排行榜
  if (project.rank) {
    // 排行榜（分析）详情
    switch (project.type) {
    case ProjectType.nft:
      value = routerConfig.rank.nftDetail(project.id, { tab });
      break;
    case ProjectType.defi:
      value = routerConfig.rank.defiDetail(project.id, { tab });
      break;
    case ProjectType.game:
      value = routerConfig.rank.gameDetail(project.id, { tab });
      break;
    case ProjectType.dapp:
      value = routerConfig.rank.dappDetail(project.id, { tab });
      break;
    }
  } else {
    // 新项目详情
    switch (project.type) {
    case ProjectType.mint:
      value = routerConfig.dapp.nftDetail(project.id, { tab });
      break;
    case ProjectType.airdrop:
      value = routerConfig.dapp.airdropDetail(project.id, { tab });
      break;
    case ProjectType.igo:
      value = routerConfig.dapp.igoDetail(project.id, { tab });
      break;
    case ProjectType.ido:
      value = routerConfig.dapp.idoDetail(project.id, { tab });
      break;
    }
  }
  return value;
};

export const getTabList = function (project: DAppProject, data: ProjectItem) {
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
  if (project.type === ProjectType.airdrop && data.airdrop_status !== Progress.no) {
    list.push({
      tab: TabName.airdrop,
      label: i18n.dapp.project.airdrop,
      href: makeUrl(project, TabName.airdrop),
    });
  } else if (project.type === ProjectType.nft || project.type === ProjectType.mint) {
    if (data.mint_status !== Progress.no) {
      list.push({
        tab: TabName.nft,
        label: "Mint",
        href: makeUrl(project, TabName.nft),
      });
    }
    list.push({
      tab: TabName.holder,
      label: "🐳 Holders",
      href: makeUrl(project, TabName.holder),
    });
  } else if (project.type === ProjectType.ido && data.ido_status !== Progress.no) {
    list.push({
      tab: project.type,
      label: "IDO",
      href: makeUrl(project, project.type as any),
    });
  } else if (project.type === ProjectType.igo && data.ido_status !== Progress.no) {
    list.push({
      tab: project.type,
      label: "IGO",
      href: makeUrl(project, project.type as any),
    });
  } else if (data.investments !== null && data.investments.length > 0) {
    list.splice(1, 0, {
      tab: TabName.project,
      label: i18n.dapp.project.projectInfo,
      href: makeUrl(project, TabName.project),
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

export const holderDateList = function () {
  const i18n = I18n();
  return [
    { id: "30d", name: i18n.dapp.detail.holder.day },
    { id: "all", name: i18n.dapp.detail.holder.all },
  ];
};

export const getData = function (val: any) {
  if (val === "30d") {
    return dateTime(dayjs().subtract(30, "day"));
  } else {
    return "";
  }
};

export const doHandMonth = function (month: any) {
  let m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
};
