/**
 * @file 数据
 */

import safeGet from "@fengqiaogang/safe-get";
import API from "src/api/";
import I18n from "src/utils/i18n";
import { toUpper } from "ramda";
import _ from "lodash";

const i18n = I18n();

// 展示效果
export enum HeaderType {
    number = "number", // 数字
    text = "text", // 纯文字
    ratio = "ratio", // 数字 + 百分号
    progress = "progress", // 进度条
    chain = "chain", // 小图标
    logo = "logo", // 大图标
    chartBar = "bar", // 柱状图
    chartLine = "line", // 折线图
    money = "money", // 金额
    time = "time", //时间
    desc = "desc", //描述
}

export interface Header {
    title: string; // 表格名称
    titleCn: string; //中文title
    titleEn: string; //英文title
    titleDesCn: string; //title中文描述
    titleDesEn: string; //title英文描述
    sort?: boolean; // 是否支持排序
    sort_field?: string; // 排序字段
    center?: boolean; // 是否居中
    width?: number; //宽度
    active?: boolean; // 是否为激活状态
    fields: string | string[] | Array<string[] | string>; // 对应数据的键名
    type: HeaderType | HeaderType[] | Array<Array<HeaderType> | HeaderType>; // 展示效果
}

export interface Table {
    header: Header[];
    items: object[];
}

//得到title
export const getTitle = (field: string) => {
    let title = "";
    //获取基础字段
    const base = field.includes("_") ? field.split("_")[0] : field;
    //@ts-ignore 基础字段title
    const baseTitle = i18n.table[base] ? i18n.table[base] : _.upperFirst(_.camelCase(base));
    const time = ["24h", "7d", "30d"];
    //如果是图表 或者 基础字段 title为baseTitle
    if (field.includes("chart") || !field.includes("_")) return baseTitle;
    //变化率和变化量都是xxxChg+颗粒度
    time.forEach((t) => {
        if (field.includes(t)) {
            //@ts-ignore
            title = `${baseTitle} Chg ${toUpper(t)}`;
            return false;
        }
    });
    return title ? title : _.upperFirst(_.camelCase(field));
};
export const getTitleCnEn = (header: Header) => {
    if (i18n.getLang() === "cn") {
        return header.titleCn ? header.titleCn : getTitle(header.title);
    } else {
        return header.titleEn ? header.titleEn : getTitle(header.title);
    }
};
export const getTitleDes = (header: Header) => {
    if (i18n.getLang() === "cn") {
        return header.titleDesCn;
    } else {
        return header.titleDesEn;
    }
};

export const rowClass = (row: any) => {
    const styleJson = {
        "height": "60px",
        "border": "none",
        "cursor": "Pointer",
        "position": "relative !important",
        "z-index": `${99999 - row.rowIndex} !important`,
    };
    return styleJson;
};
export const headerCellClass = () => {
    const styleJson = {
        border: "none",
        borderTop: "1px solid rgba(3, 54, 102, 0.06) !important",
        borderBottom: "1px solid rgba(3, 54, 102, 0.06) !important",
        padding: "0",
        height: "40px",
    };
    return styleJson;
};

export const cellClass = () => ({ border: "none" });
export const getTopicDetail = async function (query: any): Promise<Table> {
    const api = new API();
    const result: any = await api.home.getTopicDetail<object>(query);

    return {
        header: safeGet<Header[]>(result, "header"),
        items: safeGet<object[]>(result, "body.items"),
    };
};
