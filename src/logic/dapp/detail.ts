/**
 * @file
 * @author zhangkun@163.com
 */

import API from "src/api";
import type { DataQuery } from "src/types/dapp/data";

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
