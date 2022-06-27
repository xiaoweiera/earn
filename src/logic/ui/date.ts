/**
 * @file 日期组件
 * @author svon.me@gmail.com
 */

import dayjs from "dayjs";
import { dateFormat } from "src/utils";
import I18n from "src/utils/i18n/";
import { dateNow, dateTime } from "src/utils/time";
import safeGet from "@fengqiaogang/safe-get";
const i18n = I18n();
// 去掉小时以后的时间，只保留到天
export const formatResult = function (times: any[]): Array<number | string> {
  const [start, end] = times;
  const array: Array<number | string> = [];
  if (start) {
    const value = dateFormat(start, "YYYY/MM/DD hh:mm:ss");
    array.push(dateTime(value));
  } else {
    array.push("");
  }

  if (end) {
    array.push(dateTime(end));
  } else {
    array.push("");
  }
  return array;
};

export const disabledDate = function (timeEnd?: any) {
  const today = dateTime(timeEnd);
  // 判断日期是否是当前时间之后
  return function (date: any) {
    // @ts-ignore
    return dayjs(date).isAfter(today, "day");
  };
};

export const shortcuts = {
  "5M": {
    label: i18n.liquidity.mainHeader.wuMin,
    value: function () {
      const today = dateNow();
      const start = dayjs(today).subtract(5, "minute");
      return [start, today];
    },
  },
  "10M": {
    label: i18n.liquidity.mainHeader.shiMin,
    value: function () {
      const today = dateNow();
      const start = dayjs(today).subtract(10, "minute");
      return [start, today];
    },
  },
  "15M": {
    label: i18n.liquidity.mainHeader.shiwuMin,
    value: function () {
      const today = dateNow();
      const start = dayjs(today).subtract(15, "minute");
      return [start, today];
    },
  },
  "30M": {
    label: i18n.liquidity.mainHeader.sanshiMin,
    value: function () {
      const today = dateNow();
      const start = dayjs(today).subtract(30, "minute");
      return [start, today];
    },
  },
  "1H": {
    label: i18n.liquidity.mainHeader.yiHour,
    value: function () {
      const today = dateNow();
      const start = dayjs(today).subtract(1, "hour");
      return [start, today];
    },
  },
  "1": {
    label: i18n.liquidity.mainHeader.yiDay,
    value: function () {
      const today = dateNow();
      const start = dayjs(today).subtract(1, "day");
      return [start, today];
    },
  },
  "7": {
    label: i18n.liquidity.mainHeader.week,
    value: function () {
      const today = dateNow();
      const start = dayjs(today).subtract(7, "day");
      return [start, today];
    },
  },
  "14": {
    label: i18n.liquidity.mainHeader.twoWeek,
    value: function () {
      const today = dateNow();
      const start = dayjs(today).subtract(14, "day");
      return [start, today];
    },
  },
  "30": {
    label: i18n.liquidity.mainHeader.month,
    value: function () {
      const today = dateNow();
      const start = dayjs(today).subtract(1, "month");
      return [start, today];
    },
  },
  "90": {
    label: i18n.liquidity.mainHeader.streeMonth,
    value: function () {
      const today = dateNow();
      const start = dayjs(today).subtract(3, "month");
      return [start, today];
    },
  },
  "180": {
    label: i18n.liquidity.mainHeader.sixMonth,
    value: function () {
      const today = dateNow();
      const start = dayjs(today).subtract(6, "month");
      return [start, today];
    },
  },
  "365": {
    label: i18n.liquidity.mainHeader.year,
    value: function () {
      const today = dateNow();
      const start = dayjs(today).subtract(1, "year");
      return [start, today];
    },
  },
  "all": {
    label: i18n.liquidity.mainHeader.all,
    value: function (option?: any) {
      const timeEnd = safeGet<any>(option, "timeEnd") || dateNow();
      return ["", timeEnd];
    },
  },
};
