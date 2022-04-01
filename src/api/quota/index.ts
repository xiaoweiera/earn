/**
 * @file 指标
 * @author svon.me@gmail.com
 */

import { map } from "ramda";
import dayjs from "dayjs";
import { dateTime } from "src/utils/time/";
import safeGet from "@fengqiaogang/safe-get";
import * as api from "src/config/api";
import { toInteger } from "src/utils/";
import { DefaultValue, expire, get, post, required, tryError, userToken, validate } from "src/plugins/dao/http";
import ApiTemplate from "../template";

export default class extends ApiTemplate {
  // 指标列表
  @tryError(DefaultValue([]))
  @get(api.quota.list)
  @userToken()
  getSignals<T>(query?: object): Promise<T[]> {
    const callback = function (data: object): T[] {
      const list = safeGet<T[]>(data, "results");
      if (list) {
        return map(function (data: T) {
          const published_at = safeGet<number>(data, "published_at") || Date.now();
          const time = dateTime(published_at);
          const date = toInteger(dayjs(time).format("YYYYMMDD"));
          return { ...data, published_at, time, date };
        }, list);
      }
      return [];
    };
    const param = Object.assign({ page: 1, page_size: 50 }, query ? query : {});
    return [param, callback] as any;
  }

  // 指标详情
  @tryError(DefaultValue({}))
  @get(api.quota.details)
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
  // 关注
  @post(api.quota.follow)
  @userToken(true)
  @validate
  onFollow<T>(@required id: string | number): Promise<T> {
    return [{ id }] as any;
  }
  // 取消关注
  @post(api.quota.unfollow)
  @userToken(true)
  @validate
  unFollow<T>(@required id: string | number): Promise<T> {
    return [{ id }] as any;
  }
}
