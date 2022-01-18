/**
 * @file 项目库
 */
import {Query} from "src/types/dapp";
import * as api from "src/config/api";
import safeGet from "@fengqiaogang/safe-get";
import axios from "src/plugins/dao/service";



// 项目库列表
export const getList = async function (query: Query) {
	try {
		const result = await axios.get(api.dapp.list, {
			params: Object.assign({
				page: 1,
				page_size: 10,
				chain: "all",
			}, query)
		})
		return safeGet<any[]>(result, "data.data.results") || [];
	} catch (e) {
		return [];
	}
}
