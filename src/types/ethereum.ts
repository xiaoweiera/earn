interface Request {
  method: string;
  params: Array<object>;
}

class Ethereum {
  selectedAddress = ""; // 钱包地址
  async request(req: Request): Promise<Array<object>> {
    return [];
  }

  on(name: string, callBack: () => void) {
    // todo
  }

  async enable(): Promise<void> {
    // todo
  }
}

export { Ethereum };
