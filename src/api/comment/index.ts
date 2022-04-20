/**
 * 评论
 */

import * as api from "src/config/api";
import { DefaultValue, get, post, deleted, tryError, userToken } from "src/plugins/dao/http";
import ApiTemplate from "../template";

import safeGet from "@fengqiaogang/safe-get";
import { CommentModel, pushCommentModel, ReplyCommentModel, suggestModel } from "src/types/comment";

export default class extends ApiTemplate {
  //得到列表
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.comment.list, 0) // 定义一个 get 请求
  getCommentAndReply<T>(query: CommentModel): Promise<T> {
    const callback = function (data: object) {
      return safeGet(data, "results");
    };
    // 返回参数
    return [query, callback] as any;
  }
  //点赞
  @tryError(DefaultValue({})) // 处理默认值
  @post(api.comment.isLike)
  @userToken(true) // 点赞
  isLike<T>(target_id: number | string): Promise<T> {
    const query = { target_id };
    return [query] as any;
  }
  //评论
  @post(api.comment.push)
  @userToken(true) // 评论
  pushComment<T>(query: pushCommentModel): Promise<T> {
    return [query] as any;
  }
  //回复
  @post(api.comment.reply)
  @userToken(true) // 回复
  replyComment<T>(query: ReplyCommentModel): Promise<T> {
    return [query] as any;
  }
  //删除评论
  @deleted(api.comment.deleteReply)
  @userToken(true) // 删除评论
  deleteReply<T>(target_id: number | string): Promise<T> {
    const query = { target_id };
    return [query] as any;
  }
  //评分
  @post(api.comment.star)
  @userToken(true) // 评分
  star<T>(id: number, score: number): Promise<T> {
    const query = { id, score };
    return [query] as any;
  }
  //提建议
  @tryError(DefaultValue({})) // 处理默认值
  @post(api.comment.suggest) // 定义一个 get 请求
  suggest<T>(query: suggestModel): Promise<T> {
    // 返回参数
    return [query] as any;
  }
}
