/**
 * @file 指标
 * @author svon.me@gmail.com
 */

import { map } from "ramda";
import dayjs from "dayjs";
import { dateTime } from "src/utils/time/";
import safeGet from "@fengqiaogang/safe-get";
import * as api from "src/config/api";
import { DefaultValue, expire, get, required, tryError, userToken, validate } from "src/plugins/dao/http";
import ApiTemplate from "../template";

export default class extends ApiTemplate {
  // 指标列表
  @tryError(DefaultValue([]))
  @get(api.quota.list)
  @userToken()
  getSignals<T>(query: object): Promise<T[]> {
    const callback = function (data: object): T[] {
      const list = safeGet<T[]>(data, "results");
      if (list) {
        return map(function (data: T) {
          const published_at = safeGet<number>(data, "published_at") || Date.now();
          const date = dayjs(dateTime(published_at)).format("YYYYMMDD");
          return { ...data, published_at, date };
        }, list);
      }
      return [];
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
