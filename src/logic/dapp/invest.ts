import API from "src/api";

/**
 * @file 投融资逻辑层
 * @author zhangkun@163.com
 */

export class Model extends API {
  // 投融资projects数据
  getProjectsList(query: any) {
    return this.dApp.getProjectsList(query);
  }
  // 投融资funds数据
  getFundsList(query: any) {
    return this.dApp.getFundsList(query);
  }
}
