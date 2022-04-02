/**
 *
 */

import * as api from "src/config/api";
import { DefaultValue, expire, get, tryError, userToken } from "src/plugins/dao/http";
import ApiTemplate from "../template";
import I18n from "src/utils/i18n";
import { getUrl } from "src/lib/url";
import { groupModel, dappListModel } from "src/types/rank";
import safeGet from "@fengqiaogang/safe-get";
const timeConfig = {
  timeout: 10000,
  baseURL: "https://kingdata.xyz",
};
export default class extends ApiTemplate {
  //得到链
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.rank.chainsList, expire.day1, timeConfig) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getChains<T>(position: string, baseUrl: string): Promise<T> {
    const query = { position };
    const i18n = I18n(this.getRequest());
    const callback = function (data: object[]) {
      const all = { id: 1000, name: i18n.topRank.chainAll, slug: "all", logo: "icon-quanbu" };
      const other = { id: 10001, name: i18n.topRank.chainOther, slug: "other", logo: "" };
      //@ts-ignore
      const list = data ? [].concat(all, data, other) : [].concat(all, other);
      return getUrl(list, baseUrl, "chain", "slug");
    };
    // 返回参数
    return [query, callback] as any;
  }

  //得到分组
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.rank.groups, expire.min10, timeConfig) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getGroups<T>(query: groupModel): Promise<T> {
    const callback = function (data: object[]) {
      const all = { id: "all", initial: { text: "All" }, active: { text: "All" } };
      if (data) {
        data.unshift(all);
      }
      //得到链接
      return data;
    };
    return [query, callback] as any;
  }
  //dapp 列表
  @tryError(DefaultValue({})) // 处理默认值
  @get(api.rank.dappTable, expire.min10, timeConfig) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getDappList<T>(query: dappListModel): Promise<T> {
    const callback = function (data: object) {
      return safeGet(data, "results") || [];
    };
    return [query, callback] as any;
  }
  //dapp chart
  @tryError(DefaultValue({})) // 处理默认值
  @get(api.rank.dappChart, expire.min10, timeConfig) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  dappChart<T>(): Promise<T> {
    return [] as any;
  }
  //nft 列表
  @tryError(DefaultValue({})) // 处理默认值
  @get(api.rank.nftTable, expire.min10, timeConfig) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getNftList<T>(query: dappListModel): Promise<T> {
    const callback = function (data: object) {
      return safeGet(data, "results") || [];
    };
    return [query, callback] as any;
  }
}
