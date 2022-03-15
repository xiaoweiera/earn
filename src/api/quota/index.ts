/**
 * @file 指标
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
import * as api from "src/config/api";
import { DefaultValue, expire, get, required, tryError, userToken, validate } from "src/plugins/dao/http";
import ApiTemplate from "../template";

export default class extends ApiTemplate {
  // 指标列表
  @tryError(DefaultValue([]))
  @get(api.quota.list)
  @userToken()
  getSignals<T>(query: object): Promise<T> {
    const callback = function (data: object): T {
      return safeGet<T>(data, "results");
    };
    return [query, callback] as any;
  }

  // 指标列表
  @tryError(DefaultValue({}))
  @get(api.quota.details, expire.min30)
  @userToken()
  @validate
  getDetail<T>(@required id: number | string): Promise<T> {
    const query = { id };
    return [query] as any;
  }

  // 推荐
  @tryError(DefaultValue([]))
  @get(api.quota.recommend, expire.min30)
  @userToken()
  @validate
  getRecommend<T>(@required id: number | string): Promise<T> {
    const query = { id };
    return [query] as any;
  }
}
