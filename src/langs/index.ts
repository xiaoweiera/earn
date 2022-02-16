/**
 * @file 语言包
 */

import LanguageCn from "src/langs/cn/index";
import LanguageEn from "src/langs/en/index";
import { Language } from "src/types/language";

export default {
	[Language.cn]: LanguageCn,
	[Language.en]: LanguageEn,
}
