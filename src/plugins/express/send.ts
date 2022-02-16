/**
 * @file 内容输出
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import {Env} from "src/config";
import SSR from "src/plugins/vue";
import {footers} from "src/config/footer";
import { getMenuList } from "src/logic/common/header";
import {Request, Response, NextFunction} from "express";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";


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
				...value,
				...res.locals,
				query: Object.assign({}, req.params || {}, req.query || {}),
			};
			// 获取默认选中的数据
			const menuActive = safeGet<string>(data, "menuActive");
			// 处理头部导航数据
			safeSet(data, "common.header", getMenuList(menuActive, req));
			// 处理底部导航数据
			safeSet(data, "common.footer", footers(req));

			try {
				const html = await ssr.render(url, data);
				log();
				return send(html);
			} catch (e: any) {
				console.log(e);
				log();
				// return res.redirect(config.E404);
				return send(e);
			}
		};
		return next();
	}
}

export default send;
