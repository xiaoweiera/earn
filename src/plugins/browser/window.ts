/**
 * @file window 对象
 * @author svon.me@gmail.com
 */

import { IsSSR } from "src/config/";

let root: any = {};

if (IsSSR()) {
	root = {
		open: function() {
			return void 0
		},
		screen: {
			width: 1200
		},
		innerHeight: 600,
		location: {
			href: 'https://kingdata.com/',
			pathname: '/',
			hostname: 'kingdata.com',
			origin: 'https://kingdata.com',
			search: '',
			replace: () => null,
			reload: () => null
		},
		navigator: {
			userAgent: ""
		},
		btoa: function(value: any) {
			return value
		},
		performance: {
			now: function() {
				return Date.now()
			}
		},
		scrollTo: () => null
	}
} else {
	try {
		root = window;
	} catch (e) {

	}
}

export default root;
