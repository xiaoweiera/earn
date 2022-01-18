/**
 * @file 博客
 * @author svon.me@gmail.com
 */

import {Env} from "src/config";
import {config} from "src/router/config";
import { Router as ExpressRouter, Request, Response } from "express";

const Router = async function (root: string, env: Env) {
	const router = ExpressRouter();
	router.get(`${config.blog}/:id`, function (req:Request, res: Response) {
		res.send(`博客 - ${JSON.stringify(req.params)}`);
	});
	return router;
}

export default Router;
