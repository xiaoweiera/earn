/**
 * @file 定义 echarts 中常用的数据格式
 */

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
