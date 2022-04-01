/**
 * @file 登录
 * @author svon.me@gmail.com
 */

import VRouter from "src/components/v/router.vue";
import {isLogin, showLogin} from "src/logic/user/login";
import {Name, Target} from "src/plugins/ui/router/props";
import {createElementVNode, defineComponent} from "vue";

const onClick = function(e: Event) {
  if (isLogin()) {
    return true;
  }
  // 未登录时
  e.stopPropagation();
  e.preventDefault();
  // 显示登录框
  showLogin();
  return false;
};

export default defineComponent({
  props: {
    name: {
      type: String,
      default: () => Name.div
    },
    to: {
      type: [String, Object],
      default: ""
    },
    target: {
      type: String,
      default: Target.self
    },
    href: {
      type: [String, Object],
      default: ""
    }
  },
  render() {
    const content = this.$slots.default ? this.$slots.default() : "";
    const url = this.href || this.to;
    if (url) {
      if (this.name === Name.a) {
        // @ts-ignore
        return (<VRouter onClickCapture={onClick} href={url} target={this.target} name={Name.a}>{content}</VRouter>);
      }
      if (this.name === Name.link) {
        // @ts-ignore
        return (<VRouter onClickCapture={onClick} href={url} name={Name.link}>{content}</VRouter>);
      }
    }
    return createElementVNode(this.name !== Name.link ? this.name : Name.a, {
      onClickCapture: onClick
    }, content);
  }
});
