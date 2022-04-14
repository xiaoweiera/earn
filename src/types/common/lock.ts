/**
 * @file 解锁
 * @author svon.me@gmail.com
 */

export enum Type {
  blog = "blog",
}

export interface LockData {
  share_required: boolean; // 是否开启好友助力
  share_target: number; // 好友助力目标人数
  share_progress: number; // 好友助力进度
  share_unlocked: boolean; // 好友助力是否达成目标
}
