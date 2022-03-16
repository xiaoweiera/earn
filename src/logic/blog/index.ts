/**
 * @file 博客
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import API from "src/api";
import I18n from "src/utils/i18n";
import { config } from "src/router/config";
import { Equals, toArray } from "src/utils";
import type { BlogData, BlogTab } from "src/types/blog/";

export const tabAll = "all";

export const getAll = function () {
  const i18n = I18n();
  return {
    id: tabAll,
    name: i18n.address.all,
  };
};

export const activeName = "group";

export const transformTabs = function (list: BlogTab[]) {
  const value = toArray(getAll(), list);
  return _.map(value, (item: BlogTab) => {
    // return { ...item, href: `${config.blog}?group=${item.id}`}
    return { ...item, [activeName]: item.id };
  });
};

export const makeDetailLink = function (id: string | number) {
  if (id) {
    return `${config.blog}/${id}`;
  }
};

export class Model extends API {
  // 获取博客列表
  getList(group: string | number = "", page = 1, pageSize = 20) {
    const query = { page, page_size: pageSize };
    if (group && !Equals(group, tabAll)) {
      Object.assign(query, { group_id: group });
    }
    return this.blog.getList<BlogData[]>(query);
  }

  getTabs() {
    return this.blog.tabs<BlogTab[]>();
  }

  getTopList() {
    return this.blog.getTopList<BlogData[]>();
  }

  // 热门数据
  getHotList() {
    return this.blog.getHostList<BlogData[]>();
  }

  // 首页研究院列表
  getBlogProjects() {
    const query = {
      page: 1,
      page_size: 3,
    };
    return this.blog.getList<BlogData[]>(query);
  }
}
