/**
 * @file 获取当前语言环境
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import type { Request } from "express";
import { languageKey } from "src/config";
import safeGet from "@fengqiaogang/safe-get";
import window from "src/plugins/browser/window";
import type { Lang } from "src/types/language";
import { Language } from "src/types/language";
import { getValue } from "src/utils/root/data";
import { getQuery } from "./query";

const _getLang = function (value?: Lang): Language {
  if (value && _.isString(value)) {
    let key: Language | undefined;
    for (const name of Object.keys(Language)) {
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
  const lang = getValue<Language>(`query.${languageKey}`);
  if (lang) {
    return lang;
  }
  return getQuery<Language>(window.location.href, languageKey) || Language.auto;
};

const getLang = function (value?: Lang): Language {
  const lang = _getLang(value);
  if (lang === Language.en) {
    return Language.en;
  }
  if (lang === Language.cn) {
    return Language.cn;
  }
  return Language.auto;
};

export default getLang;
