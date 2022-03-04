/**
 * @file 公共接口
 */

import * as api from "src/config/api";
import ApiTemplate from "../template";
import { tidingName } from "src/config/";
import Cookie from "src/plugins/browser/cookie";
import {AreaCode} from "src/types/common/area";
import {SiteConfig} from "src/types/common/chain";
import {TidingList} from "src/types/common/tiding";
import { userToken, tryError, DefaultValue, get, expire } from "src/plugins/dao/http";

// 国际区号默认数据
const areaCodeDefault = DefaultValue([{
	cn: "中国",
	en: "China",
	phone_code: "+86",
}]);

// 公链站点默认数据
const chainSiteDefault = DefaultValue({
	category: {},
	chain: [],
	tge_platform: []
});


export default class extends ApiTemplate {
	// 获取国际区号
	@tryError(areaCodeDefault)
	@get(api.common.areaCodeList, expire.day2)
	@userToken(false)
	getAreaCodeList(): Promise<AreaCode[]> {
		return [] as any
	}

	// 公链站点配置
	@tryError(chainSiteDefault)
	@get(api.common.chainSiteConfig, expire.min10)
	@userToken(false)
	getChainSiteConfig(): Promise<SiteConfig> {
		return [] as any;
	}

	// 获取导航菜单消息列表
	@tryError(DefaultValue([]))
	@get(api.common.tidingTime)
	@userToken(false)
	getTidings(): Promise<TidingList[]> {
		const cookie = new Cookie(this.getRequest());
		const params = {
			[tidingName]: cookie.getTidingTime()
		};
		return [params] as any;
	}
}
