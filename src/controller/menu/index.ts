/**
 * @file 菜单
 * @author svon.me@gmail.com
 */

import { names } from "src/config/header";
import {NextFunction, Request, Response} from "express";


export const menuList = async function (req: Request, res: Response, next: NextFunction) {
	const active = names.dapp.dapp; // 默认导航
	if (active) {
		res.locals.menuActive = active;
	}
	next();
}
