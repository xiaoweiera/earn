export interface ApyItem {
  symbol: string; //币种符号
  symbol_name: string; //币种名称
  symbol_logo: string; //币种Logo
  pools: PoolsItem[]; //币种矿池列表
}

export interface PoolsItem {
  project: string; //矿池平台名称
  project_logo: string; //矿池平台logo
  chain_logo: string; //矿池公链logo
  chain: string; //矿池公链
  apy: number | string; //矿池年化百分比
  tvl: number | string; //矿池锁仓
}

export interface ApyQuery {
  page: number | string;
  page_size: number | string;
}
