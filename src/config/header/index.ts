/**
 * @file 导航菜单配置
 * @author svon.me@gmail.com
 */

import { DApp, name as DAppName } from "./dapp";
import { Ranks, name as RankName } from "./rank";
import { APY, name as ApyName } from "./apy";
import { TopicList, name as TopicName } from "./topic";
import { Quota, name as QuotaName } from "./quota";
import { Blog, name as BlogName } from "./blog";
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

export const headers = [
	DApp,
	Ranks,
	APY,
	Address,
	Portfolio,
	TopicList,
	Quota,
	Blog
];

