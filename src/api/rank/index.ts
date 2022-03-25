/**
 *
 */

import * as api from "src/config/api";
import { DefaultValue, expire, get, tryError, userToken } from "src/plugins/dao/http";
import ApiTemplate from "../template";
import I18n from "src/utils/i18n";
import { getUrl } from "src/lib/url";
import { config as routerConfig } from "src/router/config";

export default class extends ApiTemplate {
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.rank.chainsList, expire.day1) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getChains<T>(position: string): Promise<T> {
    const query = { position };
    const i18n = I18n(this.getRequest());
    const callback = function (data: object[]) {
      const all = { id: 1000, name: i18n.topRank.chainAll, slug: "all", logo: "icon-quanbu" };
      const other = { id: 10001, name: i18n.topRank.chainOther, slug: "other", logo: "" };
      if (data) {
        data.unshift(all);
        data.push(other);
      }
      //得到链接
      data = getUrl(data, routerConfig.rankDapp, "chain", "slug");
      return data;
    };
    // 返回参数
    return [query, callback] as any;
  }
}
