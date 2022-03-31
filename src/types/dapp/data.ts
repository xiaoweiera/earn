/**
 * @file DApp 数据详情
 * @author svon.me@gmail.com
 */

export enum DataType {
  ido = "ido",
  nft = "nft",
  airdrop = "airdrop",
}

// 社交媒体数据
export interface ProjectMediaItem {
  is_qrcode?: boolean; // 是否为二维码
  online_user?: number; // 在线人数
  total_user?: number; // 总人数
  project_media_url?: string; // 媒体链接
}

export interface ProjectMedias {
  [key: string]: ProjectMediaItem | undefined;
}

// 公链
export interface ProjectChain {
  id?: number | string;
  logo: string; // 图标
  name: string; // 名称
  tutorial?: string; // 教程跳转链接
  show_tutorial?: boolean; // 详情页面使用，是否展示
}

// 审计公司信息
export interface AuditReport {
  audit: string; // 公司名称
  report: string; // 公司链接
}

// 风险登记
export enum Risk {
  high = "high",
  medium = "medium",
  low = "low",
  unknown = "unknown",
}

export interface Contract {
  address: string; // 地址
  explore: string; // 链接
  chain: string; // 公链名称
}

export interface IDO {
  ido_price: number; //IDO价格
  ido_sale_amount: number; // IDO代币出售
  ido_symbol: string; // IDO币种名称
  ido_fundraising_goal: number; // 筹款目标
  ido_start_at: number; // IDO开始时间
  ido_end_at: number; // IDO结束时间
  [key: string]: any;
}

export interface NFT {
  owners: number; // 持有人
  floor_price: number; // 当前地板价
  price_unit: string; // 价格单位
  issue_volume: number; //发行总量
  highest_yield: number; // 最高收益
  mint_start_at: number; // Mint开始时间
  mint_end_at: number; // Mint结束时间
  [key: string]: any;
}

export interface Airdrop {
  price: number; // 代币价格
  airdrop_winner_count: number; // 空投名额
  airdrop_amount: number; // 空投总量
  airdrop_symbol: string; // 空投代币名称
  airdrop_start_at: number; // 空投开始时间
  airdrop_end_at: number; //空投结束时间
  [key: string]: any;
}

interface CommunityItem {
  name: string;
}

export interface Community {
  twitter: CommunityItem;
}

export interface DAppData {
  anchor: DataType; // 项目类型
  id: number | string; // 项目 ID
  name: string; // 项目名称
  logo: string; // logo
  gallery: string[]; // nft 图集
  risk: Risk;
  website?: string; // 项目地址
  description?: string; // 描述
  score: number; // 综合得分
  clout: number; // 打分数
  sys_clout: number; // 打分数
  white_paper?: string; // 白皮书地址
  contracts: Contract[]; // 合约地址
  audit_reports: AuditReport[]; // 审计公司
  medias?: ProjectMedias; // 社交媒体数据
  chains: ProjectChain[]; // 公链信息
  categories: string[]; // 类型标签
  participation_url: string; // 参与链接
  participation: string; // 参与方式
  ido: IDO; // ido 数据
  nft: NFT; // nft 数据
  airdrop: Airdrop; // airdrop 数据
  community: Community; // 社交媒体
}

export interface blogDAppData extends DAppData {
  total: string;
  totalText: string;
  people: string;
  peopleText: string;
  time: string;
  timeText: string;
  url: string;
}
