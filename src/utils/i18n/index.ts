/**
 * @file 中英文文案
 * @author svon.me@gmail.com
 */

import getLang from "src/utils/url/lang";
import type { Lang } from "src/types/language";
import { Language } from "src/types/language";
import { getKiwi } from "./kiwi";

const I18n = function(lang?: Lang) {
  const value = getLang(lang);
  if (value) {
    return getKiwi(value);
  }
  return getKiwi(Language.en);
};

export default I18n;
