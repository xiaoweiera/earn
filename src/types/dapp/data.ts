/**
 * @file DApp 数据详情
 * @author svon.me@gmail.com
 */

export enum Progress {
  oncoming = "oncoming", // 即将开始
  ongoing = "ongoing", // 进行中
  finished = "finished", // 已结束
  no = "no", //无状态
}

export enum TabName {
  dashboard = "dashboard",
  project = "project",
  reviews = "reviews",
  twitter = "twitter",
  nft = "nft",
  dapp = "dapp",
  igo = "igo",
  airdrop = "airdrops",
  mint = "mint",
}

export enum DataType {
  ido = "ido",
  nft = "nft",
  airdrop = "airdrop",
}

export enum ProjectType {
  dapp = "dapp",
  ido = "ido",
  igo = "igo",
  nft = "nft",
  game = "game",
  defi = "defi",
  airdrop = "airdrops",
  mint = "mint",
  airdrops = "airdrop",
  funds = "funds",
}

export interface DAppProject {
  type: ProjectType; // 项目类型
  rank: boolean; // 是否为排行榜
  id: string | number; // 项目id
  tab: TabName; // tab 名称
  [key: string]: any;
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
  ido_status?: Progress; // 项目进度状态
  ido_price: number; //IDO价格
  ido_sale_amount: number; // IDO代币出售
  ido_symbol: string; // IDO币种名称
  ido_fundraising_goal: number; // 筹款目标
  ido_start_at: number; // IDO开始时间
  ido_end_at: number; // IDO结束时间
  platform: string; //来源平台
  ath_since_ido: number; //自IDO以来收益
  valuation: number; // 估值
  [key: string]: any;
}

export interface NFT {
  mint_status?: Progress; // 项目进度状态
  mint_price: number; // 当前价格
  owners: number; // 持有人
  owners_change_percent: number; // NFT拥有者数量24小时变化率
  floor_price: number; // 当前地板价
  price_unit: string; // 价格单位
  issue_volume: number; //发行总量
  highest_yield: number; // 最高收益
  mint_start_at: number; // Mint开始时间
  mint_end_at: number; // Mint结束时间
  [key: string]: any;
}

export interface Airdrop {
  airdrop_status?: Progress; // 项目进度状态
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

export interface Ticker {
  tvl: number; // 锁仓
  tvl_change_percent: number; // 锁仓24小时变化率
  mcap: number; // 市值
  mcap_change_percent: number; // 市值24小时变化率
  mcap_tvl: number; // 锁仓市值比
  h24volume: number; // 24小时成交量
  h24volume_change_percent: number; // 24小时成交量变化率
  users: number; //  用户数
  user_change_percent: number; // 用户数24小时变化率
}

export enum Activity {
  airdrop = "airdrop", // 空投
  ido = "ido", // ido
  invest = "invest", // 融资
  mint = "mint", // 铸造
  none = "none", // 无活动状态
}

export interface Investment {
  stage_name: Progress; // 投资阶段
  amount: number; // 投资总额 美元
  valuation: number; // 估值
  invested_at: string | number; // 投资日期
}

export interface DAppData {
  anchor: DataType; // 项目类型
  id: number | string; // 项目 ID
  name: string; // 项目名称
  logo: string; // logo
  gallery: string[]; // nft 图集
  risk: Risk;
  website?: string; // 项目地址
  ticker: Ticker; // 排行榜类型项目描述
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
  tutorial_blog_url: string; //参与教程
  preferred_module: string;
  preferred_activity?: Activity; // 目前阶段
  latest_investment?: Investment; // 项目最新融资轮次
  current_price: number; //项目代币当前价格
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

export interface DataQuery {
  id: number;
  range: string;
}

export interface TokenQuery {
  id: number;
}

export interface TokenDataQuery {
  symbol: string | number;
  range: string;
}

export interface Currency {
  symbol: string; //代币名称
  price: number; // 当前价格
  price_change_percent_24h: number; //24小时跌涨幅
  highest_open_price: number; //开盘最高价
  highest_yield: number; //最高收益
  volume_24h: number; //24小时交易量
  marketcap: number; //市值
  fully_diluted_marketcap: number; //完全流通市值
  total_supply: number; //总供应量
  max_supply: number; //最大供应量
  circulating_supply: number; //流通供应量
  owners: number | string; //持有人
  assets: number; //资产
  avg_price: number; //平均成交价
  floor_price: number; //当前地板价
  price_unit: string; //价格单位
  sold_24h: number; //24小时售卖
  total_volume: number; //总交易量
}

export interface newsModel {
  id: number | string;
  page: number;
  page_size: number;
}
