/**
 * @file 数据
 */

import safeGet from "@fengqiaogang/safe-get";
import API from "src/api/";
import window from "src/plugins/browser/window";
import { createHref } from "src/plugins/router/pack";

// 展示效果
export enum HeaderType {
  number = "number", // 数字
  text = "text", // 纯文字
  radio = "radio", // 数字 + 百分号
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

const header: Header[] = [
  {
    title: "项目名称",
    fields: ["logo", "name"],
    type: [HeaderType.logo, HeaderType.text],
  },
  {
    sort: true,
    active: true,
    title: "地板价", // 表格名称
    fields: ["chains", "floor_price"],
    type: [HeaderType.chain, HeaderType.text],
  },
  {
    sort: true,
    sort_field: "volume_24h",
    title: "交易量",
    center: true,
    fields: [["chains", "volume_24h"], "volume_change_percent_24h"],
    type: [[HeaderType.chain, HeaderType.number], HeaderType.radio],
  },
  {
    title: "交易量(24)%",
    fields: "volume_change_percent_24h",
    type: HeaderType.radio,
  },
  {
    title: "巨鲸Holders",
    fields: ["whales_num"],
    type: [HeaderType.text],
  },
  {
    title: "巨鲸Holders涨幅",
    sort: true,
    sort_field: "whale_num_change_24h",
    active: true,
    fields: "whale_num_change_24h",
    type: HeaderType.radio,
  },
  {
    title: "巨鲸Holders%",
    fields: "whales_ratio",
    type: HeaderType.radio,
  },
  {
    title: "巨鲸持仓",
    fields: "whales_holding",
    type: HeaderType.number,
  },
  {
    title: "巨鲸Holding%",
    fields: "whale_holding_ratio",
    type: HeaderType.radio,
  },
  {
    title: "巨鲸占比",
    fields: "whales_num",
    type: HeaderType.progress,
  },
  {
    title: "走势图1",
    fields: "id",
    type: HeaderType.chartBar,
  },
  {
    title: "走势图2",
    fields: "id",
    type: HeaderType.chartLine,
  },
];

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
// row跳转
export const toProject = (row: any) => {
  if (!row.category) return "";
  let url = "";
  if (row.category === "NFT") {
    url = `/rank/nft/${row.id}`;
  } else {
    url = `/rank/dapp/${row.id}`;
  }
  window.open(createHref(url));
};
export const cellClass = () => ({ border: "none" });
export const getList = async function (query: any): Promise<Table> {
  const api = new API();
  const result = await api.home.getProjects<object>(query);

  return {
    header,
    items: safeGet<object[]>(result, "items"),
  };
};
