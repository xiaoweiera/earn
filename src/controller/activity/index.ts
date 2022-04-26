/**
 * @file 运营活动
 * @author svon.me@gmail.com
 */

import I18n from "src/utils/i18n/";
import API from "src/api/";
import { languageKey } from "src/config";
import safeGet from "@fengqiaogang/safe-get";
import type { Request, Response } from "express";
import { goHome } from "src/controller/common/redirect";
import { Activity, Invite } from "src/types/common/activity";
import * as alias from "src/utils/root/alias";

// 活动 - 邀请
export const invite = async function (req: Request, res: Response) {
  const id = safeGet<string>(req.params, "id");
  if (id) {
    const api = new API(req);
    const data = await api.activity.getInviteDetail<Invite>(id);
    const i18n = I18n(data?.language);
    req.query[languageKey] = i18n.getLang();

    return res.send({
      title: data.name ? `${data.name} - KingData` : "KingData",
      keywords: i18n.activity.tdk.keywords,
      description: i18n.activity.tdk.description,
      [alias.activity.invite.detail]: data,
    });
  }
};

// 活动入口
export const app = async function (req: Request, res: Response) {
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
