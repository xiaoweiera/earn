/**
 * @file 页面底部配置
 * @author svon.me@gmail.com
 */

import I18n from "src/utils/i18n";
import {config} from "src/router/config";

console.log("footer - ", I18n.common.site.name);

export interface Footer {
	label?: string;
	name?: string;
	href?: string;
	children?: Footer[];
	[key: string]: any;
}

export const footers: Footer[] = [
	{
		label: 'Dapp',
		children: [
			{
				name: I18n.menu.dapp.ranking,
				href: `${config.dapp}/rank`
			}, {
				name: I18n.menu.nft.ranking,
				href: `${config.nft}/rank`
			}, {
				name: I18n.menu.dapp.discover,
				href: `${config.dapp}/discover`
			}, {
				name: I18n.menu.nft.discover,
				href: `${config.nft}/discover`
			}, {
				name: I18n.menu.airdrop.title,
				href: config.airdrop
			},
		]
	},
	{
		label: 'DeFi',
		children: [
			{
				name: I18n.menu.apy.mining,
				href: `${config.apy}/mining`,
			},
			{
				name: I18n.menu.apy.loan,
				href: `${config.apy}/loan`,
			},
			{
				name: I18n.menu.apy.project,
				href: `${config.apy}/project`,
			},
			{
				name: I18n.menu.apy.token,
				href: config.apyToken,
			},
			{
				name: I18n.menu.apy.heco,
				href: `${config.apy}/heco`,
			},
			{
				name: I18n.menu.address.find,
				href: `${config.address}/find`,
			},
			// , {
			//   name: I18n.nav.defi.liquidity.name, // 'DEX 聪明钱'
			//   href: config.liquidity,
			// }
		]
	},
	{
		label: I18n.nav.analysis.name, // '数据'
		children: [
			{
				name: I18n.menu.data.topic, // 数据报表
				href: config.topic,
			},
			{
				name: I18n.menu.data.quota, // 数据监控
				href: config.quota,
			},
			{
				name: I18n.menu.data.news, // 数据监控
				href: config.news,
			},
			{
				name: I18n.menu.blog.blog, // 博客
				href: config.blog,
			}
		]
	},
	{
		label: I18n.menu.footer.tool,
		children: [
			{name: I18n.nav.dataTools.nav.name, href: config.nav, blank: false},
			// 历史的今天
			// { name: I18n.nav.dataTools.history.name, href: config.tih, blank: false },
			// 板块龙头
			// { name: I18n.nav.dataTools.top.name, href: config.bull, blank: false },
			{name: I18n.menu.footer.help, href: I18n.menu.footer.helpLink, blank: true},
		]
	},
	{
		label: I18n.menu.service.title,
		children: [
			// {
			//   name: I18n.menu.service.growthPad,
			//   href: 'http://ikingdata.mikecrm.com/kbZDdCb'
			// },
			{
				name: I18n.menu.service.deFiApply,
				href: 'https://forms.gle/etPqVfukdwSLXwov8'
			},
			{
				name: I18n.menu.service.news,
				// qrcode: 'https://u.wechat.com/MAbomlcLpQlWPJTAdyhgEPo',
				href: I18n.chat.telegram,
				desc: I18n.menu.hover.wechat,
				blank: true,
			},
			{
				name: I18n.menu.service.newApply,
				// qrcode: 'https://u.wechat.com/MAbomlcLpQlWPJTAdyhgEPo',
				// href: I18n.chat.telegram,
				href: config.dappApply,
				desc: I18n.menu.hover.wechat,
				blank: true,
			},
			// {
			//   name: I18n.menu.service.topic,
			//   // href: 'https://jinshuju.net/f/ZjRZdR'
			//   href: 'https://forms.gle/pYzQumjuu2GazChv8',
			//   blank: true,
			// },
			{
				name: I18n.menu.service.businessCooperation,
				href: 'https://t.me/sue8639313',
				icon: "icon-telegram",
				value: "@sue8639313",
				blank: true
			}
		]
	}
];

