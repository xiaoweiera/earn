/**
 * @file
 * @author zhangkun@163.com
 */

import I18n from "src/utils/i18n";

export const downList = function () {
  const i18n = I18n();
  return [
    { mTitle: i18n.downLoad.dataTitle, subTitle: i18n.downLoad.dataSubTitle, img: i18n.downLoad.dataImg },
    { mTitle: i18n.downLoad.dappTitle, subTitle: i18n.downLoad.dappSubTitle, img: i18n.downLoad.dappImg },
    { mTitle: i18n.downLoad.apyTitle, subTitle: i18n.downLoad.apySubTitle, img: i18n.downLoad.apyImg },
  ];
};
