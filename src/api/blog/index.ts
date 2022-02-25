/**
 * @file 博客
 */

import ApiTemplate from "../template";
import * as api from "src/config/api";
import request from "src/plugins/dao/service";
import { asyncCheck } from "src/plugins/dao/response";
import { userToken } from "src/plugins/dao/directive";
import { validate, required, tryError, ErrorDefault } from "src/utils/decorate";

export default class extends ApiTemplate {

	// 该接口不传 token
	@userToken(false)
	async ads<T>(user: object = {}): Promise<T[]> {
		try {
			return await asyncCheck<T[]>(request(this.lang).get(api.blog.adv, {
				params: user
			}));
		} catch (e) {
			// todo
		}
		return [];
	}

	// 分组
	@userToken(false)
	tabs<T>(user: object = {}) {
		return asyncCheck<T>(request(this.lang).get(api.blog.tabs, {
			params: user
		}));
	}

	// 博客列表
	@userToken(false)
	getList<T>(query: object = {}, user: object = {}) {
		const result = request(this.lang).get(api.blog.list, {
			params: Object.assign({}, query, user)
		});
		return asyncCheck<T>(result);
	}
	// 热门数据
	getHostList<T>(query: object = {}) {
		return this.getList<T>({ ...query, is_hot: true});
	}

	// 置顶数据
	getTopList<T>(query: object = {}) {
		return this.getList<T>({ ...query, recommend: true});
	}

	@tryError(ErrorDefault())
	@userToken(false)
	@validate
	async getDetail<T>(@required id: string | number, user: object = {}) {
		const params = { blog_id: id, ...user};
		if (id) {
			const result = request(this.lang).get(api.blog.detail, { params });
			return asyncCheck<T>(result);
		}
		return void 0;
	}
}
