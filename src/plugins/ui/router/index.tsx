/**
 * @file v-router
 * @author svon.me@gmail.com
 */


import _ from "lodash";
import {AnyEquals} from "src/utils";
import window from "src/plugins/browser/window";
import safeSet from "@fengqiaogang/safe-set";
import {createHref} from "src/plugins/router/pack";
import {defineComponent, h as createElement} from "vue";
import {RouterLink} from "vue-router";
import {Name, props, Target} from "./props";

const VRouter = defineComponent({
  props,
  methods: {
    getClassValue(): string[] {
      const value = ["v-router"];
      if (this.disable) {
        value.push("disable");
      } else if (this.name){
        if (!AnyEquals(this.name, Name.a) || !AnyEquals(this.name, Name.link)){
          value.push("cursor-pointer");
        }
      }
      return value;
    },
    // 判断是否禁用当前链接
    onClickCapture(e: Event) {
      if (this.disable) {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
      return true;
    },
    // 判断是否嵌套
    isOverlap(e: Event): boolean {
      // @ts-ignore
      const path: HTMLElement[] = (e && e.path ? e.path : []) as HTMLElement[];
      let flag = false;
      for(const dom of path) {
        if (dom && dom.tagName && AnyEquals(dom.tagName, "a")) {
          flag = true;
          break;
        }
      }
      return flag;
    },
    async open(href: string, target: Target) {
      if (AnyEquals(target, Target.blank)) {
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
    createLink(href: string, target: Target, content: any) {
      const capture = this.onClickCapture.bind(this);
      // @ts-ignore
      return (<RouterLink class={ this.getClassValue() } to={href} onClickCapture={capture}>{content}</RouterLink>);
    },
    otherLink (href: string, target: Target, content: any, name: string) {
      // 是否为 a 标签
      const isAElement = AnyEquals(this.name, Name.a);
      // 捕获阶段事件
      const onClickCapture = this.onClickCapture.bind(this);
      // 冒泡阶段事件
      const onClick = (e: Event) => {
        if (isAElement) {
          return true;
        }
        const status = this.isOverlap(e);
        if (status) {
          e.stopPropagation();
          return false;
        }
        return this.open(href, target);
      };
      if (href) {
        const props = {
          onClick,
          onClickCapture,
          "class": this.getClassValue(),
        };
        if (isAElement) {
          safeSet(props, "href", href);
          safeSet(props, "target", target);
        }
        return createElement(_.toLower(name), props, content);
      } else {
        return createElement(_.toLower(name), {}, content);
      }
    }
  },
  render: function() {
    const content = this.$slots.default ? this.$slots.default() : "";
    if (this.href) {
      const href = createHref(this.href, this.query);
      const target = AnyEquals(this.target, Target.blank) ? Target.blank : Target.self;
      if (this.name && AnyEquals(this.name, Name.link)) {
        return this.createLink(href, target, content);
      }
      return this.otherLink(href, target, content, this.name);
    }
    return this.otherLink("", Target.self, content, Name.div);
  }
});

export default VRouter;
