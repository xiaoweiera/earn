/**
 * @file 中英文文案
 * @author svon.me@gmail.com
 */

import Language from "src/types/language";
import getRootData from "src/utils/root/data";
import {getKiwi, Kiwi} from "src/plugins/language/i18n";
import {languageKey, languageName} from "src/config";


console.log("process - env - href - '%s'", process.env.href);
let I18n: Kiwi = getKiwi();

export const init = function (lang?: Language) {
	if (lang) {
		const value = getRootData<object>(languageName);
		I18n = getKiwi(lang, value);
		return I18n;
	} else {
		lang = getRootData<Language>(languageKey);
		const value = getRootData<object>(languageName);
		I18n = getKiwi(lang, value);
		return I18n;
	}
}

export default I18n;
