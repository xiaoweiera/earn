/**
 * @file 常用方法
 * @author svon.me@gmail.com
 */

import _, {size, compact, flatten} from "lodash";
// @ts-ignore
import { v1 as uuidV1, v4 as uuidV4, v5 as uuidV5 } from "uuid";
import { isString, isArray } from "./check/is";
export * from "./check/is";
export * from "./convert/to";
export * from "./time/index";

export { size, compact, flatten };

// 生成唯一ID
export const uuid = function(value?: any): string {
	function create(): string {
		if (value) {
			if (isString(value)) {
				return uuidV5(value, uuidV5.URL);
			}
			const text = JSON.stringify({ value });
			return uuidV5(text, uuidV5.URL);
		}
		if (Math.random() > 0.5) {
			return uuidV1();
		}
		return uuidV4();
	}
	const text = create();
	return text.replace(/-/g, '');
}


export const Equals = function (...args: Array<string | number>): boolean {
	const len = args.length;
	let status = false;
	for (let i = 1; i < len && len > 1; i++) {
		const value1 = _.trim(`${args[i - 1]}`);
		const value2 = _.trim(`${args[i]}`);
		if (value1 === value2) {
			status = true;
		} else {
			status = false;
			break;
		}
	}
	return status;
}

export const max = function(...args: any[]): number {
	const list = compact(flatten(args))
	if (list.length > 0) {
		let value: number = list[0]
		for(const item of list) {
			if (item > value) {
				value = item
			}
		}
		return value
	}
	// @ts-ignore
	return void 0
}

export const min = function(...args: any[]): number {
	const list = compact(flatten(args))
	if (list.length > 0) {
		let value: number = list[0]
		for(const item of list) {
			if (item < value) {
				value = item
			}
		}
		return value
	}
	// @ts-ignore
	return void 0
}

/**
 * 循环
 */
 export const forEach = function(callback: any, data: any) {
	if (callback && data) {
		if (isArray(data)) {
			data.forEach(function(value: any, index: number) {
				callback(value, index, data)
			})
		} else {
			const keys = Object.keys(data)
			keys.forEach(function(key: string) {
				// @ts-ignore
				const value = data[key]
				callback(value, key, data)
			})
		}
	}
}

export class Encryption {
	private text: string = "";
	private $1: number = 4; // 开头保留几位
	private $2: number = 4; // 结尾保留几位
	private replace: string = "."; // 用什么字符替换
	private replaceCount: number = 4; // 替换的字符保留几位
	constructor(value: string) {
		this.text = value;
	}
	set$1Count (value: number) {
		this.$1 = value;
		return this;
	}
	set$2Count (value: number) {
		this.$2 = value;
		return this;
	}
	setReplace (value: string) {
		this.replace = value;
		return this;
	}
	setReplaceCount (value: number) {
		this.replaceCount = value;
		return this;
	}
	value () {
		const reg = new RegExp(`^([0-9a-z]{${this.$1}}).+([0-9a-z]{${this.$2}})$`, "ig");
		const replaceText = new Array(this.replaceCount + 1).fill(this.replace).join("");
		const replace = `$1${replaceText}$2`;
		return this.text.replace(reg, replace);
	}
}
export const encryption = function (value: string): Encryption {
	return new Encryption(value || "");
}
