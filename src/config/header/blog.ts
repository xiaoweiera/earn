/**
 * @file 博客
 */

import I18n from "src/utils/i18n";
import {MenuItem} from "src/types/menu";
import {config} from "src/router/config";

export const name = {
	blog: 'blog-blog'
}

export const Blog: MenuItem = {
	name: I18n.menu.blog.blog, // 博客
	href: config.blog,
	newTip: false,
	children: [
		{
			id: name.blog,
			icon: 'icon-yanbao',
			name: I18n.menu.blog.blog,
			href: config.blog,
			header: false,
			more: true,
		},
	]
};

