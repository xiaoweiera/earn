/**
 * @file window 对象
 * @author svon.me@gmail.com
 */

import { IsSSR } from "src/config/ssr";

interface Root {
	[key: string]: any;
}

let root: Root = {};

if (IsSSR()) {
	root = {
		open: function() {
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
			replace: function() {
			},
			reload: function() {
			}
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
		scrollTo: function() {
		}
	}
} else {
	try {
		root = window;
	} catch (e) {

	}
}

export default root;
