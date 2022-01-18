/**
 * @file 项目库导航
 */

import I18n from "src/utils/i18n";
import {dashboard} from "src/config";
import {MenuItem} from "src/types/menu";
import {config} from "src/router/config";

export const name = {
	dapp: "new_dapp",
	nft: "new_nft",
	gamefi: "new_gamefi",
	airdrop: "airdrop"
}

export const DApp: MenuItem = {
	name: I18n.menu.dapp.title, // dApp
	href: dashboard,
	expand: 'HeaderSubDapp', // 二级导航末尾自定义组件名称
	newTip: true,
	children: [
		{
			id: name.dapp, // id
			name: I18n.menu.dapp.discover,
			href: `${config.dapp}/discover`,
			header: true,
			more: true,
			icon: 'icon-defi',
		}, {
			id: name.nft,
			name: I18n.menu.nft.discover,
			icon: 'icon-a-NFTxinxiangmu',
			more: true,
			header: true,
			href: `${config.nft}/discover`,
		},
		{
			id: name.gamefi,
			name: I18n.menu.dapp.gamefi,
			header: true,
			more: true,
			icon: 'icon-defi',
			href: `${config.dapp}/discover?category=gamefi`,
		},
		{
			id: name.airdrop,
			name: I18n.menu.airdrop.title, // 最新空投
			icon: 'icon-a-NFTxinxiangmu',
			more: true,
			header: true,
			href: config.airdrop,
		},
	]
};
