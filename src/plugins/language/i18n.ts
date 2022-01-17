/**
 * @file I18n
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import {Response} from "express";
import {languageKey} from "src/config";
import Language from "src/types/language";
import LanguageCn from "src/langs/cn/index";
import LanguageEn from "src/langs/en/index";
import safeGet from "@fengqiaogang/safe-get";
import Format, { I18nFormat } from "src/plugins/i18n_format/index";

export type Kiwi = I18nFormat & typeof LanguageCn;

export const getI18ns = function () {
	return {
		[Language.cn]: LanguageCn,
		[Language.en]: LanguageEn,
	}
}

export const getKiwi = function (lang?: Language, value: object = {}): Kiwi {
	if (lang && value) {
		// @ts-ignore
		return new Format(lang as string, value) as Kiwi;
	}
	// @ts-ignore
	return new Format(Language.en as string, getI18ns()) as Kiwi;
}

export const getI18n = function (value: Language | Response) {
	if (_.isString(value)) {
		return getKiwi(value, getI18ns());
	}
	const lang = safeGet<Language>(value, `locals.${languageKey}`) || Language.en;
	return getKiwi(lang, getI18ns());
}


