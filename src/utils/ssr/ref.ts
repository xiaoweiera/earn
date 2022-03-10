/**
 * @file 读取缓存中数据并同时创建变量
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import API from "src/api/index";
import safeGet from "@fengqiaogang/safe-get";
import { getValue } from "src/utils/root/data";
import type { Ref, UnwrapNestedRefs } from "vue";
import { reactive, ref, toRaw } from "vue";

export * as alias from "src/utils/root/alias";

export const createRef = function <T>(key: string, auto: T) {
  const value = getValue<T>(key, auto);
  return ref<T>(value);
};

export const createReactive = function <T>(key: string, auto: T) {
  const value = getValue<T>(key, auto);
  // @ts-ignore
  return reactive<T>(value);
};

type ApiFun = <T>(query?: object | string | number) => T;
type UpdateCallback = (...args: any[]) => Promise<void>;

const getData = async function <T>(api: string | ApiFun, query?: object | string | number) {
  if (_.isString(api)) {
    const model = {
      API: new API(),
    };
    const fun = safeGet<ApiFun>(model, api);
    if (fun && _.isFunction(fun)) {
      const app: ApiFun = fun.bind(model.API) as any; // 修复 this 对象
      try {
        return await app<T>(query); // 执行对应的方法
      } catch (e) {
        // todo
      }
    }
  }
  if (_.isFunction(api)) {
    try {
      return await api<T>(query);
    } catch (e) {
      // todo
    }
  }
};

// 更新数据
export const onUpdateRef = function <T>(data: Ref, api: string | ApiFun): UpdateCallback {
  return async function (query?: object | string | number) {
    const value = await getData<T>(api, query);
    if (value) {
      data.value = value;
    } else {
      data.value = void 0;
    }
  };
};
export const onUpdateReactive = function <T>(data: UnwrapNestedRefs<T>, api: string | ApiFun): UpdateCallback {
  return async function (query?: object | string | number) {
    const value = await getData<T>(api, query);
    if (value) {
      for (const key in value) {
        // @ts-ignore
        data[key] = value[key];
      }
    } else {
      const keys = Object.keys(data);
      for (const key of keys) {
        // @ts-ignore
        delete data[key];
      }
    }
  };
};

// Ref 数据
export const onLoadRef = async function <T>(data: Ref, api: string | ApiFun, query?: object | string | number) {
  if (data.value && data.value.length < 1) {
    const value = await getData<T>(api, query);
    if (value) {
      data.value = value;
    }
  }
};

// Reactive 数据
export const onLoadReactive = async function <T>(
  data: UnwrapNestedRefs<T>,
  api: string | ApiFun,
  query?: object | string | number,
) {
  const obj = toRaw(data);
  const keys = Object.keys(obj);
  if (keys.length < 1) {
    const value = await getData<T>(api, query);
    if (value) {
      for (const key in value) {
        // @ts-ignore
        data[key] = value[key];
      }
    }
  }
};
