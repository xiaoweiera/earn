/**
 * @file userAgent
 * @author svon.me@gmail.com
 */

import type { Details } from "express-useragent";

export interface UA extends Details {
	isWechat: boolean;
}
