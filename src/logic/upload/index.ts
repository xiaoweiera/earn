/**
 * @file
 * @author zhangkun@163.com
 */
import I18n from "src/utils/i18n";
import API from "src/api/";
import Dao from "src/plugins/dao/axios";
import { forEach } from "src/utils";

const getFileName = function (file: File): string {
  return file.name;
};

const error = () => {
  const i18n = I18n();
  return {
    message: i18n.common.api.wrong,
  };
};

// 图片上传
export const uploadImage = async (file: File) => {
  const request = new Dao();
  const model = new API();
  const name = getFileName(file);
  // 获取签名
  const option: any = await model.upload.getPolicy(name);
  // 签名为空时
  if (!option.url) {
    // 提示错误信息
    return Promise.reject(error());
  }
  const { fields, preview_url } = option;
  const query = new FormData();
  forEach(function (value: string, key: string) {
    query.append(key, value);
  }, fields);
  // file 文件必须放在最后
  query.append("file", file);
  try {
    await request.post(option.url, query);
    return preview_url;
  } catch (e) {
    // todo
  }
  // 提示错误信息
  return Promise.reject(error());
};
