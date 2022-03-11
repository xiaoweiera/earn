/**
 * @file 项目库
 * @author svon.me@gmail.com
 */

import I18n from "src/utils/i18n";
import { config } from "src/router/config";
import { getParam } from "src/utils/router";

export interface DataMap {
	date: string;
	list: ProjectItem[];
}
export enum ProjectType {
	dApp = "dapp",
	ad = "ad",
}

export interface ProjectItem {
	id: number | string;
	pid: string | number; // 父ID(取 published_at 中的年月日做分类)
	// 名称
	name: string;
	// 数据类型, nft-普通项目数据; ad-"广告"
	data_type: ProjectType;
	// Logo
	gallery: string[];
	// 所在公链
	chains: string[];
	// 公链
	chain: string;
	// 类型
	categories: string[];
	// 类型
	category: string;
	// 项目评分
	overall_score: number;
	// mint价格
	mint_price: number;
	// 发行量
	issue_volume: number;
	// IDO开始时间
	mint_start_at: number;
}
export interface AdItem {
	// 广告ID
	id: number | string;
	// 标识此条数据为一个广告
	data_type: ProjectType;
	// 广告图片
	image: string;
	// 广告跳转链接
	url: string;
	// 是否展示广告标记, true-是, false-否
	flag: boolean;
}

export interface Query {
	page?: number;
	page_size?: number;
	type: TabTypes;
	sort_field?: string;
	sort_type?: string;
	is_nft?: boolean;
	query?: string;
	chain?: string;
}

// tab 切换
export enum TabTypes {
	upcoming = "upcoming", // 即将开始
	ongoing = "ongoing", // 进行中
	ended = "ended", // 已结束
}
export interface TabItem {
	type: TabTypes;
	name: string;
	icon?: string;
	href: string | object;
}

// nft tab 切换
export enum NftTabTypes {
	upcoming = "upcoming", // 即将开始
	history = "history", // 已结束
}
export interface NftTabItem {
	status: NftTabTypes;
	name: string;
	icon?: string;
	href: string | object;
}

