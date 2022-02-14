/**
 * @file 导航菜单配置
 * @author svon.me@gmail.com
 */
import { Lang } from "src/types/language";
import { APY, name as ApyName } from "./apy";
import { DApp, name as DAppName } from "./dapp";
import { Blog, name as BlogName } from "./blog";
import { Ranks, name as RankName } from "./rank";
import { Quota, name as QuotaName } from "./quota";
import { TopicList, name as TopicName } from "./topic";
import { Address, Portfolio, name as AddressName } from "./address";

export const names = {
	dapp: DAppName,
	rank: RankName,
	apy: ApyName,
	quota: QuotaName,
	blog: BlogName,
	address: AddressName,
	topic: TopicName
};

export const headers = function (lang?: Lang) {
	return [
		DApp(lang),
		Ranks(lang),
		APY(lang),
		Address(lang),
		Portfolio(lang),
		TopicList(lang),
		Quota(lang),
		Blog(lang)
	];
}

