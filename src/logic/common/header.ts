/**
 * @file 菜单
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import type { MenuItem } from "src/types/menu";
import type { Lang } from "src/types/language";
import { headers } from "src/config/header";
import { createDb } from "src/config/header/db";
import type { TidingList } from "src/types/common/tiding";

export const getMenuList = function (active?: string, lang?: Lang, tidings?: TidingList[]): MenuItem[] {
  const db = createDb(headers(lang), tidings);
  if (active) {
    const list = db.parentDeepFlatten<MenuItem>({ id: active });
    const ids = _.map(list, (item: MenuItem) => {
      return item.id;
    });
    db.update(
      { id: ids },
      {
        active: true,
      },
    );
  }
  return db.childrenDeep<MenuItem>();
};
