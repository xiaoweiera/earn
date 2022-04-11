/**
 * @file 数据转换
 * @author svon.me@gmail.com
 */

import BigNumber from "bignumber.js";
import DBList from "@fengqiaogang/dblist";
import { flatten, pick, omit } from "ramda";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import { XAxisItem, SeriesItem, SeriesMap } from "src/types/echarts/type";

import { sort, map, forEach, dateTime, dateMDFormat, dateYMDFormat, dateYMDHmFormat, dateAdd, convertInterval, isNumber, max, min, toNumber } from "src/utils/";

interface Trend {
  [key: string]: number[][];
}

const makeDateKey = function (date: any, interval?: string): string {
  const { type } = convertInterval(interval);
  // 按小时
  if (type === "h") {
    return dateYMDHmFormat(date);
  }
  // 按天生成时间
  return dateYMDFormat(date);
};

const makeDateFormat = function (date: any, interval?: string): string {
  const { type } = convertInterval(interval);
  // 按小时
  if (type === "h") {
    return dateYMDHmFormat(date);
  }
  // 按天生成时间
  return dateMDFormat(date);
};

const add = function (...args: number[] | number[][]): number {
  const data: number[] = flatten(args);
  let value: number;
  for (let i = 0, len = data.length; i < len; i++) {
    const item = data[i];
    if (isNumber(item) && item >= 0) {
      // @ts-ignore
      if (isNumber(value)) {
        // @ts-ignore
        value = value + item;
      } else {
        value = item;
      }
    }
  }
  // @ts-ignore
  return max(value, data);
};

// 求最小值
const subtract = function (...args: number[] | number[][]): number {
  const data: number[] = flatten(args);
  return min(data);
};

// -------------
/**
 * @file 处理图例数据
 */
export const calcLegends = function <T>(legends: T[], detail: { [key: string]: object }): T[] {
  const primaryKey = "id";
  const db = new DBList([], primaryKey);
  forEach(function (item: any) {
    db.insert(item);
  }, detail);

  return map(function (item: any) {
    if (!item.name) {
      const data = db.selectOne<any>(pick([primaryKey], item));
      if (data) {
        item.name = data.title;
      }
    }
    if (!item.type) {
      const data = db.selectOne<any>(pick([primaryKey], item));
      if (data) {
        item.type = data.type;
      }
    }
    return item;
  }, legends);
};

export const getInterval = function (detail: { [key: string]: object }): string {
  const keys = Object.keys(detail);
  let value = "";
  for (const key of keys) {
    const item = safeGet<object>(detail, key);
    const interval = safeGet<string>(item, "interval");
    if (interval) {
      value = interval;
      break;
    }
  }
  return value;
};

// 转换时间格式数据
export const calcDates = function (trends: { [key: string]: Trend }, interval?: string): XAxisItem[] {
  const db = new DBList([], "key");
  // 整合数据
  forEach(function (list: number[][]) {
    forEach(function (item: number[]) {
      const time = dateTime(item[0]);
      const date = makeDateKey(time, interval);
      const where: any = { key: date };
      const data: XAxisItem = {
        date,
        time,
        value: makeDateFormat(time, interval),
      };
      if (db.selectOne(where)) {
        db.update(where, data);
      } else {
        db.insert(Object.assign({}, where, data));
      }
    }, list);
  }, trends);

  const times = db.clone<number>((item: any) => {
    return item.time;
  });
  // 最大时间 (结束时间)
  const maxTime = dateAdd(max(times), interval);
  // 最小时间 (开始时间)
  let intervalTime = min(times);

  do {
    const key = makeDateKey(intervalTime, interval);
    const where: any = { key };
    // 判断数据是否存在
    const item = db.selectOne<XAxisItem>(where);
    if (!item) {
      const value: XAxisItem = {
        key,
        date: key,
        time: intervalTime,
        value: dateMDFormat(intervalTime),
      };
      db.insert(value);
    }
    intervalTime = dateAdd(intervalTime, interval);
  } while (intervalTime < maxTime);

  // 按时间从小到达排序
  return sort(
    db.clone<XAxisItem>((item: XAxisItem) => omit(["dbIndex"], item)),
    "time",
  );
};

// 计算价格线数据
export const calcSeriesKldata = function (series: SeriesMap, klId: string | number): SeriesItem[] {
  if (klId) {
    const list: SeriesItem[] = safeGet(series, `${klId}`) || [];
    return map(function (item: SeriesItem) {
      const value = safeGet(item, "klValue");
      const data = omit(["value", "klValue"], item);
      return Object.assign({}, data, { value });
    }, list);
  }
  return [];
};

// 计算 series 数据 （不包含右侧价格线）
export const calcSeries = function (legends: any[], xAxis: XAxisItem[], trends: { [key: string]: Trend }, interval?: string): any[] {
  const dbMaps = new Map<string, DBList>();
  const keys = Object.keys(trends);
  const primaryKey = "key";
  forEach(function (id: string) {
    const db = new DBList([], primaryKey);
    forEach(function (array: number[]) {
      const [date, value, klValue] = [...array];
      const time = dateTime(date);
      const key = makeDateKey(time, interval);
      const item: SeriesItem = {
        key,
        time,
        value,
        klValue,
        id,
        date: dateYMDFormat(time),
      };
      db.insert(item);
    }, trends[id]);
    dbMaps.set(id, db);
  }, keys);

  const series: SeriesMap = {};
  forEach(function (id: string) {
    // @ts-ignore
    const db: DBList = dbMaps.get(id);
    const array: SeriesItem[] = [];
    forEach(function (xaxis: XAxisItem) {
      const where = pick([primaryKey], xaxis);
      const item = db.selectOne<SeriesItem>(where);
      if (item) {
        // @ts-ignore
        const temp: SeriesItem = omit(["dbIndex"], item);
        array.push(temp);
      } else {
        const temp: any = {
          id,
          key: null,
          time: null,
          value: null,
          origin: null,
          klValue: null,
        };
        array.push(temp);
      }
    }, xAxis);
    series[id] = array;
  }, keys);

  return map(function (item: any) {
    const { id, unit } = item;
    // 判断是否是价格线
    let list = [];
    if (item.kline) {
      list = calcSeriesKldata(series, id);
    } else {
      list = series[id];
    }
    list = map(function (line: any) {
      return Object.assign({}, line, { unit });
    }, list);
    return Object.assign({}, item, { data: list });
  }, legends);
};

// 计算Y轴数据
export const calcYAxis = function (series: any[], stack = false, log = false, MaxValue?: number, MinValue?: number) {
  const splitNumber = 4;
  const array: number[][] = [];
  forEach(function (list: any[], j: number) {
    forEach(function (item: any, index: number) {
      safeSet(array, `[${index}][${j}]`, item.value);
    }, list);
  }, series);
  let minValue = 0;
  let maxValue = 0;
  // 是否开启堆积图
  if (stack) {
    if (isNumber(MaxValue)) {
      maxValue = toNumber(MaxValue);
    } else {
      const maxList = map((item: number[]) => add(item), array);
      maxValue = max(maxList);
    }
    if (isNumber(MinValue)) {
      minValue = toNumber(MinValue);
    } else {
      const minList = map((item: number[]) => subtract(item), array);
      minValue = min(minList);
    }
  } else {
    if (isNumber(MaxValue)) {
      maxValue = toNumber(MaxValue);
    } else {
      maxValue = max(array);
    }
    if (isNumber(MinValue)) {
      minValue = toNumber(MinValue);
    } else {
      minValue = min(array);
    }
  }

  let interval: any = new BigNumber(maxValue);
  interval = interval.minus(minValue);
  interval = interval.times(0.1, 10);
  interval = Math.floor(interval.toNumber());

  const maxTemp = new BigNumber(maxValue).plus(interval).toNumber();
  const minTemp = new BigNumber(minValue).minus(interval).toNumber();
  if (maxValue < maxTemp) {
    maxValue = maxTemp;
  }
  if (minValue > 0 && minTemp > 0) {
    minValue = minTemp;
  } else if (minValue < 0 && minValue > minTemp) {
    minValue = minTemp;
  }

  if (log) {
    if (minValue > 0) {
      minValue = Math.log10(minValue);
    } else if (minValue < 0) {
      minValue = Math.log10(Math.abs(minValue)) * -1;
    } else {
      minValue = 0;
    }
    minValue = Math.floor(minValue);
    maxValue = Math.ceil(Math.log10(maxValue));
  }
  return {
    splitNumber,
    min: minValue,
    max: maxValue,
    interval: minValue === maxValue ? maxValue / splitNumber : (maxValue - minValue) / splitNumber,
  };
};
