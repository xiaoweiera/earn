/**
 * @file APY
 */

import safeGet from "@fengqiaogang/safe-get";
import { DefaultValue, expire, get, tryError, userToken } from "src/plugins/dao/http";
import { echart } from "src/logic/ui/echart/decorate";
import ApiTemplate from "../template";

export default class extends ApiTemplate {
  // heco 趋势
  @tryError(DefaultValue(null))
  @echart
  @get("/api/apy/heco/ninja/heco_trends", expire.min5)
  @userToken()
  getHecoTrends<T>(): Promise<T> {
    const callback = function (data: object): T {
      return safeGet<T>(data, "trends");
    };
    return [{}, callback] as any;
  }
}
