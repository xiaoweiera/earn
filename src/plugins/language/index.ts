/**
 * @file 文案
 * @author svon.me@gmail.com
 */

import { getI18ns } from "./i18n";

let text = "";

export const getLangContent = function (): string {
	if (!text) {
		text = JSON.stringify(getI18ns());
	}
	return text;
}

