import { Request, Response } from "express";
import API from "src/api";
import safeGet from "@fengqiaogang/safe-get";
import I18n from "src/utils/i18n";

const getTabList=(key:string,list:any)=>{
    if(!list) return []
    const data=list.filter((item:any)=>{
        if(item.position===key){
            return item
        }
    })
    return data
}
export const home = async function (req: Request, res: Response) {
    const api = new API(req);
    const i18n = I18n(req);
    const [config] = await Promise.all([api.earn.getConfig()]);
    const tagList:any=safeGet(config as object,'groupConfig')
    const chainList:any=safeGet(config as object,'chainList')
    //精选tab
    const recommendTab=getTabList('recommendList',tagList)
    //table tab
    const tableTab=getTabList('tableList',tagList)
    const result = {
        title: i18n.invest.page.title,
        keywords: i18n.invest.page.key,
        description: i18n.invest.page.description,

        'API.Earn.Config': config, // 基本配置
        'API.Earn.Chain':chainList,
        'API.Earn.recommendTab':recommendTab,
        'API.Earn.tableTab':recommendTab,

    };
    res.send(result);
};
