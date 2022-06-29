/**
 *
 */

import * as api from "src/config/api";
import { DefaultValue, get, tryError, userToken } from "src/plugins/dao/http";
import ApiTemplate from "../template";
const config = {
  timeout: 10000,
};
export default class extends ApiTemplate {
  //free block
  @tryError(DefaultValue({})) // 处理默认值
  @get(api.freemint.blockList, 0, config) //定义一个 get 请求
  @userToken() // 不需要用户信息
  blockList<T>(query: any): Promise<T> {
    return [query] as any;
  }
  //free block
  @tryError(DefaultValue({})) // 处理默认值
  @get(api.freemint.nftList, 0, config) //定义一个 get 请求
  @userToken() // 不需要用户信息
  nftList<T>(query: any): Promise<T> {
    return [query] as any;
  }
}
