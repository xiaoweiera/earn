interface baseModel {
  value?: number;
  valueType?: string;
  gasLimit?: number;
  gasType?: string;
  mintAmount?: number;
  mintTotal?: number;
  isNoLimit?: boolean;
}
export interface toolMode {
  contract?: string;
  node?: string;
  keyList?: string[]; //私钥
  smartMintList?: string[]; //smart 地址
  baseFeePerGas?: number;
  maxPriorityFeePerGas?: number;
  maxFeePerGas?: number;
  mintAmount?: number;
  mintValue?: number;
  inputData?: string;
  logs?: object[];
  shieldWord?: string; //屏蔽词搜索
  keyWord?: string; //关键词搜索
  baseInfo?: baseModel;
}
