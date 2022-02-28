/**
 * @file 公共接口
 */

import * as api from "src/config/api";
import ApiTemplate from "../template";
import request from "src/plugins/dao/service";
import Cookie from "src/plugins/browser/cookie";
import {AreaCode} from "src/types/common/area";
import {asyncCheck} from "src/plugins/dao/response";
import {SiteConfig} from "src/types/common/chain";
import {TidingList} from "src/types/common/tiding";

export default class extends ApiTemplate {
	// 获取国际区号
	async getAreaCodeList() {
		try {
			return await asyncCheck<AreaCode[]>(request(this.lang).get(api.common.areaCodeList));
		} catch (e) {
			// 默认数据
			return [ {
				cn: "中国",
				en: "China",
				phone_code: "+86",
			} ];
		}
	}

	// 公链站点配置
	async getChainSiteConfig(): Promise<SiteConfig> {
		try {
			return await asyncCheck<SiteConfig>(request(this.lang).get(api.common.chainSiteConfig));
		} catch (e) {
			// 异常情况下，返回模式数据
			return {
				category: {},
				chain: [],
				tge_platform: []
			};
		}
	}
	// 获取导航菜单消息列表
	async getTidings(): Promise<TidingList[]> {
		const cookie = new Cookie(this.getRequest());
		const params = {
			'last_timestamp': cookie.getTidingTime()
		};
		try {
			return await asyncCheck<TidingList[]>(request(this.lang).get(api.common.tidingTime, {params}));
		} catch (e) {
		}
		return [];
	}
}
