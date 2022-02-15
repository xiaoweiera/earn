/**
 * @file 博客
 */

import ApiTemplate from "../template";
import * as api from "src/config/api";
import request from "src/plugins/dao/service";
import { asyncCheck } from "src/plugins/dao/response";

export default class extends ApiTemplate {
	async ads<T>(): Promise<T[]> {
		try {
			await asyncCheck<T>(request(this.lang).get(api.blog.adv));
		} catch (e) {
			// todo
		}
		return [];
	}
	// 分组
	tabs<T>() {
		return asyncCheck<T>(request(this.lang).get(api.blog.tabs));
	}
	// 博客列表
	async getList<T>(query: object = {}) {
		try {
			const result = request().get(api.blog.list, { params: query });
			return asyncCheck<T>(result);
		} catch (e) {
		}
	}
	// 热门数据
	getHostList<T>(query: object = {}) {
		return this.getList<T>({ ...query, is_hot: true});
	}
	// 置顶数据
	getTopList<T>(query: object = {}) {
		return this.getList<T>({ ...query, recommend: true});
	}
	async getDetail<T>(id: string | number) {
		const params = { blog_id: id };
		if (id) {
			try {
				const result = request(this.lang).get(api.blog.detail, { params });
				return asyncCheck<T>(result);
			} catch (e) {
			}
		}
		return void 0;
	}
}
