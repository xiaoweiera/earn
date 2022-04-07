/**
 * @file 定义 echarts 中常用的数据格式
 */

// 方向
export enum Direction {
  horizontal = "horizontal", // 水平
  vertical = "vertical", // 垂直 （默认方向）
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
  name: string;
  type: SeriesType;
  show: boolean;
  disabled: boolean;
  position: Position;
  [key: string]: any;
}
