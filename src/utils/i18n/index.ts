/**
 * @file 中英文文案
 * @author svon.me@gmail.com
 */

import Language from "src/types/language";
import {getKiwi, Kiwi} from "src/plugins/language/i18n";


const lang: Language = (process.env.lang || Language.en) as Language;
console.log("i18n lang = %s", lang);
let I18n: Kiwi = getKiwi(lang);

export const init = function (lang?: Language) {
	if (lang) {
		I18n.setLang(lang as string);
	}
	return I18n;
}

export default I18n;
