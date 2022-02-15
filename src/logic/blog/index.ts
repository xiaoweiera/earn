/**
 * @file 博客
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import API from "src/api";
import I18n from "src/utils/i18n";
import {config} from "src/router/config";
import { isArray, toArray, Equals } from "src/utils";
import { BlogData, BlogList, BlogTab } from "src/types/blog/";

export const tabAll = 'all';

export const getAll = function () {
	const i18n = I18n();
	return {
		id: tabAll,
		name: i18n.address.all
	};
}

export const transformTabs = function (list: BlogTab[]) {
	const array = _.map(list, function (item: BlogTab) {
		return { ...item, href: `${config.blog}?group=${item.id}`}
	});
	return toArray(getAll(), array);
}

export const makeDetailLink = function (id: string | number) {
	if (id) {
		return `${config.blog}/${id}`;
	}
}

export class Model extends API {
	// 获取博客列表
	async getList (group: string | number = "", page: number = 1, pageSize: number = 20) {
		const query = { page, page_size: pageSize  };
		if (group && !Equals(group, tabAll)) {
			Object.assign(query, { group_id: group });
		}
		try {
			const result = await this.blog.getList<BlogList>(query);
			if (result && isArray(result)) {
				const array: BlogData[] = result as any;
				return array;
			}
			if (result) {
				return result.blogs || [] as BlogData[];
			}
		} catch (e) {
		}
		return [];
	}
	async getTabs(): Promise<BlogTab[]> {
		try {
			const list = await this.blog.tabs<BlogTab[]>();
			return toArray(list);
		} catch (e) {
			// todo
		}
		return [];
	}

	async getTopList (): Promise<BlogData[]> {
		try {
			const result = await this.blog.getTopList<BlogList>();
			if (result && isArray(result)) {
				return result as any;
			}
			if (result) {
				return result.blogs || [];
			}
		} catch (e) {
			// todo
		}
		return [];
	}
	// 热门数据
	async getHotList (): Promise<BlogData[]> {
		try {
			const result = await this.blog.getHostList<BlogList>();
			if (result && isArray(result)) {
				return result as any;
			}
			if (result) {
				return result.blogs || [];
			}
		} catch (e) {
			// todo
		}
		return [];
	}
}
