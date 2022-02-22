/**
 * @file web3
 * @author svon.me@gmail.com
 */

import { Ethereum } from "src/types/ethereum";
import window from "src/plugins/browser/window";

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
	 * 获取小狐狸选中的线路地址(用户钱包地址)
	 */
	getChainAddress (): string {
		const ethereum = getEthereum();
		return ethereum.selectedAddress;
	}
	async requestPermissions() {

	}
}

export default Wallet;

