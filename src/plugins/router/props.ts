/**
 * @file 参数定义
 * @author svon.me@gmail.com
 */

export const props = {
	name: {
		type: String,
		default: () => 'a'
	},
	href: {
		type: [String, Object]
	},
	target: {
		type: String,
		default: '_self'
	},
	login: {
		type: Boolean,
		default: () => false
	}
}


