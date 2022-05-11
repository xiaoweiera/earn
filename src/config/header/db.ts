/**
 * @file 处理导航数据
 */
import { MenuItem } from "src/types/menu";
import DBList from "@fengqiaogang/dblist";
import { toArray, forEach, toInteger } from "src/utils/";
import { TidingList, TidingItem } from "src/types/common/tiding";

const primaryKey = "id";
const foreignKey = "pid";
const foreignKeyValue = "0";

export const createDb = function (value: MenuItem[], tidings?: TidingList[]): DBList {
  const db = new DBList([], primaryKey, foreignKey, foreignKeyValue);
  const list = db.flatten<MenuItem>(value);
  db.insert(list);

  if (tidings) {
    const temp = new DBList([], "key");
    const array = temp.flatten<TidingItem>(toArray(tidings), "sub_sections");
    temp.insert(array);

    forEach(function (data: TidingItem) {
      if (data.key) {
        const value = toInteger(data.incr_cnt);
        if (value && value > 0) {
          const where = { [primaryKey]: data.key };
          db.update(where, {
            message: value,
          });
        }
      }
    }, temp.clone());
  }
  return db;
};
