/**
 * @file 博客
 */
import * as api from "src/config/api";
import request from "src/plugins/dao/service";
import { asyncCheck } from "src/plugins/dao/response";

export const ads = function<T>() {
	return new Promise(function (resolve) {
		asyncCheck<T>(request.get(api.blog.adv)).then(resolve).catch(function () {
			resolve([]);
		});
	});
}

// 分组
export const tabs = function<T>() {
	return asyncCheck<T>(request.get(api.blog.tabs));
}

// 博客列表
export const getList = async function<T>(query: object = {}) {
	try {
		const result = request.get(api.blog.list, { params: query });
		return asyncCheck<T>(result);
	} catch (e) {
	}
}

// 热门数据
export const getHostList = async function<T>(query: object = {}) {
	return getList<T>({ ...query, is_hot: true});
}

// 置顶数据
export const getTopList = function<T>(query: object = {}) {
	return getList<T>({ ...query, recommend: true});
}

// 详情数据
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
