/**
 * @file 项目库
 * @author svon.me@gmail.com
 */

 import I18n from "src/utils/i18n";
 import { config } from "src/router/config";

 const i18n = I18n();
// export enum ProjectGroup {
// 	online = 'online', // 待上线
// 	history = 'history', // 历史项目
// 	recommend = 'recommend' // 运营推荐
// }

export interface Query {
	page?: number,
	page_size?: number,
	type: TabTypes,
	sort_field?: string,
	sort_type?: string,
	is_nft?: boolean,
	query?: string,
	chain?: string,
}

// tab 切换
export enum TabTypes {
	upcoming = 'upcoming', // 即将开始
	ongoing = 'ongoing', // 进行中
	ended = 'ended', // 已结束
}
export interface TabItem {
	id: TabTypes;
	name: string;
	icon?: string;
	href: string;
}
export const tabs: TabItem[] = [ 
  {
    id: TabTypes.upcoming,
    icon: '',
    name: i18n.airdrop.tabs.upcoming,
    href: `${config.dappList}?type=${TabTypes.upcoming}`,
  },{
		id: TabTypes.ongoing,
		icon: '',
		name: i18n.airdrop.tabs.ongoing,
		href: `${config.dappList}?type=${TabTypes.ongoing}`,
	}, {
		id: TabTypes.ended,
		icon: '',
		name: i18n.growthpad.status.closure,
		href: `${config.dappList}?type=${TabTypes.ended}`,
	}
]
// nft tab 切换
export enum NftTabTypes {
	upcoming = 'upcoming', // 即将开始
	history = 'history', // 已结束
}
export interface NftTabItem {
	id: NftTabTypes;
	name: string;
	icon?: string;
	href: string;
}
// nft分类切换
export const nftTabs: NftTabItem[] = [ 
  {
    id: NftTabTypes.upcoming,
    icon: '',
    name: i18n.dapp.sort.online,
    href: `${config.nft}?type=${NftTabTypes.upcoming}`,
  },{
		id: NftTabTypes.history,
		icon: '',
		name: i18n.dapp.sort.history,
		href: `${config.nft}?type=${NftTabTypes.history}`,
	}
]
