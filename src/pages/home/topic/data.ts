/**
 * @file 数据
 */

import safeGet from "@fengqiaogang/safe-get";
import API from "src/api/";
import I18n from "src/utils/i18n";
import { toUpper } from "ramda";
import _ from "lodash";
const i18n = I18n();
// 展示效果
export enum HeaderType {
  number = "number", // 数字
  text = "text", // 纯文字
  ratio = "ratio", // 数字 + 百分号
  progress = "progress", // 进度条
  chain = "chain", // 小图标
  logo = "logo", // 大图标
  chartBar = "bar", // 柱状图
  chartLine = "line", // 折线图
  money = "money", // 金额
  time = "time", //时间
  desc = "desc", //描述
}

export interface Header {
  sort?: boolean; // 是否支持排序
  sort_field?: string; // 排序字段
  center?: boolean; // 是否居中
  width?: number; //宽度
  active?: boolean; // 是否为激活状态
  title: string; // 表格名称
  fields: string | string[] | Array<string[] | string>; // 对应数据的键名
  type: HeaderType | HeaderType[] | Array<Array<HeaderType> | HeaderType>; // 展示效果
}

export interface Table {
  header: Header[];
  items: object[];
}

//得到title
export const getTitle = (field: string) => {
  let title = "";
  //获取基础字段
  const base = field.includes("_") ? field.split("_")[0] : field;
  //@ts-ignore 基础字段title
  const baseTitle = i18n.table[base];
  const time = ["24h", "7d", "30d"];
  //如果是图表 或者 基础字段 title为baseTitle
  if (field.includes("chart") || !field.includes("_")) return baseTitle ? baseTitle : _.camelCase(field);
  //变化率和变化量都是xxxChg+颗粒度
  time.forEach((t) => {
    if (field.includes(t)) {
      //@ts-ignore
      title = `${i18n.table[base]}Chg ${toUpper(t)}`;
      return false;
    }
  });
  return title ? title : _.camelCase(field);
};
// const header: Header[] = [
//   {
//     title: "users",
//     fields: ["logo", "name"],
//     type: [HeaderType.logo, HeaderType.text],
//   },
//   {
//     sort: true,
//     active: true,
//     title: "users_24h_radio", // 表格名称
//     fields: ["chains", "floor_price"],
//     type: [HeaderType.chain, HeaderType.text],
//   },
//   {
//     sort: true,
//     sort_field: "users_24h",
//     title: "users_24h",
//     center: true,
//     fields: [["chains", "volume_24h"], "volume_change_percent_24h"],
//     type: [[HeaderType.chain, HeaderType.number], HeaderType.radio],
//   },
//   {
//     title: "users_24h_chart",
//     fields: "volume_change_percent_24h",
//     type: HeaderType.radio,
//   },
//   {
//     title: "巨鲸Holders",
//     fields: ["whales_num"],
//     type: [HeaderType.text],
//   },
//   {
//     title: "abc_dsd_a",
//     sort: true,
//     sort_field: "whale_num_change_24h",
//     active: true,
//     fields: "whale_num_change_24h",
//     type: HeaderType.radio,
//   },
//   {
//     title: "巨鲸Holders%",
//     fields: "whales_ratio",
//     type: HeaderType.radio,
//   },
//   {
//     title: "巨鲸持仓",
//     fields: "whales_holding",
//     type: HeaderType.number,
//   },
//   {
//     title: "巨鲸Holding%",
//     fields: "whale_holding_ratio",
//     type: HeaderType.radio,
//   },
//   {
//     title: "巨鲸占比",
//     fields: "whales_num",
//     type: HeaderType.progress,
//   },
//   {
//     title: "走势图1",
//     fields: "id",
//     type: HeaderType.chartBar,
//   },
//   {
//     title: "走势图2",
//     fields: "id",
//     type: HeaderType.chartLine,
//   },
// ];

export const rowClass = (height = 60) => {
  const styleJson = {
    height: `${height}px`,
    border: "none",
    cursor: "Pointer",
  };
  return styleJson;
};
export const headerCellClass = () => {
  const styleJson = {
    border: "none",
    borderTop: "1px solid rgba(3, 54, 102, 0.06) !important",
    borderBottom: "1px solid rgba(3, 54, 102, 0.06) !important",
    padding: "0",
    height: "40px",
  };
  return styleJson;
};

export const cellClass = () => ({ border: "none" });
export const getTopicDetail = async function (query: any): Promise<Table> {
  const api = new API();
  const result: any = await api.home.getTopicDetail<object>(query);

  return {
    header: safeGet<Header[]>(result, "header"),
    items: safeGet<object[]>(result, "body.items"),
  };
};
