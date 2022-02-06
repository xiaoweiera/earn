/**
 * @file 常用方法
 * @author svon.me@gmail.com
 */

import _, {size, compact, flatten} from "lodash";
// @ts-ignore
import { v1 as uuidV1, v4 as uuidV4, v5 as uuidV5 } from "uuid";
import { isString } from "./check/is";
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

