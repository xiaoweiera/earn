/**
 * @file 项目库
 */
import {Query} from "src/types/dapp";
import * as api from "src/config/api";
import safeGet from "@fengqiaogang/safe-get";
import axios from "src/plugins/dao/service";
import ApiTemplate from "../template";

export default class extends ApiTemplate{
	// 项目库列表
	async getList (query: Query) {
		try {
			const result = await axios(this.lang).get(api.dapp.list, {
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
}
