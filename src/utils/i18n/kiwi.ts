/**
 * @file I18n
 * @author svon.me@gmail.com
 */

import langList from "src/langs/index";
import { Language } from "src/types/language";

import type { I18nFormat } from "./format";
import Format from "./format";

export type Kiwi = I18nFormat & typeof langList[Language.cn];

export const getKiwi = function(lang: string | Language = Language.en): Kiwi {
  // @ts-ignore
  return new Format(lang, langList) as Kiwi;
};
