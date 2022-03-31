import I18n from "src/utils/i18n";
const i18n = I18n();
export enum chainPage {
  dapp_new = "dapp_new",
  dapp_rank = "dapp_rank",
  nft_new = "nft_new",
  nft_rank = "nft_rank",
}
export enum GroupPosition {
  dappNew = "dapp_new",
  nftNew = "nft_new",
  dappRank = "dapp_rank",
  nftRank = "nft_rank",
}
export const dappHeader = [
  { key: "order", name: i18n.dapp.rank.table.order, width: "w-10", class: "", sort: false },
  { key: "name", name: i18n.dapp.rank.table.name, width: "w-50", class: "", sort: false },
  { key: "categories", name: i18n.dapp.rank.table.type, width: "w-25", class: " justify-center", sort: false },
  { key: "chains", name: i18n.dapp.rank.table.chain, width: "w-20", class: " justify-center", sort: false },
  { key: "users", name: i18n.dapp.rank.table.user, width: "flex-1", class: " justify-center", sort: true },
  { key: "user_change_percent", name: i18n.dapp.rank.table.revenue, width: "flex-1", class: " justify-end ", sort: true },
  { key: "balance", name: i18n.dapp.rank.table.balance, width: "flex-1", class: " justify-end", sort: true },
  { key: "volume", name: i18n.dapp.rank.table.volume, width: "flex-1", class: " justify-end", sort: true },
  { key: "marketcap", name: i18n.dapp.rank.table.marketcap, width: "flex-1", class: " justify-end", sort: true },
  { key: "tvl", name: i18n.dapp.rank.table.tvl, width: "flex-1", class: " justify-end", sort: true },
  { key: "mcap_tvl", name: i18n.dapp.rank.table.mcap, width: "flex-1", class: " justify-end", sort: true },
];
export const dappHeaderMobile = [
  { key: "order", name: i18n.dapp.rank.table.order, width: "w-10", class: "", sort: false },
  { key: "name", name: i18n.dapp.rank.table.name, width: "w-50", class: "", sort: false },
  { key: "users", name: i18n.dapp.rank.table.user, width: "flex-1", class: " justify-center", sort: true },
  { key: "user_change_percent", name: i18n.dapp.rank.table.revenue, width: "flex-1", class: " justify-end", sort: true },
  { key: "balance", name: i18n.dapp.rank.table.balance, width: "flex-1", class: " justify-center", sort: true },
  { key: "volume", name: i18n.dapp.rank.table.volume, width: "flex-1", class: " justify-center", sort: true },
  { key: "tvl", name: i18n.dapp.rank.table.tvl, width: "flex-1", class: "  justify-center", sort: true },
  { key: "mcap_tvl", name: i18n.dapp.rank.table.mcap, width: "flex-1", class: " justify-center", sort: true },
  { key: "marketcap", name: i18n.dapp.rank.table.marketcap, width: "flex-1", class: " justify-center", sort: true },
  { key: "categories", name: i18n.dapp.rank.table.type, width: "w-25", class: " justify-center", sort: false },
  { key: "chains", name: i18n.dapp.rank.table.chain, width: "w-20", class: " justify-center", sort: false },
];

export const nftHeader = [
  { key: "order", name: i18n.nft.rank.table.order, width: "w-10 ", class: "", sort: false },
  { key: "name", name: i18n.nft.rank.table.name, width: "w-80", class: "", sort: false },
  { key: "categories", name: i18n.nft.rank.table.type, width: "w-25", class: " justify-center ", sort: false },
  { key: "volume", name: "Volume", width: "flex-1", class: " justify-end ", sort: true },
  { key: "h24_volume_change_percent", name: "24H", width: "flex-1", class: " justify-end ", sort: true },
  { key: "d7_volume_change_percent", name: "7D", width: "flex-1", class: " justify-end ", sort: true },
  { key: "owners", name: "Owners", width: "flex-1", class: " justify-end ", sort: true },
  { key: "assets", name: "Assets", width: "flex-1", class: " justify-end ", sort: true },
  { key: "floor_price", name: "Floor Price", width: "flex-1", class: " justify-end ", sort: true },
  { key: "mcap", name: "MCap", width: "flex-1", class: " justify-end ", sort: true },
];
export const nftHeaderMobile = [
  { key: "order", name: i18n.nft.rank.table.order, width: "w-10", class: " ", sort: false },
  { key: "name", name: i18n.nft.rank.table.name, width: "w-80", class: " ", sort: false },
  { key: "volume", name: "Volume", width: "flex-1", class: " justify-end ", sort: true },
  { key: "h24_volume_change_percent", name: "24H", width: "flex-1", class: " justify-end ", sort: true },
  { key: "d7_volume_change_percent", name: "7D", width: "flex-1", class: " justify-end ", sort: true },
  { key: "owners", name: "Owners", width: "flex-1", class: " justify-end ", sort: true },
  { key: "assets", name: "Assets", width: "flex-1", class: " justify-end ", sort: true },
  { key: "floor_price", name: "Floor Price", width: "flex-1", class: " justify-end ", sort: true },
  { key: "mcap", name: "MCap", width: "flex-1", class: " justify-end ", sort: true },
  { key: "categories", name: i18n.nft.rank.table.type, width: "w-25", class: " justify-center ", sort: false },
];
