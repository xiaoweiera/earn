/**
 *
 */

import ApiTemplate from "../template";
import * as api from "src/config/api";
import request from "src/plugins/dao/service";
import {asyncCheck} from "src/plugins/dao/response";
import {projectParams, recommendModel} from "src/types/home";

export default class extends ApiTemplate {
	// 数据汇总
	async getSummary<T>() {
		const result = request(this.lang).get(api.home.summary);
		return asyncCheck<T>(result);
	}

	//首页顶部话题榜单接口
	getTopicRank() {
		const result=request(this.lang).get(api.home.topicRank);
		// const result = {
		// 	"code": 0,
		// 	"data": [
		// 		{
		// 			// 话题ID
		// 			"id": 1,
		// 			// 话题名称
		// 			"name": "🚀 DeFi Daily Active User (24H) 🔥🔥🔥",
		// 			// 话题关联数据表格
		// 			"table": {
		// 				// 表头
		// 				"header": [
		// 					{
		// 						"key": "name",
		// 						"sort": false
		// 					},
		// 					{
		// 						"key": "ido_price",
		// 						"sort": false
		// 					},
		// 					{
		// 						"key": "balance_24h",
		// 						"sort": false
		// 					},
		// 					{
		// 						"key": "volume_24h",
		// 						"sort": false
		// 					},
		// 					{
		// 						"key": "mcap_tvl",
		// 						"sort": false
		// 					},
		// 				],
		// 				// 数据项
		// 				"items": [
		// 					{
		// 						"id": 1,
		// 						"name": "Alpaca",
		// 						"logo": "icon-ETHYuan",
		// 						"dio_price": 300,
		// 						'balance_24h': 100,
		// 						'volume_24h': 4234,
		// 						"mcap_tvl": 256777.99,
		// 					},
		// 					{
		// 						"id": 2,
		// 						"name": "Chankea",
		// 						"logo": "icon-ETHYuan",
		// 						"dio_price": 200,
		// 						'balance_24h': 130,
		// 						'volume_24h': 1234,
		// 						"mcap_tvl": 186777.99,
		// 					},
		// 					{
		// 						"id": 3,
		// 						"name": "Ukaoee",
		// 						"logo": "icon-ETHYuan",
		// 						"dio_price": 500,
		// 						'balance_24h': 5300,
		// 						'volume_24h': 734,
		// 						"mcap_tvl": 6777.99,
		// 					},
		// 					{
		// 						"id": 4,
		// 						"name": "Kjuqie",
		// 						"logo": "icon-ETHYuan",
		// 						"dio_price": 871,
		// 						'balance_24h': 800,
		// 						'volume_24h': 8334,
		// 						"mcap_tvl": 32777.99,
		// 					},
		// 					{
		// 						"id": 5,
		// 						"name": "Quyeuw",
		// 						"logo": "icon-ETHYuan",
		// 						"dio_price": 300,
		// 						'balance_24h': 3400,
		// 						'volume_24h': 44234,
		// 						"mcap_tvl": 4256777.99,
		// 					},
		// 				]
		// 			}
		// 		},
		// 		{
		// 			// 话题ID
		// 			"id": 2,
		// 			// 话题名称
		// 			"name": "🚀 NFT is very good(24H) 🔥🔥",
		// 			// 话题关联数据表格
		// 			"table": {
		// 				// 表头
		// 				"header": [
		// 					{
		// 						"key": "name",
		// 						"sort": false
		// 					},
		// 					{
		// 						"key": "users_24h",
		// 						"sort": false
		// 					},
		// 					{
		// 						"key": "balance_24h",
		// 						"sort": false
		// 					},
		// 					{
		// 						"key": "volume_24h",
		// 						"sort": false
		// 					},
		// 					{
		// 						"key": "mcap_tvl",
		// 						"sort": false
		// 					},
		// 				],
		// 				// 数据项
		// 				"items": [
		// 					{
		// 						"id": 1,
		// 						"name": "Alpaca",
		// 						"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
		// 						"users_24h": 300,
		// 						'balance_24h': 100,
		// 						'volume_24h': 4234,
		// 						"mcap_tvl": 256777.99,
		// 					},
		// 					{
		// 						"id": 2,
		// 						"name": "Chankea",
		// 						"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
		// 						"users_24h": 200,
		// 						'balance_24h': 130,
		// 						'volume_24h': 1234,
		// 						"mcap_tvl": 186777.99,
		// 					},
		// 					{
		// 						"id": 3,
		// 						"name": "Ukaoee",
		// 						"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
		// 						"users_24h": 500,
		// 						'balance_24h': 5300,
		// 						'volume_24h': 734,
		// 						"mcap_tvl": 6777.99,
		// 					},
		// 					{
		// 						"id": 4,
		// 						"name": "Kjuqie",
		// 						"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
		// 						"users_24h": 871,
		// 						'balance_24h': 800,
		// 						'volume_24h': 8334,
		// 						"mcap_tvl": 32777.99,
		// 					},
		// 					{
		// 						"id": 5,
		// 						"name": "Quyeuw",
		// 						"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
		// 						"users_24h": 300,
		// 						'balance_24h': 3400,
		// 						'volume_24h': 44234,
		// 						"mcap_tvl": 4256777.99,
		// 					},
		// 				]
		// 			}
		// 		},
		// 		{
		// 			// 话题ID
		// 			"id": 3,
		// 			// 话题名称
		// 			"name": "🚀 Best User 🔥🔥🔥",
		// 			// 话题关联数据表格
		// 			"table": {
		// 				// 表头
		// 				"header": [
		// 					{
		// 						"key": "name",
		// 						"sort": false
		// 					},
		// 					{
		// 						"key": "owners",
		// 						"sort": false
		// 					},
		// 					{
		// 						"key": "floor_price",
		// 						"sort": false
		// 					},
		// 					{
		// 						"key": "volume_24h",
		// 						"sort": false
		// 					},
		// 					{
		// 						"key": "mcap_tvl",
		// 						"sort": false
		// 					},
		// 				],
		// 				// 数据项
		// 				"items": [
		// 					{
		// 						"id": 1,
		// 						"name": "Alpaca",
		// 						"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
		// 						"owners": 300,
		// 						'floor_price': 100,
		// 						'volume_24h': 4234,
		// 						"mcap_tvl": 256777.99,
		// 					},
		// 					{
		// 						"id": 2,
		// 						"name": "Chankea",
		// 						"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
		// 						"owners": 200,
		// 						'floor_price': 130,
		// 						'volume_24h': 1234,
		// 						"mcap_tvl": 186777.99,
		// 					},
		// 					{
		// 						"id": 3,
		// 						"name": "Ukaoee",
		// 						"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
		// 						"owners": 500,
		// 						'floor_price': 5300,
		// 						'volume_24h': 734,
		// 						"mcap_tvl": 6777.99,
		// 					},
		// 					{
		// 						"id": 4,
		// 						"name": "Kjuqie",
		// 						"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
		// 						"owners": 871,
		// 						'floor_price': 800,
		// 						'volume_24h': 8334,
		// 						"mcap_tvl": 32777.99,
		// 					},
		// 					{
		// 						"id": 5,
		// 						"name": "Quyeuw",
		// 						"logo": "https://jsdata-web.xyz/media/dapp/alpaca.png",
		// 						"owners": 300,
		// 						'floor_price': 3400,
		// 						'volume_24h': 44234,
		// 						"mcap_tvl": 4256777.99,
		// 					},
		// 				]
		// 			}
		// 		}
		// 	]
		// }
		return asyncCheck(result)
	}
	//推荐话题
	getRecommend(params:recommendModel){
		const result=request(this.lang).get(api.home.recommend,{params})
		return asyncCheck(result)
	}
	//今日趋势
	getTrend(){
		const result=request(this.lang).get(api.home.trend)
		return asyncCheck(result)
	}
	//话题项目 top3
	getTop3(id:string){
		const result=request(this.lang).get(api.home.top3,{params:{id:id}})
		return asyncCheck(result)
	}
	//话题详情
	getDetail(id:string){
		const result=request(this.lang).get(api.home.detail,{params:{id}})
		return asyncCheck(result)
	}
	//话题项目列表
	getProjects(params:projectParams){
		const result=request(this.lang).get(api.home.projects,{params})
		return asyncCheck(result)
	}
	//TGE平台列表
	getPlatform(){
		const result=request(this.lang).get(api.home.platforms)
		return asyncCheck(result)
	}
}
