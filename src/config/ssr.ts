/**
 * @file 判断是否是浏览器环境
 * @constructor
 */

export const IsSSR = function(): boolean {
  try {
    if (typeof window === "undefined") {
      return true;
    }
  } catch (e) {
    // todo
  }
  return false;
};

export const IsNode = function(): boolean {
  return IsSSR();
};

export const IsBrowser = function(): boolean {
  const status = IsSSR();
  return !status;
};
