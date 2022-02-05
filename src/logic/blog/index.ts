/**
 * @file 博客
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import * as API from "src/api";
import I18n from "src/utils/i18n";
import {config} from "src/router/config";
import { isArray, toArray, Equals } from "src/utils";
import { BlogData, BlogList, BlogTab, AdData } from "src/types/blog/";


export const tabAll: BlogTab = {
	id: 'all',
	name: I18n.address.all
}

export const getAds = async function (): Promise<AdData[]> {
	try {
		return await API.blog.ads<AdData[]>();
	} catch (e) {
		return [];
	}
}

// 获取博客列表
export const getList = async function (group: string | number = "", page: number = 1, pageSize: number = 20) {
	const query = { page, page_size: pageSize  };
	if (group && !Equals(group, tabAll.id as string)) {
		Object.assign(query, { group_id: group });
	}
	try {
		const result = await API.blog.getList<BlogList>(query);
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

export const getTabs = async function (): Promise<BlogTab[]> {
	try {
		const list = await API.blog.tabs<BlogTab[]>();
		return toArray(tabAll, list);
	} catch (e) {
		// todo
	}
	return [tabAll];
}

export const transformTabs = function (list: BlogTab[]) {
	return _.map(list, function (item: BlogTab) {
		return { ...item, href: `${config.blog}?group=${item.id}`}
	})
}

export const getTopList = async function (): Promise<BlogData[]> {
	try {
		const result = await API.blog.getTopList<BlogList>();
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
export const getHotList = async function (): Promise<BlogData[]> {
	try {
		const result = await API.blog.getHostList<BlogList>();
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

export const makeDetailLink = function (id: string | number) {
	if (id) {
		return `${config.blog}/${id}`;
	}
}
