/**
 * @file 公共逻辑
 * @author svon.me@gmail.com
 */

import {Router} from "express";
import {config} from "src/router/config";
import {userInfo, userLogout} from "./user";

const common = Router();
// 处理用户退出逻辑
common.all(config.user.logout, userLogout);

common.use(userInfo);

export default common;
