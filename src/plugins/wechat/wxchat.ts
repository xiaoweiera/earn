/**
 * @file 微信分享
 * @author zhangkun@163.com
 */

import API from "src/api";
import I18n from "src/utils/i18n/";
import type { ShareInfo } from "src/types/wxchat";

const getWxConfig = function (url: string) {
  const api = new API();
  return api.wx.getWxConfig({ url });
};
export const waChatShare = async function (wx: any, config: ShareInfo) {
  const i18n = I18n();
  const result = await getWxConfig(config.link);
  if (!result) {
    return false;
  }
  wx.config({
    debug: false,
    appId: result.appId,
    timestamp: result.timestamp,
    nonceStr: result.nonceStr,
    signature: result.signature,
    jsApiList: ["updateTimelineShareData", "updateAppMessageShareData"],
    openTagList: ["wx-open-launch-app"],
  });
  wx.ready(() => {
    const imgDefault = "https://res.kingdata.xyz/static/kingdata.png";
    // 通用分享给好友、qq
    wx.updateAppMessageShareData({
      title: config.title, //分享标题
      desc: config.desc, //分享描述
      link: config.link, //分享链接
      imgUrl: config.imgUrl || imgDefault, //分享icon
      success: function () {
        // 设置成功
      },
      cancel: function () {
        //失败
      },
    });
    // 分享到朋友圈、qq 空间
    wx.updateTimelineShareData({
      title: config.title || i18n.home.webInfo.home.title, //分享标题
      link: window.location.href, //分享链接
      imgUrl: config.imgUrl || imgDefault, //分享icon
      success: function () {
        // 设置成功
      },
      cancel: function () {
        //失败
      },
    });
  });
};
