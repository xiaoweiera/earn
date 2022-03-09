/**
 * @file Application
 */
import type { App } from "vue";
import { createSSRApp } from "vue";
import { set } from "src/utils/root/data";
import { createRouter } from "src/router/";
import application from "./app.vue";

/**
 * @file 创建 Vue 实例
 * @param data
 */
export function createApp(data: object = {}) {
  // 缓存数据
  set(data);
  const app: App = createSSRApp(application);
  const router = createRouter();
  app.use(router);
  return { app, router };
}
