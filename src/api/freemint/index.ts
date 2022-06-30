/**
 *
 */
import _ from "lodash";
import * as api from "src/config/api";
import { DefaultValue, get, tryError, userToken } from "src/plugins/dao/http";
import ApiTemplate from "../template";
import safeGet from "@fengqiaogang/safe-get";
const config = {
  timeout: 10000,
};
export default class extends ApiTemplate {
  //free block
  @tryError(DefaultValue({})) // 处理默认值
  @get(api.freemint.blockList, 0, config) //定义一个 get 请求
  @userToken() // 不需要用户信息
  blockList<T>(query: any): Promise<T> {
    return [query] as any;
  }
  async blockListAll() {
    const promises = [];
    for (let i = 1; i <= 5; i++) {
      promises.push(this.blockList({ page: i, page_size: 100 }));
    }
    const result = await Promise.all(promises);
    const list: object[] = [];
    for (const item of result) {
      const value = safeGet<object[]>(item as object, "list") || [];
      list.push(...value);
    }
    return {
      list,
      updated: safeGet<string>(result, "[0].updated"),
    };
  }
  //free block
  @tryError(DefaultValue({})) // 处理默认值
  @get(api.freemint.nftList, 0, config) //定义一个 get 请求
  @userToken() // 不需要用户信息
  nftList<T>(query: any): Promise<T> {
    return [query] as any;
  }
}
