import I18n from "src/utils/i18n";
import { config } from "src/router/config";
import { MenuItem } from "src/types/menu";
import { Lang } from "src/types/language";

export const name = {
  alert: "address-alert",
  find: "address-find",
  portfolio: "address-portfolio",
};

export const Address = function (lang?: Lang): MenuItem {
  const i18n = I18n(lang);
  return {
    name: i18n.menu.address.address, // 大户地址追踪
    href: config.address,
    newTip: false,
    children: [
      {
        id: name.alert,
        name: i18n.menu.address.change,
        header: true,
        more: true,
        icon: "icon-dahudizhiyidong",
        href: `${config.address}/alerts`,
      },
      {
        id: name.find,
        name: i18n.menu.address.find,
        icon: "icon-faxiandahudizhi",
        more: true,
        header: true,
        href: `${config.address}/find`,
      },
    ],
  };
};

export const Portfolio = function (lang?: Lang): MenuItem {
  const i18n = I18n(lang);
  return {
    id: name.portfolio,
    name: i18n.menu.address.detail, // 投资组合
    icon: "icon-touzizuhe",
    href: config.portfolio,
    newTip: false,
    expand: "HeaderAddressChange",
  };
};
