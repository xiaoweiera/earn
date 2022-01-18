/**
 * @file 排行榜
 */

import I18n from "src/utils/i18n";
import {MenuItem} from "src/types/menu";
import {config} from "src/router/config";

export const name = {
	dapp: "rank-dapp",
	nft: "rank-nft",
	gamefi: "rank-game",
	defi: "rank-defi",
}

export const Ranks: MenuItem = {
	name: I18n.menu.nft.title, // 排行榜
	href: `${config.dapp}/rank`,
	expand: 'HeaderSubDapp',
	children: [
		{
			id: name.dapp,
			name: I18n.menu.dapp.ranking,
			header: true,
			more: true,
			icon: 'icon-paihang',
			href: `${config.dapp}/rank`,
		}, {
			id: name.gamefi,
			name: I18n.menu.dapp.game,
			header: true,
			more: true,
			icon: 'icon-paihang',
			href: `${config.dapp}/rank?category=game`,
		}, {
			id: name.defi,
			name: I18n.menu.dapp.defi,
			header: true,
			more: true,
			icon: 'icon-paihang',
			href: `${config.dapp}/rank?category=defi`,
		}, {
			id: name.nft,
			name: I18n.menu.nft.ranking,
			header: true,
			more: true,
			icon: 'icon-a-NFTpaihang',
			href: `${config.nft}/rank`,
		},
	]
};

