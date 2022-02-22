/**
 * @file 接口地址
 * @author svon.me@gmail.com
 */

export const dapp = {
	list: "/api/v1/dapps/ido", //IDO项目列表
	IGOList: "/api/v1/dapps/igo", //IGO项目列表
	nftList: "/api/v1/dapps/nft", //nft项目列表
	tabs: "/api/v1/site/config", //项目类型搜索条件
};

export const blog = {
	adv: '/api/blog/v1/adv',     // 广告
	tabs: '/api/blog/v1/groups', // 分组
	list: "/api/blog/v1/blogs",  // 列表
	detail: "/api/blog/v1/blog",  // 详情
};

export const user = {
	info: "/api/v1/users/my", // 用户详情
	resetEmailPassword: "/api/v1/users/email_change_password", // 重置邮箱密码
	getEmailCaptcha: "/api/v2/users/email_send_verification_code", // 邮箱验证码
	registerEmail: "/api/v1/users/email_signup", // 邮箱注册
}

export const common = {
	areaCodeList: "/api/v1/area_codes/"
}
