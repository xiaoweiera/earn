/**
 * @file airdrop方法
 * @author zhangkun@163.com
 */
import { dateYMDFormat, isAfter, dateDiffData, dateNow } from "src/utils"

import I18n from "src/utils/i18n";
export const timeValue = function (startAt?: string | number, startEnd?: string | number) {
  const i18n = I18n();
  if (startAt && startEnd) {
    const start = dateYMDFormat(startAt);
    const end = dateYMDFormat(startEnd);
    // 如果项目未开始 (开始时间大于当前时间)
    if (isAfter(startAt)) {
      const diff = dateDiffData(dateNow(), startAt);
      if (diff.day > 0) {
        return `${start} - ${end}, ${i18n.template(i18n.common.time.countDown.started.day, {
          count: diff.day
        })}`;
      }
      if (diff.hour > 0) {
        return `${start} - ${end}, ${i18n.template(i18n.common.time.countDown.started.hour, {
          count: diff.hour
        })}`;
      }
      if (diff.minute > 0) {
        return `${start} - ${end}, ${i18n.template(i18n.common.time.countDown.started.minute, {
          count: diff.minute
        })}`;
      }
    }
    // 如果项目未结束 （结束时间大于当前时间）
    if (isAfter(startEnd)) {
      const diff = dateDiffData(dateNow(), startEnd);
      if (diff.day > 0) {
        return `${start} - ${end}, ${i18n.template(i18n.common.time.countDown.ended.day, {
          count: diff.day
        })}`;
      }
      if (diff.hour > 0) {
        return `${start} - ${end}, ${i18n.template(i18n.common.time.countDown.ended.hour, {
          count: diff.hour
        })}`;
      }
      if (diff.minute > 0) {
        return `${start} - ${end}, ${i18n.template(i18n.common.time.countDown.ended.minute, {
          count: diff.minute
        })}`;
      }
    }
    return `${start} - ${end}`;
  }
  // 有开始时间，无结束时间
  if (startAt) {
    // 开始时间大于当前时间
    const start = dateYMDFormat(startAt);
    // 如果项目未开始 (开始时间大于当前时间)
    if (isAfter(startAt)) {
      const diff = dateDiffData(dateNow(), startAt);
      if (diff.day > 0) {
        return `${start}, ${i18n.template(i18n.common.time.countDown.started.day, {
          count: diff.day
        })}`;
      }
      if (diff.hour > 0) {
        return `${start}, ${i18n.template(i18n.common.time.countDown.started.hour, {
          count: diff.hour
        })}`;
      }
      if (diff.minute > 0) {
        return `${start}, ${i18n.template(i18n.common.time.countDown.started.minute, {
          count: diff.minute
        })}`;
      }
    }
    return start;
  }
  // 有结束时间，无开始时间
  if (startEnd) {
    const end = dateYMDFormat(startEnd);
    // 如果项目未结束 （结束时间大于当前时间）
    if (isAfter(startEnd)) {
      const diff = dateDiffData(dateNow(), startEnd);
      if (diff.day > 0) {
        return `${end}，${i18n.template(i18n.common.time.countDown.ended.minute, {
          count: diff.day
        })}`;
      }
      if (diff.hour > 0) {
        return `${end}，${i18n.template(i18n.common.time.countDown.ended.hour, {
          count: diff.hour
        })}`;
      }
      if (diff.minute > 0) {
        return `${end}，${i18n.template(i18n.common.time.countDown.ended.minute, {
          count: diff.minute
        })}`;
      }
    }
    return end;
  }
}