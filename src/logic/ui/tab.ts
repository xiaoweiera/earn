/**
 * @file ui-tab 逻辑
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";

export enum TriggerValue {
	click = 'div',
	router = 'router-link',
}

export enum Trigger {
	click = 'click',
	router = 'router',
}

export interface Item {
	id: string | number; // tab id
	name: string;
	icon?: string; // 是否需要在名称前显示图标
	href?: string | object; // 跳转链接
	className?: string
}

// 生成 tab 链接
export const makeLink = function (activeName: string,data: Item, trigger: Trigger) {
	if (trigger === Trigger.router) {
		if (data.href) {
			return data.href;
		}
		const value = safeGet<string>(data, activeName);
		if (value) {
			return {
				query: {
					[activeName]: safeGet<string>(data, activeName)
				}
			};
		}
	}
}
