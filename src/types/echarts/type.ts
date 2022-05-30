/**
 * @file 定义 echarts 中常用的数据格式
 */

import type { TimeUnit } from "src/types/echarts/data";

// 方向
export enum Direction {
  horizontal = "horizontal", // 水平
  vertical = "vertical", // 垂直 （默认方向）
}

// 图例位置
export enum LegendDirection {
  top = "top",
  left = "left",
  right = "right",
  bottom = "bottom",
  custom = "custom", // 自定义图例
}

//grid
export interface GridModel {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  containLabel?: boolean;
}

// 提示方式
export enum triggerType {
  item = "item",
  axis = "axis",
  none = "none",
}

export enum Position {
  left = "left",
  right = "right",
}

export enum EchartsOptionName {
  series = "series",
  yAxis = "yAxis",
  xAxis = "xAxis",
  legend = "legend",
  legendEvent = "legendEvent",
  tooltip = "tooltip",
}

export enum SeriesType {
  bar = "bar",
  line = "line",
  log = "log",
}

export const iconFontName = {
  [SeriesType.bar]: "icon-Column",
  [SeriesType.line]: "icon-Broken_line",
};

export interface LegendData {
  index: number;
  name: string; // 名称
  type: SeriesType; // echarts 展示图形类型 line / bar ...
  show?: boolean;
  disabled: boolean;
  position?: Position;

  [key: string]: any;
}

export interface LegendItem extends LegendData {
  unit?: string; // 单位
  id: string | number; // id
  kline?: boolean; // 是否为价格线
  value?: string;
  color?: string;
}

export interface YAxis {
  left: string | undefined;
  right: string | undefined;
}

export interface XAxisItem {
  value: string | number; // 简化时间
  key?: string; // 时间戳对应的格式化时间
  time?: number; // 时间戳
  interval?: string; // 颗粒度
  [key: string]: any;
}

export interface SeriesItem extends XAxisItem {
  klValue?: number | string;
  origin?: number | string; // 原始数据 log 图时自动处理
  unit?: string;

  [key: string]: any;
}

export interface SeriesMap {
  [key: string]: SeriesItem[];
}

// 图表数据结构
export class EchartData {
  key?: string;
  timeUnit?: TimeUnit;
  legends: Array<LegendItem> = [];
  yAxis: YAxis = {
    left: "",
    right: "",
  }; // Y 轴刻度单位
  xAxis: Array<XAxisItem | number | string> = [];
  series: SeriesMap = {};
  left?: string;
  right?: string;
}

export interface FormatterTemplate {
  icon: string;
  name: string;
  value: string;
}

export interface FormatterParams {
  // 传入的数据值。在多数系列下它和 data 相同。在一些系列下是 data 中的分量（如 map、radar 中）
  value: number;
  // 数据图形的颜色
  color: string;
  // 传入的原始数据项
  data: SeriesItem;
  // 数据展示类型
  seriesType: SeriesType;
  // x 轴几点名称
  axisValue: string;
  // 数据名称（图例名称）
  seriesName: string;
  // x 轴名称
  name: string;
  //链
  chain: string;
}
