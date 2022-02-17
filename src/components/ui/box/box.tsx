/**
 * @file 布局
 * @author svon.me@gmail.com
 */

import { defineComponent } from "vue";
import UiSticky from "../sticky/index.vue";

const Box = defineComponent({
	render() {
		let right: any = '';
		const content = this.$slots.default ? this.$slots.default() : "";
		if (this.$slots.right) {
			const value = this.$slots.right();
			right = <UiSticky class="float-right hidden lg:block">{value}</UiSticky>;
		}
		return (<div class="ui-box clearfix w-full">
			{right}
			<div class="box-content-wrap">{content}</div>
		</div>);
	}
});

export default Box;
