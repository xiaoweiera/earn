/**
 * @file 时间处理
 * @author svon.me@gmail.com
 */

import dayjs from "dayjs";
import { toLower } from "ramda";
import I18n from "src/utils/i18n";
import { Language } from "src/types/language";
import type { TimeType } from "src/utils/convert/to";
import { toDate, toNumber } from "src/utils/convert/to";

export const timeFormat = "YYYY-MM-DD HH:mm:ss";

export const monthEnName = {
  "1": "January",
  "01": "January",
  "2": "February",
  "02": "February",
  "3": "March",
  "03": "March",
  "4": "April",
  "04": "April",
  "5": "May",
  "05": "May",
  "6": "June",
  "06": "June",
  "7": "July",
  "07": "July",
  "8": "August",
  "08": "August",
  "9": "September",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

export const dateTime = function (value?: TimeType): number {
  const date = toDate(value);
  return date.valueOf();
};

export const dateNow = function () {
  return dateTime();
};

// 计算倒计时 - 天
export const dateDiffDay = function (time: TimeType, now?: TimeType): number {
  const duration = dateTime(now) - dateTime(time);
  return parseInt((duration / 1000 / 60 / 60 / 24) as any, 10);
};
// 计算倒计时 - 时
export const dateDiffHour = function (time: TimeType, now?: TimeType): number {
  const duration = dateTime(now) - dateTime(time);
  return parseInt(((duration / 1000 / 60 / 60) % 24) as any, 10);
};
// 计算倒计时 - 分
export const dateDiffMinute = function (time: TimeType, now?: TimeType): number {
  const duration = dateTime(now) - dateTime(time);
  return parseInt(((duration / 1000 / 60) % 60) as any, 10);
};
// 计算倒计时 - 秒
export const dateDiffSecond = function (time: TimeType, now?: TimeType): number {
  const duration = dateTime(now) - dateTime(time);
  return parseInt(((duration / 1000) % 60) as any, 10);
};
// 时间比较
export const dateDiffData = function (time: TimeType, now?: TimeType) {
  const day = dateDiffDay(time, now);
  const hour = dateDiffHour(time, now);
  const minute = dateDiffMinute(time, now);
  const second = dateDiffSecond(time, now);
  return { day, hour, minute, second };
};

// 判断时间是否是当前时间之前
export const isBefore = function (value: TimeType): boolean {
  if (value) {
    const old = toDate(value);
    return dayjs(old).isBefore(toDate());
  }
  return true;
};

// 判断时间是否是当前时间以后
export const isAfter = function (value: TimeType): boolean {
  const before = isBefore(value);
  return !before;
};

// 时间格式化
export const dateFormat = function (time?: any, format: string = timeFormat): string {
  const date = toDate(time);
  return date.format(format);
};
// 格式化（月/日）
export const dateMDFormat = function (time?: any): string {
  return dateFormat(time, "MM/DD");
};
export const dateYMDFormat = function (time?: any): string {
  const i18n = I18n();
  if (i18n.getLang() === Language.en) {
    return dateFormat(time, "MM.DD.YYYY");
  }
  return dateFormat(time, "YYYY.MM.DD");
};
export const dateYMDHFormat = function (time?: any): string {
  const i18n = I18n();
  if (i18n.getLang() === Language.en) {
    return dateFormat(time, "MM.DD.YYYY HH");
  }
  return dateFormat(time, "YYYY.MM.DD HH");
};
export const dateYMDHmFormat = function (time?: any): string {
  const i18n = I18n();
  if (i18n.getLang() === Language.en) {
    return dateFormat(time, "MM.DD.YYYY HH:mm");
  }
  return dateFormat(time, "YYYY.MM.DD HH:mm");
};
export const dateYearFormat = function (time?: any): string {
  return dateFormat(time, "YYYY");
};
export const dateMonthFormat = function (time?: any): string {
  return dateFormat(time, "MM");
};
export const dateDayFormat = function (time?: any): string {
  return dateFormat(time, "DD");
};
export const dateHMFormat = function (time?: any): string {
  return dateFormat(time, "HH:mm");
};
// 得到年月日 区分中英文
export const getDateMDY = (t: number) => {
  const i18n = I18n();
  if (i18n.getLang() === Language.en) {
    // @ts-ignore
    return `${monthEnName[dateMonthFormat(t)]} ${dateDayFormat(t)},${dateYearFormat(t)}`;
  } else {
    return dateFormat(t, "YYYY年MM月DD日");
  }
};

// 分解时间间隔
export const convertInterval = function (interval = "1d") {
  const number = toNumber(interval.replace(/[^0-9]/g, ""));
  const type = toLower(interval.replace(/[^a-zA-Z]/g, ""));
  return { number, type };
};

// 日期与当前时间做比较
export const dateDiff = function (time: TimeType, now?: TimeType): string {
  const i18n = I18n();
  const value = dateTime(time);
  const day = dateDiffDay(value, now);
  if (day > 0) {
    // 大于一周按实际时间展示
    if (day > 7) {
      return getDateMDY(value);
    }
    // 几天前
    return i18n.part(i18n.common.time.value.day, day, { count: day });
  }

  const hour = dateDiffHour(value);
  if (hour > 0) {
    // 几小时前
    return i18n.part(i18n.common.time.value.hour, hour, { count: hour });
  }

  let min = dateDiffMinute(value);
  if (min <= 0) {
    min = 1;
  }
  // 几分钟前
  return i18n.part(i18n.common.time.value.minute, min, { count: min });
};

export const dateAdd = function (time: any, interval?: string) {
  const date = toDate(time);
  const { number, type } = convertInterval(interval);
  return dateTime(date.add(number, type as any).valueOf());
};
