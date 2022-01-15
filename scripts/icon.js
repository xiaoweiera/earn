/**
 * @file 图标处理
 * @author svon.me@gmail.com
 */

const fs = require("fs");
const r = require("ramda");
const path = require("path");
const axios = require("axios");
const config = path.join(__dirname, "..", "src/config");
const iconFonts = require(`${config}/iconfont`);
const safeGet = require("@fengqiaogang/safe-get");

async function getIconFont (link) {
  if (/^\/\//.test(link)) {
    link = `http:${link}`;
  }
  console.log(`download: "%s"`, link);
	const result = await axios.get(link, { responseType: "text" });
	const data = safeGet(result, "data");
  return r.map(function (value) {
    return value.replace(/[^\w-]/ig, "");
  }, data.match(/"(?:icon[\w-]+)"/ig));
}


async function main() {
  const promises = r.map(getIconFont, iconFonts);
  const result = await Promise.all(promises);
  const src = path.join(config, "iconname.ts");
  return new Promise(function (resolve, reject) {
    const data = {};
    r.forEach(function (value) {
      const key = value.toLocaleLowerCase();
      data[key] = value;
      data[key.replace(/^icon-/, "")] = value;
    }, [].concat(r.flatten(result)));
    const names = JSON.stringify(data, null, 2);
    const code = `export const iconData = ${names};`;
    fs.writeFile(src, code, "utf8", function (error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    })
  });
}

main().then(function () {
  console.log("icon success");
}).catch(function (e) {
  console.log(e);
});
