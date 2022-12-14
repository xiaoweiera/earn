/**
 * @file window 对象
 * @author svon.me@gmail.com
 */

import { getEnv } from "src/config";
import { IsSSR } from "src/config/ssr";
import { Ethereum } from "src/types/ethereum";
import * as console from "src/plugins/log/";

type Root = Record<string, any>;
//@ts-ignore
let root: Root = {};

class Web3 {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(provider?: any, net?: any) {
    console.log("new web3");
  }
}

if (IsSSR()) {
  const env = getEnv();
  root = {
    open() {
      // todo
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
        // todo
      },
      reload() {
        // todo
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
      // todo
    },
    grecaptcha: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async execute(...args: any[]) {
        // todo
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async ready(...args: any[]) {
        // todo
      },
    },
    Web3,
    Zepto: "",
    ethereum: new Ethereum(),
  };
} else {
  try {
    root = window;
  } catch (e) {
    // todo
  }
}

export default root;
