/**
 * @file url 处理
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import safeSet from "@fengqiaogang/safe-set";
import safeGet from "@fengqiaogang/safe-get";

export const getParam = function<T>(key?: string): T{
	const query = {};
	// @ts-ignore
	const search = "?lang=cn";
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
