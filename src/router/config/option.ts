import { dashboard } from "src/config/";

const user = {
    index: "/account",
    login: "/account/login", // 登录
    logout: "/account/logout", // 退出
    register: "/account/register", // 注册
    forget: "/account/forget", // 找回密码
    updateEmail: "/account/update/email", // 修改邮箱
};

export const config = {
    dashboard,
    E404: "/404",
    api: "/w-api",
    token: "/token",


    earn: "/earn",
    follow:"/follow",
    user,
};
