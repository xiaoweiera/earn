/**
 * @file 公共接口
 */

import * as api from "src/config/api";
import ApiTemplate from "../template";
import request from "src/plugins/dao/service";
import { asyncCheck } from "src/plugins/dao/response";

interface AreaCode {
	cn: string;
	en: string;
	phone_code: string;
}

export default class extends ApiTemplate{
	// 获取国际区号
	async getAreaCodeList () {
		try {
			return await asyncCheck<AreaCode[]>(request(this.lang).get(api.common.areaCodeList));
		} catch (e) {
			// 默认数据
			return [{
				cn: "中国",
				en: "China",
				phone_code: "+86",
			}];
		}
	}
}
