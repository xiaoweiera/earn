/**
 * @file 博客相关路由配置
 * @author svon.me@gmail.com
 */

import { config } from "./option";

export class Router {
  // ido 相关
  // 在路由调整，使用
  list() {
    return config.blog;
  }

  listPattern() {
    return this.list();
  }

  // 路由跳转使用，传 id 与其它参数
  detail(id: string | number, query?: object) {
    return {
      path: `${this.list()}/${id}`,
      query,
    };
  }

  detailPattern() {
    return `${this.list()}/:id`;
  }
}
