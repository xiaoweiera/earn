/**
 * @file 内容输出
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import SSR from "src/plugins/vue";
import {footers} from "src/config/footer";
import {Env, languageKey} from "src/config";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import {Language} from "src/types/language";
import * as alias from "src/utils/root/alias";
import {TidingList} from "src/types/common/tiding";
import {getMenuList} from "src/logic/common/header";
import redirect from "src/controller/common/redirect";
import {NextFunction, Request, Response} from "express";
import {config as routerConfig} from "src/router/config";


const send = async function (root: string, env: Env) {
	// Vue 渲染
	const ssr: SSR = await new SSR(root, env);

	return function (req: Request, res: Response, next: NextFunction) {
		const url = req.originalUrl;
		const start = Date.now();
		const log = function () {
			const method = req.method;
			const query = req.query;
			const end = Date.now();
			console.log("%s %s %s %sms", method, url, JSON.stringify(query), end - start);
		}
		const send = res.send.bind(res);
		// @ts-ignore
		res.send = async function (value?: any) {
			if (value && _.isNumber(value)) {
				res.status(value);
				log();
				return send();
			}
			if (value && _.isString(value)) {
				log();
				return send(value);
			}
			const data = {
				query: Object.assign({
					[languageKey]: safeGet<string>(req.query, languageKey) || Language.auto
				}, req.params || {}, req.query || {}),
				...res.locals,
				...value,
			};
			// 获取默认选中的数据
			const menuActive = safeGet<string>(res.locals, "menuActive");
			// 处理头部导航数据
			safeSet(data, "common.header", getMenuList(menuActive, req, safeGet<TidingList[]>(data, alias.common.tiding.list)));
			// 处理底部导航数据
			safeSet(data, "common.footer", footers(req));

			try {
				const html = await ssr.render(url, data);
				log();
				return send(html);
			} catch (e: any) {
				console.log(e);
				log();
				return redirect(req, res, routerConfig.E404);
			}
		};
		return next();
	}
}

export default send;
