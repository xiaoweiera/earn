/**
 * @file 日志记录
 * @author svon.me@gmail.com
 */

import { Command, getEnv } from "src/config/";

// 根据环境觉得是否输出日志
const IsOutput = function () {
  const env = getEnv();
  return env.VITE_command !== Command.build;
};

export const log = function (...args: Array<any>) {
  if (args.length > 0 && IsOutput()) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};

export const warn = function (...args: Array<any>) {
  if (args.length > 0) {
    console.warn(...args);
  }
};

export const info = function (...args: Array<any>) {
  if (args.length > 0) {
    // eslint-disable-next-line no-console
    console.info(...args);
  }
};

export const debug = function (...args: Array<any>) {
  if (args.length > 0) {
    // eslint-disable-next-line no-console
    console.debug(...args);
  }
};

export const error = function (...args: Array<any>) {
  if (args.length > 0) {
    console.error(...args);
  }
};

export const dir = function (...args: Array<any>) {
  if (args.length > 0 && IsOutput()) {
    // eslint-disable-next-line no-console
    console.dir(...args);
  }
};

export const time = function (label: string) {
  if (label && IsOutput()) {
    // eslint-disable-next-line no-console
    console.time(label);
  }
};

export const timeEnd = function (label: string) {
  if (label && IsOutput()) {
    // eslint-disable-next-line no-console
    console.timeEnd(label);
  }
};
