/**
 * @file 钱包相关数据
 * @author svon.me@gmail.com
 */

import { ref } from "vue";
import { isLogin } from "src/logic/user/login";

export const wallet_address = ref<string>("");

export const isConnect = function () {
  return !!(isLogin() && wallet_address.value);
};
