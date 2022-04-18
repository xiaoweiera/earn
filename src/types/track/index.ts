/**
 * @file 统计相关
 * @author svon.me@gmail.com
 */

// 统计源
export enum Origin {
  gio = "gio",
}

// 埋点事件名称
export const event = {
  home: "show_kingdata", // 首页
  blog: {
    list: "show_research", // 博客列表
    detail: "blog_detail_show", // 博客详情
  },
  quota: {
    indicator: "show_indicator", // 指标推荐
    signals: "show_signal", // 指标列表
  },
  // 项目库
  dApp: {
    ido: "show_ido", // DApp ido
    igo: "show_igo", // DApp igo
    nft: "show_nfts", // DApp nft
    airdrop: "show_airdrops", // DApp airdrop
    invest: "show_invest", // DApp funds
    nftDetail: "nft_detail_show", // nft 详情
    dappDetail: "dapp_detail_show", // dapp 详情
  },
  // 排行榜
  rank: {
    nft: "show_nftrankings", // Rank nft
    defi: "show_defirankings", // Rank defi
    game: "show_gamefirankings", // Rank game
    dapp: "show_dapprankings", // Rank DApp
  },
  subject: {
    detail: "subject_detail_show", // 榜单详情
  },
  topic: {
    list: "show_data", // 数据图表展示
  },
};
