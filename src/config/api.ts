/**
 * @file 接口地址
 * @author svon.me@gmail.com
 */
export const home = {
  summary: "/api/v1/dapps/summary", // 数据汇总，基础信息
  topicRank: "/api/v1/dapps/topic/rank", // home页topic table切换
  recommend: "/api/v1/dapps/topic/recommend", // 推荐话题
  trend: "/api/v1/dapps/trend", // 趋势
  top3: "/api/v1/dapps/topic/projects/top3", // 话题项目top3
  detail: "/api/v1/dapps/topic/detail", // 话题详情
  projects: "/api/v1/dapps/topic/projects", // 话题项目列表
  platforms: "/api/v1/dapps/platforms", // TGE平台列表
};

export const dapp = {
  list: "/api/v1/dapps/ido", // IDO项目列表
  igoList: "/api/v1/dapps/igo", // IGO项目列表
  nftList: "/api/v1/dapps/nft", // nft项目列表
  tabs: "/api/v1/site/config", // 项目类型搜索条件
  ixo: "/api/v1/dapps/ixo",
  airdropList: "/api/dapps/v1/airdrop", //空投首页列表
  investList: "/api/dapps/v1/airdrop", //投融资列表
};

export const blog = {
  adv: "/api/blog/v1/adv", // 广告
  tabs: "/api/blog/v1/groups", // 分组
  list: "/api/blog/v1/blogs", // 列表
  detail: "/api/blog/v1/blog", // 详情
  unLock: "/api/blog/v1/open", // 博客解锁
  lockStatus: "/api/blog/v1/share_status", // 查询博客解锁状态
};

export const quota = {
  list: "/api/v2/posts", // 指标列表
  details: "/api/v2/posts/{id}/details", // 指标详情
  recommend: "/api/v1/relevant", // 推荐
  follow: "/api/v3/charts/{id}/follow", // 关注
  unfollow: "/api/v3/charts/{id}/unfollow", // 取消关注
};

export const user = {
  refreshToken: "/api/v1/users/refresh_token", // 刷新 token
  info: "/api/v1/users/my", // 用户详情
  resetMobilePassword: "/api/v1/users/change_password", // 手机号重置密码
  resetEmailPassword: "/api/v1/users/email_change_password", // 重置邮箱密码
  getEmailCaptcha: "/api/v2/users/email_send_verification_code", // 邮箱验证码
  getMobileCaptcha: "/api/v1/users/forget_pass_captcha", // 手机验证码
  registerEmail: "/api/v1/users/email_signup", // 邮箱注册
  emailLogin: "/api/v1/users/email_login", // 邮箱登录
  mobileLogin: "/api/v1/users/login", // 手机号登录
  updateEmail: "/api/v1/users/bind_email", // 修改邮箱
};

export const common = {
  areaCodeList: "/api/v1/area_codes/", // 电话区号
  chainSiteConfig: "/api/v1/site/config", // 公链信息
  tidingTime: "/api/generic/alert/web/new_add", // 新数据消息
  adList: "/api/v2/commercial", // 广告
};
