/**
 * @file URL 处理
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import I18n from "src/utils/i18n";
import * as Url from "src/utils/url/";
import { Language } from "src/types/language";
import safeSet from "@fengqiaogang/safe-set";
import safeGet from "@fengqiaogang/safe-get";
import getDomain from "src/plugins/browser/domain";
import { Location, Href, Query } from "src/types/browser/location";

export const UtmSource = "utm_source";

export const setUtmSource = function (value: string | Location, domain: string = getDomain()) {
	let location: Location;
	if (_.isString(value)) {
		location = Url.urlParse(value);
	} else {
		location = value;
	}

	const param = "query";
	let tempQuery = safeGet<object>(location, param) || {};
	tempQuery = _.omit(tempQuery, [UtmSource]);
	safeSet(location, param, tempQuery);

	const hostname = location.hostname;
	if (!hostname) {
		return location;
	}
	if (hostname && _.includes(hostname, 'localhost')) {
		return location
	}
	if (hostname && _.includes(hostname, '127.0.0.1')) {
		return location
	}
	if (hostname && _.includes(getDomain(), hostname)) {
		return location
	}
	safeSet(location, `${param}.${UtmSource}`, encodeURI(domain));
	return location;
}

export const query = function (...data: Query[]): string {
	const array: string[] = [];
	_.each(_.compact(data), function (item: Query) {
		_.each(item, function (value: string, key: string) {
			array.push(`${key}=${value}`);
		});
	});
	return array.join("&");
}

export const createHref = function (value: string | Href | Location = '/', param?: Query) {
	const i18n = I18n();
	if (value) {
		// 判断是否是 Href 类型
		if (_.isObject(value) && value.path) {
			const temp = Url.urlParse(value.path);
			if (value.query) {
				temp.query = Object.assign({}, temp.query, value.query);
			}
			value = temp;
		}
		value = setUtmSource(value as string);
	} else {
		value = Url.urlParse();
	}
	// 设置中英文
	const lang = process.env.lang || i18n.getLang() || Language.en;
	safeSet(value, 'query.lang', lang);
	// 设置查询参数
	if (param) {
		Object.assign(value.query, param);
	}
	return Url.urlFormat(value);
}

export const router = function (value: string | Href | Location = '/', param?: Query) {
	console.warn("不推荐使用，请更换换 createHref 方法");
	return createHref(value, param);
};
