

import {Kiwi} from "src/utils/i18n/kiwi";

import { Request, Response as Res, NextFunction } from "express";


interface Response extends Res{
	I18n?: Kiwi;
}

export { Request, Response, NextFunction };
