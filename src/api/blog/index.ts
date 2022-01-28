/**
 * @file 博客
 */
import * as api from "src/config/api";
import request from "src/plugins/dao/service";
import { asyncCheck } from "src/plugins/dao/response";

export const ads = function<T>() {
	return asyncCheck<T>(request.get(api.blog.adv));
}

export const tabs = function<T>() {
	return asyncCheck<T>(request.get(api.blog.tabs));
}

export const getList = async function<T>(query: object = {}) {
	try {
		const result = request.get(api.blog.list, { params: query });
		return asyncCheck<T>(result);
	} catch (e) {
	}
}

export const getHots = function<T>() {
	return getList<T>({
		recommend: true
	});
}

// 项目库列表
export const getDetail = async function<T>(id: string | number) {
	const params = { blog_id: id };
	if (id) {
		try {
			const result = request.get(api.blog.detail, { params });
			return asyncCheck<T>(result);
		} catch (e) {
		}
	}
	return void 0;
}
