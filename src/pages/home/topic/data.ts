/**
 * @file 数据
 */

import safeGet from "@fengqiaogang/safe-get";
import API from "src/api/";

// 展示效果
export enum HeaderType {
  number = "number", // 数字
  text = "text", // 纯文字
  radio = "radio", // 数字 + 百分号
  progress = "progress", // 进度条
  chain = "chain", // 小图标
  logo = "logo", // 大图标
  bar = "bar", // 柱状图
  line = "line", // 折线图
  money = "money", // 金额
  time = "time", //时间
}

export interface Header {
  sort?: boolean; // 是否支持排序
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
    sort: false,
    title: "项目名称",
    fields: ["logo", "name"],
    type: [HeaderType.logo, HeaderType.text],
  },
  {
    title: "地板价", // 表格名称
    fields: ["chains", "floor_price"],
    type: [HeaderType.chain, HeaderType.text],
  },
  {
    title: "交易量",
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
    type: HeaderType.bar,
  },
  {
    title: "走势图2",
    fields: "id",
    type: HeaderType.line,
  },
];

export const getList = async function (): Promise<Table> {
  const api = new API();
  const result = await api.home.getProjects<object>({
    id: 2179,
    page: 1,
    page_size: 30,
    category: "All",
  } as any);

  return {
    header,
    items: safeGet<object[]>(result, "items"),
  };
};
