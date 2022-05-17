/**
 * @file 搜索
 * @author svon.me@gmail.com
 */

import DB from "@fengqiaogang/dblist";
import type { SearchItem } from "src/types/search/";

const filter = function (list: SearchItem[]): SearchItem[] {
  const db = new DB([], "key");
  db.insert(db.flatten(list, "children"));
  const array: SearchItem[] = [];
  db.clone<SearchItem>(function (item: SearchItem) {
    if (item && item.id) {
      array.push(item);
    }
  });
  return array;
};

export const selectItem = function (list: SearchItem[], id?: string | number, shift = 0): SearchItem {
  // 过滤数据
  const array = filter(list);

  if (id || id === 0) {
    let i = 0;
    const size = array.length;
    for (; i < size; i++) {
      const item = array[i];
      if (item && item.id === id) {
        break;
      }
    }
    if (i + shift >= size) {
      return array[0];
    }
    if (i + shift < 0) {
      return array[size - 1];
    }
    return array[i + shift];
  }
  return array[0];
};
