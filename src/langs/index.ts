/**
 * @file 语言包
 */

import Language from "src/types/language";
import LanguageCn from "src/langs/cn/index";
import LanguageEn from "src/langs/en/index";

export default {
	[Language.cn]: LanguageCn,
	[Language.en]: LanguageEn,
}
