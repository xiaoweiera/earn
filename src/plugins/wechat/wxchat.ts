/**
 * @file
 * @author zhangkun@163.com
 */

import wx from "weixin-js-sdk-ts";
import { ShareInfo, WxConfig } from "src/types/wxchat";
import { Model } from "src/logic/wxchat";
import window from "src/plugins/browser/window";
import { oss } from "src/config";
import I18n from "src/utils/i18n/";
import { getEnv } from "src/config";

export const getWxConfig = async function () {
  const api = new Model();
  const env = getEnv();
  const params = {
    url: env.VITE_api,
  };
  return await api.wx.getWxConfig<WxConfig>(params);
};
export const ShareWx = async function (config: ShareInfo) {
  const i18n = I18n();
  const result: WxConfig = await getWxConfig();
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
    const imgDefault = `${oss}/nav/kingdata.png`;
    // 通用分享给好友、qq
    wx.updateAppMessageShareData({
      title: config.title || i18n.home.webInfo.home.title, //分享标题
      desc: config.desc || i18n.home.webInfo.home.des, //分享描述
      link: window.location.href, //分享链接
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
