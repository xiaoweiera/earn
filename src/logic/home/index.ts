import API from "src/api";
import type { projectParams, recommendModel, summaryModel, tutorialParams, tutorialData } from "src/types/home";
import I18n from "src/utils/i18n";
import { ApyQuery } from "src/types/home/apy";
import { FundsQuery, infoModel, lineModel } from "src/types/dapp/invest";

// 得到header数据 headerName,headerCss
export const getHeader = (key: string) => {
  const i18n = I18n();
  if (key === "name") {
    return [i18n.home.topList.name, "justify-begin"];
  } else if (key === "chains") {
    return [i18n.home.topList.chain, "justify-center"];
  } else if (key === "tge_platform") {
    return [i18n.home.topList.plat, "justify-center"];
  } else if (key === "overall_score") {
    return [i18n.home.topList.rate, "justify-center"];
  } else if (key === "categories") {
    return [i18n.home.topList.category, "justify-center"];
  } else if (key === "current_price") {
    return [i18n.home.topList.currentPrice, "justify-center"];
  } else if (key === "ido_price") {
    return [i18n.home.topList.idoPrice, "justify-center"];
  } else if (key === "balance_24h") {
    return [i18n.home.topList.balance24h, "justify-center"];
  } else if (key === "balance_7d") {
    return [i18n.home.topList.balance7d, "justify-center"];
  } else if (key === "volume_24h") {
    return [i18n.home.topList.volume24h, "justify-center"];
  } else if (key === "volume_7d") {
    return [i18n.home.topList.volume7d, "justify-center"];
  } else if (key === "ido_fundraising_goal") {
    return [i18n.home.topList.totalRaised, "justify-center"];
  } else if (key === "mcap") {
    return ["MarketCap", "justify-center"];
  } else if (key === "floor_price") {
    return [i18n.home.topList.floorPrice, "justify-center"];
  } else if (key === "mint_price") {
    return [i18n.home.topList.mintPrice, "justify-center"];
  } else if (key === "ido_sale_amount") {
    return [i18n.home.topList.tokenSale, "justify-center"];
  } else if (key === "owners") {
    return [i18n.home.topList.owner, "justify-center"];
  } else if (key === "assets") {
    return [i18n.home.topList.assets, "justify-center"];
  } else if (key === "mcap_tvl") {
    return ["MCap/TVL", "justify-center"];
  } else if (key === "users_24h") {
    return [i18n.home.topList.user24Change, "justify-center"];
  } else if (key === "users_7d") {
    return [i18n.home.topList.user7Change, "justify-center"];
  } else if (key === "tvl") {
    return [i18n.home.topList.tvlChange, "justify-center"];
  } else if (key === "ath_since_ido") {
    return [i18n.home.topList.idoAth, "justify-center"];
  } else if (key === "current_roi_usd") {
    return [i18n.home.topList.nowCurrent, "justify-center"];
  } else if (key === "mint_start_at") {
    return ["Ended in (UTC)", "justify-center"];
  } else if (key === "ido_end_at") {
    return ["Mint (UTC)", "justify-center"];
  } else if (key === "volume_change_percent_24h") {
    return [i18n.home.topList.changePercent24, "justify-center"];
  } else if (key === "volume_change_percent_7d") {
    return [i18n.home.topList.changePercent7, "justify-center"];
  } else if (key === "whales_num") {
    return [i18n.home.topList.whales_num, "justify-center"];
  } else if (key === "whales_ratio") {
    return [i18n.home.topList.whales_ratio, "justify-center"];
  } else if (key === "whale_num_change_24h") {
    return [i18n.home.topList.whale_num_change_24h, "justify-center"];
  } else if (key === "whales_holding") {
    return [i18n.home.topList.whales_holding, "justify-center"];
  } else if (key === "whale_holding_ratio") {
    return [i18n.home.topList.whale_holding_ratio, "justify-center"];
  } else if (key === "bule_chip_holders") {
    return [i18n.home.topList.bule_chip_holders, "justify-center"];
  } else if (key === "blue_chip_holders_change_24h") {
    return [i18n.home.topList.blue_chip_holders_change_24h, "justify-center"];
  } else if (key === "blue_chip_holders_ratio") {
    return [i18n.home.topList.blue_chip_holders_ratio, "justify-center"];
  } else if (key === "blue_chip_holding") {
    return [i18n.home.topList.blue_chip_holding, "justify-center"];
  } else if (key === "blue_chip_holding_ratio") {
    return [i18n.home.topList.blue_chip_holding_ratio, "justify-center"];
  }
  return [i18n.home.topList.noData, "justify-center"];
};
// 得到td数据
export const getData = (key: string, data: any) => {
  let value: any;
  if (key === "chains") {
    value = data.chain;
  } else if (key === "tge_platform") {
    value = data.platform;
  } else if (key === "categories") {
    value = data.category;
  } else if (key === "ido_sale_amount") {
    value = [data.ido_sale_amount, data.ido_symbol];
  } else if (key === "users_24h") {
    value = [data.users_24h, data.users_change_percent_24h];
  } else if (key === "users_7d") {
    value = [data.users_7d, data.users_change_percent_7d];
  } else if (key === "tvl") {
    value = [data.tvl, data.tvl_change_percent_24h];
  } else {
    value = data[key];
  }
  return value || "";
};
const chainIcon = ["chains"]; // icon类
const iconHref = ["tge_platform"]; // icon + href
const starNumber = ["overall_score"]; // 星星 + number
const txt = ["categories"]; // txt
const numberPrice = [
  "current_price",
  "ido_price",
  "balance_24h",
  "balance_7d",
  "ido_fundraising_goal", // Total Raised
]; // $number
//dapp $+数字 ｜ nft icon+数字
const dappNftMix = [
  "volume_24h",
  "volume_7d",
  "mcap", // MarketCap-
];
const chainNumber = [
  "floor_price", // Floor price
  "mint_price", // Mint price
]; // chain + number

const numberUnit = ["ido_sale_amount"]; // number + 单位 --- Tokens for Sale    ido_symbol
const numbers = ["owners", "assets", "mcap_tvl", "whales_num", "whales_holding", "bule_chip_holders", "blue_chip_holding"]; // -- Owners Assets MCap/TVL
const numberChange = ["users_24h", "users_7d", "tvl"]; // User/Change   TVL/Change
const lever = ["ath_since_ido", "current_roi_usd"]; // number + x  ATH Since IDO   Current ROI USD
const timeType = ["ido_end_at", "mint_start_at"]; // time
const changePercent = ["volume_change_percent_24h", "volume_change_percent_7d", "whales_ratio", "whale_num_change_24h", "whale_holding_ratio", "blue_chip_holders_change_24h", "blue_chip_holders_ratio", "blue_chip_holding_ratio"];

export const getDom = (name: string) => {
  if (chainIcon.includes(name)) {
    return "chainIcon";
  } else if (iconHref.includes(name)) {
    return "iconHref";
  } else if (starNumber.includes(name)) {
    return "starNumber";
  } else if (txt.includes(name)) {
    return "txt";
  } else if (numberPrice.includes(name)) {
    return "numberPrice";
  } else if (dappNftMix.includes(name)) {
    return "dappNftMix";
  } else if (chainNumber.includes(name)) {
    return "chainNumber";
  } else if (numberUnit.includes(name)) {
    return "numberUnit";
  } else if (numbers.includes(name)) {
    return "numbers";
  } else if (numberChange.includes(name)) {
    return "numberChange";
  } else if (lever.includes(name)) {
    return "lever";
  } else if (timeType.includes(name)) {
    return "timeType";
  } else if (changePercent.includes(name)) {
    return "changePercent";
  } else {
    return "";
  }
};

export class Model extends API {
  getSummary() {
    // @ts-ignore
    return this.home.getSummary<summaryModel>();
  }

  // topic table切换
  getTopicRank(category: string) {
    return this.home.getTopicRank(category);
  }

  // 推荐话题
  getRecommend(params: recommendModel) {
    return this.home.getRecommend(params);
  }

  // 今日趋势
  getTrend() {
    return this.home.getTrend();
  }

  // 话题项目top3
  getTop3<T>(id: string) {
    return this.home.getTop3<T>(id);
  }

  // 话题详情
  getDetail(id: string) {
    return this.home.getDetail(id);
  }

  getProjects(params: projectParams) {
    return this.home.getProjects(params);
  }

  // TGE平台列表
  getPlatform() {
    return this.home.getPlatform();
  }
  //ad列表
  getAdList(position: number) {
    return this.home.getAdList(position);
  }
  //Tutorial列表
  getTutorialList(query: tutorialParams) {
    return this.home.getTutorialList<tutorialData[]>(query);
  }
  // 投融资项目
  getProjectsList(query: FundsQuery) {
    return this.dApp.getProjectsList(query);
  }
  //投融资机构
  getFundsList(query: FundsQuery) {
    return this.dApp.getFundsList(query);
  }
  //矿池币种列表
  getApyList(query: ApyQuery) {
    return this.home.getApyList(query);
  }
  //热门项目列表
  getHotProject() {
    return this.home.getHotProject();
  }
  //得到大户地址图表
  getLineChart(query: lineModel) {
    return this.home.getLineChart(query);
  }
  //大户历史交易
  getHistory(query: infoModel) {
    return this.home.getHistory(query);
  }
}
