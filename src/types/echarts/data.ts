/**
 * @file chart 数据格式
 * @author svon.me@gmail.com
 */

export enum TimeUnit {
  day = "DAY",
  hour = "HOUR",
}

// 项目类型
export enum ProjectType {
  dapp = "dapp",
  nft = "nft",
}

/*
- mcapWithMaxSupplyTvl: 完整稀释市值/额定TV
- tvl: 锁仓
- price: 当前价格
- mcapWithCirculationSupply: 流通市值
- circulationSupply: 流通量
- owners 所有者数量
- avgPrice 平均价格
- whales 巨鲸人数
- whalesRatio 巨鲸人数占总holders的比例
- volumeWithWhales 所有巨鲸持仓量总量
- volumeWithWhalesRatio 所有巨鲸持仓量总量占总供应量的比例
- holdersFromBlueChip 蓝筹Holders
- holdersFromBlueChipRatio 蓝筹占比
- volumeWithBlueChipHolder 蓝筹持仓
- volumeWithBlueChipHolderRatio 蓝筹持仓占比
- tradeCount 本nft被交易总次数
- avgProfiting 平均盈利
- profitTradeRatio 盈利订单占比
 */

export interface SearchQuery {
  id: string | number; // Dapp id
  timeUnit: TimeUnit; // 时间颗粒度
  start: number | string; // 开始时间
  end: number | string; // 结束时间
  type: string | string[];
}
