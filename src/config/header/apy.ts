/**
 * @file APY
 */

import I18n from "src/utils/i18n";
import {MenuItem} from "src/types/menu";
import {config} from "src/router/config";

export const name = {
	mining: 'apy-mining',
	loan: 'apy-loan',
	project: 'apy-project',
	token: 'apy-token',
	heco: 'apy-heco'
};

export const APY: MenuItem = {
	// apy // DeFi & APY
	name: "DeFi APY",
	href: `${config.apy}/mining`,
	expand: 'HeaderSubApy',
	children: [
		{
			id: name.mining,
			name: I18n.menu.apy.mining, // '挖矿 APY',
			href: `${config.apy}/mining`,
			icon: 'icon-apy',
			more: true,
			header: true
		}, {
			id: name.loan,
			name: I18n.menu.apy.loan,// '借贷 APR',
			href: `${config.apy}/loan`,
			icon: 'icon-APR',
			more: true,
			header: true
		}, {
			id: name.project,
			name: I18n.menu.apy.project, // '项目 APY 分析'
			href: `${config.apy}/project`,
			icon: 'icon-xiangmu',
			more: true,
			header: true
		}, {
			id: name.token,
			name: I18n.menu.apy.token, // '币种 APY 分析'
			href: `${config.apy}/token`,
			icon: 'icon-bizhong',
			more: true,
			header: true,
		}, {
			id: name.heco,
			name: I18n.menu.apy.heco, // 'HECO 节点 APY'
			href: `${config.apy}/heco`,
			icon: 'icon-heco',
			more: true,
			header: true
		},
	]
};
