export enum nftStatus {
  upcoming = "upcoming", // 即将开始
  history = "ended", // 历史项目
}

export enum nftSort {
  asc = "asc", // 升序
  desc = "desc", // 降序
}

export enum ProjectType {
  dApp = "dapp",
  ad = "ad",
}
export interface nftQuery {
  page?: number;
  page_size?: number;
  chain?: string; // 公链
  category?: string; // 类型
  query?: string; // 搜索关键词
  status?: nftStatus;
  sort_field?: string; // 排序字段
  sort_type?: nftSort;
}

export interface ProjectNftItem {
  id: number | string;
  // 名称
  name: string;
  // 数据类型, dapp-普通项目数据; ad-"广告"
  data_type: ProjectType;
  // 图集
  gallery: string[];
  // 公链
  chains: string[];
  // 显示公链
  chain: string;
  // 类型
  category: string;
  // 项目评分
  overall_score: number;
  // Mint价格
  mint_price: number;
  // 发行总量
  issue_volume: number;
  // nft Drops开始时间
  mint_start_at: number;
  date?: number;
}
export interface AdNftItem {
  // 广告ID
  id: number | string;
  // 标识此条数据为一个广告
  data_type: ProjectType;
  // 广告图片
  image: string;
  // 广告跳转链接
  url: string;
  // 是否展示广告标记, true-是, false-否
  flag: boolean;
}
