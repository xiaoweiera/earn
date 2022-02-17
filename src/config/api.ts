/**
 * @file 接口地址
 * @author svon.me@gmail.com
 */

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
	resetEmailPassword: "/api/v1/users/email_change_password", // 重置邮箱密码
	getEmailCaptcha: "/api/v2/users/email_send_verification_code", // 邮箱验证码
}
