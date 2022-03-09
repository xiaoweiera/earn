
interface Request {
	method: string;
	params: Array<object>;
}

class Ethereum {
  selectedAddress = ""; // 钱包地址
  async request(req: Request): Promise<Array<object>> {
    return [];
  }

  on(name: string, callBack: Function) {

  }

  async enable(): Promise<void> {

  }
}

export { Ethereum };
