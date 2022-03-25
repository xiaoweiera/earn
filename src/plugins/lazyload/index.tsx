/**
 * @file lazyLoad
 * @auth svon.me@gmail.com
 * @description 懒加载
 */
import { IsNode } from "src/config/";
import type {AsyncComponentLoader, Component} from "vue";
import {defineAsyncComponent} from "vue";

const AsyncComp = function(value: AsyncComponentLoader) {
  return defineAsyncComponent({
    loader: value,
    delay: 300,
  });
};

export const lazyLoad = function(value: AsyncComponentLoader): Component {
  if (IsNode()) {
    return (<div/>);
  }
  return AsyncComp(value);
};

