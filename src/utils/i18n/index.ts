/**
 * @file 中英文文案
 * @author svon.me@gmail.com
 */

import {getKiwi} from "./kiwi";
import getLang  from "src/utils/url/lang";
import {Language, Lang} from "src/types/language";

const I18n = function(lang?: Lang) {
	const value = getLang(lang);
	if (value) {
		return getKiwi(value);
	}
	return getKiwi(Language.en);
}

export default I18n;
