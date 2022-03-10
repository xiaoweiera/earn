import urlParse from "src/utils/url/parse";
import safeGet from "@fengqiaogang/safe-get";
import { Language } from "src/types/language/";

// 获取 url 中的 lang 数据
export function getQueryLang(): Language {
  try {
    const data = urlParse();
    if (data) {
      const lang = safeGet<string | string[]>(data, "query.lang");
      if (lang) {
        // @ts-ignore
        const array: Language[] = [].concat([], lang);
        if (array.length > 0) {
          return array[array.length - 1];
        }
      }
    }
  } catch (e) {
    // todo
  }
  // 默认英文
  return Language.en;
}

// 获取下一个语言类型
export const nextLang = function (): Language {
  const current = getQueryLang();
  if (current === Language.cn) {
    return Language.en;
  }
  if (current === Language.en) {
    return Language.cn;
  }
  return Language.cn;
};
