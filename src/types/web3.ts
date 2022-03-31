/**
 * @file 常用数据定义
 * @author svon.me@gmail.com
 */

export type Callback = (value: any) => void;

type Any = Record<string, any>;

export enum stateName {
  swap = "swapUtil",
  statePair = "symbolDetail",
  watchInput = "watchSymbol",
  stateInput = "symbolInput",
}

export interface SymbolForm {
  // @ts-ignore
  trigger?: string;
  [key: string]: string | number;
}

export enum EventType {
  account = "accountsChanged", // 切换账号
  connect = "connect", // 链接
  disconnect = "disconnect", // 断开
  network = "chainChanged", // 网络切换
  message = "message", // 消息通信

  transactionHash = "transactionHash",
  // 收到确认时触发
  confirmation = "confirmation",
  // 交易收据有效时触发
  receipt = "receipt",
  // 交易发送过程中如果出现错误则触发此事件。对于out of gas错误，其第二个参数为交易收据
  error = "error",
}

export interface SymbolInfo extends Any {
  token: string; // 地址
  reserveCount: string; // 储存地址
}

export interface SymbolInfoDetail extends SymbolInfo {
  name: string; // 名称
  symbol: string; // 代号（币名称）
  decimals: number; // 小数
  balance?: number;
  auth?: boolean; // 授权
}

export interface PairInfo extends Any {
  total: string | number; // 总数
  decimals: string | number; // 小数
  balance: string | number; // 余额
  symbols: SymbolInfo[];
}

export interface ChainItem {
  name: string;
  chainID: number;
  rpc: string;
  scan: string;
  decimals: number;
  currency: string;
}
