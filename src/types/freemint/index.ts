export interface toolMode {
  node: string;
  hash?: string;
  keyList: string[]; //私钥
  baseFeePerGas: number;
  maxPriorityFeePerGas: number;
  maxFeePerGas: number;
  mintAmount: number;
  mintValue: number;
  inputData: string;
  contract: string;
  logs: object[];
}
