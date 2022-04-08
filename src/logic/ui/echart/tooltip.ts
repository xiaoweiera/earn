/**
 * @file tooltip
 * @author svon.me@gmail.com
 */

import { makeSvg } from "./svg";
import safeGet from "@fengqiaogang/safe-get";
import { Callback } from "src/types/common/";
import { FormatterParams, SeriesItem } from "src/types/echarts/type";
import { toArray, forEach, isObject, isFunction, isNumber, isString, toNumberCashFormat } from "src/utils/";

export const valueFormatter = function (data: SeriesItem): string {
  if (isNumber(data) || isString(data)) {
    data = { value: data } as any;
  }
  if (data.origin) {
    return toNumberCashFormat(data.origin, data.unit);
  }
  return toNumberCashFormat(data.value, data.unit);
};

export const formatter = function (query: any, callback?: Callback) {
  const list: FormatterParams[] = toArray(query);
  const [firstData]: any = list;
  let label = "";
  if (firstData && isObject(firstData)) {
    label = safeGet<string>(firstData, "data.date") || firstData.name;
  }
  if (label) {
    const html: string[] = [];
    html.push(`<span class="block text-sm text-global-highTitle">${label}</span>`);
    forEach(function (data: FormatterParams) {
      const name = `<span class="ml-1.5 text-xs text-global-highTitle">${data.seriesName}</span>`;
      const value = `<span class="ml-1.5 text-xs text-global-highTitle">${valueFormatter(data.data)}</span>`;
      const icon = makeSvg(data.seriesType, data.color);
      let result = "";
      if (callback && isFunction(callback)) {
        result = callback(
          {
            icon,
            name,
            value,
          },
          data,
        );
      }
      if (!result) {
        result = `${icon}${name}${value}`;
      }
      html.push(`<span class="flex items-center mt-1">${result}</span>`);
    }, list);
    return `<div class="text-xs text-kdFang">${html.join("")}</div>`;
  }
  return "";
};
