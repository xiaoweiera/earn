/**
 * @file 项目库
 */


import ApiTemplate from "../template";
import * as api from "src/config/api";
import request from "src/plugins/dao/service";
import {asyncCheck} from "src/plugins/dao/response";
import {Query} from "src/types/dapp/ixo";
import {nftQuery} from "src/types/dapp/nft";


export default class extends ApiTemplate {
	// 项目库列表
	getList<T>(query: any) {
		const result = request(this.lang).get(api.dapp.list, {params: query})
		return asyncCheck(result);
	}

	// 获取IGO列表
	getIGOList<T>() {
		const result = request(this.lang).get(api.dapp.igoList, {
			params: Object.assign({
				page: 1,
				page_size: 10,
				status: 'upcoming',
				category: 'all',
				platform: 'all',
				chain: "all",
				query: '',
				sort_field: '',
				sort_type: '',
			}, {})
		})
		return asyncCheck(result);
	}

	// 分组
	tabs<T>() {
		return asyncCheck<T>(request(this.lang).get(api.dapp.tabs));
	}

	//	获取nft列表
	getNftList<T>(query: nftQuery) {
		const params = Object.assign({page: 1, page_size: 10}, query);
		const result = request(this.lang).get(api.dapp.nftList, {params})
		return asyncCheck(result);
	}

	// ixo 数据
	ixo<T>(query: Query) {
		const params = Object.assign({
			page: 1,
			page_size: 10,
			query: "",
			category: "all",
			paginate: false,
		}, query);
		return asyncCheck<T>(request(this.lang).get(api.dapp.ixo, {params}));
	}

	// ixoEnd 数据
	ixoEnd<T>(query: Query) {
		const params = Object.assign({
			page: 1,
			page_size: 10,
			paginate: false,
		}, query);
		return asyncCheck<T>(request(this.lang).get(api.dapp.ixo, {params}));
	}
}
