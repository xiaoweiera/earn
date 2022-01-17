/**
 * @file v-router
 * @author svon.me@gmail.com
 */

import * as mixin from "./props";
import {defineComponent} from 'vue';

const VRouter = defineComponent({
	mixins: [ mixin ],
	render: function() {
		const content = this.$slots.default ? this.$slots.default() : "";
		return (<a href={this.href} target={this.target}>{content}</a>);
	}
});

export default VRouter;
