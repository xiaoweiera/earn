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
  icon = "icon", // 小图标
  logo = "logo", // 大图标
  bar = "bar", // 柱状图
  line = "line", // 折线图
}

export interface Header {
  sort?: boolean; // 是否支持排序
  active?: boolean; // 是否为激活状态
  label: string; // 表格名称
  key: string | string[] | Array<string[] | string>; // 对应数据的键名
  type: HeaderType | HeaderType[] | Array<Array<HeaderType> | HeaderType>; // 展示效果
}

export interface Table {
  header: Header[];
  items: object[];
}

const header: Header[] = [
  {
    sort: false,
    label: "项目名称",
    key: ["logo", "name"],
    type: [HeaderType.logo, HeaderType.text],
  },
  {
    label: "地板价", // 表格名称
    key: ["chains", "floor_price"],
    type: [HeaderType.icon, HeaderType.text],
  },
  {
    label: "交易量",
    key: [["chains", "volume_24h"], "volume_change_percent_24h"],
    type: [[HeaderType.icon, HeaderType.number], HeaderType.radio],
  },
  {
    label: "交易量(24)%",
    key: "volume_change_percent_24h",
    type: HeaderType.radio,
  },
  {
    label: "巨鲸Holders",
    key: "whales_num",
    type: HeaderType.text,
  },
  {
    label: "巨鲸Holders涨幅",
    key: "whale_num_change_24h",
    type: HeaderType.radio,
  },
  {
    label: "巨鲸Holders%",
    key: "whales_ratio",
    type: HeaderType.radio,
  },
  {
    label: "巨鲸持仓",
    key: "whales_holding",
    type: HeaderType.number,
  },
  {
    label: "巨鲸Holding%",
    key: "whale_holding_ratio",
    type: HeaderType.radio,
  },
  {
    label: "巨鲸占比",
    key: "whales_num",
    type: HeaderType.progress,
  },
  {
    label: "走势图1",
    key: "id",
    type: HeaderType.bar,
  },
  {
    label: "走势图2",
    key: "id",
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
