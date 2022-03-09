/**
 * @file I18n format
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import template from "src/plugins/template/template";

type Data = Record<string, any>;

export interface I18nFormat {
	/**
	 * 设置对应语言
	 * @param lang: 切换的对应语言
	 */
	setLang(lang: string): void;

	/**
	 * 获取当前语言类型
	 */
	getLang(): string;

	/**
	 * 板填充, 获取对应语言的模板值
	 * @param value  对应语言的模板
	 * @param data   模板的参数
	 */
	template(value: string, data: Data): string;

	/**
	 * 板填充, 获取对应语言的模板值
	 * @param value  对应语言的模板
	 * @param index  下标位置
	 * @param data   模板的参数
	 */
	part(value: string, index?: number, data?: Data): string;
}

function i18nFormat(lang: string, langList: object = {}) {
  let current = "";
  const map = new Map<string, object>();
  for (const key in langList) {
    const value = safeGet<object>(langList, key);
    map.set(key, value);
  }
  // @ts-ignore
  this.getLang = () => current;
  // @ts-ignore
  this.setLang = (lang: string) => {
    current = lang;
    const data = map.get(lang);
    if (data) {
      _.each(data, (value: object | string, key: string) => {
        // @ts-ignore
        safeSet(this, key, value);
      });
    }
  };
  // @ts-ignore
  this.setLang(lang);
  // @ts-ignore
  this.template = function(value: string, data: Data): string {
    return template(value, data);
  };
  // @ts-ignore
  this.part = function(value: string, index?: number, data: Data = {}): string {
    if (_.isObject(index)) {
      data = index as Data;
      index = 0;
    }
    index = _.toInteger(index);
    if (index < 0) {
      index = 0;
    }
    const array: string[] = _.map(_.split(value, "|"), _.trim);
    const size = _.size(array);
    if (index >= size) {
      index = size - 1;
    }
    const text = array[index];
    return this.template(text, data);
  };
}

export default i18nFormat;
