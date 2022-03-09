
import type { Kiwi } from "src/utils/i18n/kiwi";

import type { Response as Res } from "express";
import { NextFunction, Request } from "express";

interface Response extends Res{
	I18n?: Kiwi;
}

export { Request, Response, NextFunction };
