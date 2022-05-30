/**
 * @file
 * @author zhangkun@163.com
 */

export interface WxConfig {
  appId: string; // 必填，公众号的唯一标识
  timestamp: number; // 必填，生成签名的时间戳
  nonceStr: string; // 必填，生成签名的随机串
  signature: string; // 必填，签名，见附录1
  jsApiList?: []; // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
}

export interface ShareInfo {
  title: string; //分享标题
  link: string; //分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
  desc: string; //分享描述
  imgUrl?: string; //分享图标
}
