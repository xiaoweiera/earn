/**
 * @file 中英文文案
 * @author svon.me@gmail.com
 */

import {getKiwi, Kiwi} from "./kiwi";
import Language from "src/types/language";
import { getProcess } from "src/config/process";



export const getI18n = function (lang?: Language): Kiwi {
	if (lang) {
		return getKiwi(lang as string);
	}
	const env = getProcess();
	console.log("src/utils/i18n lang = %s", lang);
	return getKiwi(env.lang);
}

let I18n: Kiwi = getI18n();


export const setLanguage = function (lang?: Language) {
	if (lang) {
		I18n.setLang(lang as string);
	} else {
		const opt = getProcess();
		I18n.setLang(opt.lang);
	}
	return I18n;
}

export default I18n;
