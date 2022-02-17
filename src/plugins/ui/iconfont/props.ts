/**
 * @file 参数定义
 * @author svon.me@gmail.com
 */

import { PropType } from "vue";

export enum Suffix {
	svg = 'svg',
	gif = 'gif',
	jpg = 'jpg',
	png = 'png'
}

interface Size {
	[key: string]: number
}

export const sizes: Size = {
	'4xl': 42,
	'3xl': 32,
	'2xl': 24,
	'xl': 20,
	'base': 16,
	'xs': 12,
	'mini': 10
}

export const props = {
	// 图标名称 / 图片链接地址
	type: {
		type: String,
		required: true,
	},
	// 图标大小
	size: {
		type: [String, Number],
		default: () => 16
	},
	// 如果图标不是字体图标时可以指定图片后缀（type 为非链接时可用）
	suffix: {
		type: String as PropType<Suffix>,
		default: () => Suffix.svg,
	},
	// 是否圆角
	rounded: {
		type: Boolean,
		default: () => false
	},
	// 是否需要边框
	border: {
		type: Boolean,
		default: () => false
	},
	// 是否使用彩色图表，部分图标支持
	bright: {
		type: Boolean,
		default: () => false
	},
	class: {
		type: String,
	}
}


