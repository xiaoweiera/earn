/**
 * @file lazyLoad
 * @auth svon.me@gmail.com
 * @description 懒加载
 */
import { IsNode } from "src/config/";
import type {AsyncComponentLoader, Component} from "vue";
import {defineAsyncComponent } from "vue";
import Load from "./load.vue";

const asyncComp = function(value: AsyncComponentLoader) {
  return defineAsyncComponent({
    loader: value,
    delay: 300,
    loadingComponent: Load,
  });
};

export const asyncLoad = function(value: AsyncComponentLoader): Component {
  if (IsNode()) {
    return <Load/>;
  }
  const AsyncComp = asyncComp(value);
  return <AsyncComp/>;
};

