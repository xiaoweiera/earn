// 修复 tsconfig paths 在编译阶段不生效的问题
require('module-alias/register');

const argv = require("@fengqiaogang/argv");

// 获取程序对象
const { main } = require("./app");

main(argv).then(function ({ http}) {
  const opt = http.address();
  console.log("http://localhost:%s", opt?.port || "3333");
});
