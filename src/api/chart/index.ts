/**
 * @file 图表相关接口
 * @author svon.me@gmail.com
 */

import { dateTime, toArray, toInteger } from "src/utils/";
import * as api from "src/config/api";
import { DefaultValue, expire, get, required, tryError, userToken, validate } from "src/plugins/dao/http";
import type { SearchQuery, ProjectType } from "src/types/echarts/data";
import { echart, dataTransform } from "src/logic/ui/echart/decorate";
import ApiTemplate from "../template";

export default class extends ApiTemplate {
  /**
   * Dapp chart
   * @param query 查询参数
   * @param projectType 项目类型
   * @param chains 公链数据
   */
  @tryError(DefaultValue(null))
  @echart // 转换为 chart 组件支持的格式
  @get(api.chart.dapp, expire.min5)
  @userToken()
  @validate
  dapp<T>(@required query: SearchQuery, projectType?: ProjectType | string, chains?: string | string[]): Promise<T> {
    const fields = toArray(query.fields);
    const param = {
      id: query.id,
      timeunit: query.timeUnit,
      from_timestamp: query.start ? toInteger(dateTime(query.start) / 1000) : 0,
      to_timestamp: toInteger(dateTime(query.end || Date.now()) / 1000),
      indicators: fields.join(","),
    };
    const callback = function (list: object[]) {
      const data = dataTransform(fields, list, projectType, chains);
      return Object.assign({ timeUnit: param.timeunit }, data);
    };
    return [param, callback] as any;
  }
}
