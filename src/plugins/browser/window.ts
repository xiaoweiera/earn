/**
 * @file window 对象
 * @author svon.me@gmail.com
 */

import { getEnv } from "src/config";
import { IsSSR } from "src/config/ssr";
import { Ethereum } from "src/types/ethereum";
import * as console from "src/plugins/log/";

type Root = Record<string, any>;

let root: Root = {};

class Web3 {
  constructor(provider?: any, net?: any) {
    console.log("new web3");
  }
}

if (IsSSR()) {
  const env = getEnv();
  root = {
    open() {
    },
    screen: {
      width: 1200,
    },
    innerHeight: 600,
    location: {
      href: env.home,
      pathname: "/",
      hostname: env.VITE_cookie,
      origin: env.VITE_domain,
      search: "",
      replace() {
      },
      reload() {
      },
    },
    navigator: {
      userAgent: "",
    },
    btoa(value: any) {
      return value;
    },
    performance: {
      now() {
        return Date.now();
      },
    },
    scrollTo() {
    },
    grecaptcha: {
      async execute(...args: any[]) {
      },
      async ready(...args: any[]) {

      },
    },
    Web3,
    ethereum: new Ethereum(),
  };
} else {
  try {
    root = window;
  } catch (e) {

  }
}

export default { ...root };
