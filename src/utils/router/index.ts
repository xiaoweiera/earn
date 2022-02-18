/**
 * @file url 处理
 * @author svon.me@gmail.com
 */

import {omit} from 'ramda';
import {getQueryLang} from "src/utils/language";
import {Language} from "src/utils/language/config";
import _ from "lodash";
import safeSet from "@fengqiaogang/safe-set";
import safeGet from "@fengqiaogang/safe-get";
import * as util from "~/utils";
import { urlParse, urlFormat } from "src/utils/url/index";
import { window, getDomain } from "src/lib/browser";


interface Params {
	[key: string]: any
}
type Query = string | Params

interface To {
	path?: string
	query: Query
}

export const getParam = function<T>(key?: string): T{
	const query = {};
	// @ts-ignore
	const search = window.location.href;
	const text = _.last<string>(search.split("?"));
	const array = text ? text.split("&") : [];
	_.each(array, function (data: string) {
		const [name, value] = data.split("=");
		safeSet(query, name, value);
	});
	if (key) {
		return safeGet<T>(query, key);
	}
	return query as T;
}

const setUtmSsource = function (data: any, hostname?: string | null | undefined) {
	if (data) {
		const query = safeGet<object>(data, 'query') || {}
		// 删除
		safeSet(data, 'query', omit([ 'utm_source' ], query))
		if (hostname && hostname === 'localhost') {
			return data
		}
		if (hostname && hostname === '127.0.0.1') {
			return data
		}
		if (hostname && hostname.includes(getDomain())) {
			return data
		}
		if (!hostname) {
			return data
		}
		// 添加
		safeSet(data, 'query.utm_source', encodeURI(window.location.origin))
	}
	return data
}

export const href = function <T>(data: Query, lang: Language = getQueryLang()): T {
	if (typeof data === 'string') {
		return splitJoin(data, lang) as any
	}
	let temp: any = {...data}
	safeSet<T>(temp, 'query.lang', lang)
	temp = setUtmSsource(data, temp.path)
	return temp
}

const splitJoin = function (href: string, value: Language): string {
	let data = urlParse(href);
	data.search = '';
	safeSet(data, 'query.lang', value);
	data = setUtmSsource(data, data.hostname);
	return urlFormat(data);
}

export const router = function (data: string | To): any {
	if (data && util.isString(data)) {
		return href<string>(data as string)
	}
	if (data && util.isObject(data)) {
		// @ts-ignore
		const url = urlParse(data.path || window.location.href);
		url.search = '';
		// @ts-ignore
		const query: any = data.query ? data.query : {};
		util.forEach(function (value: string, key: string) {
			const name = `query.${key}`
			safeSet(url, name, `${value}`);
		}, query);
		const src = urlFormat(url);
		// @ts-ignore
		if (data.path) {
			return href<string>(src);
		} else {
			const value = href<string>(src);
			if (value) {
				const temp = urlParse(value, false);
				if (temp.query && util.isString(temp.query)) {
					return `?${temp.query}`;
				}
				return value;
			}
		}
	}
	if (data) {
		return data
	}
	return ''
}
