/**
 * @file 菜单
 * @author svon.me@gmail.com
 */

export interface MenuItem {
	id?: string;   // 唯一ID
	name: string;  // 名称
	href?: string;  // 链接地址
	icon?: string; // 图标
	// 是否在大屏模式下展示
	header?: boolean;
	// 导航末尾展示组件名称
	expand?: string;
	more?: boolean;   // 是否在更多菜单中展示
	newTip?: boolean; // 是否在菜单右上角展示小红点
	active?: boolean; // 是否为选中状态
	message?: number;  // 消息数量
	children?: MenuItem[]; // 子菜单
	[key: string]: any;
}
