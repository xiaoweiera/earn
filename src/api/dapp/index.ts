/**
 * @file 项目库
 */


import ApiTemplate from "../template";
import * as api from "src/config/api";
import request from "src/plugins/dao/service";
import {asyncCheck} from "src/plugins/dao/response";
import safeGet from "@fengqiaogang/safe-get";

export default class extends ApiTemplate{
	// 项目库列表
	 getList<T>(){
			const result = request(this.lang).get(api.dapp.list, {
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
	// 获取IGO列表
	getIGOList<T>(){
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
	getNftList<T>() {
		const result = request(this.lang).get(api.dapp.nftList, {
			params: Object.assign({
				page: 1,
				page_size: 10,
				status: 'upcoming',
				category: 'all',
				chain: "all",
				query: '',
				sort_field: '',
				sort_type: '',
			}, {})
		})
		return asyncCheck(result);
	}
}
