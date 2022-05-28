/**
 * @file DApp详情数据
 * @author zhangkun@163.com
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
  holder = "holder",
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

export interface ProjectItem {
  //链上数据
  mcapWithMaxSupplyTvl: number | string; //完整稀释市值/锁仓
  tvl: number | string; //项目锁仓
  //行情数据
  price: number; //当前价格
  currentRoi: number; //当前收益率
  athPrice: number; //历史最高价
  athRoi: number; //历史最高涨幅
  currentRoiFromAth: number; //从历史最高价格到现在的跌幅
  atlPrice: number; //历史最低价
  mcapWithCirculationSupply: number; //流通市值
  mcapWithMaxSupply: number; //总市值
  circulationSupply: number; //流通量
  maxSupply: number; //最大供应量
  //其它数据
  owners: number | string; //所有者数量
  vgPrice: number; //平均价格
  whales: number; //巨鲸人数
  whalesRatio: number; //巨鲸占比
  volumeWithWhales: number; //巨鲸持仓总量
  volumeWithWhalesRatio: number; //巨鲸持仓占比
  whalesRank: number; //巨鲸排名
  whales_24h: number; //巨鲸24增长
  volumeWithWhales_24h: number; //巨鲸持仓24新增
  holdersFromBlueChip: number; //蓝筹持有者数量
  holdersFromBlueChipRatio: number; //蓝筹持有者占比
  volumeWithBlueChipHolder: number; //蓝筹持仓数量
  volumeWithBlueChipHolderRatio: number; //蓝筹持仓数量占比
  holdersFromBlueChipRank: number; //蓝筹Holders排名
  holdersFromBlueChip_24h: number; //蓝筹Holders24新增
  volumeWithBlueChipHolder_24h: number; //蓝筹持仓24新增
  tradeCount: number; //NFT被交易总次数
  avgProfiting: number; //NFT平均盈利
  profitTradeRatio: number; //NFT盈利订单占比
  mintCount: number; //NFT铸造数量
  mintProgress: number; //NFT铸造进度
  mintTime: string | number; //NFT铸造时间
  buy_url: string; //NFT购买地址
  //空投信息
  airdrop_amount: number; //空投总量
  airdrop_symbol: string; //空投代币
  airdrop_winner_count: number; //空投名额
  airdrop_joined_user: number; //参与人数
  airdrop_start_at: number | string; //空投开始时间
  airdrop_end_at: number | string; //空投结束时间
  airdrop_url: string; //空投地址
  airdrop_status?: Progress; // airdrop项目进度状态
  //IDO发行信息
  ido_sale_amount: number; //IDO代币出售数量
  ido_symbol: string; //IDO代币名称
  ido_price: number; //IDO代币价格
  ido_fundraising_goal: number; //IDO筹款目标
  ido_start_at: number | string; //IDO开始时间
  ido_end_at: number | string; //IDO结束时间
  ido_status?: Progress; // IDO项目进度状态
  //NFT发行信息
  issue_volume: number; //NFT发行量
  price_unit: string; //NFT计价单位
  mint_price: number; //NFT铸造价格
  mint_start_at: number | string; //NFT铸造开始时间
  mint_end_at: number | string; //NFT铸造结束时间
  mint_status?: Progress; // Mint项目进度状态
  //项目分类字段
  is_dapp: boolean; //是否为DApp
  is_nft: boolean; //是否为NFT
  is_mint: boolean; //是否为NFT Mint项目
  is_ido: boolean; //是否为IDO项目
  is_igo: boolean; //是否为IGO项目
  is_airdrop: boolean; //是否为空投项目
  is_potential_airdrop: boolean; //是否为潜在空投
  is_dapp_rank: boolean; //是否为DApp排行榜项目
  is_nft_rank: boolean; //是否为NFT排行榜项目
  //时间信息
  online_time: number | string; //项目开盘时间
  //基础信息
  name: string; //项目名称
  logo: string; //项目Logo
  website: string; //项目官网
  website_domain: string; //官网域名
  symbol: string; //平台币
  gallery: string[]; //图集
  chains: string[]; //所在公链
  categories: string[]; // 类型
  risk: string; //风险标识
  description: string; //项目描述
  long_description: string; //项目长描述
  comment: string; //项目测评
  participation: string; //项目参与方式
  participation_url: string; //项目参与链接
  medias?: ProjectMedias; // 社交媒体数据
  safety: string; //审计机构
  clout: string; //项目热度
  white_paper: string; //白皮书
  contracts: string[]; //合约地址
  community: Community; //社区信息
  cover: string; //封面
  tge_platform: string[]; //发行平台
  increment: Increment; //变化量变化率信息
  investments: Investments[]; //投融资信息
  tutorial_blog_url: string; //参与教程地址
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

interface CommunityItem {
  name: string;
}

export interface Community {
  twitter: CommunityItem;
}

//变化量变化率信息
export interface Increment {
  //用户数
  users_24h: number; //变化量
  users_7d: number; //变化量
  users_24h_radio: number; //变化率
  users_7d_radio: number; //变化率
  //合约资产
  balance_24h: number; // 变化量
  balance_7d: number; //变化量
  //链上交易数据
  chainVolume_24h: number; //变化量
  chainVolume_7d: number; //变化量
  //完整稀释市值/额定TVL
  mcapWithMaxSupplyTvl_7d: number; //变化量
  mcapWithMaxSupplyTvl_30d: number; //变化量
  mcapWithMaxSupplyTvl_7d_radio: number; //变化率
  mcapWithMaxSupplyTvl_30d_radio: number; //变化率
  //流通市值
  mcapWithMaxSupply_24h: number; //变化量
  mcapWithMaxSupply_7d: number; //变化量
  mcapWithMaxSupply_30d: number; //变化量
  mcapWithMaxSupply_24h_ratio: number; //变化率
  mcapWithMaxSupply_7d_ratio: number; //变化率
  mcapWithMaxSupply_30d_ratio: number; //变化率
  //TVL
  tvl_24h: number; //变化量
  tvl_7d: number; //变化量
  tvl_30d: number; //变化量
  tvl_24h_radio: number; //变化率
  tvl_7d_radio: number; //变化率
  tvl_30d_radio: number; //变化率
  //交易量
  volume_24h: number; //变化量
  volume_7d: number; //变化量
  //nft所有者数量
  owners_24h: number; //变化量
  owners_7d: number; //变化量
  owners_30d: number; //变化量
  owners_24h_ratio: number; //变化率
  owners_7d_ratio: number; //变化率
  owners_30d_ratio: number; //变化率
}

export interface Investments {
  id: number | string; //项目ID
  third_id: number | string; // 轮次ID
  stage_name: string; //轮次
  amount: number; // 投资总额 美元
  valuation?: number; // 估值
  invested_at: string | number; // 投资日期
}

//筛选类型
export interface summaryItem {
  available_chains: string[];
  available_platforms: string[];
  available_categories: string[];
}
export interface nftItem {
  extra: summaryItem[];
  items: ProjectItem[];
}
