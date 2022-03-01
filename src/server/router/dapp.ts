import {Env} from "src/config";
import {config} from "src/router/config";
import * as dApp from "src/controller/dapp";
import {Router as ExpressRouter} from "express";

const Router = async function (root: string, env: Env) {
	const router = ExpressRouter();

	// 列表
	router.get(config.dappList, dApp.list);
	router.get(config.nftList, dApp.nftList)
	return router;
}
export default Router;
