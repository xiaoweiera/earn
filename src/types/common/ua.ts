/**
 * @file userAgent
 * @author svon.me@gmail.com
 */

import {Details} from "express-useragent";

export interface UA extends Details {
	isWechat: boolean;
}
