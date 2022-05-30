/**
 * @file
 * @author zhangkun@163.com
 */

import * as api from "src/config/api";
import { DefaultValue, get, required, tryError, userToken } from "src/plugins/dao/http";
import ApiTemplate from "../template";
import type { WxQuery } from "src/types/wxchat";

export default class extends ApiTemplate {
  // 广告 banner 数据
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.wx.info) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getWxConfig<T>(@required query: WxQuery): Promise<T> {
    // 返回参数
    return [query] as any;
  }
}
