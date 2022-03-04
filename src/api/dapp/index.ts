/**
 * @file 项目库
 */


import ApiTemplate from "../template";
import * as api from "src/config/api";
import {Query} from "src/types/dapp/ixo";
import {nftQuery, nftStatus} from "src/types/dapp/nft";
import {userToken, expire, tryError, DefaultValue, get, validate, required} from "src/plugins/dao/http";


export default class extends ApiTemplate {
	// 项目库列表
	@tryError(DefaultValue([]))
	@get(api.dapp.list, expire.min30)
	@userToken(false)
	getList<T>(query: object = {}): Promise<T> {
		return [query] as any;
	}

	// 获取IGO列表
	@tryError(DefaultValue([]))
	@get(api.dapp.igoList)
	@userToken(false)
	getIGOList<T>(): Promise<T> {
		const query = {
			page: 1,
			page_size: 10,
			status: 'upcoming',
			category: 'all',
			platform: 'all',
			chain: "all",
			query: '',
			sort_field: '',
			sort_type: '',
		};
		return [query] as any;
	}

	// 分组
	@tryError(DefaultValue([]))
	@get(api.dapp.tabs)
	@userToken(false)
	tabs<T>(): Promise<T> {
		return [] as any;
	}

	//	获取nft列表
	@tryError(DefaultValue([]))
	@get(api.dapp.nftList, expire.min30)
	@userToken(false)
	@validate
	getNftList<T>(@required query: nftQuery): Promise<T> {
		const params = Object.assign({
			page: 1,
			page_size: 10,
			status: nftStatus.upcoming, // 默认状态
			query: "", // 默认搜索为空
		}, query);
		return [params] as any;
	}

	// ixo 数据
	@tryError(DefaultValue([]))
	@get(api.dapp.ixo, expire.min30)
	@userToken(false)
	@validate
	ixo<T>(@required query: Query) {
		const params = Object.assign({
			page: 1,
			page_size: 10,
			query: "",
			category: "all",
			paginate: false,
		}, query);
		return [params] as any;
	}

	// ixoEnd 数据
	@tryError(DefaultValue([]))
	@get(api.dapp.ixo, expire.min30)
	@userToken(false)
	@validate
	ixoEnd<T>(@required query: Query) {
		const params = Object.assign({
			page: 1,
			page_size: 10,
			paginate: true,
			status: "ended",
			query: "",
			sort_field: "",
			sort_type: ""
		}, query);
		return [params] as any;
	}
}
