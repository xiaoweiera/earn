// 修复 tsconfig paths 在编译阶段不生效的问题
require('module-alias/register');

const _ = require("lodash");
const argv = require("@fengqiaogang/argv");

_.each(argv, function (value, key) {
  process.env[key] = value;
});

// 获取程序对象
const { main } = require("./app");

main().then(function ({ http, config}) {
  const opt = http.address();
  console.log("http://localhost:%s", config.port);
});
