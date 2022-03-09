/**
 * @file 判断登录
 * @author svon.me@gmail.com
 */

import I18n from "src/utils/i18n";
import { ElMessageBox } from "element-plus";

enum Status {
	Cancel = "cancel",
	Confirm = "confirm",
}

interface Content {
	value: string;
	warn?: string;
	desc?: string;
}

const getContent = function(content?: Content | string): string {
  let text = "";
  if (!content) {
    content = "";
  }
  if (typeof content === "string") {
    content = {
      value: content,
    };
  }
  if (content.value) {
    text += `<p class="text-base font-normal" style="color: rgba(37, 62, 111, 0.85); word-break: break-word; overflow-wrap: break-word;">${content.value}</p>`;
  }
  if (content.warn) {
    text += `<p class="text-xs font-normal" style="color: #E9592D; word-break: break-word; overflow-wrap: break-word;">* ${content.warn}</p>`;
  }
  if (content.desc) {
    text += `<p class="text-xs font-normal pt-2" style="color: rgba(37, 62, 111, 0.85); word-break: break-word; overflow-wrap: break-word;">${content.desc}</p>`;
  }
  return `<div class="text-center">${text}</div>`;
};

const app = function(title: string, content: string, type: "alert" | "confirm", opt?: object): Promise<boolean> {
  const i18n = I18n();
  const option = Object.assign({
    customClass: "directive-message",
    dangerouslyUseHTMLString: true,
    closeOnClickModal: true,
    showConfirmButton: true,
    confirmButtonText: i18n.common.button.confirm,
    showCancelButton: false,
    cancelButtonText: i18n.common.button.close,
    closeOnPressEscape: true,
  }, opt || {});

  if (type === "confirm") {
    option.showCancelButton = true;
  }
  return new Promise((resolve: any) => {
    // @ts-ignore
    option.callback = (status: Status) => {
      if (Status.Cancel === status) {
        resolve(false);
      }
      if (Status.Confirm === status) {
        resolve(true);
      }
    };
    ElMessageBox.alert(content, title || "", option);
  });
};

const message = function(title: string, content?: Content | string, opt?: object): Promise<boolean> {
  if (content) {
    return app(title, getContent(content), "confirm", opt);
  }
  return app(title, "", "alert", opt);
};

message.confirm = function(title: string, content?: Content | string, opt?: object): Promise<boolean> {
  return message(title, content, opt);
};

message.alert = function(title: string, content?: Content | string, opt?: object) {
  if (content) {
    return app(title, getContent(content), "alert", opt);
  }
  return app("", title, "alert", opt);
};

message.copy = function(content?: Content | string, opt?: object) {
  return app("", getContent(content), "alert", opt);
};

message.custom = function(title?: string, content?: string, type: "alert" | "confirm" = "alert", opt?: object) {
  if (title) {
    return app(title, content || "", type, opt);
  }
  if (content) {
    return app("", content, type, opt);
  }
};

export default message;
