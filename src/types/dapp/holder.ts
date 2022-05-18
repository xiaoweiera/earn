/**
 * @file
 * @author zhangkun@163.com
 */

export interface HolderTab {
  id: string;
  name: string;
}

//查询字段
export interface HolderQuery {
  project_id: number | string; //项目ID
}

//NFT持有人信息字段
export interface HolderInfo {
  whales_num: number | string; //巨鲸数量
  whales_ratio: number | string; //巨鲸数量占比
  whales_holding: number | string; //巨鲸持仓
  whale_holding_ratio: number | string; //巨鲸持仓占比
  bule_chip_holders: number | string; //蓝筹持有人数量
  blue_chip_holders_ratio: number | string; //蓝筹持有人数量占比
  blue_chip_holding: number | string; //蓝筹持有人持仓
  blue_chip_holding_ratio: number | string; //蓝筹持有人持仓占比
}
