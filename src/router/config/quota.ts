/**
 * @file 指标，快讯相关路由配置
 * @author svon.me@gmail.com
 */

import { config } from "./option";

export class Router {
  // 快讯列表
  signalsList() {
    return config.news;
  }

  signalsPattern() {
    return this.signalsList();
  }

  // 路由跳转使用，传 id 与其它参数
  signalsDetail(id: string | number, query?: object) {
    return {
      path: `${this.signalsPattern()}/${id}`,
      query,
    };
  }

  signalsDetailPattern() {
    return `${this.signalsPattern()}/:id`;
  }

  // 指标列表
  indicatorsList() {
    return config.quota;
  }
  indicatorsPattern() {
    return this.indicatorsList();
  }

  // 路由跳转使用，传 id 与其它参数
  indicatorsDetail(id: string | number, query?: object) {
    return {
      path: `${this.indicatorsPattern()}/${id}`,
      query,
    };
  }

  indicatorsDetailPattern() {
    return `${this.indicatorsPattern()}/:id`;
  }
}
