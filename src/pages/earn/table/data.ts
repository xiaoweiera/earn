import _ from "lodash";
import {toUpper} from "ramda";
import API from "src/api";
import safeGet from "@fengqiaogang/safe-get";
import I18n from "src/utils/i18n";
const i18n = I18n();
export const headerList = [
    {
        "title": "SmartMoney",
        "titleCn": "SmartMoney",
        "titleEn": "SmartMoney",
        "sort": false,
        "center": false,
        "width": 290,
        "active": false,
        "fields": [["headPic", "addressName"], "tagList"],
        "type": [["logo", "text"], "tags"]
    },
    {
        "title": "NFT Value / NFTs",
        "titleCn": "NFT Value / NFTs",
        "titleEn": "NFT Value / NFTs",
        "sort": true,
        "sortField":"nftValue",
        "center": true,
        "active": false,
        "width": 120,
        "fields": [["currency", "nftValue"], "nftNum"],
        "type": [["chain", "number"], "num"]
    },
    {
        "title": "chart",
        "titleCn": "chart",
        "titleEn": "chart",
        "sort": false,
        "center": true,
        "active": false,
        "width": 130,
        "fields": ["roiTrending"],
        "type": ["chartLine"]
    },

    {
        "title": "Return%",
        "titleCn": "Return%",
        "titleEn": "Return%",
        "sort": true,
        "sortField":"returnRate",
        "center": true,
        "active": true,
        "width": 110,
        "fields": ["returnRate"],
        "type": ["percent"]
    },
    {
        "title": "30d Return%",
        "titleCn": "30d Return%",
        "titleEn": "30d Return%",
        "sort": true,
        "sortField":"returnRateBy30D",
        "center": true,
        "active": false,
        "width": 110,
        "fields": ["returnRateBy30D"],
        "type": ["percent"]
    },
    {
        "title": "FlipRate",
        "titleCn": "FlipRate",
        "titleEn": "FlipRate",
        "sort": true,
        "sortField":"flipRate",
        "center": true,
        "active": false,
        "width": 110,
        "fields": ["flipRate"],
        "type": ["percent"]
    },

    {
        "title": "30d FlipRate",
        "titleCn": "30d FlipRate",
        "titleEn": "30d FlipRate",
        "sortField":"flipRateBy30D",
        "sort": true,
        "center": true,
        "active": false,
        "width": 110,
        "fields": ["flipRateBy30D"],
        "type": ["percent"]
    },
    {
        "title": "Last Activity",
        "titleCn": "Last Activity",
        "titleEn": "Last Activity",
        "sort": true,
        "center": true,
        "active": false,
        "width": 110,
        "fields": ["lastActivityTime"],
        "type": ["time"]
    }
]
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
export const getTitleCnEn = (header: any) => {
    if (i18n.getLang() === "cn") {
        return header.titleCn ? header.titleCn : getTitle(header.title);
    } else {
        return header.titleEn ? header.titleEn : getTitle(header.title);
    }
};
export const getTitleDes = (header: any) => {
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
        // "backgroundColor":"#000000",
        "z-index": `${99999 - row.rowIndex} !important`,
    };
    return styleJson;
};
export const headerCellClass = () => {
    const styleJson = {
        border: "none",
        borderTop: "1px solid rgba(3, 54, 102, 0.06) !important",
        borderBottom: "1px solid rgba(3, 54, 102, 0.06) !important",
        backgroundColor:"#16181A",
        padding: "0",
        height: "46px",
    };
    return styleJson;
};

export const cellClass = () => ({ border: "none" });
