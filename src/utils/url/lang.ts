/**
 * @file 获取当前语言环境
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import {Request} from "express";
import {getQuery} from "./query";
import {languageKey} from "src/config";
import safeGet from "@fengqiaogang/safe-get";
import window from "src/plugins/browser/window";
import { Language, Lang } from "src/types/language";

function getLang(value?: Lang): Language {
	if (value && _.isString(value)) {
		let key: Language | undefined;
		for(const name of Object.keys(Language)) {
			if (name === value) {
				key = name as Language;
				break;
			}
		}
		if (key) {
			return key;
		}
	}
	if (value && _.isObject(value)) {
		const req: Request = value;
		if (safeGet<Language>(req.cookies, languageKey)) {
			return safeGet<Language>(req.cookies, languageKey);
		}
		return getQuery<Language>(req.originalUrl, languageKey) || Language.auto;
	}
	if (value) {
		return getQuery<Language>(value as string, languageKey) || Language.auto;
	}
	return getQuery<Language>(window.location.href, languageKey) || Language.auto;
}

export default getLang;
