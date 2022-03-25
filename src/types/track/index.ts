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
  blog: "show_research", // 博客列表
  quota: {
    signals: "show_signals", // 指标列表
  },
  // 项目库
  dApp: {
    ido: "show_ido", // DApp ido
    igo: "show_igo", // DApp igo
    nft: "show_nfts", // DApp nft
    airdrop: "show_airdrops", // DApp airdrop
  },
  // 排行榜
  rank: {
    nft: "show_nftrankings", // Rank nft
    defi: "show_defirankings", // Rank defi
    game: "show_gamefirankings", // Rank game
    dapp: "show_dapprankings", // Rank DApp
  },
};
