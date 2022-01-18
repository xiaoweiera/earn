/**
 * @file 博客
 */
import * as api from "src/config/api";
import axios from "src/plugins/dao/service";
import { asyncCheck } from "src/plugins/dao/response";

export const getList = async function<T>() {
	try {
		const result = axios.get(api.blog.list);
		return asyncCheck<T[]>(result);
	} catch (e) {
	}
	return [];
}

// 项目库列表
export const getDetail = async function<T>(id: string | number) {
	const params = { blog_id: id };
	if (id) {
		try {
			const result = axios.get(api.blog.detail, { params });
			return asyncCheck<T>(result);
		} catch (e) {
		}
	}
	return void 0;
}
