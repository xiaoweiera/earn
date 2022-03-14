// @ts-ignore
import * as ZStdCode from "zstd-codec";
import { StringToUint8Array, Uint8ArrayToString } from "./value";

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
