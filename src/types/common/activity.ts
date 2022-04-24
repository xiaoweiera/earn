/**
 * @file 活动
 * @author svon.me@gmail.com
 */

import { Language } from "../language/";

// 活动类型
export enum Activity {
  invite = "invite",
}

export enum Presentation {
  link = "LINK",
  qrcode = "QRCODE",
}

interface Method {
  name: string; // 名称
  logo: string; // 默认图标
  highlight_logo: string; // 高亮图标
}

export interface ShareItem {
  url: string; // 链接
  presentation: Presentation;
  method: Method;
}

export enum ActivityStatus {
  UNCENSORED = "UNCENSORED", // 未审核
  UPCOMING = "UPCOMING", // 即将开始
  ONGOING = "ONGOING", // 进行中
  ENDED = "ENDED", // 活动结束，时间到期
  COMPLETED = "COMPLETED", // 活动结束，奖励已被领取完毕
}

// 邀请数据详情
export interface Invite {
  id: string | number;
  status: ActivityStatus;
  language: Language;
  name: string; // 标题
  cover: string; // 封面
  description: string; // 活动内容
  receive_text: string; // 按钮文案
  success_text: string; // 邀请成功文案
  begin_time: number; // 开始时间
  end_time: number; // 结束时间
  partners_poster: string; // 合作伙伴
  share_links: ShareItem[];
}
