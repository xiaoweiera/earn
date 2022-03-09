/**
 * @file 公链信息
 * @author svon.me@gmail.com
 */

export interface ChainItem {
	id: number | string;
	name: string;
	logo: string;
	logo_square: string; // 图标链接
}

export type Chain = Record<string, ChainItem>;

export interface Platform extends Chain{
}

export interface Category extends Chain{
}

export interface SiteConfig {
  category: Category;
	chain: Chain[];
	tge_platform: Platform[];
}
