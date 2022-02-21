/**
 *
 */

import ApiTemplate from "../template";
import * as api from "src/config/api";
import request from "src/plugins/dao/service";
import {asyncCheck} from "src/plugins/dao/response";

export default class extends ApiTemplate {
	// 数据汇总
	getSummary() {
		// const result = request(this.lang).get(api.home.summary);
		const result = {
			"code": 0,
			"data": {
				// 平均收益倍数
				"avg_ath": 365.6,
				// NFT数据汇总
				"nft": {
					"total": 1000,
					"24h_increase": 11,
					"total_chain": 4,
					"total_platform": 5,
					"chain": [ "ETH", "BSC" ],
					"platform": [ "daomaker" ],
					"category": [ "NFT" ]
				},
				// IDO+IGO数据汇总
				"ixo": {
					"total": 2000,
					"24h_increase": 11,
					"total_chain": 4,
					"total_platform": 5,
					"chain": [ "ETH", "BSC" ],
					"platform": [ "daomaker" ],
					"category": [ "NFT" ]
				},
				// IDO数据汇总
				"ido": {
					"total": 1000,
					"24h_increase": 11,
					"total_chain": 4,
					"total_platform": 5,
					"chain": [ "ETH", "BSC" ],
					"platform": [ "daomaker" ],
					"category": [ "NFT" ]
				},
				// IGO数据汇总
				"igo": {
					"total": 1000,
					"24h_increase": 11,
					"total_chain": 4,
					"total_platform": 5,
					"chain": [ "ETH", "BSC" ],
					"platform": [ "daomaker" ],
					"category": [ "NFT" ]
				},
				// 空投数据汇总
				"airdrop": {
					"total": 1200,
					"24h_increase": 15,
					"total_chain": 4,
					"total_platform": 5,
					"chain": [ "ETH", "BSC" ],
					"platform": [ "daomaker" ],
					"category": [ "NFT" ]
				}
			}
		}
		return asyncCheck(result);
	}

	//首页顶部话题榜单接口
	getTopicRank() {
		// const result=request(this.lang).get(api.home.topicRank);
		const result = {
			"code": 0,
			"data": [
				{
					// 话题ID
					"id": 1,
					// 话题名称
					"name": "🚀 DeFi Daily Active User (24H) 🔥🔥🔥",
					// 话题关联数据表格
					"table": {
						// 表头
						"header": [
							{
								"key": "name",
								"sort": false
							},
							{
								"key": "ido_price",
								"sort": false
							},
							{
								"key": "balance_24h",
								"sort": false
							},
							{
								"key": "volume_24h",
								"sort": false
							},
							{
								"key": "mcap_tvl",
								"sort": false
							},
						],
						// 数据项
						"items": [
							{
								"id": 1,
								"name": "Alpaca",
								"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
								"dio_price": 300,
								'balance_24h': 100,
								'volume_24h': 4234,
								"mcap_tvl": 256777.99,
							},
							{
								"id": 2,
								"name": "Chankea",
								"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
								"dio_price": 200,
								'balance_24h': 130,
								'volume_24h': 1234,
								"mcap_tvl": 186777.99,
							},
							{
								"id": 3,
								"name": "Ukaoee",
								"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
								"dio_price": 500,
								'balance_24h': 5300,
								'volume_24h': 734,
								"mcap_tvl": 6777.99,
							},
							{
								"id": 4,
								"name": "Kjuqie",
								"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
								"dio_price": 871,
								'balance_24h': 800,
								'volume_24h': 8334,
								"mcap_tvl": 32777.99,
							},
							{
								"id": 5,
								"name": "Quyeuw",
								"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
								"dio_price": 300,
								'balance_24h': 3400,
								'volume_24h': 44234,
								"mcap_tvl": 4256777.99,
							},
						]
					}
				},
				{
					// 话题ID
					"id": 2,
					// 话题名称
					"name": "🚀 NFT is very good(24H) 🔥🔥",
					// 话题关联数据表格
					"table": {
						// 表头
						"header": [
							{
								"key": "name",
								"sort": false
							},
							{
								"key": "users_24h",
								"sort": false
							},
							{
								"key": "balance_24h",
								"sort": false
							},
							{
								"key": "volume_24h",
								"sort": false
							},
							{
								"key": "mcap_tvl",
								"sort": false
							},
						],
						// 数据项
						"items": [
							{
								"id": 1,
								"name": "Alpaca",
								"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
								"users_24h": 300,
								'balance_24h': 100,
								'volume_24h': 4234,
								"mcap_tvl": 256777.99,
							},
							{
								"id": 2,
								"name": "Chankea",
								"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
								"users_24h": 200,
								'balance_24h': 130,
								'volume_24h': 1234,
								"mcap_tvl": 186777.99,
							},
							{
								"id": 3,
								"name": "Ukaoee",
								"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
								"users_24h": 500,
								'balance_24h': 5300,
								'volume_24h': 734,
								"mcap_tvl": 6777.99,
							},
							{
								"id": 4,
								"name": "Kjuqie",
								"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
								"users_24h": 871,
								'balance_24h': 800,
								'volume_24h': 8334,
								"mcap_tvl": 32777.99,
							},
							{
								"id": 5,
								"name": "Quyeuw",
								"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
								"users_24h": 300,
								'balance_24h': 3400,
								'volume_24h': 44234,
								"mcap_tvl": 4256777.99,
							},
						]
					}
				},
				{
					// 话题ID
					"id": 3,
					// 话题名称
					"name": "🚀 Best User 🔥🔥🔥",
					// 话题关联数据表格
					"table": {
						// 表头
						"header": [
							{
								"key": "name",
								"sort": false
							},
							{
								"key": "owners",
								"sort": false
							},
							{
								"key": "floor_price",
								"sort": false
							},
							{
								"key": "volume_24h",
								"sort": false
							},
							{
								"key": "mcap_tvl",
								"sort": false
							},
						],
						// 数据项
						"items": [
							{
								"id": 1,
								"name": "Alpaca",
								"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
								"owners": 300,
								'floor_price': 100,
								'volume_24h': 4234,
								"mcap_tvl": 256777.99,
							},
							{
								"id": 2,
								"name": "Chankea",
								"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
								"owners": 200,
								'floor_price': 130,
								'volume_24h': 1234,
								"mcap_tvl": 186777.99,
							},
							{
								"id": 3,
								"name": "Ukaoee",
								"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
								"owners": 500,
								'floor_price': 5300,
								'volume_24h': 734,
								"mcap_tvl": 6777.99,
							},
							{
								"id": 4,
								"name": "Kjuqie",
								"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
								"owners": 871,
								'floor_price': 800,
								'volume_24h': 8334,
								"mcap_tvl": 32777.99,
							},
							{
								"id": 5,
								"name": "Quyeuw",
								"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
								"owners": 300,
								'floor_price': 3400,
								'volume_24h': 44234,
								"mcap_tvl": 4256777.99,
							},
						]
					}
				}
			]
		}
		return asyncCheck(result)
	}
}
