/**
 * @file 运营活动
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
import type { Request, Response, NextFunction } from "express";
import { goHome } from "src/controller/common/redirect";
import { Activity } from "src/types/common/activity";

// 活动 - 邀请
export const invite = async function (req: Request, res: Response) {
  return res.send({
    title: "Activity - KingData",
    keywords: "",
    description: "",
  });
};

// 活动入口
export const app = async function (req: Request, res: Response, next: NextFunction) {
  const type = safeGet<string>(req.params, "type");
  try {
    if (type === Activity.invite) {
      return await invite(req, res);
    }
  } catch (e) {
    return res.send({});
  }
  return goHome(req, res);
};
