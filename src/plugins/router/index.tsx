/**
 * @file v-router
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import {defineComponent} from 'vue';
import { props, Name, Target } from "./props";
import { createHref, UtmSource } from "./pack";
import window from "src/plugins/browser/window";

const Equals = function (...args: Array<string | number>): boolean {
	const len = args.length;
	let status = false;
	for (let i = 1; i < len && len > 1; i++) {
		const value1 = _.trim(`${args[i - 1]}`);
		const value2 = _.trim(`${args[i]}`);
		if (value1 === value2) {
			status = true;
		} else {
			status = false;
			break;
		}
	}
	return status;
}

const VRouter = defineComponent({
	props,
	methods: {
		async open(href: string, target: Target) {
			if (Equals(target, Target.blank)) {
				window.open(href);
			} else {
				// 先默认为 history 模式
				try {
					await this.$router.push(href);
				} catch (e) {
					window.location.href = href;
				}
			}
		},
		createA (href: string, target: Target, content: any) {
			return (<a href={href} target={target}>{content}</a>);
		},
		createSpan (href: string, target: Target, content: any) {
			const onClick = () => {
				return this.open(href, target);
			}
			return (<span onClick={ onClick }>{content}</span>);
		},
		createDiv (href: string, target: Target, content: any) {
			const onClick = () => {
				return this.open(href, target);
			}
			return (<div onClick={ onClick }>{content}</div>);
		},
		createLink (href: string, target: Target, content: any) {
			return (<router-link to={href}>{content}</router-link>);
		}
	},
	render: function() {
		const content = this.$slots.default ? this.$slots.default() : "";
		if (this.href) {
			const href = createHref(this.href);
			const target = Equals(this.target, Target.blank) ? Target.blank : Target.self;
			if (this.name && Equals(this.name, Name.a)) {
				return this.createA(href, target, content);
			} else if (this.name && Equals(this.name, Name.link)) {
				return this.createLink(href, target, content);
			} else if (this.name && Equals(this.name, Name.span)) {
				return this.createSpan(href, target, content);
			} else if (this.name && Equals(this.name, Name.div)) {
				return this.createDiv(href, target, content);
			} else if (_.includes(href, `${UtmSource}=`)){
				// 判断链接中是否有 UtmSource
				return this.createA(href, target, content)
			} else {
				// 默认为 router-link 模式
				return this.createLink(href, target, content);
			}
		}
		return (<div>{content}</div>);
	}
});

export default VRouter;
