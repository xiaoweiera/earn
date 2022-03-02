/**
 * @file 博客
 */

import ApiTemplate from "../template";
import * as api from "src/config/api";
import {DefaultValue, get, required, validate, tryError, userToken} from "src/plugins/dao/http";

export default class extends ApiTemplate {
	// 广告 banner 数据
	@tryError(DefaultValue([])) // 处理默认值
	@get(api.blog.adv) // 定义一个 get 请求
	@userToken(false) // 不需要用户信息
	ads<T>(): Promise<T> {
		return [] as any;
	}

	// 博客分组
	@tryError(DefaultValue([]))
	@get(api.blog.tabs)
	@userToken(false)
	tabs<T>(): Promise<T> {
		return [] as any;
	}

	// 博客列表
	@tryError(DefaultValue([])) // 处理默认值
	@get(api.blog.list) // 定义一个 get 请求
	@userToken(false)
	getList<T>(query: object = {}): Promise<T> {
		// 返回参数
		return [query] as any;
	}

	// 热门数据
	getHostList<T>(query: object = {}) {
		return this.getList<T>({...query, is_hot: true});
	}

	// 置顶数据
	getTopList<T>(query: object = {}) {
		return this.getList<T>({...query, recommend: true});
	}

	@tryError(DefaultValue())
	@get(api.blog.detail)
	@userToken(false)
	@validate
	getDetail<T>(@required id: string | number): Promise<T> {
		const params = {blog_id: id};
		return [params] as any;
	}
}
