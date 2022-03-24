/**
 * @file lazyLoad
 * @auth svon.me@gmail.com
 * @description 懒加载
 */
import { IsNode } from "src/config/";
import type {AsyncComponentLoader, Component} from "vue";
import {defineAsyncComponent} from "vue";
import Load from "./load.vue";

const AsyncComp = function(value: AsyncComponentLoader) {
  return defineAsyncComponent({
    loader: value,
    delay: 300,
    onError: (error: Error) => {
      console.log(error);
    },
  });
};

export const lazyLoad = function(value: AsyncComponentLoader): Component {
  if (IsNode()) {
    return (<Load height="200px"></Load>);
  }
  const Comp = AsyncComp(value);
  return (<Load height="200px">
    <Comp/>
  </Load>);
};

