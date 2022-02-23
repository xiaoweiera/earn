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
    ido:summaryItem;
    igo:summaryItem;
    airdrop:summaryItem
}