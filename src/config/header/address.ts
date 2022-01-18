import I18n from "src/utils/i18n";
import {config} from "src/router/config";
import {MenuItem} from "src/types/menu";

export const name = {
	alert: 'address-alert',
	find: 'address-find',
	portfolio: 'address-portfolio',
}

export const Address: MenuItem = {
	name: I18n.menu.address.address, // 大户地址追踪
	href: config.address,
	newTip: false,
	children: [
		{
			id: name.alert,
			name: I18n.menu.address.change,
			header: true,
			more: true,
			icon: 'icon-yidong',
			href: `${config.address}/alerts`,
		}, {
			id: name.find,
			name: I18n.menu.address.find,
			icon: 'icon-faxian',
			more: true,
			header: true,
			href: `${config.address}/find`,
		},
	]
};

export const Portfolio: MenuItem = {
	id: name.portfolio,
	name: I18n.menu.address.detail, // 投资组合
	href: config.portfolio,
	newTip: false,
	expand: 'HeaderAddressChange',
}
