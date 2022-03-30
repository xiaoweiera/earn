/**
 * @file 博客
 */

import { config } from "src/router/config";
import { Lang } from "src/types/language";
import { MenuItem } from "src/types/menu";
import I18n from "src/utils/i18n";

export const name = {
  blog: "blog-blog",
};

export const Blog = function (lang?: Lang): MenuItem {
  const i18n = I18n(lang);
  return {
    name: i18n.menu.blog.blog, // 博客
    href: config.blog,
    newTip: false,
    children: [
      {
        id: name.blog,
        icon: "icon-yanbao",
        name: i18n.menu.blog.blog,
        href: config.blog,
        header: false,
        more: true,
      },
    ],
  };
};
