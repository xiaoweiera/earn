/**
 * @file web3
 * @author svon.me@gmail.com
 */

import Web3 from "web3";
import * as net from 'net';

class Wallet extends Web3 {
	constructor(provider?: any, net?: net.Socket) {
		if (provider && net) {
			super(provider, net);
		} else if (provider) {
			super(provider);
		} else {
			super();
		}
	}
}

export default Wallet;

