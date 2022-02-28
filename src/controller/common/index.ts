/**
 * @file 公共逻辑
 * @author svon.me@gmail.com
 */

import I18n from "src/utils/i18n";
import { getTidings } from "./tiding";
import {chainSiteConfig} from "./chain";
import {config} from "src/router/config";
import {userInfo, userLogout} from "./user";
import {Router, NextFunction, Request, Response} from "express";

const common = Router();
// 处理用户退出逻辑
common.all(config.user.logout, userLogout);

// 处理公共数据
common.use(async function (req: Request, res: Response, next: NextFunction) {
	const i18n = I18n();
	const array = await Promise.all([
		chainSiteConfig(req),
		userInfo(req, res),
		getTidings(req, res),
	]);
	const data = {
		title: "KingData",
		keywords: i18n.menu.seo.key,
		description: i18n.menu.seo.des,
	};
	for(const value of array) {
		Object.assign(data, value);
	}
	Object.assign(res.locals, data);
	next();
});

export default common;
