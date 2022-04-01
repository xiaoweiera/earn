import { dashboard } from "src/config/";

const user = {
  index: "/account",
  login: "/account/login", // 登录
  logout: "/account/logout", // 退出
  register: "/account/register", // 注册
  forget: "/account/forget", // 找回密码
  updateEmail: "/account/update/email", // 修改邮箱
};

export const config = {
  dashboard,
  home: dashboard,
  homeDetail: "/subject/detail",
  topic: "/topic",
  growthpad: "/growthpad",
  apy: "/apy",
  apyToken: "/apy/token",
  apyLp: "/apy/lp",
  liquidity: "/liquidity",
  bull: "https://kingdata.com/bull", // 板块龙头
  nav: "https://kingdata.com/nav", // 数据网站导航
  tih: "https://kingdata.com/tih", // 历史的今天
  // reports: `https://kingdata.com/reports/`, // 研究报告
  blog: "/blog", // 研究报告 (博客)
  // news: 'https://kingdata.com/news/', // 7x24小时监控
  news: "/signals", // 7x24小时监控, 指标异动

  dapp: "/dapp",
  dappList: "/dapp/discover",
  dappApply: "/dapp/apply",
  nft: "/nft",
  nftList: "/nft/discover",
  quota: "/indicators", // 指标监控
  airdrop: "/airdrops", // 最新空投
  address: "/whaleaddress",
  portfolio: "/portfolio",
  download: "/download",
  invest: "/invest", //投融资
  investDetail: "/invest/detail", //投融资详情
  E404: "/404",

  user,
};
