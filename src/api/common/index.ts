/**
 * @file 公共接口
 */

import * as api from "src/config/api";
import ApiTemplate from "../template";
import { tidingName } from "src/config/";
import request from "src/plugins/dao/service";
import Cookie from "src/plugins/browser/cookie";
import {AreaCode} from "src/types/common/area";
import {asyncCheck} from "src/plugins/dao/response";
import {SiteConfig} from "src/types/common/chain";
import {TidingList} from "src/types/common/tiding";
import { userToken, tryError, ErrorDefault } from "src/utils/decorate";

// 国际区号默认数据
const areaCodeDefault = ErrorDefault([{
	cn: "中国",
	en: "China",
	phone_code: "+86",
}]);

// 公链站点默认数据
const chainSiteDefault = ErrorDefault({
	category: {},
	chain: [],
	tge_platform: []
});


export default class extends ApiTemplate {
	// 获取国际区号
	@tryError(areaCodeDefault)
	@userToken(false)
	getAreaCodeList() {
		return asyncCheck<AreaCode[]>(request(this.lang).get(api.common.areaCodeList));
	}

	// 公链站点配置
	@tryError(chainSiteDefault)
	@userToken(false)
	getChainSiteConfig(): Promise<SiteConfig> {
		return asyncCheck<SiteConfig>(request(this.lang).get(api.common.chainSiteConfig));
	}

	// 获取导航菜单消息列表
	@tryError(ErrorDefault([]))
	@userToken(false)
	async getTidings(): Promise<TidingList[]> {
		const cookie = new Cookie(this.getRequest());
		const params = {
			[tidingName]: cookie.getTidingTime()
		};
		return asyncCheck<TidingList[]>(request(this.lang).get(api.common.tidingTime, {params}));
	}
}
