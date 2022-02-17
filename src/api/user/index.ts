/**
 * @file 项目库
 */
import ApiTemplate from "../template";
import * as api from "src/config/api";
import request from "src/plugins/dao/service";
import { User } from "src/types/common/user";
import { asyncCheck } from "src/plugins/dao/response";


export default class extends ApiTemplate{
	// 获取用户详情
	getInfo () {
		return asyncCheck<User>(request(this.lang).get(api.user.info))
	}
}
