import _ from "lodash";
import {Env} from "src/config";
import safeGet from "@fengqiaogang/safe-get";
import {config} from "src/router/config";
import * as dApp from "src/controller/dapp";
import redirect from "src/controller/common/redirect";
import {Router as ExpressRouter, Request, Response} from "express";

const Router = async function (root: string, env: Env) {
	const router = ExpressRouter();

	// 列表
	router.get(config.dappList, function(req: Request, res: Response) {
		const igo = safeGet<string>(req, "query.isIgo");
		if (igo) {
			// 兼容老项目，修正错误参数
			const query: object = _.omit(req.query, "isIgo");
			redirect(req, res, req.path, { ...query, igo });
		} else {
			dApp.list(req, res)
		}
	});
	router.get(config.nftList, dApp.nftList)
	return router;
}
export default Router;
