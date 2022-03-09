/**
 * @file 博客
 */

import * as api from "src/config/api";
import { DefaultValue, expire, get, required, tryError, userToken, validate } from "src/plugins/dao/http";
import ApiTemplate from "../template";

export default class extends ApiTemplate {
  // 广告 banner 数据
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.blog.adv, expire.min30) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  ads<T>(): Promise<T> {
    return [] as any;
  }

  // 博客分组
  @tryError(DefaultValue([]))
  @get(api.blog.tabs, expire.min30)
  @userToken()
  tabs<T>(): Promise<T> {
    return [] as any;
  }

  // 博客列表
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.blog.list, expire.min30) // 定义一个 get 请求
  @userToken()
  getList<T>(query: object = {}): Promise<T> {
    // 返回参数
    return [query] as any;
  }

  // 热门数据
  getHostList<T>(query: object = {}) {
    return this.getList<T>({
      ...query,
      is_hot: true,
    });
  }

  // 置顶数据
  getTopList<T>(query: object = {}) {
    return this.getList<T>({
      ...query,
      recommend: true,
    });
  }

  @tryError(DefaultValue())
  @get(api.blog.detail, expire.min30)
  @userToken()
  @validate
  getDetail<T>(@required id: string | number): Promise<T> {
    const params = { blog_id: id };
    return [params] as any;
  }
}
