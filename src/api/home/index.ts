/**
 *
 */

import * as api from "src/config/api";
import { DefaultValue, expire, get, tryError, userToken } from "src/plugins/dao/http";
import type { projectParams, recommendModel, tutorialParams } from "src/types/home";
import { lineModel, infoModel, rankTopicModel } from "src/types/dapp/invest";
import ApiTemplate from "../template";
import type { ApyQuery } from "src/types/home/apy";
import { newProjectParams } from "src/types/home";

export default class extends ApiTemplate {
  // 数据汇总
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.home.summary, expire.min30) // 定义一个 get 请求
  @userToken(false) // 不需要用户信息
  getSummary<T>(): Promise<T> {
    return [] as any;
  }
  // 首页顶部话题榜单接口
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.home.topicRank, expire.min30) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getTopicRank<T>(category: string): Promise<T> {
    const query = { category };
    return [query] as any;
  }
  // 推荐话题
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.home.recommend, expire.min10) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  @userToken() // 不需要用户信息
  getRecommend<T>(query: recommendModel): Promise<T> {
    // 返回参数
    return [query] as any;
  }

  // 今日趋势
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.home.trend, expire.min30) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getTrend<T>(): Promise<T> {
    return [] as any;
  }

  // 话题项目 top3
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.home.top3) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getTop3<T>(id: string | number): Promise<T> {
    const query = { id };
    // 返回参数
    return [query] as any;
  }

  // 话题详情
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.home.detail, expire.min10) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getDetail<T>(id: string | number): Promise<T> {
    const query = { id };
    // 返回参数
    return [query] as any;
  }

  // 话题项目列表
  @tryError(DefaultValue({})) // 处理默认值
  @get(api.home.projects, expire.min10) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getProjects<T>(query: projectParams): Promise<T> {
    // 返回参数
    return [query] as any;
  }
  // 新的-话题项目列表
  @tryError(DefaultValue({})) // 处理默认值
  @get(api.home.getTopicDetail) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getTopicDetail<T>(query: newProjectParams): Promise<T> {
    // 返回参数
    return [query] as any;
  }

  // TGE平台列表
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.home.platforms, expire.min10) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getPlatform<T>(): Promise<T> {
    // 返回参数
    return [] as any;
  }
  // ad列表
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.common.adList) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getAdList<T>(position: number): Promise<T> {
    const query = { position };
    // 返回参数
    return [query] as any;
  }
  // Tutorial列表
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.home.tutorial) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getTutorialList<T>(query: tutorialParams): Promise<T> {
    // 返回参数
    return [query] as any;
  }
  // 矿池币种列表
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.home.apy) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getApyList<T>(query: ApyQuery): Promise<T> {
    // 返回参数
    return [query] as any;
  }
  // 热门项目列表
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.home.hotProject) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getHotProject<T>(): Promise<T> {
    // 返回参数
    return [] as any;
  }
  //line 图表
  @tryError(DefaultValue({})) // 处理默认值
  @get(api.home.lineChart) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getLineChart<T>(query: lineModel): Promise<T> {
    // 返回参数
    return [query] as any;
  }
  //大户历史交易
  @tryError(DefaultValue({})) // 处理默认值
  @get(api.home.addressInfo) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getHistory<T>(query: infoModel): Promise<T> {
    // 返回参数
    return [query] as any;
  }
  //榜单列表
  @tryError(DefaultValue({})) // 处理默认值
  @get(api.home.getRankTopic) // 定义一个 get 请求
  @userToken() // 不需要用户信息
  getRankTopic<T>(query: rankTopicModel): Promise<T> {
    // 返回参数
    return [query] as any;
  }
}
