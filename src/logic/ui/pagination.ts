/**
 * @file 分页
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
import { ref } from "vue";
import { toArray, toInteger } from "src/utils";

type Request = <T>() => T[];

type Data = Record<string, any>;

/*
  加载方式
  pagination: 上一页，下一页
  more: 加载更多 (默认样式)
 */
export enum PageSkin {
  pagination = "pagination",
  more = "more",
}

export interface Props {
  request: Request;
  showLoading: boolean;
  nextMore: string;
  limit: number;
  data: Data;
  initValue: Array<Data>;
  skin: PageSkin;
}

export const Pagination = function (props: Props) {
  const list = ref<any[]>([]); // 数据集合
  const page = ref<number>(1); // 当前页码
  const loading = ref<boolean>(true); // 是否为加载中
  const next = ref<boolean>(false); // 是否有下一页数据
  const empty = ref<boolean>(false); // 是否为空数据

  const handleData = function <T>(result: T[], query: object) {
    const array = toArray(result || []);
    // 判断是否有下一页
    next.value = array.length >= props.limit;
    if (array.length > 0) {
      const value = toInteger(safeGet<number>(query, "page"));
      if (value > 0) {
        page.value = value;
      } else {
        page.value = 1;
      }
      // 如果是分页模式
      if (props.skin === PageSkin.pagination) {
        list.value = array;
      } else {
        list.value = toArray(list.value, array);
      }
    } else {
      // 判断数据是否为空
      empty.value = list.value.length < 1;
    }

    loading.value = false;
    return array;
  };
  return { list, page, loading, next, empty, handleData };
};
