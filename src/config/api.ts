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
  tutorial: "/api/blog/v1/blogs", //空投教程列表
  apy: "/api/apy/ninja/recommended_pool_tokens", //首页推荐矿池币种列表
  hotProject: "/api/dapps/v1/recommendations", //热门项目列表
  lineChart: "/api/apy/whale/address_fund_trending", //大户地址图表
  addressInfo: "/api/apy/whale/address", //大户历史交易
};

export const dapp = {
  // detail: "/api/v1/dapps/detail", // 项目库详情
  detail: "/api/v1/bff/dapp/projects/{id}", // 项目库详情
  list: "/api/v1/dapps/ido", // IDO项目列表
  igoList: "/api/v1/dapps/igo", // IGO项目列表
  nftList: "/api/v1/dapps/nft", // nft项目列表
  tabs: "/api/v1/site/config", // 项目类型搜索条件
  ixo: "/api/v1/dapps/ixo",
  airdropList: "/api/dapps/v1/airdrop", //空投列表
  operation: "/api/v1/dapps/airdrop_recommended", //空投运营精选
  investList: "/api/dapps/v1/investments", //投融资项目列表
  funds: "/api/dapps/v1/investors", //投融资机构列表
  roundList: "/api/dapps/v1/investment_stage_names", //投融资轮次
  userData: "/api/v1/dapps/chart/user", //用户资产图表
  marketCapData: "/api/v1/dapps/chart/marketcap", //用户市值图表
  TVLData: "/api/v1/dapps/chart/tvl", //用户TVL图表
  floorData: "/api/v1/dapps/chart/floor_price", //地板价图表
  tokenData: "/api/v1/dapps/cryptocurrency/price_chart", //代币图表
  tokenList: "/api/v1/dapps/cryptocurrency", //代币列表
  projectInfo: "/api/v1/dapps/cryptocurrency", //项目信息
  news: "/api/v1/dapps/news", //news列表
  options: "/api/dapps/{version}/apply/content", //获取项目类型
  commit: "/api/dapps/{version}/apply/submit", //提交项目
  holder: "/api/v1/dapps/{project_id}/holder_info", //项目NFT持有人信息
};

export const blog = {
  adv: "/api/blog/v1/adv", // 广告
  tabs: "/api/blog/v1/groups", // 分组
  list: "/api/blog/v1/blogs", // 列表
  detail: "/api/blog/v1/blog", // 详情
  unLock: "/api/blog/v1/open", // 博客解锁
  lockStatus: "/api/blog/v1/share_status", // 查询博客解锁状态
  dApp: "/api/blog/v1/tutorial_dapps", // 博客关联的 DApp 列表
};

export const quota = {
  list: "/api/v2/posts", // 指标列表
  details: "/api/v2/posts/{id}/details", // 指标详情
  recommend: "/api/v1/relevant", // 推荐
  follow: "/api/v3/charts/{id}/follow", // 关注
  unfollow: "/api/v3/charts/{id}/unfollow", // 取消关注
  indicator: "/api/v1/charts/recommended", //推荐指标
  indicatorDetail: "api/v2/charts/{id}/details", //推荐指标
  indicatorNews: "/api/v1/charts/{indicatorID}/posts", // 指标相关快讯列表
};

export const user = {
  refreshToken: "/api/v1/users/refresh_token", // 刷新 token
  info: "/api/v1/users/my", // 用户详情
  resetMobilePassword: "/api/v1/users/change_password", // 手机号重置密码
  resetEmailPassword: "/api/v1/users/email_change_password", // 重置邮箱密码
  getEmailCaptcha: "/api/v2/users/email_send_verification_code", // 邮箱验证码
  getMobileCaptcha: "/api/v1/users/forget_pass_captcha", // 手机验证码
  registerEmail: "/api/v1/users/email_signup", // 邮箱注册
  registerInviteEmail: "/api/dapps/v1/activities/{id}/receive",
  emailLogin: "/api/v1/users/email_login", // 邮箱登录
  mobileLogin: "/api/v1/users/login", // 手机号登录
  updateEmail: "/api/v1/users/bind_email", // 修改邮箱
};

export const common = {
  areaCodeList: "/api/v1/area_codes/", // 电话区号
  chainSiteConfig: "/api/v1/site/config", // 公链信息
  tidingTime: "/api/generic/alert/web/new_add", // 新数据消息
  adList: "/api/v2/commercial", // 广告
  system: "/api/v1/system", //下载链接
  ipValidate: "/api/v1/ip/validate", // 判断 Ip 来源
  visit: "/api/v1/statistic/do_visit_statistic", // pv/uv 统计
  search: "/api/v1/dapps/search", // 搜索
};

export const rank = {
  chainsList: "/api/dapps/v1/chains", //链
  groups: "/api/dapps/{version}/groups", //分组
  dappTable: "/api/dapps/v1/rank/dapps", //dapp列表
  nftTable: "/api/dapps/v1/rank/nfts", //nft列表
  dappChart: "/api/dapps/v1/rank/chart/tvl", //dapp chart
  nftChart: "/api/dapps/v1/rank/chart/volume", //nft Chart
};
export const comment = {
  list: "/api/dapps/v1/expand_comments", //评论列表
  isLike: "/api/dapps/v1/comment/like", //点赞
  push: "/api/dapps/v1/comment", //评论
  reply: "/api/dapps/v1/comment/reply", //回复
  deleteReply: "/api/dapps/v1/comment/reply", //删除评论
  star: "/api/v1/dapps/rating", // 评分
  suggest: "/api/v1/desired_metrics", //提建议
};
export const invest = {
  info: "/api/dapps/v1/investors/{investor_id}",
  investment: "/api/dapps/v1/investments",
};

export const activity = {
  invite: "/api/dapps/v1/activities/{id}",
};

export const upload = {
  policy: "/api/storage/s3_presigned", // 获取亚马逊 s3 签名
};
