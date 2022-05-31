import dayjs from "dayjs";
import * as R from "ramda";
import { $ } from "src/plugins/browser/event";
import { getEnv } from "src/config";
import I18n from "src/utils/i18n/";
import { BigNumber } from "bignumber.js";
import { ElMessage } from "element-plus";
import { Language } from "src/types/language";
import message from "src/plugins/message";
import window from "src/plugins/browser/window";
import document from "src/plugins/browser/document";
import _ from "lodash";

export function colorHexToRGBA(sHex: string, alpha = 1) {
  // 十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  let sColor = sHex.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
    }
    return `rgba(${sColorChange.join(",")},${alpha})`;
  } else {
    return sColor;
  }
}

// apy的特殊处理，别更改
export const numberFormat = (value: any) => {
  const i18n = I18n();
  if (value === null) {
    return null;
  }
  const k = 10000;
  // @ts-ignore
  const sizes = ["", i18n.liquidity.numberUnit.wan, i18n.liquidity.numberUnit.yi, i18n.liquidity.numberUnit.wanyi];
  if (value < k) {
    return Math.round(value * 100) / 100;
  }
  const i: number = Math.floor(Math.log(value) / Math.log(k));
  const values = parseFloat((value / Math.pow(k, i)).toFixed(2));
  const unit = sizes[i];
  return values + unit;
};

export const toFixedNumber = (value: any, rounded = 2) => {
  if (!value && value !== 0) {
    return "";
  }
  const vil = Math.pow(10, rounded);
  return Math.round(value * vil) / vil;
};
export const percent2Precision = (value: any): string => {
  if (!value && value !== 0) {
    return "";
  }
  return `${toFixedNumber(value)}%`;
};
// 数字正负判断
export const numColor = (value: any) => {
  if (!value) {
    return "-";
  } else if (value >= 0) {
    return `+${toFixedNumber(value, 2)}`;
  } else {
    return toFixedNumber(value, 2);
  }
};
export const formatSmallTime = (date: string, format: string) => dayjs(parseInt(`${date}`)).format(format);
export const formatTime = (date: string, format: string) => dayjs(parseInt(`${date}000`)).format(format);
export const formatTimeMD = (date: string) => dayjs(parseInt(`${date}000`)).format("MM/DD");
export const formatTimeHour = (date: string) => dayjs(parseInt(`${date}000`)).format("M/DD HH:mm");
export const tooptipsModel = (item: any, color: any, value: any, unit: string, twoCol: boolean, maxWidth: number) => {
  const origin = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.35216 5.53165L5.03262 8.17072C4.77853 8.6789 4.25914 8.9999 3.69098 8.9999H1.33333C0.781043 8.9999 0.333328 8.55219 0.333328 7.9999C0.333328 7.44762 0.781043 6.9999 1.33333 6.9999H3.38196L5.53045 2.70293C6.02868 1.70646 7.49773 1.86772 7.76793 2.94854L9.64783 10.4682L10.9674 7.82908C11.2215 7.32091 11.7409 6.9999 12.309 6.9999H14.6667C15.2189 6.9999 15.6667 7.44762 15.6667 7.9999C15.6667 8.55219 15.2189 8.9999 14.6667 8.9999H12.618L10.4695 13.2969C9.9713 14.2934 8.50226 14.1321 8.23206 13.0513L6.35216 5.53165Z" fill="${color}"/></svg>`;
  const svg = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(origin)))}`;
  const info = unit === "$" ? `${item} ${unit}${value}` : `${item}  ${value}${unit}`;
  let dom = "";
  if (twoCol) {
    dom = `<span class="flex flex-1 items-center " style="min-width:${maxWidth}px" ><p style="font-size:12px;color:#272C33;line-height:1;" class="flex items-center"><img style="margin-bottom:1.5px;width:16px;height:auto;margin-right:5px;" src="${svg}"/> ${info}</p></span>`;
  } else {
    dom = `<span class="flex mr-1" ><p style="font-size:12px;color:#272C33;line-height:1;margin:6px 0 0;display:flex;
    align-items: center;"><img style="margin-bottom:1.5px;width:16px;height:auto;margin-right:5px;" src="${svg}"/> ${info}</p></span>`;
  }
  return dom;
};
export const toopTipsContainer = (divDoms: string[]) => {
  let domStr = "";
  const newDoms = divDoms.map((item) => {
    if (item) return item;
  });
  newDoms.forEach((item, i) => {
    let str = "";
    if (item) {
      if (i === 0) {
        str = `<div class="flex" >${item}`;
      } else {
        str = i % 2 === 0 ? `</div><div class="flex">${item}` : `<span class="pl-2">${item}</span>`;
      }
      domStr += str;
    }
  });
  domStr += "</div>";
  return `<div >${domStr}</div>`;
};

// 时间转化为时间戳
export function dataToTimestamp(time: string | number) {
  if (_.isNumber(time)) return time;
  return dayjs(time).valueOf() / 1000;
}

// 得到天颗粒度的时间
export const formatDefaultTime = (date: any, format: string) => {
  format = format || "YYYY-MM-DD";
  if (date) {
    if (typeof date !== "number") {
      return dayjs(date).format(format);
    }
    return dayjs(parseInt(`${date}000`)).format(format);
  } else {
    return dayjs().format(format);
  }
};
// 得到小时颗粒度的时间
export const formatHourTime = (date: number) => {
  if (date) {
    return dayjs(parseInt(`${date}000`)).format("MM/DD HH:mm");
  } else {
    return dayjs().format("MM/DD HH:mm");
  }
};
// 得到对应时间的时间戳  如 前7天 前30天
export const getagoTimeStamp = (day: number) => {
  return dataToTimestamp(dayjs().subtract(day, "days").format("YYYY-MM-DD"));
};
export const min_max = (min: any, max: any, v: any) => {
  if (v === null) {
    return [min, max];
  }
  if (min === null || min > v) {
    min = v;
  }
  if (max === null || max < v) {
    max = v;
  }
  return [min, max];
};

export const messageError = function (message: any): void {
  if (message) {
    if (typeof message === "string") {
      ElMessage.warning(message);
    } else {
      const values = R.values(message);
      const [text]: Array<string> = R.flatten(values);
      if (text) {
        ElMessage.warning(text);
      } else {
        ElMessage.warning(message);
      }
    }
  }
};

export const messageSuccess = function (text: string): void {
  ElMessage.success({
    message: text,
    type: "success",
    customClass: "hint",
  });
};

// copy
export const copyTxt = (text: string, alert?: boolean, msg?: string) => {
  const i18n = I18n();
  const input = document.createElement("textarea");
  if (input) {
    input.value = text;
    input.style.width = "1px";
    input.style.height = "1px";
    $("body").append(input);
    setTimeout(() => {
      input.select();
      document.execCommand("copy");
      $(input).remove();
    });
    if (alert) {
      // messageSuccess(i18n.common.message.copy)
      message.copy(
        {
          value: i18n.common.message.copyAlert,
          desc: msg || text,
        },
        {
          confirmButtonText: i18n.common.button.share,
        },
      );
    }
    return true;
  }
};
// copy message 弱提示
export const copyTxtMessage = (text: string, msg?: any) => {
  const dom = document.createElement("input");
  if (dom) {
    dom.setAttribute("value", text);
    document.body.appendChild(dom);
    dom.select();
    document.execCommand("copy");
    document.body.removeChild(dom);
    messageSuccess(msg);
  }
};
// 更改路由参数
export const changeRoute = (route: any, router: any, paramName: string, paramValue: string) => {
  const query = { ...route.query };
  query[paramName] = paramValue;
  router.replace({
    ...route,
    query: { ...query },
  });
};
// 更改路由参数传对象
export const changeRouteParam = (route: any, router: any, param: any) => {
  const query = { ...route.query };
  R.map((key) => (query[key] = param[key]), R.keys(param));
  router.replace({
    ...route,
    query: { ...query },
  });
};
// 省略token
export const smallToken = (tokenId: string) => {
  if (!tokenId) return;
  return `${tokenId.slice(0, 6)}......${tokenId.slice(tokenId.length - 4, tokenId.length)}`;
};
export const isToken = (token: string) => {
  const i18n = I18n();
  if (token && token.length === 42) {
    return true;
  }
  messageError(i18n.wallet.tokenError);
  return false;
};
export const subStr = (str: string) => {
  if (!str || str.length <= 7) return str;
  return `${str.slice(0, 7)}...`;
};
export const subStrByNumber = (str: string, number: number) => {
  if (!str || str.length <= number) return str;
  return `${str.slice(0, number)}...`;
};
// 弱提示框
export const messageTip = (content: string, typeName: string) => {
  const env = getEnv();
  ElMessage({
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: `<div class="flex items-center "><img class="w-4 h-4 -ml-4" src="${env.VITE_oss}/nav/successIcon.png"><span class="ml-4">${content}</span></div>`,
    // @ts-ignore
    type: typeName,
  });
};
// 得到两位小数
export const getSaveNumber = (v: any, number: number) => {
  const value = new BigNumber(v);
  return value.toFixed(number);
};
export const aboutCn = (value: any) => {
  const k = 10000;
  // @ts-ignore
  const sizes = ["", "万", "亿", "兆"];
  const v = new BigNumber(value);
  if ((value < 10000 && value >= 0) || (value < 0 && value > -2)) {
    return parseFloat(v.toFixed(2));
    // return Math.round(value * 100) / 100
  } else {
    let i: number = Math.floor(Math.log(Math.abs(value)) / Math.log(k));
    i = i <= 3 ? i : 3;
    // if(i>3) return v.toFixed(2)
    const values = parseFloat((Math.abs(value) / Math.pow(k, i)).toFixed(2));
    const unit = i <= 3 ? sizes[i] : sizes[3];
    return value >= 0 ? values + unit : `-${values}${unit}`;
  }
};
export const aboutEn = (value: any) => {
  const k = 1000;
  // @ts-ignore
  const sizes = ["", "K", "M", "B", "T"];
  const v = new BigNumber(value);
  if ((value < 10000 && value >= 0) || (value < 0 && value > -2)) {
    return parseFloat(v.toFixed(2));
    // return Math.round(value * 100) / 100
  } else {
    let i: number = Math.floor(Math.log(Math.abs(value)) / Math.log(k));
    i = i <= 4 ? i : 4;
    // if(i>3) return v.toFixed(2)
    const values = parseFloat((Math.abs(value) / Math.pow(k, i)).toFixed(2));
    const unit = i <= 4 ? sizes[i] : sizes[4];
    return value >= 0 ? values + unit : `-${values}${unit}`;
  }
};
// 更改数字文案
export const numberUnitFormat = (value: any, defaultValue = "-") => {
  if (!value) {
    return value === 0 ? 0 : defaultValue;
  }
  const i18n = I18n();
  if (i18n.getLang() === Language.cn) {
    return aboutCn(value);
  } else {
    return aboutEn(value);
  }
};
// 价格约分为 小数点非0两位有效数字，但最高不超过小数点后4位(0000)。
export const getVNumber = (value: any, zeroIndex: number, isFour: boolean) => {
  const v = new BigNumber(value);
  // @ts-ignore
  const intNumber = parseInt(Math.abs(v)).toString().length;
  if (isFour) {
    return v.precision(intNumber + 5).toFixed(5);
  } else {
    if (zeroIndex === 0) {
      return parseFloat(v.precision(intNumber + 4).toFixed(2));
    } else {
      return parseFloat(v.precision(intNumber + 4).toFixed(2 + zeroIndex));
    }
  }
};
// hour 小数后18位数字全展示，18位以后科学技术法
export const getBigNumber = (n: string | number) => {
  const v = new BigNumber(n);
  const newV = v.toFixed(20); // 科学技术法展开
  if (newV.includes(".")) {
    if (newV.split(".")[1].length < 19) return newV;
  }
  return parseFloat(newV);
};
// 数字格式化 约分
export const getRulesNumber = (v: any, isShowAll = false, defaultValue = "-") => {
  if (!v) {
    return v || (v === 0 ? 0 : defaultValue);
  }
  const bigV = new BigNumber(v);
  if (!bigV.toFixed().includes(".")) {
    return v;
  }
  const result = getVNumber(v, 0, true).toString();
  if (result.split(".")[1].split("0").length - 1 === 5) {
    return isShowAll ? getBigNumber(v) : "<0.00001"; // result等于0.00000
  } else {
    const twoNumber = result.split(".")[1].split("");
    let i = 0;
    for (let j = 0; j < twoNumber.length; j++) {
      if (twoNumber[j] === "0") {
        i++;
      } else {
        break;
      }
    }
    return getVNumber(result, i, false);
  }
};
// 统一用这个 isShowAll 是否展示小于0的数并且小数点后面小于18位或者大于18位带e的科学技术法，用于hovr上
export const formatRulesNumber = (v: any, isShowAll = false, defaultValue = "-") => {
  if (!v) {
    return v === 0 ? 0 : defaultValue;
  }
  const value = new BigNumber(v);
  if (parseFloat(value.toFixed()) > 1 || parseFloat(value.toFixed()) < -1) {
    return numberUnitFormat(v, defaultValue);
  } else {
    return getRulesNumber(v, isShowAll, defaultValue);
  }
};
// 统一用这个 isShowAll 是否展示小于0的数并且小数点后面小于18位或者大于18位带e的科学技术法，用于hovr上，默认保留两位
export const formatRulesPrice = (v: any, isShowAll: boolean) => {
  if (!v) {
    return v === 0 ? 0 : "-";
  }
  const value = new BigNumber(v);
  if (parseFloat(value.toFixed()) > 1 || parseFloat(value.toFixed()) < -1) {
    return parseFloat(value.toFixed(2));
  } else {
    return getRulesNumber(v, isShowAll);
  }
};
// tipModel单位
export const unitOrder = (v: any, unit: string) => {
  if (!unit) return formatRulesNumber(v, true);
  if (unit === "$") {
    return `${unit} ${formatRulesNumber(v, true)}`;
  } else {
    return formatRulesNumber(v, true) + unit;
  }
};
export const getCodeWidth = (name: string) => {
  let width = 0;
  name.split("").forEach((str: string) => {
    // @ts-ignore
    const code = str.charCodeAt();
    if (code >= 97 && code <= 122) {
      // a-z
      width += 8;
    } else if (code >= 65 && code <= 90) {
      // A-Z
      width += 10;
    } else if (code === 40 || code === 41) {
      // ( )
      width += 3;
    } else if (code === 32) {
      // ' '
      width += 3;
    } else if (code === 43) {
      // +
      width += 8;
    } else if (code >= 48 && code <= 57) {
      width += 3.5;
    } else {
      width += 13.5;
    }
  });
  return width;
};
export const getMaxWidth = (list: string[]) => {
  let max = 0;
  list.forEach((item) => {
    // @ts-ignore
    const width = getCodeWidth(item.seriesName);
    max = max === 0 ? width : width > max ? width : max;
  });
  return max;
};
export const clacLegendBoxWidth = (legends: string[]) => {
  let width = 0;
  legends.forEach((item: any, index: number) => {
    if (item || item === " ") {
      width += getCodeWidth(item);
      if (index > 0) {
        width += 15;
      }
    }
  });
  return width;
};
export const getLegendRow = (dom: any, legends: string[]) => {
  const width = clacLegendBoxWidth(legends);
  const boxWidth = dom.clientWidth - 24 * 2;
  return Math.ceil(width / boxWidth);
};
export const formatNumber = (v: number) => {
  if (!v) return 0;
  return v;
};
// 获取图标
const chartTipItem = (color: string, v: string) => {
  const svgType = `<svg t="1626927627838"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1456" width="16" height="16"><path d="M406.528 354.048L322.048 522.88A96 96 0 0 1 236.288 576H85.312a64 64 0 1 1 0-128h131.136L353.92 172.992c31.936-63.744 125.952-53.44 143.232 15.744l120.32 481.28 84.48-168.96A96 96 0 0 1 787.712 448h150.912a64 64 0 1 1 0 128h-131.136l-137.472 275.008c-31.936 63.744-125.952 53.44-143.232-15.744l-120.32-481.28z" fill="${color}" p-id="1457"></path></svg>`;
  const svg = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgType)))}`;
  return `<div style="font-size:12px;color:#272C33;line-height:1;margin:6px 0 0;line-height: 12px;" class="mt-2 md:mt-0 w-50 md:w-full flex items-center break-words whitespace-pre-wrap"><img style="margin-bottom:1.5px" src="${svg}" style="width:16px;height:auto;"/><div class="ml-1">${v}</div> </div>`;
};

export const tipResult = (title: string) => `<p style="font-size:12px;color:#272C33;line-height:1;margin:0;">${title}</p>`;
// 提示文字
export const getTip = (params: any) => {
  // 水印 遮盖有问题   需要改改改
  const time = formatTime(params[0].axisValue, "YYYY-MM-DD");
  const data = params[0].data; // {value:111,detail:''}
  const result = chartTipItem("rgba(0, 180, 100, 1)", `$${formatRulesNumber(data.value)}`);
  return `${tipResult(time)} ${result}`;
};
export const tolocaleUpperCase = (str: string | undefined) => str?.toUpperCase();
export const tolocaleLowerCase = (str: string | undefined) => str?.toLowerCase();
export const getIconType = (name: string) => `icon-${tolocaleUpperCase(R.slice(0, 1, name))}`;
export const getBoolean = (v: number | undefined) => !!(v || v === 0);
export const getValue = (v: any) => (v || v === 0 ? v : "-");
export const getNumberColor = (v: number | string | null) => {
  if (!v && v !== 0) {
    return "text-global-highTitle text-opacity-65";
  } else if (v < 0) {
    return "text-global-numRed";
  }
  return "text-global-numGreen";
};
export const getUpDownColor = (v: number | string | null) => {
  if (v && v > 0) {
    return "text-global-numGreen";
  } else if (v && v < 0) {
    return "text-global-numRed";
  }
  return "text-global-highTitle text-opacity-65";
};
export const getRedGreen = (v: any) => (v >= 0 ? "text-global-numGreen" : v < 0 ? "text-global-numRed" : "text-global-highTitle text-opacity-65");

export const timeConvert = (timestamp: number, num: number) => {
  // num:0 YYYY-MM-DD  num:1  YYYY-MM-DD hh:mm:ss // timestamp:时间戳
  timestamp = timestamp.toString().length === 10 ? timestamp * 1000 : timestamp;
  const date = new Date(timestamp);
  const y = date.getFullYear();
  let m: number | string = date.getMonth() + 1;
  m = m < 10 ? `0${m}` : m;
  let d: number | string = date.getDate();
  d = d < 10 ? `0${d}` : d;
  let h: string | number = date.getHours();
  h = h < 10 ? `0${h}` : h;
  let minute: string | number = date.getMinutes();
  // let second:string | number  = date.getSeconds();
  minute = minute < 10 ? `0${minute}` : minute;
  // second = second < 10 ? ('0' + second) : second;
  if (num === 0) {
    return `${m}/${d}`;
  } else if (num === 1) {
    return `${y}-${m}-${d}`;
  } else {
    return `${y}-${m}-${d} ${h}:${minute}`;
  }
};
// 得到持久时间  时间戳  是否显示月 年的缩写
export const timeago = (dateTime: any, isMY?: any) => {
  const i18n = I18n();
  const OriginalTime = dateTime;
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length === 10) dateTime *= 1000;
  const timestamp = +new Date(Number(dateTime));
  const timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  let tips = "";
  switch (true) {
  case timer < 60:
    tips = `1${i18n.comment.min}`;
    break;
  case timer >= 60 && timer < 3600:
    // @ts-ignore
    tips = parseInt(timer / 60) + i18n.comment.min;
    break;
  case timer >= 3600 && timer < 86400:
    // @ts-ignore
    tips = parseInt(timer / 3600) + i18n.comment.hour;
    break;
  case timer >= 86400 && timer < 2592000:
    // @ts-ignore
    tips = parseInt(timer / 86400) + i18n.comment.day;
    break;
  default:
    // 如果format为false，则无论什么时间戳，都显示xx之前
    if (!isMY) {
      if (timer >= 2592000 && timer < 365 * 86400) {
        // @ts-ignore
        tips = parseInt(timer / (86400 * 30)) + i18n.comment.month;
      } else {
        // @ts-ignore
        tips = parseInt(timer / (86400 * 365)) + i18n.comment.year;
      }
    } else {
      tips = timeConvert(OriginalTime, 1);
    }
  }
  return tips;
};
