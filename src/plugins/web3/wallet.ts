/**
 * @file web3
 * @author svon.me@gmail.com
 */

import DBList from "@fengqiaogang/dblist";
import safeGet from "@fengqiaogang/safe-get";
import { Ethereum } from "src/types/ethereum";
import window from "src/plugins/browser/window";
import { EventType, Callback } from "./interface";

const getEthereum = function (): Ethereum {
	if (window.ethereum) {
		return window.ethereum;
	}
	return new Ethereum();
}

class Wallet extends window.Web3 {
	constructor(provider?: any, net?: any) {
		super(provider, net);
	}

	/**
	 * 绑定事件
	 * @param name 事件名称
	 * @param callback 回调函数
	 */
	on(name: EventType, callback: Callback) {
		const ethereum = getEthereum();
		ethereum.on(name, callback);
	}
	// 关闭小狐狸弹窗
	enable() {
		const ethereum = getEthereum();
		return ethereum.enable();
	}
	/**
	 * 获取小狐狸选中的线路地址(用户钱包地址)
	 */
	getChainAddress (): string {
		const ethereum = getEthereum();
		return ethereum.selectedAddress;
	}
	// 申请权限
	async requestPermissions() {
		const ethereum = getEthereum();
		try {
			const result = await ethereum.request({
				method: 'wallet_requestPermissions',
				params: [
					{ eth_accounts: {} }
				],
			});
			if (result) {
				const db = new DBList(result);
				const list = db.select({ parentCapability: "eth_accounts" });
				if (list && list.length > 0) {
					console.log('eth_accounts permission successfully requested!');
					return true
				}
			}
		}catch (e) {
			const code = safeGet<number>(e as object, "code");
			if (code === -32002) {
				return Promise.reject({ code: 6001 })
			} else if (code === 4001) {
				return Promise.reject(e);
			}
			return Promise.reject(e);
		}
		return false;
	}
}

export default Wallet;

