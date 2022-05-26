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
  homeDetail: "/subject",
  topic: "/topic",
  growthpad: "/growthpad",
  apy: "/apy",
  apyLoan: "/apy/loan",
  apyMining: "/apy/mining",
  apyProject: "/apy/project",
  apyToken: "/apy/token",
  apyLp: "/apy/lp",
  apyHeco: "/apy/heco",
  liquidity: "/liquidity",
  bull: "https://kingdata.com/bull", // 板块龙头
  nav: "https://kingdata.com/nav", // 数据网站导航
  tih: "https://kingdata.com/tih", // 历史的今天
  // reports: `https://kingdata.com/reports/`, // 研究报告
  blog: "/blog", // 研究报告 (博客)
  // news: 'https://kingdata.com/news/', // 7x24小时监控

  // 排行榜
  rankDapp: "/rank/dapp",
  rankGame: "/rank/game",
  rankDefi: "/rank/defi",
  rankNft: "/rank/nft",

  // 新项目
  dappApply: "/dapp/apply",

  dapp: "/dapp/ido",
  dappList: "/dapp/ido",
  ido: "/dapp/ido",
  igo: "/dapp/igo",
  nft: "/dapp/nft",
  nftList: "/dapp/nft",
  airdrop: "/dapp/airdrops", // 最新空投

  // 大户地址
  address: "/whaleaddress",
  addressAlerts: "/whaleaddress/alerts",
  addressFind: "/whaleaddress/find",
  portfolio: "/portfolio",
  download: "/download",
  invest: "/invest", //投融资
  investDetail: "/invest/detail", //投融资详情
  funds: "/funds",
  agreement: "/agreement",

  news: "/signals", // 7x24小时监控, 指标异动
  quota: "/indicators", // 指标监控

  instructions: "/instructions",
  policy: "/policy",
  E404: "/404",
  api: "/w-api",
  token: "/token",
  user,
};
