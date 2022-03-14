/**
 * @file 字符串压缩，解压
 * @author svon.me@gmail.com
 */
import { getEnv } from "src/config/";

export const StringToUint8Array = function (str: string): Uint8Array {
  const len = str.length;
  const arr: number[] = new Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = str.charCodeAt(i);
  }
  return new Uint8Array(arr);
};

export const Uint8ArrayToString = function (array: Uint8Array): string {
  let string = "";
  for (let i = 0, len = array.length; i < len; i++) {
    string += String.fromCharCode(array[i]);
  }
  return string;
};

export const key = "value";
export const a = function (): string {
  const env = getEnv();
  return env.VITE_secret;
};
