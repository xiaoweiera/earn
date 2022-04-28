/**
 * @file
 * @author zhangkun@163.com
 */
import I18n from "src/utils/i18n";
import API from "src/api";
import { FormData } from "src/types/dapp/apply";

export const rule = () => {
  const i18n = I18n();
  return {
    name: [{ required: true, trigger: ["blur", "change"], message: i18n.apply.rules.required }],
    logo: [{ required: true, trigger: ["blur", "change"], message: i18n.apply.rules.required }],
    website: [{ required: true, trigger: ["blur", "change"], message: i18n.apply.rules.required, type: "url" }],
    categories: [
      {
        required: true,
        type: "array",
        min: 1,
        trigger: ["blur", "change"],
        message: i18n.apply.rules.checkbox,
      },
    ],
    chains: [
      {
        required: true,
        type: "array",
        min: 1,
        trigger: ["blur", "change"],
        message: i18n.apply.rules.checkbox,
      },
    ],
    description: [{ required: true, trigger: ["blur", "change"], message: i18n.apply.rules.required }],
    online_time: [{ required: true, trigger: ["blur", "change"], message: i18n.apply.rules.required }],
    username: [{ required: true, trigger: ["blur", "change"], message: i18n.apply.rules.required }],
    contact: [
      {
        trigger: ["blur", "change"],
        message: "",
        type: "email",
        transform: function (value: string) {
          if (/^[0-9]{8,}$/.test(value)) {
            return `${value}@xxx.com`;
          }
          return value;
        },
      },
    ],
    discord: [{ required: false, trigger: ["blur", "change"], message: i18n.apply.rules.url, type: "url" }],
    twitter: [{ required: false, trigger: ["blur", "change"], message: i18n.apply.rules.url, type: "url" }],
    telegram: [{ required: false, trigger: ["blur", "change"], message: i18n.apply.rules.url, type: "url" }],
    personal_telegram: [{ required: true, trigger: ["blur", "change"], message: i18n.apply.rules.required }],
  };
};

export class Model extends API {
  // 获取项目类型和公链
  getOptionData() {
    return this.dApp.getOptionData();
  }
  // 提交表单
  onSubmit(data: FormData) {
    return this.dApp.onSubmit(data);
  }
}
