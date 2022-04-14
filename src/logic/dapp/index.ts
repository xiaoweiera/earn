import _ from "lodash";
import API from "src/api/index";
import type { AdItem, ProjectItem, Query } from "src/types/dapp/ixo";
import { Status } from "src/types/dapp/ixo";
import type { ProjectNftItem } from "src/types/dapp/nft";
import { config } from "src/router/config";
import * as R from "ramda";
import { getValue } from "src/utils/root/data";
import type { SiteConfig } from "src/types/common/chain";
import * as alias from "src/utils/root/alias";
import I18n from "src/utils/i18n";
import { getParam } from "src/utils/router/";
import { dateFormat, dateTime, dateYMDFormat, getDateMDY, isAfter, dateDiffData, dateNow, getEnDateMDY } from "src/utils/";
import safeGet from "@fengqiaogang/safe-get";
import type * as logic from "src/types/dapp";
import DBList from "@fengqiaogang/dblist";
import dayjs from "dayjs";
import { createHref } from "src/plugins/router/pack";
import { Language } from "src/types/language";
import { NftTabItem, NftTabTypes, TabItem, TabTypes } from "src/types/dapp";
import { AirdropQuery, DataItem } from "src/types/dapp/airdrop";

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

// 获取公链
export const tabChain = function (data: any, key: string, href: string) {
  return function () {
    const arr: any = [getAll()];
    R.forEach((item: any) => {
      const value = safeGet(configs, `chain.${item}`);
      if (value) {
        arr.push(value);
      }
    }, data);
    const query = getParam<object>();
    return R.map((item: any) => {
      return {
        ...item,
        [key]: item.slug,
        href: {
          path: href,
          query: {
            ...query,
            [key]: item.slug,
          },
        },
      };
    }, arr);
  };
};

// 获取平台
export const tabPlat = function (data: any, key: string, href: string) {
  return function () {
    const arr: any = [getAll()];
    R.forEach((item: any) => {
      const value = safeGet(configs, `tge_platform.${item}`);
      if (value) {
        arr.push(value);
      }
    }, data);
    const query = getParam<object>();
    return R.map((item: any) => {
      return {
        ...item,
        [key]: item.slug,
        href: {
          path: href,
          query: {
            ...query,
            [key]: item.slug,
          },
        },
      };
    }, arr);
  };
};
// 获取项目类型
export const tabCage = function (data: any, key: string, href: string) {
  return function (): any[] {
    const arr: any = ["All"].concat(data);
    const query = getParam<object>();
    return R.map((item: any) => {
      return {
        ...item,
        [key]: item,
        name: item,
        href: {
          path: href,
          query: {
            ...query,
            [key]: item,
          },
        },
      };
    }, arr);
  };
};

export class Model extends API {
  getSummary() {
    throw new Error("Method not implemented.");
  }

  // IDO数据
  getList(query: any) {
    return this.dApp.getList(query);
  }

  // nft数据
  getNftList(query: any) {
    return this.dApp.getNftList(query);
  }

  getUpcomingProjects(chain?: string) {
    const query: Query = {
      chain: chain || "all",
      status: Status.upcoming,
    };
    return this.dApp.ixo<ProjectItem | AdItem>(query);
  }

  getOngoingProjects(chain?: string) {
    const query: Query = {
      chain: chain || "all",
      status: Status.ongoing,
    };
    return this.dApp.ixo<ProjectItem | AdItem>(query);
  }

  // 获取首页nft进行时
  getUpcomingNftList(query: any) {
    return this.dApp.getNftList(query);
  }

  getEndedProjects(query: object) {
    return this.dApp.ixoEnd<ProjectItem | AdItem>(query);
  }
  //空投项目数据
  getAirdropList(query: object) {
    return this.dApp.getAirdropList<DataItem>(query);
  }
  //空投进行中项目
  getOngoingList(query: AirdropQuery) {
    return this.dApp.getOngoingList<DataItem>(query);
  }
  //空投潜在优质项目
  getPotentialList(query: object = {}) {
    return this.dApp.getPotentialList<DataItem>(query);
  }
  //空投即将开始项目
  getUpcomingList(query: AirdropQuery) {
    return this.dApp.getUpcomingList<DataItem>(query);
  }
  //空投即将开始项目
  getEndedList(query: AirdropQuery) {
    return this.dApp.getEndedList<DataItem>(query);
  }
  //空投运营精选
  getOperationList(query: AirdropQuery) {
    return this.dApp.getOperationList<DataItem>(query);
  }
  getHotPotentialList(query: AirdropQuery) {
    return this.dApp.getHotPotentialList<DataItem>(query);
  }
}

// 跳转IDO链接
export const getUrl = function (name: string, type: boolean) {
  if (type) {
    if (name === Status.upcoming) {
      return `${config.dappList}?type=${Status.upcoming}`;
    } else if (name === Status.ongoing) {
      return `${config.dappList}?type=${Status.ongoing}`;
    } else if (name === Status.ended) {
      return `${config.dappList}?type=${Status.ended}`;
    }
  } else {
    if (name === Status.upcoming) {
      return `${config.nft}/discover?status=${Status.upcoming}`;
    }
  }
};

// 获取公链logo
export const getLog = function (name: string) {
  const data = safeGet<object>(configs, `chain.${name}`);
  if (data) {
    return safeGet<string>(data, "logo");
  }
  return "--";
};
// 获取tegicon
export const getTegLog = function (name: string) {
  return safeGet<string>(configs, `tge_platform.${name}.logo`) || "";
};
// 获取跳转链接
export const getTegUrl = function (name: string) {
  return safeGet<string>(configs, `tge_platform.${name}.website`) || "";
};

export const sortTime = function (list: any) {
  return R.map((data: logic.ProjectItem) => {
    const value = dateYMDFormat(data.mint_start_at);
    data.pid = dateTime(value);
    return data;
  }, list);
};
export const sortVal = function (list: any[], diff?: string, reverse?: boolean) {
  const app = function (value1: any, value2: any) {
    if (diff) {
      if (reverse) {
        return safeGet<number>(value2, diff) - safeGet<number>(value1, diff);
      }
      return safeGet<number>(value1, diff) - safeGet<number>(value2, diff);
    }
    if (reverse) {
      return value2 - value1;
    }
    return value1 - value2;
  };
  return R.sort(app, list);
};

// 判断是否是今天和明天
export const getTodayTime = function (value: number) {
  const today = dayjs();
  const date = dayjs(value);

  // 判断是否是今天
  if (today.isSame(date, "day")) {
    const i18n = I18n();
    return i18n.home.nfts.today;
  }
  const tomorrow = dayjs().add(1, "day");
  // 判断是否是明天
  if (tomorrow.isSame(date, "day")) {
    const i18n = I18n();
    return i18n.home.nfts.tomorrow;
  }
  return getDateMDY(value);
};
// 跳转路由
export const getNextUrl = function (val: any) {
  if (val && val.url) {
    window.open(createHref(val.url, { type: "dashboard" }));
  }
};

export const transformNftList = function (list: ProjectNftItem[]) {
  const days: number[] = [];
  const db = new DBList([], "id", "date");
  _.forEach(list, (item: ProjectNftItem) => {
    const date = dateTime(`${dateFormat(item.mint_start_at, "YYYY-MM-DD")}00:00:00`);
    days.push(date);
    db.insert({ ...item, date });
  });
  return _.map(_.sortBy(_.uniq(days)), (date: number) => {
    return {
      date,
      title: getTodayTime(date),
      list: db.select({ date }),
    };
  });
};
// 高亮显示
export const getClassColor = (v: any) => (v > 0 ? "text-global-numGreen" : v < 0 ? "text-global-numRed" : "text-global-highTitle");

// 根据语言获取宽度
export const getClassWidth = function () {
  const lang = getParam<string>("lang", "") as string;
  if (lang === Language.cn) {
    return "w-15";
  } else {
    return "w-22";
  }
};

// IDO&IGOtab切换
export const tabs = function (): TabItem[] {
  const i18n = I18n();
  const query = getParam<object>();
  return [
    {
      type: TabTypes.upcoming,
      icon: "",
      name: i18n.airdrop.tabs.upcoming,
      href: {
        path: config.dappList,
        query: {
          ...query,
          type: TabTypes.upcoming,
        },
      },
    },
    {
      type: TabTypes.ongoing,
      icon: "",
      name: i18n.airdrop.tabs.ongoing,
      href: {
        path: config.dappList,
        query: {
          ...query,
          type: TabTypes.ongoing,
        },
      },
    },
    {
      type: TabTypes.ended,
      icon: "",
      name: i18n.growthpad.status.closure,
      href: {
        path: config.dappList,
        query: {
          ...query,
          type: TabTypes.ended,
        },
      },
    },
  ];
};

// nft分类切换
export const nftTabs = function (): NftTabItem[] {
  const i18n = I18n();
  const query = getParam<object>();
  return [
    {
      status: NftTabTypes.upcoming,
      icon: "",
      name: i18n.airdrop.tabs.upcoming,
      href: {
        path: `${config.nft}/discover`,
        query: {
          ...query,
          status: NftTabTypes.upcoming,
        },
      },
    },
    {
      status: NftTabTypes.history,
      icon: "",
      name: i18n.dapp.sort.history,
      href: {
        path: `${config.nft}/discover`,
        query: {
          ...query,
          status: NftTabTypes.history,
        },
      },
    },
  ];
};

//计算时间
export const timeValue = function (startAt?: string | number, startEnd?: string | number) {
  const i18n = I18n();
  if (startAt && startEnd) {
    const start = getEnDateMDY(startAt);
    const end = getEnDateMDY(startEnd);
    // 如果项目未开始 (开始时间大于当前时间)
    if (isAfter(startAt)) {
      const diff = dateDiffData(dateNow(), startAt);
      if (diff.day > 0) {
        return `${start} - ${end}, ${i18n.template(i18n.common.time.countDown.started.day, {
          count: diff.day,
        })}`;
      }
      if (diff.hour > 0) {
        return `${start} - ${end}, ${i18n.template(i18n.common.time.countDown.started.hour, {
          count: diff.hour,
        })}`;
      }
      if (diff.minute > 0) {
        return `${start} - ${end}, ${i18n.template(i18n.common.time.countDown.started.minute, {
          count: diff.minute,
        })}`;
      }
    }
    // 如果项目未结束 （结束时间大于当前时间）
    if (isAfter(startEnd)) {
      const diff = dateDiffData(dateNow(), startEnd);
      if (diff.day > 0) {
        return `${start} - ${end}, ${i18n.template(i18n.common.time.countDown.ended.day, {
          count: diff.day,
        })}`;
      }
      if (diff.hour > 0) {
        return `${start} - ${end}, ${i18n.template(i18n.common.time.countDown.ended.hour, {
          count: diff.hour,
        })}`;
      }
      if (diff.minute > 0) {
        return `${start} - ${end}, ${i18n.template(i18n.common.time.countDown.ended.minute, {
          count: diff.minute,
        })}`;
      }
    }
    return `${start} - ${end}`;
  }
  // 有开始时间，无结束时间
  if (startAt) {
    // 开始时间大于当前时间
    const start = getEnDateMDY(startAt);
    // 如果项目未开始 (开始时间大于当前时间)
    if (isAfter(startAt)) {
      const diff = dateDiffData(dateNow(), startAt);
      if (diff.day > 0) {
        return `${start}, ${i18n.template(i18n.common.time.countDown.started.day, {
          count: diff.day,
        })}`;
      }
      if (diff.hour > 0) {
        return `${start}, ${i18n.template(i18n.common.time.countDown.started.hour, {
          count: diff.hour,
        })}`;
      }
      if (diff.minute > 0) {
        return `${start}, ${i18n.template(i18n.common.time.countDown.started.minute, {
          count: diff.minute,
        })}`;
      }
    }
    return start;
  }
  // 有结束时间，无开始时间
  if (startEnd) {
    const end = getEnDateMDY(startEnd);
    // 如果项目未结束 （结束时间大于当前时间）
    if (isAfter(startEnd)) {
      const diff = dateDiffData(dateNow(), startEnd);
      if (diff.day > 0) {
        return `${end}，${i18n.template(i18n.common.time.countDown.ended.minute, {
          count: diff.day,
        })}`;
      }
      if (diff.hour > 0) {
        return `${end}，${i18n.template(i18n.common.time.countDown.ended.hour, {
          count: diff.hour,
        })}`;
      }
      if (diff.minute > 0) {
        return `${end}，${i18n.template(i18n.common.time.countDown.ended.minute, {
          count: diff.minute,
        })}`;
      }
    }
    return end;
  }
};

// 开始与结束时间
export const timeFormat = function (startTime?: string | number, endTime?: string | number) {
  if (startTime && endTime) {
    const start = getEnDateMDY(startTime);
    const end = getEnDateMDY(endTime);
    // 如果项目未开始 (开始时间大于当前时间)
    if (isAfter(startTime)) {
      const diff = dateDiffData(dateNow(), startTime);
      if (diff.day > 0) {
        return `${start} - ${end}`;
      }
      if (diff.hour > 0) {
        return `${start} - ${end}`;
      }
      if (diff.minute > 0) {
        return `${start} - ${end}`;
      }
    }
    // 如果项目未结束 （结束时间大于当前时间）
    if (isAfter(endTime)) {
      const diff = dateDiffData(dateNow(), endTime);
      if (diff.day > 0) {
        return `${start} - ${end}`;
      }
      if (diff.hour > 0) {
        return `${start} - ${end}`;
      }
      if (diff.minute > 0) {
        return `${start} - ${end}`;
      }
    }
    return `${start} - ${end}`;
  }
  // 有开始时间，无结束时间
  if (startTime) {
    // 开始时间大于当前时间
    const start = getEnDateMDY(startTime);
    // 如果项目未开始 (开始时间大于当前时间)
    if (isAfter(startTime)) {
      const diff = dateDiffData(dateNow(), startTime);
      if (diff.day > 0) {
        return `${start}`;
      }
      if (diff.hour > 0) {
        return `${start}`;
      }
      if (diff.minute > 0) {
        return `${start}`;
      }
    }
    return start;
  }
  // 有结束时间，无开始时间
  if (endTime) {
    const end = getEnDateMDY(endTime);
    // 如果项目未结束 （结束时间大于当前时间）
    if (isAfter(endTime)) {
      const diff = dateDiffData(dateNow(), endTime);
      if (diff.day > 0) {
        return `${end}`;
      }
      if (diff.hour > 0) {
        return `${end}`;
      }
      if (diff.minute > 0) {
        return `${end}`;
      }
    }
    return end;
  }
};
