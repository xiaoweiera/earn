export enum Type {
  email = "email", // 邮箱登录
  mobile = "mobile", // 手机号登录
}

export interface User {
  area_code: number;
  avatar_url: string; // 头像地址
  email: string; // 邮件地址
  expired_at: string;
  follow_charts_count: number;
  follow_posts_count: number;
  follow_push_enabled: boolean;
  follow_topics_count: number;
  growthpad_invited_count: number;
  id: number; // 用户id
  invited_count: number; // 邀请人数
  is_evaluator: boolean;
  is_vip: boolean;
  is_whale_address_beta_user: boolean;
  left_days: number;
  mobile: number;
  my_invitation_code: string; // 邀请码
  nickname: string; // 昵称
  points: number;
  recommend_push_enabled: boolean;
  registration_rank: number;
  user_wallet_address: string[];
  username: string; // 名称
  vip_effective_date: string;
  vip_expiration_date: string;
  vip_level: string; // vip 等级
  web_hook: string; // 绑定webhook
}
