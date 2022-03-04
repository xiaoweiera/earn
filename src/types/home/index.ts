export interface summaryItem{
    total: number;
    increase_24: number;
    total_chain: number;
    total_platform: number;
    chain: string[];
    platform: string[];
    category: string[]
}
export interface summaryModel{
    avg_ath:number;
    nft:summaryItem;
    ixo:summaryItem;
    ixo_upcoming:summaryItem;
    ido:summaryItem;
    igo:summaryItem;
    airdrop:summaryItem
}
export interface recommendModel{
    page:number,
    page_size:number,
    show_commercial?:boolean //是否显示广告 默认不显示 false
}
export interface optionItem{
    show:boolean,
    options:Array<string>
}
export interface filterModel{
    chain:optionItem;
    platform:optionItem;
    category:optionItem;
    search:optionItem
}
export interface detail{
    id:number | string;
    name:string;
    desc:string;
    show_type:string;
    filters:filterModel
}
export interface projectParams{
    id:number | string;
    page:number;
    page_size:number;
    chain?:string;
    platform?:string;
    category?:string;
    query?:string;
    sort_field?:string;
    sort_type?:string

}