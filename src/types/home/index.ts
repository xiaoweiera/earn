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
export interface detail {
  id: number | string;
  name: string;
  desc: string;
  show_type: string;
  filters: filterModel;
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
export interface tutorialParams {
  page: number; //页码
  page_size: number; //页标
}
export interface tutorialData {
  id: string | number; // 博客 id
  name: string; // 名称
  desc?: string; // 描述
  cover: string; // 图片
  release_date?: number; // 更新时间
  author?: string; // 作者
}
