/**
 * @file window 对象
 * @author svon.me@gmail.com
 */

import { IsSSR } from "src/config/ssr";

interface Document {
	[key: string]: any;
}

let doc: Document = {};

if (IsSSR()) {
	doc = {
		documentElement: {
			clientHeight: 600,
			clientWidth: 1200,
			scrollTop: 0
		},
		scrollingElement: {
			scrollTop: 0
		},
		body: {
			scrollTop: 0,
			appendChild: function() {},
			removeChild: function() {}
		},
		execCommand: function() {},
		querySelector: function() {
		},
		createElement: function() {
		}
	}
} else {
	try {
		doc = document;
	} catch (e) {

	}
}

export default doc;
