// 修复 tsconfig paths 在编译阶段不生效的问题
require('module-alias/register');

const _ = require("lodash");
const argv = require("@fengqiaogang/argv");
// 解析本地 env 配置
const {getConfig} = require("../config/env");
const {main} = require("./app");

// 获取 env 配置
getConfig(argv).then(function (data) {
  // 写入环境变量中
  _.each(data, function (value, key) {
    process.env[key] = value;
  });
  return data;
}).then(function () {
  // 执行程序
  return main();
}).then(function ({http, config}) {
  // const opt = http.address();
  console.log("http://localhost:%s", config.port);
  console.log("http://127.0.0.1:%s", config.port);
});
