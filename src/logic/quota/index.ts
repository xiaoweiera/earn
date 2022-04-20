import API from "src/api";

/**
 * @file 指标
 * @author svon.me@gmail.com
 */

export class Model extends API {
  // 获取推荐指标
  getIndicator(query: any) {
    return this.quota.getIndicator(query);
  }
}
