/**
 * @file 项目库
 * @author svon.me@gmail.com
 */

export enum ProjectGroup {
	online = 'online', // 待上线
	history = 'history', // 历史项目
	recommend = 'recommend' // 运营推荐
}

export interface Query {
	page?: number,
	page_size?: number,
	type: ProjectGroup,
	sort_field?: string,
	sort_type?: string,
	is_nft?: boolean,
	query?: string,
	chain?: string,
}
