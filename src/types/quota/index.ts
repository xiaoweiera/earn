/**
 * @file 指标消息
 * @author svon.me@gmail.com
 */

export enum seriesType {
  bar = "bar",
  line = "line",
  log = "log",
}

// 消息类型
export enum PostType {
  auto = "auto", // 自动消息
  backend = "backend", // 手动录入消息
}

// 消息等级
export type PostLevel = {
  default: "default";
  hot: "hot"; //
  important: "important";
  excellent: "excellent";
};

// 方向
export type Direction = {
  default: "default";
  down: "down";
  up: "up";
};

export interface Chart {
  id: string | number;
  name: string; // 图表标题
  followed: boolean; // 是否关注,
  default_chart: seriesType; // 图表类型
  desc: string; // 描述
  follow_count?: number; // 关注
  view_count?: number; // 查看人数
}

export interface Data {
  id: string | number; // 数据ID
  pid: string | number; // 父ID(取 published_at 中的年月日做分类)
  post_type: PostType; // 数据类型
  level: PostLevel; // 信息流等级
  hash_id: string; // 信息流 hash ID
  direction: Direction; // 信息流方向
  content: string; // 信息流内容
  origin_url: string; // 原文链接
  image_urls: string[]; // 图片链接列表
  url_description: string; // 链接描述
  chart: Chart; // 所属信息流数据
  relation_pair_id: number | string; // 关联行情ID
  published_at: number | string; // 发布时间
  time: number; // 时间戳
  date: number; // 年月日
  show_chart_trends: boolean; // 是否展示展示指标趋势,
  collected: boolean; // 是否关注 (无用数据)
}

export interface DataMap {
  date: string;
  list: Data[];
}

export interface TrendLegend {
  low: number;
  high: number;
  title: string;
  unit: string;
  change: number;
  value: number;
}

export interface Trends {
  id: string | number;
  interval: string;
  default_chart: seriesType;
  value: number;
  kline_value: number;
  ext: TrendLegend[];
  data: number[][];
}

// 推荐数据
export interface Recommend {
  id: string | number;
  content: string;
  chart: Chart; // 所属信息流数据
}