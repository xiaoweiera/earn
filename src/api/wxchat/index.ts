/**
 * @file
 * @author zhangkun@163.com
 */

import ApiTemplate from "../template";
import * as api from "src/config/api";
import type { WxConfig } from "src/types/wxchat";
import { DefaultValue, get, required, tryError, userToken } from "src/plugins/dao/http";

export default class extends ApiTemplate {
  @tryError(DefaultValue(null)) // 处理默认值
  @get(api.wx.info)
  @userToken() // 不需要用户信息
  getWxConfig(@required query: object): Promise<WxConfig> {
    // 返回参数
    return [query] as any;
  }
}
