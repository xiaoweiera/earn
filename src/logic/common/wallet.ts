/**
 * @file 钱包相关数据
 * @author svon.me@gmail.com
 */

import { ref } from "vue";
import {getValue} from "src/utils/ssr/ref";
import {User} from "src/types/common/user";

export const address = ref<string>("");

export const isConnect = function () {
	const user = getValue<User>("common.user", {} as User);
	return !!(user && user.id && address.value);
}
