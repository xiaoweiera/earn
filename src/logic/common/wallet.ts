/**
 * @file 钱包相关数据
 * @author svon.me@gmail.com
 */

import { ref } from "vue";
import { isLogin } from "src/logic/user/login";

export const address = ref<string>("");

export const isConnect = function () {
	return !!(isLogin() && address.value);
}
