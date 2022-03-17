/**
 * @file 类型转换
 * @author svon.me@gmail.com
 */

import dayjs from "dayjs";
import { isNil } from "ramda";
import * as tools from "src/lib/tool";
import { isEmpty, isNumber, isString } from "src/utils/check/is";

export { toLower } from "ramda";

export type TimeType = number | string | Date | dayjs.Dayjs;

const defaultNumberValue = "-";

// 时间类型转行
export const toDate = function (time?: TimeType, format?: string) {
  if (time) {
    if (format) {
      return dayjs(time, format);
    }
    if (isNumber(time) || isString(time)) {
      // 如果是 11 位的时间戳
      if (/^[0-9]{11}$/i.test(time as any)) {
        return dayjs(parseInt(time as any));
      }
      // 如果是 10 位的时间戳
      if (/^[0-9]{10}$/i.test(time as any)) {
        const value = parseInt(time as any);
        return dayjs(value * 1000);
      }
    }
    return dayjs(time);
  }
  return dayjs();
};

/**
 * 把对象转换为 boolean 类型
 */
export const toBoolean = function (value: any): boolean {
  return !!(value || value === 0);
};

export const toFixed = function (value: string | number = "", fixed = 2): number {
  const text = String(value);
  const [num1 = "0", num2 = ""] = text.split(".");
  let temp = parseFloat(num1);
  if (num2) {
    temp = parseFloat(`${num1}.${num2.slice(0, fixed)}`);
  }
  if (isNaN(temp)) {
    return 0;
  }
  return temp;
};

export const arrayConcat = function (...args: any[]): any[] {
  return [].concat(...args);
};

export const toArray = arrayConcat;

export const toNumber = function (value: string | number = 0, fixed = 2): number {
  const number = parseFloat(value as any);
  if (isNaN(number)) {
    return 0;
  }
  return toFixed(number, fixed);
};

export const toNumberCeil = function (value: string | number = 0): number {
  return tools.formatRulesPrice(value, false);
  // return toNumber(number.toFixed(fixed))
};
// 千分位计数
export const toNumberCash = function (value: string | number = 0): string {
  if (value === defaultNumberValue) {
    return value;
  }
  if (value) {
    const data = `${value}`;
    return data.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return "0";
};
// 千分位计数
export const formatCash = function (value: string | number = 0): string {
  const number = toNumberFormat(value);
  if (number === defaultNumberValue) {
    return number;
  }
  return toNumberCash(number);
};
export const valueFormat = function (value: string | number, unit = "", prefix = ""): string {
  if (isEmpty(value, true) || isNil(value)) {
    return defaultNumberValue;
  }
  if (["$", "＄", "¥", "￥"].includes(unit)) {
    return `${prefix}${unit}${value}`;
  }
  if (["%"].includes(unit)) {
    return `${prefix}${value}${unit}`;
  }
  return `${prefix}${value}${unit}`;
};

export const toNumberCashFormat = function (
  value?: any,
  unit = "",
  prefix = "",
  noValue: string = defaultNumberValue,
): string {
  if (isEmpty(value, true)) {
    return noValue;
  }
  const number = tools.formatRulesNumber(value, false, noValue);
  if (value < 1 || (value < 0 && value > -1)) {
    return valueFormat(number, unit, prefix);
  }
  return valueFormat(toNumberCash(number), unit, prefix);
};

export const toNumberFormat = function (value?: any, unit = "", prefix = ""): string {
  if (isEmpty(value, true) || isNil(value)) {
    return defaultNumberValue;
  }
  const number = tools.formatRulesNumber(value, false, defaultNumberValue);
  return valueFormat(number, unit, prefix);
};

export const toInteger = function (value: string | number = 0): number {
  const number = toNumber(value);
  return parseInt(number as any, 10);
};

// 格式化数字
export const numberUint = function (value: number) {
  return tools.numberUnitFormat(value);
};
// 得到百分比
export const getPercent = (zi?: number, mu?: number) => {
  if (zi === 0 || !zi) return 0;
  // @ts-ignore
  return toNumberCashFormat((zi / mu) * 100);
};
