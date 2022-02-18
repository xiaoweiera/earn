/**
 * @file window 对象
 * @author svon.me@gmail.com
 */

import {getEnv} from "src/config";
import {IsSSR} from "src/config/ssr";

interface Root {
	[key: string]: any;
}

let root: Root = {};

if (IsSSR()) {
	const env = getEnv();
	root = {
		open: function () {
		},
		screen: {
			width: 1200
		},
		innerHeight: 600,
		location: {
			href: env.home,
			pathname: '/',
			hostname: env.VITE_cookie,
			origin: env.VITE_domain,
			search: '',
			replace: function () {
			},
			reload: function () {
			}
		},
		navigator: {
			userAgent: ""
		},
		btoa: function (value: any) {
			return value
		},
		performance: {
			now: function () {
				return Date.now()
			}
		},
		scrollTo: function () {
		},
		grecaptcha: {
			execute: async function (...args: any[]) {
			},
			ready: async function (...args: any[]) {

			}
		}
	}
} else {
	try {
		root = window;
	} catch (e) {

	}
}

export default root;
