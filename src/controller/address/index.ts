/**
 * @file APY
 * @author svon.me@gmail.com
 */

import { names } from "src/config/header";
import { Request, Response } from "express";
import { web3 } from "../web3/";

export const alerts = function (req: Request, res: Response) {
  return web3(req, res, names.address.alert);
};

export const find = function (req: Request, res: Response) {
  return web3(req, res, names.address.find);
};

export const portfolio = function (req: Request, res: Response) {
  return web3(req, res, names.address.portfolio);
};
