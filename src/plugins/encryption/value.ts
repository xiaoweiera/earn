/**
 * @file 字符串压缩，解压
 * @author svon.me@gmail.com
 */
import { getEnv } from "src/config/";
// @ts-ignore
import * as ZStdCode from "zstd-codec";

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

const getZStdCodec = function () {
  if (ZStdCode.default) {
    return ZStdCode.default.ZstdCodec;
  }
  return ZStdCode.ZstdCodec;
};

export const compress = async function (value: string): Promise<string> {
  const ZStdCodec = getZStdCodec();
  return new Promise(function (resolve) {
    ZStdCodec.run((ZStd: any) => {
      const simple = new ZStd.Simple();
      const text = StringToUint8Array(value);
      // @ts-ignore
      const data = simple.compress(text, 5);
      const str = Uint8ArrayToString(data);
      resolve(str);
    });
  });
};

export const decompress = async function (value: string): Promise<string> {
  const ZStdCodec = getZStdCodec();
  return new Promise(function (resolve) {
    ZStdCodec.run((ZStd: any) => {
      const simple = new ZStd.Simple();
      const text = StringToUint8Array(value);
      // @ts-ignore
      const data = simple.decompress(text, 5);
      const str = Uint8ArrayToString(data);
      resolve(str);
    });
  });
};
