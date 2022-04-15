/**
 * @file 投融资逻辑层
 * @author zhangkun@163.com
 */

import API from "src/api";
import { toArray } from "src/utils";
import _ from "lodash";

export class Model extends API {
  // 投融资projects数据
  getProjectsList(query: any) {
    return this.dApp.getProjectsList(query);
  }
  // 投融资funds数据
  getFundsList(query: any) {
    return this.dApp.getFundsList(query);
  }
  // 投融资轮次数据
  getRoundList() {
    return this.dApp.getRoundList();
  }
}

export const getAll = function () {
  return {
    id: "",
    name: "All",
  };
};
export const activeName = "name";

export const transformRound = function (list: []) {
  const value = toArray(getAll(), list);
  return _.map(value, (item: any) => {
    return { ...item, [activeName]: item.id };
  });
};
