/**
 *
 */

import ApiTemplate from "../template";
import * as api from "src/config/api";
import request from "src/plugins/dao/service";
import {asyncCheck} from "src/plugins/dao/response";
import {projectParams, recommendModel} from "src/types/home";
import {DefaultValue, get, required, validate, tryError, userToken} from "src/plugins/dao/http";

export default class extends ApiTemplate {
    // 数据汇总
    @tryError(DefaultValue([])) // 处理默认值
    @get(api.blog.adv) // 定义一个 get 请求
    @userToken(false) // 不需要用户信息
    getSummary<T>(): Promise<T> {
        return [] as any;
    }

    //首页顶部话题榜单接口
    @tryError(DefaultValue([])) // 处理默认值
    @get(api.blog.adv) // 定义一个 get 请求
    @userToken(false) // 不需要用户信息
    getTopicRank<T>(): Promise<T> {
        return [] as any;
    }

    //推荐话题
    @tryError(DefaultValue([])) // 处理默认值
    @get(api.home.recommend) // 定义一个 get 请求
    @userToken(false) // 不需要用户信息
    getRecommend<T>(query: recommendModel): Promise<T> {
        // 返回参数
        return [query] as any;
    }

    //今日趋势
    @tryError(DefaultValue([])) // 处理默认值
    @get(api.home.trend) // 定义一个 get 请求
    @userToken(false) // 不需要用户信息
    getTrend<T>(): Promise<T> {
        return [] as any;
    }

    //话题项目 top3
    @tryError(DefaultValue([])) // 处理默认值
    @get(api.home.top3) // 定义一个 get 请求
    @userToken(false) // 不需要用户信息
    getTop3<T>(id: string | number): Promise<T> {
        const query = {id: id};
        // 返回参数
        return [query] as any;
    }

    //话题详情
    @tryError(DefaultValue([])) // 处理默认值
    @get(api.home.detail) // 定义一个 get 请求
    @userToken(false) // 不需要用户信息
    getDetail<T>(id: string | number): Promise<T> {
        const query = {id: id};
        // 返回参数
        return [query] as any;
    }

    //话题项目列表
    @tryError(DefaultValue([])) // 处理默认值
    @get(api.home.projects) // 定义一个 get 请求
    @userToken(false) // 不需要用户信息
    getProjects<T>(query: projectParams): Promise<T> {
        // 返回参数
        return [query] as any;
    }

    //TGE平台列表
    @tryError(DefaultValue([])) // 处理默认值
    @get(api.home.platforms) // 定义一个 get 请求
    @userToken(false) // 不需要用户信息
    getPlatform<T>(): Promise<T> {
        // 返回参数
        return [] as any;
    }
}
