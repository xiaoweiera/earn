/**
 * @file Dapp 相关内容
 */

import { names } from "src/config/header";
import { DAppType } from "src/types/dapp/dapp";

import type { Request, Response } from "express";

export const list = function (name: DAppType, req: Request, res: Response) {
  if (name === DAppType.igo) {
    res.locals.menuActive = names.dapp.igo;
  }
  if (name === DAppType.ido) {
    res.locals.menuActive = names.dapp.dapp;
  }
  res.send({});
};
