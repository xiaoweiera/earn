/**
 * @file 导航菜单配置
 * @author svon.me@gmail.com
 */
import { Lang } from "src/types/language";
import { config as routerConfig } from "src/router/config";



const apiName = {
  api: "api",
};

export const names = {
  api: apiName,
};

export const headers = function (lang?: Lang) {
  return [
    {
      name: "API", // dApp
      href: routerConfig.api,
    },
  ];

  // DApp(lang), Ranks(lang), APY(lang), Address(lang)
  // list.push(Portfolio(lang), TopicList(lang));
  // list.push(Quota(lang), Blog(lang));
};
