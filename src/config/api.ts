/**
 * @file 接口地址
 * @author svon.me@gmail.com
 */
export const home = {
	summary:"/api/v1/dapps/summary", //数据汇总，基础信息
	topicRank:"/api/v1/dapps/topic/rank", //home页topic table切换
	recommend:"/api/v1/dapps/topic/recommend", //推荐话题
}

export const dapp = {
	list: "/api/dapps/v1/new/projects"
};

export const blog = {
	adv: '/api/blog/v1/adv',     // 广告
	tabs: '/api/blog/v1/groups', // 分组
	list: "/api/blog/v1/blogs",  // 列表
	detail: "/api/blog/v1/blog",  // 详情
};

export const user = {
	info: "/api/v1/users/my", // 用户详情
	resetMobilePassword: "/api/v1/users/change_password", // 手机号重置密码
	resetEmailPassword: "/api/v1/users/email_change_password", // 重置邮箱密码
	getEmailCaptcha: "/api/v2/users/email_send_verification_code", // 邮箱验证码
	getMobileCaptcha: "/api/v1/users/forget_pass_captcha", // 手机验证码
	registerEmail: "/api/v1/users/email_signup", // 邮箱注册
	emailLogin: "/api/v1/users/email_login", // 邮箱登录
	mobileLogin: '/api/v1/users/login', // 手机号登录
}

export const common = {
	areaCodeList: "/api/v1/area_codes/"
}
