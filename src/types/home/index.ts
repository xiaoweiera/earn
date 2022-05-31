import { HeaderType } from "src/pages/home/topic/data";

export interface summaryItem {
  total: number;
  increase_24: number;
  total_chain: number;
  total_platform: number;
  chain: string[];
  platform: string[];
  category: string[];
}
export interface summaryModel {
  avg_ath: number;
  nft: summaryItem;
  nft_upcoming: summaryItem;
  nft_ended: summaryItem;
  ixo: summaryItem;
  ixo_upcoming: summaryItem;
  ixo_ended: summaryItem;
  ido: summaryItem;
  ido_upcoming: summaryItem;
  ido_ongoing: summaryItem;
  ido_ended: summaryItem;
  igo: summaryItem;
  igo_upcoming: summaryItem;
  igo_ongoing: summaryItem;
  igo_ended: summaryItem;
  airdrop: summaryItem;
}
export interface recommendModel {
  page: number;
  page_size: number;
  show_commercial?: boolean; // 是否显示广告 默认不显示 false
}
export interface optionItem {
  show: boolean;
  options: Array<string>;
}
export interface filterModel {
  chain: optionItem;
  platform: optionItem;
  category: optionItem;
  search: optionItem;
}

export interface projectParams {
  id: number | string;
  page: number;
  page_size: number;
  chain?: string;
  platform?: string;
  category?: string;
  query?: string;
  sort_field?: string;
  sort_type?: string;
}
export interface newProjectParams {
  id?: number | string;
  keyword?: string;
  chain?: string;
  platform?: string;
  category?: string;
  page: number;
  page_size: number;
  sort_field?: string;
  sort_type?: string;
}
export interface tutorialParams {
  page: number; //页码
  page_size: number; //页标
  group_id: number; //博客类型id
}
export interface tutorialData {
  id: string | number; // 博客 id
  name: string; // 名称
  desc?: string; // 描述
  cover: string; // 图片
  release_date?: number; // 更新时间
  author?: string; // 作者
}
export interface AdData {
  image: string;
  url: string;
}
export interface tableHeader {
  sort?: boolean; // 是否支持排序
  sort_field?: string; // 排序字段
  center?: boolean; // 是否居中
  width?: number; //宽度
  active?: boolean; // 是否为激活状态
  title: string; // 表格名称
  fields: string | string[] | Array<string[] | string>; // 对应数据的键名
  type: HeaderType | HeaderType[] | Array<Array<HeaderType> | HeaderType>; // 展示效果
}
export interface topicItem {
  id: number;
  category: string;
  title: string;
  description: string;
  cover_url: string;
  sequence: number;
  online: boolean;
  chain_filter_supported: boolean;
  platform_filter_supported: boolean;
  category_filter_supported: boolean;
  keyword_filter_supported: boolean;
  created_at: number | string;
  updated_at: number | string;
}
export interface filterOption {
  available_chains: string[];
  available_platforms: string[];
  available_categories: string[];
}
export interface tableBody {
  page: number;
  size: number;
  more: boolean;
  items: object[];
}
export interface topicDetail {
  id: number;
  category: string;
  title: string;
  description: string;
  cover_url: string;
  sequence: number;
  online: boolean;
  chain_filter_supported: boolean;
  platform_filter_supported: boolean;
  category_filter_supported: boolean;
  keyword_filter_supported: boolean;
  created_at: number;
  updated_at: number;
  header: tableHeader[];
  body: tableBody;
  extra: filterOption;
}
