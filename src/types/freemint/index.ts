export interface toolMode {
  node: string;
  hash?: string;
  keyList: string[]; //私钥
  gasMax: number;
  gasPrice: number;
  gasLimit: number;
  consume: number; //矿工消费
  consumeLimit: number;
  mintAmount: number;
  value: number;
  inputData: string;
}
