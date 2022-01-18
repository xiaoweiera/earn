/**
 * @file Ali iconFont
 * @author svon.me@gmail.com
 */

import {Equals, isEmpty} from "src/utils";
import {iconData} from "src/config/iconname";

const brights = {
	'discard': 'icon-discord', // 错误名字，不建议使用
	'discord': 'icon-discord',
	'telegram': 'icon-telegram-bright',
	'twitter': 'icon-twitter-bright',
	'wechat': 'icon-wechat-1',

	'key': 'icon-yuechi',
	'join': 'icon-join1',
	'safe': 'icon-safe-1'
}

const aliasConfig = {
	// 简化
	'weibo': 'icon-weibo1',
	'facebook': 'icon-facebook-circle-fill',
	'mobile': 'icon-shouji',
	'phone': 'icon-shouji',
	'medium': 'icon-medium1',
	'discard': 'icon-discord1',
	'discord': 'icon-discord1',
	// 链
	'OEC': 'icon-OK',
	'POS': 'icon-POS',
	'POLYGON': 'icon-POS',
	'Polygon': 'icon-POS',
	'all': 'icon-quanbuno-copy',
	'Ethereum': 'icon-ETH',


	// 'Optimism':'icon-weizhi',
	//chain logo
	'BSCYuan': 'icon-BSCYuan',
	'HECOYuan': 'icon-HECOYuan',
	'ETHYuan': 'icon-ETHYuan',
	'OECYuan': 'icon-OECYuan',
	'POSYuan': 'icon-PolygonYuan',
	'POLYGONYuan': 'icon-PolygonYuan',
	'PolygonYuan': 'icon-PolygonYuan',
	'allYuan': 'icon-quanbunoYuan',
	'EthereumYuan': 'icon-ETHYuan',
	'xDaiYuan': 'icon-xDaiYuan',
	'FantomYuan': 'icon-fantomYuan',
	'AvalancheYuan': 'icon-AvalancheYuan',
	'ArbitrumYuan': 'icon-ArbitrumYuan',
	'CeloYuan': 'icon-CeloYuan',
	'CELOYuan': 'icon-CeloYuan',
	'MoonriverYuan': 'icon-MoonriverYuan',
	'CronosYuan': 'icon-CronosYuan',


	// 项目类型
	'Staking': 'icon-S',
	'Farm': 'icon-F',
	'Lending': 'icon-L',
	'Supply': 'icon-S',
	'Borrow': 'icon-B',
	'Deposit': 'icon-D',
	'Liquidity': 'icon-L',

	'Boardroom': 'icon-B',
	'Syrup': 'icon-S',
	'Vault': 'icon-V',
}

const getIconFontName = function (value: string, bright?: boolean): string {
	// 从缓存中获取 icon 名称
	if (value && !bright) {
		const name = value.toLocaleLowerCase();
		//@ts-ignore
		if (iconData[name]) {
			//@ts-ignore
			return iconData[name];
		}
		const key = `icon-${name}`;
		//@ts-ignore
		if (iconData[key]) {
			//@ts-ignore
			return iconData[key];
		}
	}
	return '';
}

const getAlias = function (value: string, bright?: boolean): string {
	if (value) {
		let link: string = '';
		// 获取 icon 名称
		link = getIconFontName(value, bright);
		if (link) {
			return link;
		}
		if (bright) {
			for (const name in brights) {
				if (Equals(name, value)) {
					// @ts-ignore
					link = brights[name]
					break
				}
			}
		}
		if (isEmpty(link)) {
			link = value
			for (const name in aliasConfig) {
				if (Equals(name, value)) {
					// @ts-ignore
					link = aliasConfig[name]
					break
				}
			}
		}
		return link;
	}
	return 'icon-morentoken';
}
//得到圆形有背景色的logo
export const getLogo = (key: string) => {
	//@ts-ignore
	if (aliasConfig[key + 'Yuan']) {
		return key + 'Yuan'
	}
	// return 'icon-weizhi'
	return ''
}

export {aliasConfig, getAlias}
