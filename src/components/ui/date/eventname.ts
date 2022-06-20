/**
 * @file 事件名称
 */

import { flatten } from "ramda";
import { Ref, toRaw } from "vue";

enum DateEventName {
  value = "uiDate",
}

export const getDateValue = function (date: Ref<number[][]>) {
  if (date) {
    const [times = []] = (date.value ? date.value : toRaw(date)) as number[][];
    const [from_ts = 0, to_ts = 0] = flatten(times);
    return { from_ts: Math.floor(from_ts / 1000), to_ts: Math.floor(to_ts / 1000) };
  }
  return { from_ts: null, to_ts: null };
};

export default DateEventName;
