

/**
 * @file
 * @author zhangkun@163.com
 */

export enum TabTypes {
  all = 'all', // 全部
  upcoming = 'upcoming', // 即将开始
  ongoing = 'ongoing', // 进行中
  ended = 'ended', // 已结束
  potential = 'potential', // 优质空投
}
export interface AirdropQuery {
  page?: number;
  page_size?: number;
  status?: TabTypes;
}
export interface Chain {
  name: string;  // 名称
  logo?: string; // 图片
  id: number | string;
}

export interface DataItem extends Chain {
  website: string;     // 官网地址
  description: string; // 描述
  chains: Chain[];
  categories: string[];
  score: number;  // 评分
  sys_clout: number;  // 评分数量
  symbol: string; // 项目代币
  airdrop_symbol: string; // 奖励币种名称
  airdrop_amount: number;   // 空投尾数
  airdrop_start_at: number; // 开始时间
  airdrop_end_at: number;   // 结束时间
  airdrop_winner_count: number; // 空投名额
}