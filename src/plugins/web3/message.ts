/**
 * @file 错误提示
 */
import safeGet from "@fengqiaogang/safe-get";

export const errorMessageContent = {
  4001: "连接失败，请重试",

  5001: "当前网络与期望的网络不一致",
  5002: "网络信息不存在，请检查 chainID 是否正确", // 指定的网络 id 未能匹配出网络信息
  5003: "授权未完成，请重试", // 用户取消授权
  5004: "授权失败，请重试",

  6001: "请先关闭已有的 MetaMask 连接窗口后在试一次",
  6002: "请先安装 MetaMask 插件并且登录",
};

export const getErrorMessageContent = function(code?: string | number): string {
  if (code) {
    const message = safeGet<string>(errorMessageContent, `${code}`);
    if (message) {
      return message;
    }
  }
  return errorMessageContent["4001"];
};
