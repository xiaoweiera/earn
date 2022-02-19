/**
 * @file url 处理
 * @author svon.me@gmail.com
 */

import Parse from "src/utils/url/parse";
import safeGet from "@fengqiaogang/safe-get";
import window from "src/plugins/browser/window";

export const getParam = function<T>(key?: string, url?: string): T{
	/*
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
	*/
	const location = Parse(url || window.location.href);
	const query = location.query || {};
	if (key) {
		return safeGet<T>(query, key);
	}
	return query as any;
}
