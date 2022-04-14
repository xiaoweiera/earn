/**
 * @file 博客
 */

import type { ProjectItem } from "src/types/dapp/";
import type { LockData } from "src/types/common/lock";

export interface AdData {
  image: string;
  url: string;
}

export interface BlogTab {
  id?: number | string;
  name: string;
}

export interface BlogData {
  id: string | number; // 博客 id
  name: string; // 名称
  desc?: string; // 描述
  cover: string; // 图片
  release_date?: number; // 更新时间
  author?: string; // 作者
}

export interface BlogDetail extends BlogData, LockData {
  body: string; // 博客内容
  group: BlogTab; // 博客分组
  label: string[]; // 分类标签
  relevant: BlogData[]; // 推荐
  tutorial_dapps: ProjectItem[]; // DApp 列表
  hidden_body: string; // 第二部分内容
}

export interface BlogHostList extends BlogData {
  blogs: never[];
  pid: string | number; // 父ID(取 release_date 中的年月日做分类)
}

export interface DataMap {
  date: string;
  list: BlogHostList[];
}
