/**
 * @file 微信分享
 * @author zhangkun@163.com
 */

import API from "src/api";
import { WxQuery } from "src/types/wxchat";

export class Model extends API {
  // 获取微信配置
  getWxConfig(query: WxQuery) {
    return this.wx.getWxConfig(query);
  }
}
