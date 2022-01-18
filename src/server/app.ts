/**
 * @file Express App
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import path from "path";
import Router from "./router/index";
import Assets from "./router/assets";
import Language from "src/types/language";
import safeSet from "@fengqiaogang/safe-set";
import safeGet from "@fengqiaogang/safe-get";
import { getI18n } from "src/plugins/language/i18n";
import {getEnv, languageKey, production, domain} from "src/config";
import Express, { Request, Response, NextFunction } from "express";

const root: string = path.resolve(__dirname, "../..");

const main = async function () {
	const app = Express();
	const config = getEnv();

	console.log(config);

	const assets = await Assets(root, config);
	app.use(assets);

	// 处理中英文标识
	app.use(function (req: Request, res: Response, next: NextFunction) {
		let value: Language = safeGet<Language>(req.query, languageKey) || Language.en;
		value = _.toLower(value) as Language;
		switch (value) {
			case Language.cn:
			case Language.en:
				safeSet(req.query, languageKey, value);
				safeSet(res, `locals.${languageKey}`, value);
				process.env.lang = value;
				break;
			default:
				safeSet(req.query, languageKey, Language.en);
				safeSet(res, `locals.${languageKey}`, Language.en);
				process.env.lang = Language.en;
				break;
		}
		next();
	}, function (req: Request, res: Response, next: NextFunction) {
		let location: string;
		if (process.env.location) {
			location = process.env.location;
		} else {
			if (config.mode !== production) {
				location = `https://${domain}`
			} else {
				location = `https:${req.get('host')}`;
			}
			process.env.location = location;
		}
		const i18n = getI18n(res);
		Object.assign(res.locals, {
			location,
			keywords: "",
			description: "",
			// 标题
			title: i18n.common.site.name,
		});
		next();
	});

	const router = await Router(root, config);
	app.use(router);
	const http = await app.listen(config.port, "0.0.0.0");
	return { app, http };
}

export { main };

