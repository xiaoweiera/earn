/**
 * @file APY
 * @author svon.me@gmail.com
 */

import { names } from "src/config/header";
import { Request, Response } from "express";
import { web3 } from "../web3/";

export const topic = function (req: Request, res: Response) {
  return web3(req, res, names.topic.topic);
};

export const mining = function (req: Request, res: Response) {
  return web3(req, res, names.apy.mining);
};

export const loan = function (req: Request, res: Response) {
  return web3(req, res, names.apy.loan);
};

export const token = function (req: Request, res: Response) {
  return web3(req, res, names.apy.token);
};

export const Lp = function (req: Request, res: Response) {
  return web3(req, res, names.apy.token);
};

export const project = function (req: Request, res: Response) {
  return web3(req, res, names.apy.project);
};

export const heco = function (req: Request, res: Response) {
  return web3(req, res, names.apy.heco);
};
