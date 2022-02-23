
import {Env} from "src/config";
import {config} from "src/router/config";
import * as dapp from "src/controller/dapp";
import { Router as ExpressRouter } from "express";

const Router = async function (root: string, env: Env) {
    const router = ExpressRouter();

	// 列表
	router.get(config.dappList, dapp.list);
	router.get(`${config.nft}/discover`,dapp.nftlist)
	return router;
}
export default Router;