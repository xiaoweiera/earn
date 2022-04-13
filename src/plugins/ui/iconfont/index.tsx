/**
 * @file IconFont
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import {Equals, toLower} from "src/utils";
import {defineComponent} from "vue";
import {getAlias} from "./alias";
import {getLink} from "./oss";
import {props, sizes} from "./props";
import UiImage from "src/components/ui/image/index.vue";

export default defineComponent({
  props,
  methods: {
    fontSize() {
      const className: Array<string | number> = [];
      const size = `${this.size}`;
      if (/^[0-9]+$/.test(size)) {
        className.push(`size-${size}`);
      } else {
        const value = sizes[size] || size;
        className.push(value);
      }
      if (this.rounded) {
        className.push("rounded");
      }
      return className;
    },
    cssDom(name: string) {
      if (Equals(name, "redTip")) {
        return true;
      }
    },
    getContent() {
      const className: string[] = ["kd-ui-icon"];
      if (this.border) {
        className.push("icon-border");
      }
      if (this.rounded) {
        className.push("icon-circle");
      }

      const imgClassName = this.fontSize();

      const image = getLink(this.type as string, this.suffix);
      if (this.cssDom(this.type as string)) {
        className.push("none-select", "icon-font");
        if (/^[\w-]+$/.test(this.type as string)) {
          imgClassName.push(`icon-${toLower(this.type as string)}`);
        }
        return (<span class={className}><i class={imgClassName}/></span>);
      } else if (image) {
        className.push("none-select", "icon-font", "inline-block");
        if (/^[\w-]+$/.test(this.type as string)) {
          imgClassName.push(`icon-${toLower(this.type as string)}`);
        }
        return (<div class={className}>
          <UiImage class={imgClassName} src={image} fit="contain"/>
        </div>);
      } else {
        const name = getAlias(this.type as string, this.bright);
        className.push("inline-flex");
        imgClassName.push("icon-font", "flex");
        imgClassName.push(toLower(name));
        if (props.bright) {
          imgClassName.push("bright");
        }
        return (<span class={className}>
          <i class={imgClassName}>
            <svg aria-hidden="true">
              <use xlinkHref={`#${name}`}/>
            </svg>
          </i>
        </span>);
      }
    }
  },
  render() {
    let content: any = "";
    if (this.type) {
      content = this.getContent();
    }
    let className = "inline-flex";
    if (this.$props.class) {
      if (_.includes(this.$props.class, "flex")) {
        className = this.$props.class;
      } else if (_.includes(this.$props.class, "block")) {
        className = this.$props.class;
      } else {
        className = `${className} ${this.$props.class}`;
      }
    }
    return (<div class={className}>{content}</div>);
  }
});
