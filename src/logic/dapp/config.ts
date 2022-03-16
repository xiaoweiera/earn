/**
 * @file 列表头部数据
 * @author zhangkun@163.com
 */

import I18n from "src/utils/i18n";

//nft完成列表头部数据
export const nftHeader = function () {
  const i18n = I18n();
  return [
    {
      name: i18n.home.endProject.projectName,
      key: "name",
      sort: false,
      width: "min-w-80.5",
    },
    {
      name: i18n.home.topList.category,
      key: "category",
      sort: false,
      width: "w-27.5",
    },
    {
      name: i18n.home.topList.owner,
      key: "owners",
      sort: true,
      width: "w-27.5",
    },
    {
      name: i18n.home.topList.supply,
      key: "issue_volume",
      sort: true,
      width: "w-27.5",
    },
    {
      name: i18n.home.topList.floorPrice,
      key: "floor_price",
      sort: true,
      width: "w-27.5",
    },
    {
      name: i18n.home.topList.mintPrice,
      key: "mint_price",
      sort: true,
      width: "w-27.5",
    },
    {
      name: i18n.home.topList.chain,
      key: "chain",
      sort: false,
      width: "w-27.5",
    },
    {
      name: i18n.home.topList.rate,
      key: "overall_score",
      sort: true,
      width: "w-27.5",
    },
  ];
};
//ido完成列表头部

export const IdoHeader = function () {
  const i18n = I18n();
  return [
    { name: i18n.home.endProject.projectName, key: "name", sort: false, width: "w-50" }, // nameProject
    { name: i18n.home.topList.category, key: "category", sort: false, width: "w-40" },
    { name: i18n.home.idoIgoProject.totalRaised, key: "ido_fundraising_goal", sort: true, width: "w-27.5" },
    { name: i18n.home.topList.salePrice, key: "ido_price", sort: true, width: "w-27.5" },
    { name: i18n.home.topList.currentPrice, key: "current_price", sort: true, width: "w-27.5" },
    { name: i18n.home.topList.nowCurrent, key: "current_roi_usd", sort: true, width: "w-27.5" },
    { name: i18n.home.topList.idoAth, key: "ath_since_ido", sort: true, width: "w-27.5" },
    // { name: i18n.home.topList.chain, key: 'chain' },
    { name: i18n.home.topList.plat, key: "tge_platform", sort: false, width: "w-25" },
    { name: i18n.home.topList.rate, key: "overall_score", sort: true, width: "w-15" },
  ];
};
