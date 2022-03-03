
export enum Status {
	upcoming = "upcoming", // 即将上线
	ongoing = "ongoing", // 进行中
	ended = "ended", // 结束
}

export enum Sort {
	asc = "asc",   // 升序
	desc = "desc", // 降序
}

export enum ProjectType {
	dApp = "dapp",
	ad = "ad"
}

export interface Query {
	page?: number;
	page_size?: number;
	query?: string;
	status?: Status;
	chain?: string;    // 公链
	platform?: string; // 平台
	category?: string; // 类型
	sort_field?: string;  // 排序字段
	sort_type?: Sort;
}

export interface ProjectItem {
	id: number | string;
	// 名称
	name: string;
	// 数据类型, dapp-普通项目数据; ad-"广告"
	data_type: ProjectType;
	// Logo
	logo: string;
	// 封面
	cover: string;
	// 描述
	description: string;
	// 项目代币
	symbol: string;
	// 所在公链
	chains: string[];
	// IDO平台
	tge_platform: string;
	// 风险等级
	risk: string;
	// 项目评分
	overall_score: number;
	// IDO价格
	ido_price: number;
	// 筹款目标
	ido_fundraising_goal: number;
	// IDO开始时间
	ido_start_at: number;
	// IDO结束时间
	ido_end_at: number;
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
