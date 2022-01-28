
import {clone} from "ramda";
import {isString} from "src/utils";
import safeSet from "@fengqiaogang/safe-set";


export enum Trigger {
	click = 'div',
	router = 'router-link',
}

export interface Item {
	id: string | number; // tab id
	name: string;
	icon?: string; // 是否需要在名称前显示图标
	href?: string | object; // 跳转链接
	className?: string
}

// 生成 tab 链接
export const makeLink = function (activeName: string,data: Item) {
	if (data.href) {
		if (isString(data.href)) {
			return {
				path: data.href as string,
				query: {
					[activeName]: data.id
				}
			};
		}
		const url = clone(data.href);
		safeSet(url, `query.${activeName}`, data.id);
		return url;
	}
}
