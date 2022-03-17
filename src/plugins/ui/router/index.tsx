/**
 * @file v-router
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import window from "src/plugins/browser/window";
import {createHref, UtmSource} from "src/plugins/router/pack";
import {Equals} from "src/utils";
import {defineComponent} from "vue";
import {RouterLink} from "vue-router";
import {Name, props, Target} from "./props";

const VRouter = defineComponent({
  props,
  methods: {
    getClassValue(): string[] {
      const value = [];
      if (this.disable) {
        value.push("disable");
      }
      if (this.name){
        if (!Equals(this.name, Name.a) || !Equals(this.name, Name.link)){
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
    createA(href: string, target: Target, content: any) {
      const capture = this.onClickCapture.bind(this);
      // @ts-ignore
      return (<a class={ this.getClassValue() } href={href} target={target} onClickCapture={capture}>{content}</a>);
    },
    createSpan(href: string, target: Target, content: any) {
      const onClick = () => {
        return this.open(href, target);
      };
      const capture = this.onClickCapture.bind(this);
      // @ts-ignore
      return (<span class={ this.getClassValue() } onClick={onClick} onClickCapture={capture}>{content}</span>);
    },
    createDiv(href: string, target: Target, content: any) {
      const onClick = () => {
        return this.open(href, target);
      };
      const capture = this.onClickCapture.bind(this);
      // @ts-ignore
      return (<div class={ this.getClassValue() } onClick={onClick} onClickCapture={capture}>{content}</div>);
    },
    createLink(href: string, target: Target, content: any) {
      const capture = this.onClickCapture.bind(this);
      // @ts-ignore
      return (<RouterLink class={ this.getClassValue() } to={href} onClickCapture={capture}>{content}</RouterLink>);
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
      } else if (_.includes(href, `${UtmSource}=`)) {
        // 判断链接中是否有 UtmSource
        return this.createA(href, target, content);
      } else {
        // 默认为 a 模式
        return this.createA(href, target, content);
      }
    }
    return (<div>{content}</div>);
  }
});

export default VRouter;
