/**
 * @file 导航菜单消息配置
 * @author svon@gmail.com
 */

// 消息对象
export interface TidingItem {
	key: string;
	incr_cnt: string;
}

export interface TidingList extends TidingItem{
	sub_sections: TidingItem[]
}
