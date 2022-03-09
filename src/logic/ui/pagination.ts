/**
 * @file 分页
 * @author svon.me@gmail.com
 */

import { ref } from "vue";
import { toArray } from "src/utils";

type Request = <T>() => T[];

type Data = Record<string, any>;

export interface Props {
	request: Request;
	showLoading: boolean;
	nextMore: string;
	limit: number;
	data: Data;
	initValue: Array<Data>;
}

export const Pagination = function(props: Props) {
  const list = ref<any[]>([]); // 数据集合
  const page = ref<number>(1); // 当前页码
  const loading = ref<boolean>(true); // 是否为加载中
  const next = ref<boolean>(false); // 是否有下一页数据
  const empty = ref<boolean>(false); // 是否为空数据

  const handleData = function<T>(result: T[]) {
    const array = toArray(result || []);
    // 判断是否有下一页
    if (array.length < props.limit) {
      next.value = false;
    } else {
      page.value = page.value + 1;
      next.value = true;
    }

    if (array.length > 0) {
      list.value = toArray(list.value, array);
    } else {
      // 判断数据是否为空
      empty.value = array.length < 1;
    }

    loading.value = false;
    return array;
  };
  return { list, page, loading, next, empty, handleData };
};
